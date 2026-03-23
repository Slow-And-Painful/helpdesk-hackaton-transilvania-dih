import UsersService from "$services/UsersService"
import type { RegisterRoutes } from "$types/index"
import { container } from "tsyringe"
import { randomUUID } from "crypto"
import UtilityLoginView from "$templates/views/UtilityLoginView"
import { BaseLayout } from "$templates/layouts"
import USER_TYPE from "$types/USER_TYPE"
import { getViewPath, isHtmxRequest } from "$routers/website/utils"
import { Type } from "typebox"
import { eq, inArray } from "drizzle-orm"
import { usersTable } from "$dbSchemas/Users"
import { departmentUsersTable } from "$dbSchemas/DepartmentUsers"
import { departmentsTable } from "$dbSchemas/Departments"
import { match } from "ts-pattern"
import DepartmentsService from "$services/DepartmentsService"
import DepartmentUserService from "$services/DepartmentUsersService"

const departmentsService = container.resolve<DepartmentsService>(DepartmentsService.token)
const departmentUsersService = container.resolve<DepartmentUserService>(DepartmentUserService.token)

const route: RegisterRoutes = (server) => {
  const usersService = container.resolve<UsersService>(UsersService.token)

  server.route({
    method: "GET",
    url: "/utility-login-as",
    schema: {
      querystring: Type.Object({
        userId: Type.Number(),
      }),
    },
    handler: async (req, res) => {
      const { userId } = req.query
      const user = await usersService.get(userId)

      if (!user) {
        return res.status(404).send("User not found")
      }

      if (user.blocked) {
        return res.status(403).send("User is blocked")
      }

      const userDepartments = await departmentUsersService.list({
        where: eq(departmentUsersTable.userId, user.id),
      })

      const departments = await departmentsService.list({
        where: inArray(departmentsTable.id, userDepartments.map((d) => d.departmentId)),
      })

      // const activeDepartment = departments[0]

      const sessionId = randomUUID()

      req.session.data = {
        ...req.session.data,
        authenticatedUserId: user.id,
        callerUserId: user.id,
        sessionId,
        // ...activeDepartment ? { activeDepartmentId: activeDepartment.id } : undefined,
      }

      await req.session.save()

      const redirectUrl = match(user.type)
        .with(USER_TYPE.CUSTOMER, () => getViewPath("dashboard", "HOME"))
        .with(USER_TYPE.STAFF, () => getViewPath("public", "HOME"))
        .exhaustive()

      return res.redirect(redirectUrl)
    },
  })

  server.route({
    method: "GET",
    url: "/utility-login",
    handler: async (req, res) => {
      const { items: customers, pagination: customersPagination } = await usersService.getTableItems({
        ...req.query as Record<string, string>,
      }, eq(usersTable.type, USER_TYPE.CUSTOMER))

      const { items: staff, pagination: staffPagination } = await usersService.getTableItems({
        ...req.query as Record<string, string>,
      }, eq(usersTable.type, USER_TYPE.STAFF))

      if (isHtmxRequest(req)) {
        return res
          .headers({
            "HX-Retarget": "#page",
            "HX-Reswap": "outerHTML",
            "HX-Replace-Url": "/internal/utility-login",
          })
          .view(
            <UtilityLoginView
              customers={customers}
              customersPagination={customersPagination}
              staff={staff}
              staffPagination={staffPagination}
            />,
            BaseLayout
          )
      } else {
        return res.view(
          <UtilityLoginView
            customers={customers}
            customersPagination={customersPagination}
            staff={staff}
            staffPagination={staffPagination}
          />,
          BaseLayout
        )
      }
    },
  })
}

export default route

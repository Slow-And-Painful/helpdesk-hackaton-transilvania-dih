import { createRouter, getViewPath } from "../../utils"
import { ROUTE } from "./types"
import { schemas } from "./schemas"
import USER_ROLE from "$types/USER_ROLES"
import { container } from "tsyringe"
import UsersService from "$services/UsersService"
import DepartmentUserService from "$services/DepartmentUsersService"
import USER_TYPE from "$types/USER_TYPE"
import { DEPARTMENT_USER_ROLE } from "$types/departments"
import { eq, inArray } from "drizzle-orm"
import { departmentUsersTable } from "$dbSchemas/DepartmentUsers"
import { usersTable } from "$dbSchemas/Users"
import UsersTable, { usersTableId } from "$templates/components/tables/UsersTable"
import CreateUserForm, { createUserFormId } from "$templates/components/users/CreateUserForm"
import { createUserModalId } from "$templates/components/users/CreateUserModal"

export const routerPrefix = "/users"

const usersService = container.resolve<UsersService>(UsersService.token)
const departmentUsersService = container.resolve<DepartmentUserService>(DepartmentUserService.token)

export const router = createRouter("users", (server) => {
  server.route({
    method: "POST",
    url: ROUTE.CREATE,
    schema: schemas[ROUTE.CREATE],
    config: {
      authenticated: true,
      security: {
        session: `${USER_ROLE.DEPARTMENT_ADMIN}`,
      },
    },
    handler: async (req, res) => {
      const { firstName, lastName, email } = req.body

      const activeDepartment = req.activeDepartment
      if (!activeDepartment) {
        return res.status(400).send("No active department selected")
      }

      const existing = await usersService.getUserByEmail(email)
      if (existing) {
        return res
          .headers({
            "HX-Retarget": `#${createUserFormId}`,
            "HX-Reswap": "outerHTML",
          })
          .view(
            <CreateUserForm
              values={{ firstName, lastName, email }}
              initialValues={{ firstName, lastName, email }}
              errors={{ email: <>A user with this email already exists</> }}
            />
          )
      }

      const user = await usersService.sInsert({
        firstName,
        lastName,
        email,
        password: "password",
        type: USER_TYPE.CUSTOMER,
        emailVerified: true,
        privacyPolicyAcceptance: true,
        termsConditionsAcceptance: true,
      })

      await departmentUsersService.sInsert({
        userId: user.id,
        departmentId: activeDepartment.id,
        role: DEPARTMENT_USER_ROLE.MEMBER,
      })

      const departmentUsers = await departmentUsersService.list({
        where: eq(departmentUsersTable.departmentId, activeDepartment.id),
      })

      const userIds = departmentUsers.map((du) => du.userId)
      const baseUrl = getViewPath("dashboard", "USERS")
      const { items, pagination } = await usersService.getTableItems(
        req.query as Record<string, string>,
        inArray(usersTable.id, userIds),
      )

      return res
        .headers({
          "HX-Reswap": "outerHTML",
          "HX-Retarget": `#${usersTableId}`,
          "HX-Trigger-After-Settle": JSON.stringify({
            closeModal: createUserModalId,
            showSuccessToast: "User created successfully"
          }),
        })
        .view(<UsersTable items={items} pagination={pagination} baseUrl={baseUrl} />)
    },
  })
})

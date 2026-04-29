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
        session: `${USER_ROLE.DEPARTMENT_ADMIN} || ${USER_ROLE.STAFF_ACCOUNT}`,
      },
    },
    handler: async (req, res) => {
      const { firstName, lastName, email } = req.body
      const role = (req.body.role as DEPARTMENT_USER_ROLE | undefined) ?? DEPARTMENT_USER_ROLE.MEMBER
      const bodyDepartmentId = (req.body as { departmentId?: number }).departmentId

      const departmentId = bodyDepartmentId ?? req.activeDepartment?.id
      if (!departmentId) {
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
              values={{ firstName, lastName, email, role }}
              initialValues={{ firstName, lastName, email, role }}
              errors={{ email: <>Un utilizator cu acest email există deja</> }}
              departmentId={bodyDepartmentId}
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
        departmentId,
        role,
      })

      const departmentUsers = await departmentUsersService.list({
        where: eq(departmentUsersTable.departmentId, departmentId),
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
            showSuccessToast: "Utilizatorul a fost creat cu succes"
          }),
        })
        .view(<UsersTable items={items} pagination={pagination} baseUrl={baseUrl} />)
    },
  })
})

import { createRouter, getViewPath } from "../../utils"
import { ROUTE } from "./types"
import { schemas } from "./schemas"
import USER_ROLE from "$types/USER_ROLES"
import USER_TYPE from "$types/USER_TYPE"
import { container } from "tsyringe"
import UsersService from "$services/UsersService"
import DepartmentUserService from "$services/DepartmentUsersService"
import DepartmentsService from "$services/DepartmentsService"
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
const departmentsService = container.resolve<DepartmentsService>(DepartmentsService.token)

export const router = createRouter("users", (server) => {
  server.route({
    method: "POST",
    url: ROUTE.CREATE,
    schema: schemas[ROUTE.CREATE],
    config: {
      authenticated: true,
      security: {
        session: `${USER_ROLE.STAFF_ACCOUNT} || ${USER_ROLE.DEPARTMENT_ADMIN}`,
      },
    },
    handler: async (req, res) => {
      const { firstName, lastName, email, departmentId: departmentIdParam, role, userType } = req.body
      const isStaff = req.callerUser?.type === USER_TYPE.STAFF

      // Resolve which department to assign the new user to
      let targetDepartmentId: number | undefined
      if (isStaff) {
        if (departmentIdParam) {
          targetDepartmentId = Number(departmentIdParam)
        }
      } else {
        const activeDepartment = req.activeDepartment
        if (!activeDepartment) {
          return res.status(400).send("No active department selected")
        }
        targetDepartmentId = activeDepartment.id
      }

      const existing = await usersService.getUserByEmail(email)
      if (existing) {
        const departments = isStaff && !departmentIdParam
          ? await departmentsService.list()
          : undefined

        return res
          .headers({
            "HX-Retarget": `#${createUserFormId}`,
            "HX-Reswap": "outerHTML",
          })
          .view(
            <CreateUserForm
              values={{ firstName, lastName, email, departmentId: departmentIdParam, role, userType }}
              initialValues={{ firstName, lastName, email, departmentId: departmentIdParam, role, userType }}
              errors={{ email: <>Un utilizator cu acest email există deja</> }}
              departmentId={targetDepartmentId}
              departments={departments}
              isStaff={isStaff}
            />
          )
      }

      const resolvedUserType =
        isStaff && userType === USER_TYPE.STAFF ? USER_TYPE.STAFF : USER_TYPE.CUSTOMER
      const resolvedRole =
        role === DEPARTMENT_USER_ROLE.ADMIN ? DEPARTMENT_USER_ROLE.ADMIN : DEPARTMENT_USER_ROLE.MEMBER

      const user = await usersService.sInsert({
        firstName,
        lastName,
        email,
        password: "password",
        type: resolvedUserType,
        emailVerified: true,
        privacyPolicyAcceptance: true,
        termsConditionsAcceptance: true,
      })

      if (targetDepartmentId) {
        await departmentUsersService.sInsert({
          userId: user.id,
          departmentId: targetDepartmentId,
          role: resolvedRole,
        })
      }

      // For staff: check whether request came from department detail page or staff users page
      if (isStaff && targetDepartmentId) {
        const currentUrl = req.headers["hx-current-url"] as string | undefined
        const staffDeptUrl = getViewPath("staff", "DEPARTMENT_SETTINGS").replace(":id", String(targetDepartmentId))
        const isOnDeptPage = currentUrl?.includes(staffDeptUrl)

        if (isOnDeptPage) {
          const departmentUsers = await departmentUsersService.list({
            where: eq(departmentUsersTable.departmentId, targetDepartmentId),
          })
          const userIds = departmentUsers.map((du) => du.userId)
          const staffDeptBaseUrl = `${staffDeptUrl}?tab=users`
          const { items, pagination } = await usersService.getTableItems(
            req.query as Record<string, string>,
            userIds.length ? inArray(usersTable.id, userIds) : eq(usersTable.id, -1),
          )
          return res
            .headers({
              "HX-Reswap": "outerHTML",
              "HX-Retarget": `#${usersTableId}`,
              "HX-Trigger-After-Settle": JSON.stringify({
                closeModal: createUserModalId,
                showSuccessToast: "Utilizatorul a fost creat cu succes",
              }),
            })
            .view(
              <UsersTable
                items={items}
                pagination={pagination}
                baseUrl={staffDeptBaseUrl}
                departmentUserIdMap={new Map(departmentUsers.map((du) => [du.userId, du.id]))}
                departmentUserRoleMap={new Map(departmentUsers.map((du) => [du.userId, du.role]))}
              />
            )
        }

        return res
          .headers({
            "HX-Trigger": JSON.stringify({
              closeModal: createUserModalId,
            }),
            "HX-Refresh": "true",
          })
          .send()
      }

      const activeDepartment = req.activeDepartment!
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
            showSuccessToast: "Utilizatorul a fost creat cu succes",
          }),
        })
        .view(<UsersTable items={items} pagination={pagination} baseUrl={baseUrl} departmentUserRoleMap={new Map(departmentUsers.map((du) => [du.userId, du.role]))} />)
    },
  })
})

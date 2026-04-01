import { createRouter } from "../../utils"
import { ROUTE } from "./types"
import { schemas } from "./schemas"
import DepartmentSwitcherModal from "$templates/components/departments/DepartmentSwitcherModal"
import CreateDepartmentModal from "$templates/components/departments/CreateDepartmentModal"
import USER_ROLE from "$types/USER_ROLES"

export const routerPrefix = "/departments"

export const router = createRouter("departments", (server) => {
  server.route({
    method: "GET",
    url: ROUTE.DEPARTMENT_SWITCHER,
    schema: schemas[ROUTE.DEPARTMENT_SWITCHER],
    config: { authenticated: true },
    handler: (req, res) => {
      return res
        .headers({
          "HX-Retarget": "#modal",
          "HX-Reswap": "beforeend",
        })
        .view(
          <DepartmentSwitcherModal
            activeDepartment={req.activeDepartment}
            userDepartments={req.userDepartments}
          />
        )
    },
  })

  server.route({
    method: "GET",
    url: ROUTE.CREATE_DEPARTMENT_MODAL,
    schema: schemas[ROUTE.CREATE_DEPARTMENT_MODAL],
    config: {
      authenticated: true,
      security: {
        session: `${USER_ROLE.STAFF_ACCOUNT}`,
      },
    },
    handler: async (_req, res) => {
      return res
        .headers({
          "HX-Retarget": "#modal",
          "HX-Reswap": "beforeend",
        })
        .view(<CreateDepartmentModal />)
    },
  })
})

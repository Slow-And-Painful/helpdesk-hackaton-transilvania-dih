import { createRouter } from "../../utils"
import { ROUTE } from "./types"
import { schemas } from "./schemas"
import DepartmentSwitcherModal from "$templates/components/departments/DepartmentSwitcherModal"

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
          "HX-Reswap": "innerHTML",
        })
        .view(
          <DepartmentSwitcherModal
            activeDepartment={req.activeDepartment}
            userDepartments={req.userDepartments}
          />
        )
    },
  })
})

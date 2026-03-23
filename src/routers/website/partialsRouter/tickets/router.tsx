import { createRouter } from "../../utils"
import { ROUTE } from "./types"
import { schemas } from "./schemas"
import USER_ROLE from "$types/USER_ROLES"
import CreateTicketModal from "$templates/components/tickets/CreateTicketModal"
import DepartmentsService from "$services/DepartmentsService"
import { container } from "tsyringe"

export const routerPrefix = "/tickets"

const departmentsService = container.resolve<DepartmentsService>(DepartmentsService.token)

export const router = createRouter("tickets", (server) => {
  server.route({
    method: "GET",
    url: ROUTE.CREATE_TICKET_MODAL,
    schema: schemas[ROUTE.CREATE_TICKET_MODAL],
    config: {
      authenticated: true,
      security: {
        session: `${USER_ROLE.CUSTOMER_ACCOUNT}`,
      },
    },
    handler: async (req, res) => {
      const allDepartments = await departmentsService.list()

      return res
        .headers({
          "HX-Retarget": "#modal",
          "HX-Reswap": "beforeend",
        })
        .view(
          <CreateTicketModal
            departments={allDepartments}
            activeDepartmentId={req.activeDepartment?.id ?? null}
          />
        )
    },
  })
})

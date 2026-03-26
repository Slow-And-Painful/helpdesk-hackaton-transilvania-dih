import { createRouter } from "../../utils"
import { ROUTE } from "./types"
import { schemas } from "./schemas"
import USER_ROLE from "$types/USER_ROLES"
import CreateTicketModal from "$templates/components/tickets/CreateTicketModal"
import TicketDetailDrawer from "$templates/components/tickets/TicketDetailDrawer"
import DepartmentsService from "$services/DepartmentsService"
import TicketsService from "$services/TicketsService"
import { container } from "tsyringe"

export const routerPrefix = "/tickets"

const departmentsService = container.resolve<DepartmentsService>(DepartmentsService.token)
const ticketsService = container.resolve<TicketsService>(TicketsService.token)

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

  server.route({
    method: "GET",
    url: ROUTE.TICKET_DETAIL,
    schema: schemas[ROUTE.TICKET_DETAIL],
    config: {
      authenticated: true,
      security: {
        session: `${USER_ROLE.CUSTOMER_ACCOUNT}`,
      },
    },
    handler: async (req, res) => {
      const { ticketId } = req.params as { ticketId: number }
      const ticket = await ticketsService.get(ticketId)

      if (!ticket) {
        return res.status(404).send("Ticket not found")
      }

      return res
        .headers({
          "HX-Retarget": "#drawer",
          "HX-Reswap": "innerHTML",
        })
        .view(<TicketDetailDrawer ticket={ticket} />)
    },
  })
})

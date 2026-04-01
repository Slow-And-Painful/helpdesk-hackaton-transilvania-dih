import { createRouter } from "../../utils"
import { ROUTE } from "./types"
import { schemas } from "./schemas"
import USER_ROLE from "$types/USER_ROLES"
import { container } from "tsyringe"
import TicketsService from "$services/TicketsService"
import { TICKET_STATUS } from "$types/tickets"
import TicketStatusBadge from "$templates/components/TicketStatusBadge"

export const routerPrefix = "/tickets"

const ticketsService = container.resolve<TicketsService>(TicketsService.token)

export const router = createRouter("tickets", (server) => {
  server.route({
    method: "POST",
    url: ROUTE.CREATE,
    schema: schemas[ROUTE.CREATE],
    config: {
      authenticated: true,
      security: {
        session: `${USER_ROLE.CUSTOMER_ACCOUNT}`,
      },
    },
    handler: async (req, res) => {
      const { name, destinationDepartmentId, summary } = req.body

      const activeDepartment = req.activeDepartment
      if (!activeDepartment) {
        return res.status(400).send("No active department selected")
      }

      await ticketsService.sInsert({
        name,
        summary,
        senderDepartmentId: activeDepartment.id,
        destinationDepartmentId,
      })

      return res
        .header("HX-Trigger", "closeModal")
        .header("HX-Redirect", `/dashboard/tickets?tab=outgoing`)
        .status(204)
        .send()
    },
  })

  server.route({
    method: "POST",
    url: ROUTE.CLOSE,
    schema: schemas[ROUTE.CLOSE],
    config: {
      authenticated: true,
      security: {
        session: `${USER_ROLE.CUSTOMER_ACCOUNT} || ${USER_ROLE.STAFF_ACCOUNT}`,
      },
    },
    handler: async (req, res) => {
      const { ticketId } = req.body as { ticketId: number }

      const ticket = await ticketsService.get(ticketId)
      if (!ticket) {
        return res.status(404).send("Ticket not found")
      }

      await ticketsService.update(ticketId, { status: TICKET_STATUS.CLOSED })

      return res.view(
        <>
          <div id="ticket-drawer-status" hx-swap-oob="innerHTML">
            <span class="text-gray-500">#{ticketId}</span>
            <TicketStatusBadge status={TICKET_STATUS.CLOSED} />
          </div>
          <div id="ticket-drawer-footer" hx-swap-oob="delete" />
          <span id={`ticket-row-status-${ticketId}`} hx-swap-oob="innerHTML">
            <TicketStatusBadge status={TICKET_STATUS.CLOSED} />
          </span>
        </>
      )
    },
  })
})

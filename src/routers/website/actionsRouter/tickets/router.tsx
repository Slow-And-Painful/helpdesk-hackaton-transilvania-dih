import { createRouter } from "../../utils"
import { ROUTE } from "./types"
import { schemas } from "./schemas"
import USER_ROLE from "$types/USER_ROLES"
import { container } from "tsyringe"
import TicketsService from "$services/TicketsService"
import ChatMessagesService from "$services/ChatsMessagesService"
import { TICKET_STATUS } from "$types/tickets"
import TicketStatusBadge from "$templates/components/TicketStatusBadge"
import Toast from "$templates/components/Toast"

export const routerPrefix = "/tickets"

const ticketsService = container.resolve<TicketsService>(TicketsService.token)
const chatMessagesService = container.resolve<ChatMessagesService>(ChatMessagesService.token)

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
      const { name, destinationDepartmentId, summary, fromChatbot } = req.body
      let chatMessageId: number | undefined
      try {
        chatMessageId = req.body.chatMessageId ? parseInt(req.body.chatMessageId as string, 10) : undefined
      } catch {
        chatMessageId = undefined
      }

      const activeDepartment = req.activeDepartment
      if (!activeDepartment) {
        return res.status(400).send("No active department selected")
      }

      const ticket = await ticketsService.sInsert({
        name,
        summary,
        senderDepartmentId: activeDepartment.id,
        destinationDepartmentId,
      })

      if (fromChatbot === "1") {
        if (chatMessageId) {
          const msg = await chatMessagesService.get(chatMessageId)
          if (msg) {
            // Replace the CTA marker with a TICKET_CREATED marker so the link persists on refresh
            await chatMessagesService.update(chatMessageId, {
              response: msg.response
                .replace(/\s*\[CTA:CREATE_TICKET:[^\]]*\]/g, "")
                + `[TICKET_CREATED:${ticket.id}]`,
            })
          }
        }

        return res
          .headers({
            "HX-Trigger-After-Settle": JSON.stringify({ closeModal: { value: "create-ticket-modal" } }),
            "HX-Retarget": "#toast",
            "HX-Reswap": "beforeend",
          })
          .view(
            <>
              <Toast type="success" message="Tichetul a fost creat cu succes!" />
              {chatMessageId && (
                <button
                  id={`ticket-cta-${chatMessageId}`}
                  hx-swap-oob="outerHTML"
                  class="hd-chat__ticket-created"
                  type="button"
                  hx-get={`/partials/tickets/detail/${ticket.id}`}
                  hx-target="#drawer"
                  hx-swap="innerHTML"
                >
                  Tichet creat cu succes - vezi ticket
                </button>
              )}
            </>
          )
      }

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

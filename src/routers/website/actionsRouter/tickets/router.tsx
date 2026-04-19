import { createRouter } from "../../utils"
import { ROUTE } from "./types"
import { schemas } from "./schemas"
import USER_ROLE from "$types/USER_ROLES"
import { container } from "tsyringe"
import TicketsService from "$services/TicketsService"
import DepartmentUserService from "$services/DepartmentUsersService"
import ChatMessagesService from "$services/ChatsMessagesService"
import { TICKET_STATUS } from "$types/tickets"
import TicketStatusBadge from "$templates/components/TicketStatusBadge"
import Toast from "$templates/components/Toast"
import { and, eq } from "drizzle-orm"
import { departmentUsersTable } from "$dbSchemas/DepartmentUsers"
import { buildTicketDropdownOptions, ticketMenuCellId } from "$templates/components/tables/TicketsTable"
import Dropdown from "$templates/components/dropdown/Dropdown"
import DropdownTrigger from "$templates/components/dropdown/DropdownTrigger"
import Icon from "$templates/components/Icon"
import { TicketsViewTab } from "$templates/views/TicketsView"

export const routerPrefix = "/tickets"

const ticketsService = container.resolve<TicketsService>(TicketsService.token)
const departmentUserService = container.resolve<DepartmentUserService>(DepartmentUserService.token)
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

      const callerUser = req.callerUser
      let senderDepartmentUserId: number | undefined
      if (callerUser) {
        const deptUser = await departmentUserService.list({
          limit: 1,
          where: and(
            eq(departmentUsersTable.departmentId, activeDepartment.id),
            eq(departmentUsersTable.userId, callerUser.id),
          ),
        })
        senderDepartmentUserId = deptUser[0]?.id
      }

      const ticket = await ticketsService.sInsert({
        name,
        summary,
        senderDepartmentId: activeDepartment.id,
        senderDepartmentUserId,
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
      const { ticketId, tab } = req.body as { ticketId: number; tab?: TicketsViewTab }

      const ticket = await ticketsService.get(ticketId)
      if (!ticket) {
        return res.status(404).send("Ticket not found")
      }

      await ticketsService.update(ticketId, { status: TICKET_STATUS.CLOSED })

      const isDepartmentAdmin = req.activeDepartmentUserRole === "ADMIN"
      const dropdownId = `table-options-${ticketId}`
      const menuOptions = tab
        ? buildTicketDropdownOptions(ticketId, TICKET_STATUS.CLOSED, { isDepartmentAdmin, tab })
        : []

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
          {tab ? (
            <div id={ticketMenuCellId(ticketId)} hx-swap-oob="outerHTML">
              <DropdownTrigger dropdownId={dropdownId}>
                <div class="flex justify-center items-center cursor-pointer">
                  <Icon name="dots-vertical" size={20} class="text-grey-100" />
                </div>
              </DropdownTrigger>
              <Dropdown id={dropdownId} items={menuOptions} />
            </div>
          ) : null}
        </>
      )
    },
  })

  server.route({
    method: "POST",
    url: ROUTE.OPEN,
    schema: schemas[ROUTE.OPEN],
    config: {
      authenticated: true,
      security: {
        session: `${USER_ROLE.CUSTOMER_ACCOUNT} || ${USER_ROLE.STAFF_ACCOUNT}`,
      },
    },
    handler: async (req, res) => {
      const { ticketId, tab } = req.body as { ticketId: number; tab?: TicketsViewTab }

      const ticket = await ticketsService.get(ticketId)
      if (!ticket) {
        return res.status(404).send("Ticket not found")
      }

      await ticketsService.update(ticketId, { status: TICKET_STATUS.OPEN })

      const isDepartmentAdmin = req.activeDepartmentUserRole === "ADMIN"
      const dropdownId = `table-options-${ticketId}`
      const menuOptions = tab
        ? buildTicketDropdownOptions(ticketId, TICKET_STATUS.OPEN, { isDepartmentAdmin, tab })
        : []

      return res.view(
        <>
          <div id="ticket-drawer-status" hx-swap-oob="innerHTML">
            <span class="text-gray-500">#{ticketId}</span>
            <TicketStatusBadge status={TICKET_STATUS.OPEN} />
          </div>
          <span id={`ticket-row-status-${ticketId}`} hx-swap-oob="innerHTML">
            <TicketStatusBadge status={TICKET_STATUS.OPEN} />
          </span>
          {tab ? (
            <div id={ticketMenuCellId(ticketId)} hx-swap-oob="outerHTML">
              <DropdownTrigger dropdownId={dropdownId}>
                <div class="flex justify-center items-center cursor-pointer">
                  <Icon name="dots-vertical" size={20} class="text-grey-100" />
                </div>
              </DropdownTrigger>
              <Dropdown id={dropdownId} items={menuOptions} />
            </div>
          ) : null}
        </>
      )
    },
  })

  server.route({
    method: "POST",
    url: ROUTE.ASSIGN,
    schema: schemas[ROUTE.ASSIGN],
    config: {
      authenticated: true,
      security: {
        session: `${USER_ROLE.DEPARTMENT_ADMIN}`,
      },
    },
    handler: async (req, res) => {
      const { ticketId, assigneeId } = req.body as { ticketId: number; assigneeId?: number | null }

      const ticket = await ticketsService.get(ticketId)
      if (!ticket) {
        return res.status(404).send("Ticket not found")
      }

      if (assigneeId != null) {
        const assignee = await departmentUserService.get(assigneeId)
        if (!assignee || assignee.departmentId !== ticket.destinationDepartmentId) {
          return res.status(400).send("Assignee must be a member of the destination department")
        }
      }

      await ticketsService.update(ticketId, { assigneeId: assigneeId ?? null })

      let assigneeName: string | null = null
      if (assigneeId != null) {
        const deptUsers = await departmentUserService.list({
          where: eq(departmentUsersTable.id, assigneeId),
          mainQuery: async ({ db, ...opts }) =>
            db.query.departmentUsersTable.findMany({ ...opts, with: { user: true } }),
        })
        const deptUser = deptUsers[0] as typeof deptUsers[0] & { user?: { firstName: string; lastName: string; email: string } }
        if (deptUser?.user) {
          assigneeName = `${deptUser.user.firstName} ${deptUser.user.lastName}`.trim() || deptUser.user.email
        }
      }

      return res
        .headers({
          "HX-Trigger-After-Settle": JSON.stringify({ closeModal: { value: "assign-ticket-modal" } }),
          "HX-Retarget": "#toast",
          "HX-Reswap": "beforeend",
        })
        .view(
          <>
            <Toast type="success" message="Tichetul a fost asignat cu succes!" />
            <div id="ticket-drawer-assignee" hx-swap-oob="innerHTML">
              {assigneeName ?? <span class="text-gray-500">Neasignat</span>}
            </div>
            <span id={`ticket-row-assignee-${ticketId}`} hx-swap-oob="innerHTML">
              {assigneeName ?? <span class="text-gray-500">—</span>}
            </span>
          </>
        )
    },
  })
})

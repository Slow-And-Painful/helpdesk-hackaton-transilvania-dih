import { createRouter } from "../../utils"
import { ROUTE } from "./types"
import { schemas } from "./schemas"
import USER_ROLE from "$types/USER_ROLES"
import { container } from "tsyringe"
import TicketsService from "$services/TicketsService"
import DepartmentUserService from "$services/DepartmentUsersService"
import ChatMessagesService from "$services/ChatsMessagesService"
import TicketMessagesService from "$services/TicketMessagesService"
import TicketChatMessage from "$templates/components/tickets/TicketChatMessage"
import TicketChatForm from "$templates/components/tickets/TicketChatForm"
import { TICKET_STATUS, TICKET_PRIORITY } from "$types/tickets"
import TicketStatusBadge from "$templates/components/TicketStatusBadge"
import TicketPriorityBadge from "$templates/components/TicketPriorityBadge"
import Toast from "$templates/components/Toast"
import { and, eq, inArray } from "drizzle-orm"
import { departmentUsersTable } from "$dbSchemas/DepartmentUsers"
import SSEManagerComponent from "$components/SSEManagerComponent"
import { contentsToString } from "@kitajs/html"
import { buildTicketDropdownOptions, ticketMenuCellId } from "$templates/components/tables/TicketsTable"
import Dropdown from "$templates/components/dropdown/Dropdown"
import DropdownTrigger from "$templates/components/dropdown/DropdownTrigger"
import Icon from "$templates/components/Icon"
import { TicketsViewTab } from "$templates/views/TicketsView"
import GeminiComponent from "$components/GeminiComponent"
import TicketSummariesService from "$services/TicketSummariesService"
import { ticketMessagesTable } from "$dbSchemas/TicketMessages"
import { ticketSummariesTable } from "$dbSchemas/TicketSummaries"

export const routerPrefix = "/tickets"

const ticketsService = container.resolve<TicketsService>(TicketsService.token)
const departmentUserService = container.resolve<DepartmentUserService>(DepartmentUserService.token)
const chatMessagesService = container.resolve<ChatMessagesService>(ChatMessagesService.token)
const ticketMessagesService = container.resolve<TicketMessagesService>(TicketMessagesService.token)
const sseManager = container.resolve<SSEManagerComponent>(SSEManagerComponent.token)
const geminiComponent = container.resolve<GeminiComponent>(GeminiComponent.token)
const ticketSummariesService = container.resolve<TicketSummariesService>(TicketSummariesService.token)

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
      const priority = (req.body.priority as TICKET_PRIORITY | undefined) ?? TICKET_PRIORITY.MEDIE
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
        priority,
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

      // Fire-and-forget: summarize the ticket conversation for future AI context
      ;(async () => {
        try {
          const messages = await ticketMessagesService.list({
            where: eq(ticketMessagesTable.ticketId, ticketId),
          })

          const formattedMessages = messages.map(m => ({
            senderName: m.senderDepartmentUser?.user
              ? `${m.senderDepartmentUser.user.firstName} ${m.senderDepartmentUser.user.lastName}`.trim()
              : "Unknown",
            text: m.text ?? "",
          })).filter(m => m.text.length > 0)

          const { summary, inputTokens, outputTokens } = await geminiComponent.summarizeTicket({
            ticketName: ticket.name,
            ticketSummary: ticket.summary ?? null,
            messages: formattedMessages,
          })

          await ticketSummariesService.drizzle.insert(ticketSummariesTable).values({
            ticketId,
            senderDepartmentId: ticket.senderDepartmentId,
            summary,
            inputTokens,
            outputTokens,
          }).onConflictDoUpdate({
            target: ticketSummariesTable.ticketId,
            set: { summary, inputTokens, outputTokens, generatedAt: new Date() },
          })
        } catch (err) {
          console.error(`Failed to summarize ticket ${ticketId}:`, err)
        }
      })()

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
          <div id="ticket-chat-form" hx-swap-oob="outerHTML">
            <TicketChatForm ticketId={ticketId} disabled={true} />
          </div>
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

  server.route({
    method: "POST",
    url: ROUTE.SEND_MESSAGE,
    schema: schemas[ROUTE.SEND_MESSAGE],
    config: {
      authenticated: true,
      security: {
        session: `${USER_ROLE.CUSTOMER_ACCOUNT} || ${USER_ROLE.STAFF_ACCOUNT}`,
      },
    },
    handler: async (req, res) => {
      const { ticketId, text } = req.body as { ticketId: number; text: string }

      const callerUser = req.callerUser
      const activeDepartment = req.activeDepartment
      if (!callerUser || !activeDepartment) {
        return res.status(400).send("No active session")
      }

      const deptUsers = await departmentUserService.list({
        limit: 1,
        where: and(
          eq(departmentUsersTable.departmentId, activeDepartment.id),
          eq(departmentUsersTable.userId, callerUser.id),
        ),
        mainQuery: async ({ db, ...opts }) =>
          db.query.departmentUsersTable.findMany({ ...opts, with: { user: true } }),
      })

      const deptUser = deptUsers[0] as typeof deptUsers[0] & { user?: { firstName: string; lastName: string; email: string } }
      if (!deptUser) {
        return res.status(403).send("Not a member of the active department")
      }

      const message = await ticketMessagesService.sInsert({
        ticketId,
        text,
        senderDepartmentUserId: deptUser.id,
        sentAt: new Date(),
      })

      const fullMessage = await ticketMessagesService.get(message.id)
      if (!fullMessage) {
        return res.status(500).send("Message not found after insert")
      }

      const ticket = await ticketsService.get(ticketId)

      // Broadcast to all users in both departments so open drawers update live.
      // Each recipient sees the message as incoming; the sender already has it locally.
      if (ticket) {
        const allDeptUsers = await departmentUserService.list({
          where: inArray(departmentUsersTable.departmentId, [
            ticket.senderDepartmentId,
            ticket.destinationDepartmentId,
          ]),
        })

        const incomingHtml = await contentsToString([
          <TicketChatMessage message={fullMessage} isOutgoing={false} />,
        ])

        const broadcasts = allDeptUsers
          .filter((u) => u.userId !== callerUser.id)
          .map((u) =>
            sseManager.send(SSEManagerComponent.getUserRoomId(u.userId), {
              type: "TICKET_MESSAGE",
              ticketId,
              messageHtml: incomingHtml,
            }),
          )

        await Promise.all(broadcasts)
      }

      return res.view(
        <TicketChatMessage
          message={fullMessage}
          isOutgoing={true}
        />
      )
    }
  })

  server.route({
    method: "POST",
    url: ROUTE.CHANGE_PRIORITY,
    schema: schemas[ROUTE.CHANGE_PRIORITY],
    config: {
      authenticated: true,
      security: {
        session: `${USER_ROLE.CUSTOMER_ACCOUNT} || ${USER_ROLE.STAFF_ACCOUNT}`,
      },
    },
    handler: async (req, res) => {
      const { ticketId, priority } = req.body as { ticketId: number; priority: TICKET_PRIORITY }

      if (!Object.values(TICKET_PRIORITY).includes(priority)) {
        return res.status(400).send("Invalid priority value")
      }

      const ticket = await ticketsService.get(ticketId)
      if (!ticket) {
        return res.status(404).send("Ticket not found")
      }

      await ticketsService.update(ticketId, { priority })

      return res.view(
        <>
          <span id={`ticket-row-priority-${ticketId}`} hx-swap-oob="innerHTML">
            <TicketPriorityBadge priority={priority} />
          </span>
          <div id="ticket-drawer-priority" hx-swap-oob="innerHTML">
            <TicketPriorityBadge priority={priority} />
          </div>
        </>
      )
    },
  })
})

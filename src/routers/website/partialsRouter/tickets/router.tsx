import { createRouter } from "../../utils"
import { ROUTE } from "./types"
import { schemas } from "./schemas"
import USER_ROLE from "$types/USER_ROLES"
import CreateTicketModal from "$templates/components/tickets/CreateTicketModal"
import TicketDetailDrawer from "$templates/components/tickets/TicketDetailDrawer"
import AssignTicketModal from "$templates/components/tickets/AssignTicketModal"
import SenderUserModal from "$templates/components/tickets/SenderUserModal"
import DepartmentsService from "$services/DepartmentsService"
import TicketsService from "$services/TicketsService"
import DepartmentUserService from "$services/DepartmentUsersService"
import TicketMessagesService from "$services/TicketMessagesService"
import TicketChatMessage from "$templates/components/tickets/TicketChatMessage"
import { container } from "tsyringe"
import { eq } from "drizzle-orm"
import { departmentUsersTable } from "$dbSchemas/DepartmentUsers"
import { ticketMessagesTable } from "$dbSchemas/TicketMessages"

export const routerPrefix = "/tickets"

const departmentsService = container.resolve<DepartmentsService>(DepartmentsService.token)
const ticketsService = container.resolve<TicketsService>(TicketsService.token)
const departmentUserService = container.resolve<DepartmentUserService>(DepartmentUserService.token)
const ticketMessagesService = container.resolve<TicketMessagesService>(TicketMessagesService.token)

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
      const { departmentId, subject, summary, fromChatbot, chatMessageId } = req.query as { departmentId?: string; subject?: string; summary?: string; fromChatbot?: string; chatMessageId?: string }
      const preselectedDepartmentId = departmentId ? parseInt(departmentId, 10) : null

      return res
        .headers({
          "HX-Retarget": "#modal",
          "HX-Reswap": "beforeend",
        })
        .view(
          <CreateTicketModal
            departments={allDepartments}
            activeDepartmentId={req.activeDepartment?.id ?? null}
            preselectedDepartmentId={preselectedDepartmentId}
            prefillName={subject}
            prefillSummary={summary}
            fromChatbot={fromChatbot === "1"}
            chatMessageId={chatMessageId ? parseInt(chatMessageId, 10) : undefined}
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
        session: `${USER_ROLE.CUSTOMER_ACCOUNT} || ${USER_ROLE.STAFF_ACCOUNT}`,
      },
    },
    handler: async (req, res) => {
      const { ticketId } = req.params as { ticketId: number }
      const ticket = await ticketsService.get(ticketId)

      if (!ticket) {
        return res.status(404).send("Ticket not found")
      }

      const isDepartmentAdmin = req.activeDepartmentUserRole === "ADMIN"
      const isIncoming = ticket.destinationDepartmentId === req.activeDepartment?.id
      const tab = isIncoming ? "incoming" : "outgoing"

      const messages = await ticketMessagesService.list({
        where: eq(ticketMessagesTable.ticketId, ticketId),
      })

      return res
        .headers({
          "HX-Retarget": "#drawer",
          "HX-Reswap": "innerHTML",
        })
        .view(<TicketDetailDrawer ticket={ticket} isDepartmentAdmin={isDepartmentAdmin} isIncoming={isIncoming} tab={tab} messages={messages} currentUserId={req.callerUser?.id} />)
    },
  })

  server.route({
    method: "GET",
    url: ROUTE.ASSIGN_MODAL,
    schema: schemas[ROUTE.ASSIGN_MODAL],
    config: {
      authenticated: true,
      security: {
        session: `${USER_ROLE.DEPARTMENT_ADMIN}`,
      },
    },
    handler: async (req, res) => {
      const { ticketId } = req.params as { ticketId: number }

      const ticket = await ticketsService.get(ticketId)
      if (!ticket) {
        return res.status(404).send("Ticket not found")
      }

      const departmentUsers = await departmentUserService.list({
        where: eq(departmentUsersTable.departmentId, ticket.destinationDepartmentId),
        mainQuery: async ({ db, ...opts }) =>
          db.query.departmentUsersTable.findMany({ ...opts, with: { user: true } }),
      })

      return res
        .headers({
          "HX-Retarget": "#modal",
          "HX-Reswap": "beforeend",
        })
        .view(
          <AssignTicketModal
            ticketId={ticketId}
            currentAssigneeId={ticket.assigneeId}
            departmentUsers={departmentUsers as any}
          />
        )
    },
  })

  server.route({
    method: "GET",
    url: ROUTE.SENDER_USER_MODAL,
    schema: schemas[ROUTE.SENDER_USER_MODAL],
    config: {
      authenticated: true,
      security: {
        session: `${USER_ROLE.CUSTOMER_ACCOUNT} || ${USER_ROLE.STAFF_ACCOUNT}`,
      },
    },
    handler: async (req, res) => {
      const { ticketId } = req.params as { ticketId: number }

      const ticket = await ticketsService.get(ticketId)
      if (!ticket || !ticket.senderDepartmentUser) {
        return res.status(404).send("Sender user not found")
      }

      return res
        .headers({
          "HX-Retarget": "#modal",
          "HX-Reswap": "beforeend",
        })
        .view(
          <SenderUserModal
            senderDepartmentUser={ticket.senderDepartmentUser as any}
            departmentName={ticket.senderDepartment?.name}
            ticketId={ticket.id}
            ticketName={ticket.name}
          />
        )
    },
  })

  server.route({
    method: "GET",
    url: ROUTE.TICKET_MESSAGES,
    schema: schemas[ROUTE.TICKET_MESSAGES],
    config: {
      authenticated: true,
      security: {
        session: `${USER_ROLE.CUSTOMER_ACCOUNT} || ${USER_ROLE.STAFF_ACCOUNT}`,
      },
    },
    handler: async (req, res) => {
      const { ticketId } = req.params as { ticketId: number }
      const callerUser = req.callerUser

      const messages = await ticketMessagesService.list({
        where: eq(ticketMessagesTable.ticketId, ticketId),
      })

      return res.view(
        <>
          {messages.length === 0 ? (
            <div class="ticket-drawer__chat-empty" id="ticket-chat-empty">
              <div class="ticket-drawer__chat-empty-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              </div>
              <p class="ticket-drawer__chat-empty-title">Niciun mesaj încă</p>
              <p class="ticket-drawer__chat-empty-subtitle">
                Expeditorul și membrii departamentului destinatar pot schimba mesaje aici.
              </p>
            </div>
          ) : (
            <>
              {messages.map((msg) => (
                <TicketChatMessage
                  message={msg}
                  isOutgoing={msg.senderDepartmentUser?.userId === callerUser?.id}
                />
              ))}
            </>
          )}
        </>
      )
    },
  })
})

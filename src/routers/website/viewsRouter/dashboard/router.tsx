import { createRouter, getViewPath } from "../../utils"
import { ROUTE } from "./types"
import { schemas } from "./schemas"
import USER_ROLE from "$types/USER_ROLES"
import { DashboardLayout } from "$templates/layouts/DashboardLayout"
import ChatbotView from "$templates/views/ChatbotView"
import TicketsView from "$templates/views/TicketsView"
import UsersView from "$templates/views/UsersView"
import DepartmentSettingsView from "$templates/views/DepartmentSettingsView"
import DepartmentDocumentsView from "$templates/views/DepartmentDocumentsView"
import DocumentsTable, { documentsTableId } from "$templates/components/tables/DocumentsTable"
import TicketsTable, { ticketsTableId } from "$templates/components/tables/TicketsTable"
import UsersTable, { usersTableId } from "$templates/components/tables/UsersTable"
import { container } from "tsyringe"
import TicketsService from "$services/TicketsService"
import ChatMessagesService from "$services/ChatsMessagesService"
import UsersService from "$services/UsersService"
import { ticketsTable } from "$dbSchemas/Tickets"
import { chatMessagesTable } from "$dbSchemas/ChatMessages"
import { eq, inArray } from "drizzle-orm"
import DepartmentUserService from "$services/DepartmentUsersService"
import { departmentUsersTable } from "$dbSchemas/DepartmentUsers"
import { usersTable } from "$dbSchemas/Users"

export const routerPrefix = "/dashboard"

import RAGDocumentsService from "$services/RAGDocumentsService"
import { ragDocumentsTable } from "$dbSchemas/ragDocuments"

const ticketsService = container.resolve<TicketsService>(TicketsService.token)
const chatMessagesService = container.resolve<ChatMessagesService>(ChatMessagesService.token)
const usersService = container.resolve<UsersService>(UsersService.token)
const departmentUsersService = container.resolve<DepartmentUserService>(DepartmentUserService.token)
const ragDocumentsService = container.resolve<RAGDocumentsService>(RAGDocumentsService.token)

export const router = createRouter("dashboard", (server) => {
  server.route({
    url: ROUTE.HOME,
    method: "GET",
    schema: schemas[ROUTE.HOME],
    config: {
      security: {
        session: `${USER_ROLE.CUSTOMER_ACCOUNT}`,
      },
      authenticated: true,
    },
    handler: async (req, res) => {
      const { chat: chatUuid } = req.query as { chat?: string }
      const callerUser = req.callerUser
      const activeDep = req.activeDepartment
      const matchingDepUser = activeDep?.users.find(u => u.userId === callerUser.id)

      const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

      const ragDocuments = req.activeDepartment
        ? await ragDocumentsService.list({
            where: eq(ragDocumentsTable.departmentId, req.activeDepartment.id),
          })
        : []

      if (chatUuid && UUID_REGEX.test(chatUuid)) {
        const chat = req.userChats.find((c) => c.uuid === chatUuid)

        if (chat && chat.departmentUserId === matchingDepUser?.id) {
          const messages = await chatMessagesService.list({
            where: eq(chatMessagesTable.chatId, chat.id),
          })

          return res.view(
            <ChatbotView chatId={chatUuid} messages={messages} ragDocuments={ragDocuments} />,
            DashboardLayout,
            { activeChatUuid: chatUuid }
          )
        }
      }

      return res.headers({
        "HX-Push-Url": getViewPath("dashboard", "HOME")
      }).view(
        <ChatbotView ragDocuments={ragDocuments} />,
        DashboardLayout,
      )
    },
  })

  server.route({
    url: ROUTE.TICKETS,
    method: "GET",
    schema: schemas[ROUTE.TICKETS],
    config: {
      security: {
        session: `${USER_ROLE.CUSTOMER_ACCOUNT}`,
      },
      authenticated: true,
    },
    handler: async (req, res) => {
      const activeDepartment = req.activeDepartment
      const { tab: tabParam, ticketId: ticketIdParam, ...query } = req.query as Record<string, string>
      const openTicketId = ticketIdParam ? parseInt(ticketIdParam, 10) : undefined
      const tab = tabParam === "outgoing" ? "outgoing" : "incoming"
      const baseUrl = getViewPath("dashboard", "TICKETS")

      if (!activeDepartment) {
        return res.view(
          <TicketsView
            items={[]}
            activeDepartment={null}
            tab={tab}
            baseUrl={baseUrl}
          />,
          DashboardLayout
        )
      }

      const departmentFilter = tab === "incoming"
        ? eq(ticketsTable.destinationDepartmentId, activeDepartment.id)
        : eq(ticketsTable.senderDepartmentId, activeDepartment.id)

      const { items, pagination } = await ticketsService.getTableItems(
        query,
        departmentFilter
      )

      const tableOnly = req.headers["hx-template"] === "table"

      if (tableOnly) {
        return res
          .headers({
            "HX-Reswap": "outerHTML",
            "HX-Retarget": `#${ticketsTableId}`,
            "HX-Push-Url": `${baseUrl}?tab=${tab}${pagination.baseUrl ? `&${pagination.baseUrl}&page=${pagination.page}` : `&page=${pagination.page}`}`,
          })
          .view(
            <TicketsTable
              items={items}
              pagination={pagination}
              tab={tab}
              baseUrl={baseUrl}
              activeDepartment={activeDepartment}
            />
          )
      }

      return res.view(
        <TicketsView
          items={items}
          pagination={pagination}
          activeDepartment={activeDepartment}
          tab={tab}
          baseUrl={baseUrl}
          openTicketId={openTicketId}
        />,
        DashboardLayout
      )
    },
  })

  server.route({
    url: ROUTE.USERS,
    method: "GET",
    schema: schemas[ROUTE.USERS],
    config: {
      security: {
        session: `${USER_ROLE.DEPARTMENT_ADMIN}`,
      },
      authenticated: true,
    },
    handler: async (req, res) => {
      const query = req.query as Record<string, string>
      const baseUrl = getViewPath("dashboard", "USERS")

      const activeDepartment = req.activeDepartment

      if (!activeDepartment) {
        return res.status(404).send()
      }

      const departmentUsers = await departmentUsersService.list({
        where: eq(departmentUsersTable.departmentId, activeDepartment.id)
      })

      const userIds = departmentUsers.map((du) => du.userId)

      const { items, pagination } = await usersService.getTableItems(query, inArray(usersTable.id, userIds))

      const tableOnly = req.headers["hx-template"] === "table"

      if (tableOnly) {
        return res
          .headers({
            "HX-Reswap": "outerHTML",
            "HX-Retarget": `#${usersTableId}`,
            "HX-Push-Url": `${baseUrl}${pagination.baseUrl ? `?${pagination.baseUrl}&page=${pagination.page}` : `?page=${pagination.page}`}`,
          })
          .view(
            <UsersTable
              items={items}
              pagination={pagination}
              baseUrl={baseUrl}
            />
          )
      }

      return res.view(
        <UsersView
          items={items}
          pagination={pagination}
          baseUrl={baseUrl}
          activeDepartment={activeDepartment}
        />,
        DashboardLayout
      )
    },
  })

  server.route({
    url: ROUTE.DEPARTMENT,
    method: "GET",
    schema: schemas[ROUTE.DEPARTMENT],
    config: {
      security: {
        session: `${USER_ROLE.DEPARTMENT_ADMIN}`,
      },
      authenticated: true,
    },
    handler: (req, res) => {
      const { tab: tabParam } = req.query as Record<string, string>
      const tab = tabParam === "ai-settings" ? "ai-settings" : "general"
      const baseUrl = getViewPath("dashboard", "DEPARTMENT")

      return res.view(
        <DepartmentSettingsView
          activeDepartment={req.activeDepartment}
          tab={tab}
          baseUrl={baseUrl}
        />,
        DashboardLayout
      )
    },
  })

  server.route({
    url: ROUTE.DOCUMENTS,
    method: "GET",
    schema: schemas[ROUTE.DOCUMENTS],
    config: {
      security: {
        session: `${USER_ROLE.DEPARTMENT_ADMIN}`,
      },
      authenticated: true,
    },
    handler: async (req, res) => {
      const query = req.query as Record<string, string>
      const baseUrl = getViewPath("dashboard", "DOCUMENTS")

      const additionalWhere = req.activeDepartment
        ? eq(ragDocumentsTable.departmentId, req.activeDepartment.id)
        : undefined

      const { items, pagination } = await ragDocumentsService.getTableItems(query, additionalWhere)

      const tableOnly = req.headers["hx-template"] === "table"

      if (tableOnly) {
        return res
          .headers({
            "HX-Reswap": "outerHTML",
            "HX-Retarget": `#${documentsTableId}`,
            "HX-Push-Url": `${baseUrl}${pagination.baseUrl ? `?${pagination.baseUrl}&page=${pagination.page}` : `?page=${pagination.page}`}`,
          })
          .view(<DocumentsTable items={items} pagination={pagination} baseUrl={baseUrl} />)
      }

      return res.view(
        <DepartmentDocumentsView
          activeDepartment={req.activeDepartment}
          items={items}
          pagination={pagination}
          baseUrl={baseUrl}
        />,
        DashboardLayout
      )
    },
  })
})
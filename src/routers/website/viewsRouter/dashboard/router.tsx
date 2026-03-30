import { createRouter, getViewPath } from "../../utils"
import { ROUTE } from "./types"
import { schemas } from "./schemas"
import USER_ROLE from "$types/USER_ROLES"
import { DashboardLayout } from "$templates/layouts/DashboardLayout"
import ChatbotView from "$templates/views/ChatbotView"
import TicketsView from "$templates/views/TicketsView"
import DepartmentUsersView from "$templates/views/DepartmentUsersView"
import DepartmentSettingsView from "$templates/views/DepartmentSettingsView"
import DepartmentDocumentsView from "$templates/views/DepartmentDocumentsView"
import TicketsTable, { ticketsTableId } from "$templates/components/tables/TicketsTable"
import { container } from "tsyringe"
import TicketsService from "$services/TicketsService"
import ChatsService from "$services/ChatsService"
import ChatMessagesService from "$services/ChatsMessagesService"
import { ticketsTable } from "$dbSchemas/Tickets"
import { chatsTable } from "$dbSchemas/Chats"
import { chatMessagesTable } from "$dbSchemas/ChatMessages"
import { eq } from "drizzle-orm"

export const routerPrefix = "/dashboard"

const ticketsService = container.resolve<TicketsService>(TicketsService.token)
const chatsService = container.resolve<ChatsService>(ChatsService.token)
const chatMessagesService = container.resolve<ChatMessagesService>(ChatMessagesService.token)

export const router = createRouter("dashboard", (server) => {
  server.route({
    url: ROUTE.HOME,
    method: "GET",
    schema: schemas[ROUTE.HOME],
    config: {
      security: {
        session: `${USER_ROLE.CUSTOMER_ACCOUNT}`
      },
      authenticated: true
    },
    handler: async (req, res) => {
      const { chat: chatUuid } = req.query as { chat?: string }

      const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

      if (chatUuid && UUID_REGEX.test(chatUuid)) {
        const chats = await chatsService.list({
          limit: 1,
          where: eq(chatsTable.uuid, chatUuid),
        })
        const chat = chats[0]

        if (chat) {
          const messages = await chatMessagesService.list({
            where: eq(chatMessagesTable.chatId, chat.id),
          })
          return res.view(
            <ChatbotView chatId={chatUuid} messages={messages} />,
            DashboardLayout
          )
        }
      }

      return res.view(
        <ChatbotView />,
        DashboardLayout
      )
    }
  })

  server.route({
    url: ROUTE.TICKETS,
    method: "GET",
    schema: schemas[ROUTE.TICKETS],
    config: {
      security: {
        session: `${USER_ROLE.CUSTOMER_ACCOUNT}`
      },
      authenticated: true
    },
    handler: async (req, res) => {
      const activeDepartment = req.activeDepartment
      const { tab: tabParam, ...query } = req.query as Record<string, string>
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
        />,
        DashboardLayout
      )
    }
  })

  server.route({
    url: ROUTE.USERS,
    method: "GET",
    schema: schemas[ROUTE.USERS],
    config: {
      security: {
        session: `${USER_ROLE.DEPARTMENT_ADMIN}`
      },
      authenticated: true
    },
    handler: (req, res) => {
      return res.view(
        <DepartmentUsersView activeDepartment={req.activeDepartment} />,
        DashboardLayout
      )
    }
  })

  server.route({
    url: ROUTE.DEPARTMENT,
    method: "GET",
    schema: schemas[ROUTE.DEPARTMENT],
    config: {
      security: {
        session: `${USER_ROLE.DEPARTMENT_ADMIN}`
      },
      authenticated: true
    },
    handler: (req, res) => {
      return res.view(
        <DepartmentSettingsView activeDepartment={req.activeDepartment} />,
        DashboardLayout
      )
    }
  })

  server.route({
    url: ROUTE.DOCUMENTS,
    method: "GET",
    schema: schemas[ROUTE.DOCUMENTS],
    config: {
      security: {
        session: `${USER_ROLE.DEPARTMENT_ADMIN}`
      },
      authenticated: true
    },
    handler: (req, res) => {
      return res.view(
        <DepartmentDocumentsView activeDepartment={req.activeDepartment} />,
        DashboardLayout
      )
    }
  })
})

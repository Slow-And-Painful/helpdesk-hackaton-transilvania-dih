import { createRouter, getViewPath } from "../../utils"
import { ROUTE } from "./types"
import { schemas } from "./schemas"
import USER_ROLE from "$types/USER_ROLES"
import { DashboardLayout } from "$templates/layouts/DashboardLayout"
import ChatbotView from "$templates/views/ChatbotView"
import TicketsView, { ticketsTableId } from "$templates/views/TicketsView"
import TicketsTable from "$templates/views/TicketsTable"
import { container } from "tsyringe"
import TicketsService from "$services/TicketsService"
import { ticketsTable } from "$dbSchemas/Tickets"
import { eq } from "drizzle-orm"

export const routerPrefix = "/dashboard"

const ticketsService = container.resolve<TicketsService>(TicketsService.token)

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
    handler: (_req, res) => {
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
            pagination={{ page: 1, totalPages: 0, totalItems: 0, itemsPerPage: 10, filters: {}, baseUrl: "" }}
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
})

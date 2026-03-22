import { createRouter } from "../../utils"
import { ROUTE } from "./types"
import { schemas } from "./schemas"
import USER_ROLE from "$types/USER_ROLES"
import { DashboardLayout } from "$templates/layouts/DashboardLayout"
import ChatbotView from "$templates/views/ChatbotView"
import TicketsView from "$templates/views/TicketsView"

export const routerPrefix = "/dashboard"

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
    handler: (req, res) => {
      const allTickets = req.userTickets || []
      const activeDeptId = req.activeDepartment?.id

      const incomingTickets = activeDeptId
        ? allTickets.filter(t => t.destinationDepartmentId === activeDeptId)
        : []
      const outgoingTickets = activeDeptId
        ? allTickets.filter(t => t.senderDepartmentId === activeDeptId)
        : []

      return res.view(
        <TicketsView
          incomingTickets={incomingTickets}
          outgoingTickets={outgoingTickets}
          activeDepartment={req.activeDepartment}
        />,
        DashboardLayout
      )
    }
  })
})

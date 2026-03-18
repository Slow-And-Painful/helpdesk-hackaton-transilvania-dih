import { createRouter, getViewPath } from "../../utils"
import { ROUTE } from "./types"
import { schemas } from "./schemas"
import USER_ROLE from "$types/USER_ROLES"
import { DashboardLayout } from "$templates/layouts/DashboardLayout"
import ChatbotView from "$templates/views/ChatbotView"

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
})

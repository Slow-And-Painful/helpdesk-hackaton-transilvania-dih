import { createRouter } from "../../utils"
import { ROUTE } from "./types"
import { schemas } from "./schemas"
import USER_ROLE from "$types/USER_ROLES"
import DashboardHomepage from "$templates/views/DashboardHomepage"
import { DashboardLayout } from "$templates/layouts/DashboardLayout"

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
      return res.view(<DashboardHomepage/>, DashboardLayout)
    }
  })
})

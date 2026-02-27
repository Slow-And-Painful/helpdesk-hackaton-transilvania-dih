import { createRouter, getViewPath } from "../../utils"
import { ROUTE } from "./types"
import { schemas } from "./schemas"
import USER_ROLE from "$types/USER_ROLES"
// import { DashboardLayout } from "$templates/layouts/DashboardLayout"
// import DashboardHomepage from "$templates/views/DashboardHomepage"

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
      return res.redirect(getViewPath("projects", "LISTING"))
    }
  })
})

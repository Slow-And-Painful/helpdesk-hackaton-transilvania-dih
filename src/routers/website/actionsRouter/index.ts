import { FastifyPluginCallback } from "fastify"
import { registerActionsRouter } from "../utils"
import { authActionsRouterPrefix, authActionsRouter } from "./auth/index"
import { departmentsActionsRouter, departmentsActionsRouterPrefix } from "./departments/index"
import { ticketsActionsRouter, ticketsActionsRouterPrefix } from "./tickets/index"

export const routerPrefix = "/actions"

const router: FastifyPluginCallback = (server, _, done) => {
  registerActionsRouter(server, authActionsRouter, authActionsRouterPrefix)
  registerActionsRouter(server, departmentsActionsRouter, departmentsActionsRouterPrefix)
  registerActionsRouter(server, ticketsActionsRouter, ticketsActionsRouterPrefix)

  return done()
}

export { router as actionsRouter, routerPrefix as actionsRouterPrefix }

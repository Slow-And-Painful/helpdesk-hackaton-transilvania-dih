import { FastifyPluginCallback } from "fastify"
import { registerActionsRouter } from "../utils"
import { authActionsRouterPrefix, authActionsRouter } from "./auth/index"
import { departmentsActionsRouter, departmentsActionsRouterPrefix } from "./departments/index"
import { ticketsActionsRouter, ticketsActionsRouterPrefix } from "./tickets/index"
import { chatbotActionsRouter, chatbotActionsRouterPrefix } from "./chatbot/index"
import { usersActionsRouter, usersActionsRouterPrefix } from "./users/index"

export const routerPrefix = "/actions"

const router: FastifyPluginCallback = (server, _, done) => {
  registerActionsRouter(server, authActionsRouter, authActionsRouterPrefix)
  registerActionsRouter(server, departmentsActionsRouter, departmentsActionsRouterPrefix)
  registerActionsRouter(server, ticketsActionsRouter, ticketsActionsRouterPrefix)
  registerActionsRouter(server, chatbotActionsRouter, chatbotActionsRouterPrefix)
  registerActionsRouter(server, usersActionsRouter, usersActionsRouterPrefix)

  return done()
}

export { router as actionsRouter, routerPrefix as actionsRouterPrefix }
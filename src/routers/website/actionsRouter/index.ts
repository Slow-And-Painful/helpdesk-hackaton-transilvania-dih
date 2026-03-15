import { FastifyPluginCallback } from "fastify"
import { registerActionsRouter } from "../utils"
import { authActionsRouterPrefix, authActionsRouter } from "./auth/index"

export const routerPrefix = "/actions"

const router: FastifyPluginCallback = (server, _, done) => {
  registerActionsRouter(server, authActionsRouter, authActionsRouterPrefix)

  return done()
}

export { router as actionsRouter, routerPrefix as actionsRouterPrefix }

import { FastifyPluginCallback } from "fastify"
import { registerActionsRouter } from "../utils"
import { authActionsRouterPrefix, authActionsRouter } from "./auth/index"
import { projectsActionsRouter, projectsActionsRouterPrefix } from "./projects"

export const routerPrefix = "/actions"

const router: FastifyPluginCallback = (server, _, done) => {
  registerActionsRouter(server, authActionsRouter, authActionsRouterPrefix)
  registerActionsRouter(server, projectsActionsRouter, projectsActionsRouterPrefix)

  return done()
}

export { router as actionsRouter, routerPrefix as actionsRouterPrefix }

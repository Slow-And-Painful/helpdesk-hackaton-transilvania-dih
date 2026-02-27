import { FastifyPluginCallback } from "fastify"
import { registerViewsRouter } from "../utils"

import { publicRouter } from "./public/index"
import { authRouter } from "./auth/index"
import { dashboardRouter, dashboardViewsRouterPrefix } from "./dashboard"
import { projectsRouter, projectsViewsRouterPrefix } from "./projects"

const routerPrefix = ""

const router: FastifyPluginCallback = (server, _, done) => {
  registerViewsRouter(server, publicRouter)
  registerViewsRouter(server, authRouter)
  registerViewsRouter(server, dashboardRouter, dashboardViewsRouterPrefix)
  registerViewsRouter(server, projectsRouter, projectsViewsRouterPrefix)

  return done()
}

export { router as viewsRouter, routerPrefix as viewsRouterPrefix }

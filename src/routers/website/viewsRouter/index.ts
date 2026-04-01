import { FastifyPluginCallback } from "fastify"
import { registerViewsRouter } from "../utils"

import { publicRouter } from "./public/index"
import { authRouter } from "./auth/index"
import { dashboardRouter, dashboardViewsRouterPrefix } from "./dashboard"
import { waitingRoomRouter } from "./waitingRoom"
import { staffRouter, staffViewsRouterPrefix } from "./staff"

const routerPrefix = ""

const router: FastifyPluginCallback = (server, _, done) => {
  registerViewsRouter(server, publicRouter)
  registerViewsRouter(server, authRouter)
  registerViewsRouter(server, waitingRoomRouter)
  registerViewsRouter(server, dashboardRouter, dashboardViewsRouterPrefix)
  registerViewsRouter(server, staffRouter, staffViewsRouterPrefix)

  return done()
}

export { router as viewsRouter, routerPrefix as viewsRouterPrefix }

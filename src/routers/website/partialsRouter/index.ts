import { FastifyPluginCallback } from "fastify"
import { registerPartialsRouter } from "../utils"

import { commonPartialsRouterPrefix, commonRouter } from "./common"
import { authPartialsRouterPrefix, authRouter } from "./auth"
import { usersPartialsRouter, usersPartialsRouterPrefix } from "./users"

const routerPrefix = "/partials"

const router: FastifyPluginCallback = (server, _, done) => {
  registerPartialsRouter(server, commonRouter, commonPartialsRouterPrefix)
  registerPartialsRouter(server, authRouter, authPartialsRouterPrefix)
  registerPartialsRouter(server, usersPartialsRouter, usersPartialsRouterPrefix)

  return done()
}

export { router as partialsRouter, routerPrefix as partialsRouterPrefix }

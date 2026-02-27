import { FastifyPluginCallback } from "fastify"

// common
import utilityLogin from "./routes/utility-login"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Options = { [key: string]: any }

const router: FastifyPluginCallback<Options> = (server, _, done) => {
  const routes = [utilityLogin]

  // register routes
  routes.forEach((route) => route(server))

  return done()
}

export default router

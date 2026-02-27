import { FastifyPluginCallback } from "fastify"

// common
import health from "./health"
import docs from "./docs"
import schema from "./schema"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Options = { [key: string]: any }

const router: FastifyPluginCallback<Options> = (server, _, done) => {
  const routes = [health, docs, schema]

  // register routes
  routes.forEach((route) => route(server))

  return done()
}

export default router

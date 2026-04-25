import { FastifySchema } from "fastify"
import { ROUTE } from "./types"

export const schemas = {
  [ROUTE.CREATE_USER_MODAL]: {} as const satisfies FastifySchema,
  [ROUTE.USER_DETAIL]: {} as const satisfies FastifySchema,
}

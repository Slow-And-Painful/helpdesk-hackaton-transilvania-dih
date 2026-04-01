import { FastifySchema } from "fastify"
import { ROUTE } from "./types"

export const schemas = {
  [ROUTE.DEPARTMENT_SWITCHER]: {} as const satisfies FastifySchema,
  [ROUTE.CREATE_DEPARTMENT_MODAL]: {} as const satisfies FastifySchema,
}

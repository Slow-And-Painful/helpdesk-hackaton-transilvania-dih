import { Type } from "@fastify/type-provider-typebox"
import { ROUTE } from "./types"

export const schemas = {
  [ROUTE.LISTING]: {
    querystring: Type.Object({})
  }
}

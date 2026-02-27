import { ROUTE } from "./types"
import { Type } from "@fastify/type-provider-typebox"

export const schemas = {
  [ROUTE.CREATE]: {
    body: Type.Object({
      name: Type.String(),
      description: Type.Optional(Type.String())
    })
  }
}

import { FastifySchema } from "fastify"
import { ROUTE } from "./types"
import { Type } from "@fastify/type-provider-typebox"

export const schemas = {
  [ROUTE.HOME]: {},
  [ROUTE.CONTACT]: {},
}

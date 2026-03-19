import { FastifySchema } from "fastify"
import { ROUTE } from "./types"

export const schemas = {
  [ROUTE.SWITCH]: {
    body: {
      type: "object",
      properties: {
        departmentId: { type: "integer" },
      },
      required: ["departmentId"],
    },
  } as const satisfies FastifySchema,
}

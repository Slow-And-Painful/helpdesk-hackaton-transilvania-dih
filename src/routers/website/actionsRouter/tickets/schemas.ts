import { FastifySchema } from "fastify"
import { ROUTE } from "./types"

export const schemas = {
  [ROUTE.CREATE]: {
    body: {
      type: "object",
      properties: {
        name: { type: "string", minLength: 1, maxLength: 255 },
        destinationDepartmentId: { type: "integer" },
      },
      required: ["name", "destinationDepartmentId"],
    },
  } as const satisfies FastifySchema,
}

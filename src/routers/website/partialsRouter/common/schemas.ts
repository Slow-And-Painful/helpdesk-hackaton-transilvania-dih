import { FastifySchema } from "fastify"
import { ROUTE } from "./types"

export const schemas = {
  [ROUTE.TOAST]: {
    body: {
      type: "object",
      properties: {
        title: { type: "string" },
        message: { type: "string" },
        type: { type: "string", enum: ["info", "success", "warning", "error"] },
      },
      required: ["message", "type"],
    },
  } as const satisfies FastifySchema,
}

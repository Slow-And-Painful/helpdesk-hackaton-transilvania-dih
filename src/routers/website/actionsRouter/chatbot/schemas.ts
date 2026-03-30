import { FastifySchema } from "fastify"
import { ROUTE } from "./types"

export const schemas = {
  [ROUTE.SEND_MESSAGE]: {
    body: {
      type: "object",
      properties: {
        message: { type: "string", minLength: 1, maxLength: 4000 },
      },
      required: ["message"],
    },
  } as const satisfies FastifySchema,
}

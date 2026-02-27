import { FastifySchema } from "fastify"
import { ROUTE } from "./types"

export const schemas = {
  [ROUTE.RESET_PASSWORD_THROTTLING_BUTTON]: {
    body: {
      type: "object",
      properties: {
        seconds: { type: "string" },
      },
      required: ["seconds"],
    },
  } as const satisfies FastifySchema,
  [ROUTE.DELETE_ACCOUNT_MODAL]: {
    params: {
      type: "object",
      properties: {
        targetUserId: { type: "number" }
      },
      additionalProperties: false,
      required: ["targetUserId"]
    }
  } as const satisfies FastifySchema,
}

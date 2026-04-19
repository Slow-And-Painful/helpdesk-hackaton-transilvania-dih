import { FastifySchema } from "fastify"
import { ROUTE } from "./types"

export const schemas = {
  [ROUTE.CREATE]: {
    body: {
      type: "object",
      properties: {
        name: { type: "string", minLength: 1, maxLength: 255 },
        destinationDepartmentId: { type: "integer" },
        summary: { type: "string" },
        fromChatbot: { type: "string" },
        chatMessageId: { type: "string" },
      },
      required: ["name", "destinationDepartmentId"],
    },
  } as const satisfies FastifySchema,
  [ROUTE.CLOSE]: {
    body: {
      type: "object",
      properties: {
        ticketId: { type: "integer" },
      },
      required: ["ticketId"],
    },
  } as const satisfies FastifySchema,
}

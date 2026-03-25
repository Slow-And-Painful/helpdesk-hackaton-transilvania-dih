import { FastifySchema } from "fastify"
import { ROUTE } from "./types"

export const schemas = {
  [ROUTE.CREATE_TICKET_MODAL]: {} as const satisfies FastifySchema,
  [ROUTE.TICKET_DETAIL]: {
    params: {
      type: "object",
      properties: {
        ticketId: { type: "integer" },
      },
      required: ["ticketId"],
    },
  } as const satisfies FastifySchema,
}

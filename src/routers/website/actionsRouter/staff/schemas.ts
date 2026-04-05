import { FastifySchema } from "fastify"
import { ROUTE } from "./types"

export const schemas = {
  [ROUTE.UPDATE_SYSTEM_PROMPT]: {
    body: {
      type: "object",
      properties: {
        systemPrompt: { type: "string" },
      },
      required: ["systemPrompt"],
    },
  } as const satisfies FastifySchema,
}
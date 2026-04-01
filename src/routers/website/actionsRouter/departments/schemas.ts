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
  
  [ROUTE.UPDATE_PROMPT]: {
    body: {
      type: "object",
      properties: {
        departmentId: { type: "integer" },
        systemPrompt: { type: "string" },
      },
      required: ["departmentId"],
    },
  } as const satisfies FastifySchema,

  [ROUTE.UPDATE_GENERAL]: {
    body: {
      type: "object",
      properties: {
        departmentId: { type: "integer" },
        name: { type: "string", minLength: 1, maxLength: 255 },
      },
      required: ["departmentId", "name"],
    },
  } as const satisfies FastifySchema,

  [ROUTE.CREATE]: {
    body: {
      type: "object",
      properties: {
        name: { type: "string", minLength: 1, maxLength: 255 },
      },
      required: ["name"],
    },
  } as const satisfies FastifySchema,
}
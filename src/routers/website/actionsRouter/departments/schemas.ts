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

  [ROUTE.UPDATE_DOCUMENT]: {
    body: {
      type: "object",
      properties: {
        documentId: { type: "integer" },
        name: { type: "string", minLength: 1, maxLength: 255 },
        aiDescription: { type: "string" },
        extractedText: { type: "string" },
      },
      required: ["documentId", "name"],
    },
  } as const satisfies FastifySchema,

  [ROUTE.EXTRACT_DOCUMENT_TEXT]: {
    body: {
      type: "object",
      properties: {
        documentId: { type: "integer" },
      },
      required: ["documentId"],
    },
  } as const satisfies FastifySchema,

  [ROUTE.UPLOAD_DOCUMENT]: {
    body: {
      type: "object",
      properties: {
        documentKey: { type: "string" },
        documentType: { type: "string" },
        name: { type: "string", minLength: 1, maxLength: 255 },
        aiDescription: { type: "string" },
      },
      required: ["documentKey", "documentType", "name"],
    },
  } as const satisfies FastifySchema,
}
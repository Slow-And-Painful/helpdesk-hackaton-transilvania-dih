import { FastifySchema } from "fastify"
import { ROUTE } from "./types"

export const schemas = {
  [ROUTE.DEPARTMENT_SWITCHER]: {} as const satisfies FastifySchema,
  [ROUTE.CREATE_DEPARTMENT_MODAL]: {} as const satisfies FastifySchema,
  [ROUTE.UPLOAD_DOCUMENT_MODAL]: {} as const satisfies FastifySchema,
  [ROUTE.DOCUMENT_DETAIL]: {
    params: {
      type: "object",
      properties: {
        documentId: { type: "integer" },
      },
      required: ["documentId"],
    },
  } as const satisfies FastifySchema,
  [ROUTE.GET_UPLOAD_DOCUMENT_PRESIGNED_URL]: {
    body: {
      type: "object",
      properties: {
        key: { type: "string" },
      },
      required: ["key"],
    },
  } as const satisfies FastifySchema,
}

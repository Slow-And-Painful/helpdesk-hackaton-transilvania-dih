import { FastifySchema } from "fastify"
import { ROUTE } from "./types"

export const schemas = {
  [ROUTE.DEPARTMENT_SWITCHER]: {} as const satisfies FastifySchema,
  [ROUTE.CREATE_DEPARTMENT_MODAL]: {} as const satisfies FastifySchema,
  [ROUTE.UPLOAD_DOCUMENT_MODAL]: {
    querystring: {
      type: "object",
      properties: {
        folderId: { type: "integer" },
      },
    },
  } as const satisfies FastifySchema,
  [ROUTE.DOCUMENT_DETAIL]: {
    params: {
      type: "object",
      properties: {
        documentId: { type: "integer" },
      },
      required: ["documentId"],
    },
  } as const satisfies FastifySchema,
  [ROUTE.DOCUMENT_FORM]: {
    params: {
      type: "object",
      properties: {
        documentId: { type: "integer" },
      },
      required: ["documentId"],
    },
  } as const satisfies FastifySchema,
  [ROUTE.DOCUMENT_DOWNLOAD]: {
    params: {
      type: "object",
      properties: {
        documentId: { type: "integer" },
      },
      required: ["documentId"],
    },
  } as const satisfies FastifySchema,
  [ROUTE.CREATE_FOLDER_MODAL]: {
    querystring: {
      type: "object",
      properties: {
        parentFolderId: { type: "integer" },
      },
      required: ["parentFolderId"],
    },
  } as const satisfies FastifySchema,
  [ROUTE.FOLDER_CONTENTS]: {
    params: {
      type: "object",
      properties: {
        folderId: { type: "integer" },
      },
      required: ["folderId"],
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

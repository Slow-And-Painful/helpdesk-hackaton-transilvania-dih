import { FastifySchema } from "fastify"
import { ROUTE } from "./types"

export const schemas = {
  [ROUTE.CREATE]: {
    body: {
      type: "object",
      properties: {
        firstName: { type: "string", minLength: 1, maxLength: 255 },
        lastName: { type: "string", minLength: 1, maxLength: 255 },
        email: { type: "string", minLength: 1, maxLength: 255 },
        departmentId: { type: "string" },
      },
      required: ["firstName", "lastName", "email"],
    },
  } as const satisfies FastifySchema,
}

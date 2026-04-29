import { ROUTE } from "./types"
import { Type } from "@fastify/type-provider-typebox"

export const schemas = {
  [ROUTE.SUBMIT]: {
    body: Type.Object({
      firstName: Type.String({ minLength: 1 }),
      lastName: Type.String({ minLength: 1 }),
      numeInstitutie: Type.String({ minLength: 1 }),
      email: Type.String({ format: "email" }),
    }),
  },
}

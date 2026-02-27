import { ROUTE } from "./types"
import { Type } from "@fastify/type-provider-typebox"

export const schemas = {
  [ROUTE.SIGNUP]: {
    body: Type.Object({
      firstName: Type.String(),
      lastName: Type.String(),
      email: Type.String({ format: "email" })
    })
  },
  [ROUTE.REQUEST_LOGIN_CODE]: {
    body: Type.Object({
      email: Type.String({ format: "email" })
    })
  }
}

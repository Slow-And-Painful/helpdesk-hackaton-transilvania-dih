import { Type } from "typebox"
import { ROUTE } from "./types"

export const schemas = {
  [ROUTE.LOGIN]: {},
  [ROUTE.SIGNUP]: {},
  [ROUTE.VERIFY_LOGIN_CODE]: {
    querystring: Type.Object({
      code: Type.Optional(Type.String())
    })
  },
  [ROUTE.VERIFY_EMAIL]: {
    querystring: Type.Object({
      code: Type.Optional(Type.String())
    })
  },
  [ROUTE.LOGOUT]: {}
}

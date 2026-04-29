import { ROUTE } from "./types"

export const schemas = {
  [ROUTE.DEPARTMENTS]: {},
  [ROUTE.DEPARTMENT_SETTINGS]: {},
  [ROUTE.USERS]: {
    querystring: {
      type: "object",
      properties: {
        tab: { type: "string", enum: ["customers", "staff"] },
      },
    },
  },
  [ROUTE.AI_SETTINGS]: {},
  [ROUTE.INSIGHTS]: {},
  [ROUTE.DOCUMENTS]: {},
}

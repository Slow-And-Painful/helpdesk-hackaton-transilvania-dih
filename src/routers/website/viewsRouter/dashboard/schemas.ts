import { ROUTE } from "./types"

export const schemas = {
  [ROUTE.HOME]: {
    querystring: {
      type: "object",
      properties: {
        chat: { type: "string" },
      },
    },
  },
  [ROUTE.TICKETS]: {},
  [ROUTE.USERS]: {},
  [ROUTE.DEPARTMENT]: {
    querystring: {
      type: "object",
      properties: {
        tab: { type: "string" },
      },
    },
  },
  [ROUTE.DOCUMENTS]: {},
}

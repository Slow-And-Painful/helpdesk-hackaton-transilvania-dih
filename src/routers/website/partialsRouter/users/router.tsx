import { createRouter } from "../../utils"
import { ROUTE } from "./types"
import { schemas } from "./schemas"
import USER_ROLE from "$types/USER_ROLES"
import CreateUserModal from "$templates/components/users/CreateUserModal"

// ==================== ROUTES ==================== //

export const routerPrefix = "/users"

export const router = createRouter("users", (server) => {
  server.route({
    method: "GET",
    url: ROUTE.CREATE_USER_MODAL,
    schema: schemas[ROUTE.CREATE_USER_MODAL],
    config: {
      authenticated: true,
      security: {
        session: `${USER_ROLE.DEPARTMENT_ADMIN}`,
      },
    },
    handler: async (_req, res) => {
      return res
        .headers({
          "HX-Retarget": "#modal",
          "HX-Reswap": "beforeend",
        })
        .view(<CreateUserModal />)
    },
  })
})

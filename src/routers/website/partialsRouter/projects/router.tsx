import { createRouter } from "../../utils"
import { ROUTE } from "./types"
import { schemas } from "./schemas"
import USER_ROLE from "$types/USER_ROLES"
import CreateProjectModal from "$templates/components/projects/CreateProjectModal"

export const routerPrefix = "/projects"

export const router = createRouter("projects", (server) => {
  server.route({
    method: "GET",
    url: ROUTE.CREATE_PROJECT_MODAL,
    schema: schemas[ROUTE.CREATE_PROJECT_MODAL],
    config: {
      security: {
        session: `${USER_ROLE.CUSTOMER_ACCOUNT}`
      },
      authenticated: true
    },
    handler: (_req, res) => {
      return res.view(
        <CreateProjectModal />
      )
    }
  })
})

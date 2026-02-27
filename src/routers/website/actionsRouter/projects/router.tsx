import { createRouter, getViewPath } from "$routers/website/utils"
import ProjectsService from "$services/ProjectsService"
import USER_ROLE from "$types/USER_ROLES"
import { container } from "tsyringe"
import { schemas } from "./schemas"
import { ROUTE } from "./types"
import { projectsTable } from "$dbSchemas/Projects"
import { eq } from "drizzle-orm"
import ProjectsCardList, { projectsCardListId } from "$templates/components/card-lists/projects-listing/CardList"
import { createProjectModalId } from "$templates/components/projects/CreateProjectModal"

export const routerPrefix = "/projects"

const projectsService = container.resolve<ProjectsService>(ProjectsService.token)

export const router = createRouter("projects", (server) => {
  server.route({
    method: "POST",
    url: ROUTE.CREATE,
    schema: schemas[ROUTE.CREATE],
    config: {
      security: {
        session: `${USER_ROLE.CUSTOMER_ACCOUNT}`
      },
      authenticated: true
    },
    handler: async (req, res) => {
      const name = req.body.name.trim()
      const description = req.body.description?.trim()
      const callerUser = req.callerUser

      await projectsService.insert({
        name,
        description,
        userId: callerUser.id
      })

      const { items, pagination } = await projectsService.getTableItems({
        ...req.query as Record<string, string>,
        limit: null
      }, eq(projectsTable.userId, callerUser.id))

      const baseUrl = getViewPath("projects", "LISTING")

      const props = {
        projects: items,
        baseUrl,
        pagination
      }

      return res
        .headers({
          "HX-Reswap": "outerHTML",
          "HX-Retarget": `#${projectsCardListId}`,
          "HX-Push-Url": props.baseUrl + (pagination.baseUrl ? `?${pagination.baseUrl}&page=${pagination.page}` : `?page=${pagination.page}`),
          "HX-Trigger-After-Settle": JSON.stringify({
            showSuccessToast: "Project created successfully",
            closeModal: createProjectModalId
          })
        })
        .view(<>
          <ProjectsCardList
            {...props}
          />
        </>)
    }
  })
})

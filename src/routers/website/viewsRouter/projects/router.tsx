import { createRouter, getViewPath } from "../../utils"
import { ROUTE } from "./types"
import { schemas } from "./schemas"
import USER_ROLE from "$types/USER_ROLES"
import { DashboardLayout } from "$templates/layouts/DashboardLayout"
import ProjectsView from "$templates/views/ProjectsView"
import { container } from "tsyringe"
import ProjectsService from "$services/ProjectsService"
import { eq } from "drizzle-orm"
import { projectsTable } from "$dbSchemas/Projects"
import ProjectsCardList, { projectsCardListFilters, projectsCardListId } from "$templates/components/card-lists/projects-listing/CardList"
import CardListFiltersDropdown from "$templates/components/card-lists/CardListFiltersDropdown"

export const routerPrefix = "/projects"

const projectsService = container.resolve<ProjectsService>(ProjectsService.token)

export const router = createRouter("projects", (server) => {
  server.route({
    url: ROUTE.LISTING,
    method: "GET",
    schema: schemas[ROUTE.LISTING],
    config: {
      security: {
        session: `${USER_ROLE.CUSTOMER_ACCOUNT}`
      },
      authenticated: true
    },
    handler: async (req, res) => {
      const callerUser = req.callerUser

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

      const tableOnly = req.headers["hx-template"] === "card-list"

      if (tableOnly) {
        const swapFilters = req.headers["hx-reset-table-filters"] === "true"
        
        return res
          .headers({
            "HX-Reswap": swapFilters ? "none" : "outerHTML",
            "HX-Retarget": `#${projectsCardListId}${swapFilters ? `,#${projectsCardListId}-filters-dropdown` : ""}`,
            "HX-Push-Url": props.baseUrl + (pagination.baseUrl ? `?${pagination.baseUrl}&page=${pagination.page}` : `?page=${pagination.page}`),
          })
          .view(<>
            {swapFilters ? 
              <CardListFiltersDropdown
                pagination={props.pagination}
                filters={projectsCardListFilters}
                cardListId={projectsCardListId}
                baseUrl={props.baseUrl}
                swapOOB="outerHTML"
              /> : null
            }
            <ProjectsCardList
              {...swapFilters ? { swapOOB: "outerHTML" } : {}}
              {...props}
            />
          </>)
      }

      return res.view(
        <ProjectsView {...props} />,
        DashboardLayout
      )
    }
  })
})

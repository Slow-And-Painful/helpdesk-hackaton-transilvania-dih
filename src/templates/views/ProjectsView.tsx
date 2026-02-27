import { getPartialPath } from "$routers/website/utils"
import { Project } from "$services/ProjectsService"
import Button from "$templates/components/Button"
import { CardListPagination } from "$templates/components/card-lists/CardList"
import CardListFilters from "$templates/components/card-lists/CardListFilters"
import ProjectsCardList, { projectsCardListFilters, projectsCardListId } from "$templates/components/card-lists/projects-listing/CardList"
import DashboardPage from "$templates/components/DashboardPage"
import NoEntityYet from "$templates/components/NoEntityYet"

type Props = {
  projects: Project[]
  pagination: CardListPagination
  baseUrl: string
}

const ProjectsView = (props: Props) => {
  return (
    <DashboardPage
      title={"Projects"}
    >
      {props.projects.length === 0 && !props.pagination.search
        ?
          <div class="h-full flex items-center justify-center">
            <NoEntityYet
              message="No project yet"
              description="Start using Transilvania Digital Innovation Hub by creating a new project"
              ctaText="Create your first project"
              ctaHtmxAttributes={{
                "hx-get": getPartialPath("projects", "CREATE_PROJECT_MODAL"),
                "hx-target": "#modal",
                "hx-swap": "beforeend" 
              }}
            />
          </div>
        : <div class="flex flex-col gap-y-6 mt-2">
          <div class="flex items-center justify-between">
            <CardListFilters
              cardListId={projectsCardListId}
              baseUrl={props.baseUrl}
              additionalQueryParams={{}}
              getSearchFieldOptions={() => []}
              filters={projectsCardListFilters}
              pagination={props.pagination}
            />

            <Button
              size="sm"
              hx-get={getPartialPath("projects", "CREATE_PROJECT_MODAL")}
              hx-target="#modal"
              hx-swap="beforeend"
            >
              Create new
            </Button>
          </div>

          <ProjectsCardList
            projects={props.projects}
            pagination={props.pagination}
            baseUrl={props.baseUrl}
          />
        </div>
      }
    </DashboardPage>
  )
}

export default ProjectsView

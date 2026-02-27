import CardList, { CardListPagination, CardListProps } from "../CardList"
import ProjectCard from "$templates/components/ProjectCard"
import { Project } from "$services/ProjectsService"

type Props = Omit<CardListProps<Project>, "render" | "data"> & {
  projects: Project[]
  swapOOB?: Htmx.Attributes["hx-swap-oob"]
  pagination?: CardListPagination
  href?: ((proejct: Project) => string)
}

export const projectsCardListId = "projects-card-list"

export const projectsCardListFilters = []

const ProjectsCardList = ({
  id,
  projects,
  ...props
}: Props) => {
  return (
    <CardList
      id={id ?? projectsCardListId}
      data={projects}
      noDataProps={{
        noDataFoundMessage: "No project found",
        noDataMessage: "No project yet",
      }}
      fullPage
      render={(data) => <ProjectCard
        project={data}
        href={props.href && props.href(data)}
      />}
      gridColsClass="grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-4"
      {...props}
    />
  )
}

export default ProjectsCardList

import { Project } from "$services/ProjectsService"

type Props = {
  project: Project
  href?: string
}

const ProjectCard = (props: Props) => {
  return (
    <div>
      {props.project.name}
    </div>
  )
}

export default ProjectCard

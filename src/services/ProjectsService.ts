import BaseService, { MainQuery } from "$services/BaseService"
import DrizzleDB from "$components/DrizzleDB"
import { container, inject, injectable } from "tsyringe"
import { NewProjectSchema, ProjectSchema, projectsTable } from "$dbSchemas/Projects"

export type Project = ProjectSchema

type TABLE = typeof projectsTable
type PK_TYPE = number
type MAIN_QUERY_RESULT = Project
type POST_PROCESS_RESULT = Project
export type PRE_INSERT_DATA = NewProjectSchema

@injectable()
export default class ProjectsService extends BaseService<
  TABLE,
  PK_TYPE,
  MAIN_QUERY_RESULT,
  POST_PROCESS_RESULT,
  PRE_INSERT_DATA
> {
  mainTable = projectsTable
  pk = projectsTable.id
  allowedSearchField = ["name"]
  allowedFilters = { id: "string" } as Record<string, "string" | "boolean">

  constructor(
    @inject(DrizzleDB.token)
    drizzleDB: DrizzleDB
  ) {
    super(drizzleDB)
  }

  mainQuery: MainQuery<MAIN_QUERY_RESULT> = async ({ db, ...options }) => {
    return db.query.projectsTable.findMany({
      ...options,
    })
  }

  static token = Symbol("ProjectsService")
}

container.register(ProjectsService.token, ProjectsService)

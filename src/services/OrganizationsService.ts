import BaseService, { MainQuery } from "$services/BaseService"
import DrizzleDB from "$components/DrizzleDB"
import { container, inject, injectable } from "tsyringe"
import { NewOrganizationSchema, OrganizationSchema, organizationsTable } from "$dbSchemas/Organizations"

export type Organization = OrganizationSchema

type TABLE = typeof organizationsTable
type PK_TYPE = number
type MAIN_QUERY_RESULT = Organization
type POST_PROCESS_RESULT = Organization
export type PRE_INSERT_DATA = NewOrganizationSchema

@injectable()
export default class OrganizationsService extends BaseService<
  TABLE,
  PK_TYPE,
  MAIN_QUERY_RESULT,
  POST_PROCESS_RESULT,
  PRE_INSERT_DATA
> {
  mainTable = organizationsTable
  pk = organizationsTable.id
  allowedSearchField = ["name"]
  allowedFilters = { id: "string" } as Record<string, "string" | "boolean">

  constructor(
    @inject(DrizzleDB.token)
    drizzleDB: DrizzleDB
  ) {
    super(drizzleDB)
  }

  mainQuery: MainQuery<MAIN_QUERY_RESULT> = async ({ db, ...options }) => {
    return db.query.organizationsTable.findMany({
      ...options,
    })
  }


  static token = Symbol("OrganizationsService")
}

container.register(OrganizationsService.token, OrganizationsService)

import BaseService, { MainQuery } from "$services/BaseService"
import DrizzleDB from "$components/DrizzleDB"
import { container, inject, injectable } from "tsyringe"
import { NewOrganizationUserSchema, OrganizationUserSchema, organizationUsersTable } from "$dbSchemas/OrganizationUsers"

export type OrganizationUser = OrganizationUserSchema

type TABLE = typeof organizationUsersTable
type PK_TYPE = number
type MAIN_QUERY_RESULT = OrganizationUser
type POST_PROCESS_RESULT = OrganizationUser
export type PRE_INSERT_DATA = NewOrganizationUserSchema

@injectable()
export default class OrganizationUsersService extends BaseService<
  TABLE,
  PK_TYPE,
  MAIN_QUERY_RESULT,
  POST_PROCESS_RESULT,
  PRE_INSERT_DATA
> {
  mainTable = organizationUsersTable
  pk = organizationUsersTable.id
  allowedSearchField = []
  allowedFilters = { id: "string" } as Record<string, "string" | "boolean">

  constructor(
    @inject(DrizzleDB.token)
    drizzleDB: DrizzleDB
  ) {
    super(drizzleDB)
  }

  mainQuery: MainQuery<MAIN_QUERY_RESULT> = async ({ db, ...options }) => {
    return db.query.organizationUsersTable.findMany({
      ...options,
    })
  }


  static token = Symbol("OrganizationUsersService")
}

container.register(OrganizationUsersService.token, OrganizationUsersService)

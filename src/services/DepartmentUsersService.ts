import BaseService, { MainQuery } from "$services/BaseService"
import DrizzleDB from "$components/DrizzleDB"
import { container, inject, injectable } from "tsyringe"
import { DepartmentUserSchema, departmentUsersTable, NewDepartmentUserSchema } from "$dbSchemas/DepartmentUsers"

export type DepartmentUser = DepartmentUserSchema

type TABLE = typeof departmentUsersTable
type PK_TYPE = number
type MAIN_QUERY_RESULT = DepartmentUser
type POST_PROCESS_RESULT = DepartmentUser
export type PRE_INSERT_DATA = Omit<NewDepartmentUserSchema, "salt">

@injectable()
export default class DepartmentUserService extends BaseService<
  TABLE,
  PK_TYPE,
  MAIN_QUERY_RESULT,
  POST_PROCESS_RESULT,
  PRE_INSERT_DATA
> {
  mainTable = departmentUsersTable
  pk = departmentUsersTable.id
  allowedSearchField = ["name"]
  allowedFilters = { type: "string", blocked: "boolean", id: "string" } as Record<string, "string" | "boolean">

  constructor(
    @inject(DrizzleDB.token)
    drizzleDB: DrizzleDB
  ) {
    super(drizzleDB)
  }

  mainQuery: MainQuery<MAIN_QUERY_RESULT> = async ({ db, ...options }) => {
    return db.query.departmentUsersTable.findMany({
      ...options,
    })
  }

  static token = Symbol("DepartmentUserService")
}

container.register(DepartmentUserService.token, DepartmentUserService)

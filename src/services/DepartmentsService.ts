import BaseService, { MainQuery } from "$services/BaseService"
import DrizzleDB from "$components/DrizzleDB"
import { container, inject, injectable } from "tsyringe"
import { DepartmentsSchema, departmentsTable, NewDepartmentSchema } from "$dbSchemas/Departments"

export type Department = DepartmentsSchema

type TABLE = typeof departmentsTable
type PK_TYPE = number
type MAIN_QUERY_RESULT = Department
type POST_PROCESS_RESULT = Department
export type PRE_INSERT_DATA = Omit<NewDepartmentSchema, "salt">

@injectable()
export default class DepartmentsService extends BaseService<
  TABLE,
  PK_TYPE,
  MAIN_QUERY_RESULT,
  POST_PROCESS_RESULT,
  PRE_INSERT_DATA
> {
  mainTable = departmentsTable
  pk = departmentsTable.id
  allowedSearchField = ["name"]
  allowedFilters = { type: "string", blocked: "boolean", id: "string" } as Record<string, "string" | "boolean">

  constructor(
    @inject(DrizzleDB.token)
    drizzleDB: DrizzleDB
  ) {
    super(drizzleDB)
  }

  mainQuery: MainQuery<MAIN_QUERY_RESULT> = async ({ db, ...options }) => {
    return db.query.departmentsTable.findMany({
      ...options,
    })
  }

  static token = Symbol("DepartmentsService")
}

container.register(DepartmentsService.token, DepartmentsService)

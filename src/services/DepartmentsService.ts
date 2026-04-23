import BaseService, { CommonOptions, MainQuery } from "$services/BaseService"
import DrizzleDB from "$components/DrizzleDB"
import { container, inject, injectable } from "tsyringe"
import { DepartmentsSchema, departmentsTable, NewDepartmentSchema } from "$dbSchemas/Departments"
import { DepartmentUserSchema } from "$dbSchemas/DepartmentUsers"
import DocumentFoldersService from "$services/DocumentFoldersService"

export type Department = DepartmentsSchema & {
  users: DepartmentUserSchema[]
}

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
    drizzleDB: DrizzleDB,
    @inject(DocumentFoldersService.token)
    private documentFoldersService: DocumentFoldersService
  ) {
    super(drizzleDB)
  }

  mainQuery: MainQuery<MAIN_QUERY_RESULT> = async ({ db, ...options }) => {
    return db.query.departmentsTable.findMany({
      ...options,
      with: {
        users: true,
      }
    })
  }

  postInsertProcess = async (
    inputData: PRE_INSERT_DATA[],
    pkValues: PK_TYPE[],
    options?: CommonOptions<MAIN_QUERY_RESULT>,
  ): Promise<void> => {
    await Promise.all(
      pkValues.map((departmentId, i) =>
        this.documentFoldersService.insert(
          {
            name: inputData[i].name ?? "",
            departmentId,
            parentId: null,
            deletable: false,
          },
          { transaction: options?.transaction },
        )
      )
    )
  }

  static token = Symbol("DepartmentsService")
}

container.register(DepartmentsService.token, DepartmentsService)

import BaseService from "./BaseService"
import * as codesUtilizationsSchemas from "$dbSchemas/CodesUtilizations"
import { container, injectable, inject } from "tsyringe"
import DrizzleDB from "$components/DrizzleDB"

type TABLE = typeof codesUtilizationsSchemas.codesUtilizationsTable
type PK_TYPE = number
type MAIN_QUERY_RESULT = codesUtilizationsSchemas.CodesUtilizationSchema
type POST_PROCESS_RESULT = MAIN_QUERY_RESULT
type PRE_INSERT_DATA = codesUtilizationsSchemas.NewCodesUtilizationSchema

@injectable()
export default class CodeUtilizationsService extends BaseService<
  TABLE,
  PK_TYPE,
  MAIN_QUERY_RESULT,
  POST_PROCESS_RESULT,
  PRE_INSERT_DATA
> {
  pk = codesUtilizationsSchemas.codesUtilizationsTable.id
  mainTable = codesUtilizationsSchemas.codesUtilizationsTable

  constructor(
    @inject(DrizzleDB.token)
    private drizzleDB: DrizzleDB,
  ) {
    super(drizzleDB)
  }

  clone = (drizzleDB?: DrizzleDB) => {
    return new CodeUtilizationsService(drizzleDB || this.drizzleDB)
  }

  static token = Symbol("CodeUtilizationsService")
}

container.register(CodeUtilizationsService.token, CodeUtilizationsService)

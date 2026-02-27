import BaseService from "$services/BaseService"
import DrizzleDB from "$components/DrizzleDB"
import { container, inject, injectable, InjectionToken } from "tsyringe"
import {
  emailLayoutsTable,
  EmailLayoutSchema,
  NewEmailLayoutSchema,
} from "$dbSchemas/EmailLayouts"

type TABLE = typeof emailLayoutsTable
type PK_TYPE = string
type MAIN_QUERY_RESULT = EmailLayoutSchema
type POST_PROCESS_RESULT = MAIN_QUERY_RESULT
export type PRE_INSERT_DATA = NewEmailLayoutSchema

@injectable()
export default class EmailLayoutsService extends BaseService<
  TABLE,
  PK_TYPE,
  MAIN_QUERY_RESULT,
  POST_PROCESS_RESULT,
  PRE_INSERT_DATA
> {
  mainTable = emailLayoutsTable
  pk = emailLayoutsTable.key

  constructor(
    @inject(DrizzleDB.token)
    private drizzleDB: DrizzleDB,
  ) {
    super(drizzleDB)
  }

  static readonly token: InjectionToken<EmailLayoutsService> = Symbol()
}

container.register(EmailLayoutsService.token, EmailLayoutsService)
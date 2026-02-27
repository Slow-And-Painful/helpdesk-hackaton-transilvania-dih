import BaseService from "$services/BaseService"
import DrizzleDB from "$components/DrizzleDB"
import { container, inject, injectable } from "tsyringe"
import {
  GlobalSettingsSchema,
  NewGlobalSettingsSchema,
  globalSettingsTable
} from "$dbSchemas/GlobalSettings"

type TABLE = typeof globalSettingsTable
type PK_TYPE = string
type MAIN_QUERY_RESULT = GlobalSettingsSchema
type POST_PROCESS_RESULT = GlobalSettingsSchema
export type PRE_INSERT_DATA = NewGlobalSettingsSchema

@injectable()
export default class GlobalSettingsService extends BaseService<
  TABLE,
  PK_TYPE,
  MAIN_QUERY_RESULT,
  POST_PROCESS_RESULT,
  PRE_INSERT_DATA
> {
  mainTable = globalSettingsTable
  pk = globalSettingsTable.key

  constructor(
    @inject(DrizzleDB.token)
    drizzleDB: DrizzleDB,
  ) {
    super(drizzleDB)
  }

  static token = Symbol("GlobalSettingsService")
}

container.register(GlobalSettingsService.token, GlobalSettingsService)

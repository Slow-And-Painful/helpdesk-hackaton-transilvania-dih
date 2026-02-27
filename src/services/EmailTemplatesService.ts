import BaseService from "$services/BaseService"
import DrizzleDB from "$components/DrizzleDB"
import { container, inject, injectable, InjectionToken } from "tsyringe"
import EmailLayoutsService from "$services/EmailLayoutsService"
import Handlebars from "handlebars"
import { EmailTemplateSchema, emailTemplatesTable, NewEmailTemplateSchema } from "$dbSchemas/EmailTemplates"
import { EmailLayoutSchema } from "$dbSchemas/EmailLayouts"

type TABLE = typeof emailTemplatesTable
type PK_TYPE = string
type MAIN_QUERY_RESULT = EmailTemplateSchema & {
  emailLayout: EmailLayoutSchema | null
}
type POST_PROCESS_RESULT = MAIN_QUERY_RESULT
export type PRE_INSERT_DATA = NewEmailTemplateSchema

@injectable()
export default class EmailTemplatesService extends BaseService<
  TABLE,
  PK_TYPE,
  MAIN_QUERY_RESULT,
  POST_PROCESS_RESULT,
  PRE_INSERT_DATA
> {
  mainTable = emailTemplatesTable
  pk = emailTemplatesTable.key

  constructor(
    @inject(DrizzleDB.token)
    private drizzleDB: DrizzleDB,
    @inject(EmailLayoutsService.token)
    private emailLayoutsService: EmailLayoutsService,
  ) {
    super(drizzleDB)
  }

  postProcess = async (
    rawResults: MAIN_QUERY_RESULT[],
  ): Promise<MAIN_QUERY_RESULT[]> => {
    const layoutsKeys = rawResults
      .filter((r) => r.emailLayoutKey)
      .map((r) => r.emailLayoutKey!)
    const layouts = await this.emailLayoutsService.mGet(layoutsKeys)

    return rawResults.map((r) => {
      let body = r.body

      if (r.emailLayoutKey && layouts) {
        const layout = layouts.find((l) => l && l.key === r.emailLayoutKey)
        body = Handlebars.compile(layout?.content)(r.bodyPayload)
      }

      return {
        ...r,
        body,
      }
    })
  }

  static readonly token: InjectionToken<EmailTemplatesService> = Symbol()
}

container.register(EmailTemplatesService.token, EmailTemplatesService)
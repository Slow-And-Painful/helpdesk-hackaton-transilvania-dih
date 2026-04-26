import BaseService, { MainQuery } from "$services/BaseService"
import DrizzleDB from "$components/DrizzleDB"
import { container, inject, injectable } from "tsyringe"
import { NewTicketSummarySchema, TicketSummarySchema, ticketSummariesTable } from "$dbSchemas/TicketSummaries"

export type TicketSummary = TicketSummarySchema

type TABLE = typeof ticketSummariesTable
type PK_TYPE = number
type MAIN_QUERY_RESULT = TicketSummary
type POST_PROCESS_RESULT = TicketSummary
export type PRE_INSERT_DATA = NewTicketSummarySchema

@injectable()
export default class TicketSummariesService extends BaseService<
  TABLE,
  PK_TYPE,
  MAIN_QUERY_RESULT,
  POST_PROCESS_RESULT,
  PRE_INSERT_DATA
> {
  mainTable = ticketSummariesTable
  pk = ticketSummariesTable.id
  allowedSearchField = []
  allowedFilters = { senderDepartmentId: "string" } as Record<string, "string" | "boolean">

  constructor(
    @inject(DrizzleDB.token)
    drizzleDB: DrizzleDB
  ) {
    super(drizzleDB)
  }

  mainQuery: MainQuery<MAIN_QUERY_RESULT> = async ({ db, ...options }) => {
    return db.query.ticketSummariesTable.findMany(options)
  }

  static token = Symbol("TicketSummariesService")
}

container.register(TicketSummariesService.token, TicketSummariesService)

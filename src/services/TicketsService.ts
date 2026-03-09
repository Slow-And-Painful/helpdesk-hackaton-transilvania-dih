import BaseService, { MainQuery } from "$services/BaseService"
import DrizzleDB from "$components/DrizzleDB"
import { container, inject, injectable } from "tsyringe"
import { ticketsTable, TicketSchema, NewTicketSchema } from "$dbSchemas/Tickets"

export type Ticket = TicketSchema

type TABLE = typeof ticketsTable
type PK_TYPE = number
type MAIN_QUERY_RESULT = Ticket
type POST_PROCESS_RESULT = Ticket
export type PRE_INSERT_DATA = NewTicketSchema

@injectable()
export default class TicketsService extends BaseService<
  TABLE,
  PK_TYPE,
  MAIN_QUERY_RESULT,
  POST_PROCESS_RESULT,
  PRE_INSERT_DATA
> {
  mainTable = ticketsTable
  pk = ticketsTable.id
  // what you can search by in listWithQuery / getTableItems
  allowedSearchField = ["status"]
  // filters that are allowed from querystring
  allowedFilters = { id: "string", status: "string", senderDepartmentId: "string", destinationDepartmentId: "string" } as Record<string, "string" | "boolean">

  constructor(
    @inject(DrizzleDB.token)
    drizzleDB: DrizzleDB
  ) {
    super(drizzleDB)
  }
// base query used by all list/get helpers
  mainQuery: MainQuery<MAIN_QUERY_RESULT> = async ({ db, ...options }) => {
    return db.query.ticketsTable.findMany({
      ...options,
      with: {
        senderDepartment: true,
        destinationDepartment: true,
      },
    })
  }

  static token = Symbol("TicketsService")
}

container.register(TicketsService.token, TicketsService)

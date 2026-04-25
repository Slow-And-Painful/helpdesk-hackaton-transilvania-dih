import BaseService, { MainQuery } from "$services/BaseService"
import DrizzleDB from "$components/DrizzleDB"
import { container, inject, injectable } from "tsyringe"
import { TicketSchema } from "$dbSchemas/Tickets"
import { asc } from "drizzle-orm"
import { DepartmentUserSchema } from "$dbSchemas/DepartmentUsers"
import { UserSchema } from "$dbSchemas/Users"
import { NewTicketMessageSchema, TicketMessageSchema, ticketMessagesTable } from "$dbSchemas/TicketMessages"

type WithTicket<T> = T & {
  ticket?: TicketSchema
}

type WithSenderDepartmentUser<T> = T & {
  senderDepartmentUser?: DepartmentUserSchema & {
    user: UserSchema
  } | null
}

export type TicketMessage = WithSenderDepartmentUser<WithTicket<WithSenderDepartmentUser<TicketMessageSchema>>>

type TABLE = typeof ticketMessagesTable
type PK_TYPE = number
type MAIN_QUERY_RESULT = TicketMessage
type POST_PROCESS_RESULT = TicketMessage
export type PRE_INSERT_DATA = NewTicketMessageSchema

@injectable()
export default class TicketMessagesService extends BaseService<
  TABLE,
  PK_TYPE,
  MAIN_QUERY_RESULT,
  POST_PROCESS_RESULT,
  PRE_INSERT_DATA
> {
  mainTable = ticketMessagesTable
  pk = ticketMessagesTable.id
  allowedSearchField = ["text"]
  allowedFilters = {
    id: "string",
    sentAt: "string"
  } as Record<string, "string" | "boolean">
  baseOrderBy = [asc(ticketMessagesTable.sentAt)]

  constructor(
    @inject(DrizzleDB.token)
    drizzleDB: DrizzleDB
  ) {
    super(drizzleDB)
  }

  mainQuery: MainQuery<MAIN_QUERY_RESULT> = async ({ db, ...options }) => {
    return db.query.ticketMessagesTable.findMany({
      ...options,
      with: {
        senderDepartmentUser: {
          with: { user: true },
        },
        ticket: true,
      },
    })
  }

  static token = Symbol("TicketMessagesService")
}

container.register(TicketMessagesService.token, TicketMessagesService)

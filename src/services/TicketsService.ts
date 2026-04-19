import BaseService, { MainQuery } from "$services/BaseService"
import DrizzleDB from "$components/DrizzleDB"
import { container, inject, injectable } from "tsyringe"
import { ticketsTable, TicketSchema, NewTicketSchema } from "$dbSchemas/Tickets"
import { desc } from "drizzle-orm"
import { DepartmentsSchema } from "$dbSchemas/Departments"
import { User } from "./UsersService"
import { DepartmentUserSchema } from "$dbSchemas/DepartmentUsers"

type WithSenderDepartment<T> = T & {
  senderDepartment?: DepartmentsSchema
}

type WithDestinationDepartment<T> = T & {
  destinationDepartment?: DepartmentsSchema
}

export type TicketAssignee = DepartmentUserSchema & {
  user?: User
}

type WithAssignee<T> = T & {
  assignee?: TicketAssignee | null
}

type WithSenderDepartmentUser<T> = T & {
  senderDepartmentUser?: TicketAssignee | null
}

export type Ticket = WithSenderDepartment<WithDestinationDepartment<WithAssignee<WithSenderDepartmentUser<TicketSchema>>>>

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
  allowedSearchField = ["name", "status"]
  allowedFilters = {
    id: "string",
    status: "string",
    senderDepartmentId: "string",
    destinationDepartmentId: "string"
  } as Record<string, "string" | "boolean">
  baseOrderBy = [desc(ticketsTable.createdAt)]

  constructor(
    @inject(DrizzleDB.token)
    drizzleDB: DrizzleDB
  ) {
    super(drizzleDB)
  }

  mainQuery: MainQuery<MAIN_QUERY_RESULT> = async ({ db, ...options }) => {
    return db.query.ticketsTable.findMany({
      ...options,
      with: {
        senderDepartment: true,
        senderDepartmentUser: {
          with: { user: true },
        },
        destinationDepartment: true,
        assignee: {
          with: { user: true },
        },
      },
    })
  }

  static token = Symbol("TicketsService")
}

container.register(TicketsService.token, TicketsService)

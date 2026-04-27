import { pgTable, varchar, serial, integer, timestamp } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"
import { departmentsTable } from "./Departments"
import { departmentUsersTable } from "./DepartmentUsers"
import { TICKET_STATUS, TICKET_PRIORITY } from "$types/tickets"

export const ticketsTable = pgTable("Tickets", {
  id: serial().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  summary: varchar({ length: 1000 }),
  senderDepartmentId: integer().notNull().references(() => departmentsTable.id, { onDelete: "cascade" }),
  senderDepartmentUserId: integer().references(() => departmentUsersTable.id, { onDelete: "set null" }),
  destinationDepartmentId: integer().notNull().references(() => departmentsTable.id, { onDelete: "cascade" }),
  assigneeId: integer().references(() => departmentUsersTable.id, { onDelete: "set null" }),
  status: varchar({ length: 255 }).notNull().default(TICKET_STATUS.OPEN).$type<TICKET_STATUS>(),
  priority: varchar({ length: 50 }).notNull().default(TICKET_PRIORITY.MEDIE).$type<TICKET_PRIORITY>(),
  createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
})

export const ticketsRelations = relations(
  ticketsTable,
  ({ one }) => ({
    senderDepartment: one(departmentsTable, {
      fields: [ticketsTable.senderDepartmentId],
      references: [departmentsTable.id],
      relationName: "senderDepartment",
    }),
    senderDepartmentUser: one(departmentUsersTable, {
      fields: [ticketsTable.senderDepartmentUserId],
      references: [departmentUsersTable.id],
      relationName: "senderDepartmentUser",
    }),
    destinationDepartment: one(departmentsTable, {
      fields: [ticketsTable.destinationDepartmentId],
      references: [departmentsTable.id],
      relationName: "destinationDepartment",
    }),
    assignee: one(departmentUsersTable, {
      fields: [ticketsTable.assigneeId],
      references: [departmentUsersTable.id],
      relationName: "assignee",
    }),
  })
)

export type TicketSchema = typeof ticketsTable.$inferSelect
export type NewTicketSchema = typeof ticketsTable.$inferInsert

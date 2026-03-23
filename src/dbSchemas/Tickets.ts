import { pgTable, varchar, serial, integer, timestamp } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"
import { departmentsTable } from "./Departments"
import { TICKET_STATUS } from "$types/tickets"

export const ticketsTable = pgTable("Tickets", {
  id: serial().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  summary: varchar({ length: 1000 }),
  senderDepartmentId: integer().notNull().references(() => departmentsTable.id, { onDelete: "cascade" }),
  destinationDepartmentId: integer().notNull().references(() => departmentsTable.id, { onDelete: "cascade" }),
  status: varchar({ length: 255 }).notNull().default(TICKET_STATUS.OPEN).$type<TICKET_STATUS>(),
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
    destinationDepartment: one(departmentsTable, {
      fields: [ticketsTable.destinationDepartmentId],
      references: [departmentsTable.id],
      relationName: "destinationDepartment",
    }),
  })
)

export type TicketSchema = typeof ticketsTable.$inferSelect
export type NewTicketSchema = typeof ticketsTable.$inferInsert

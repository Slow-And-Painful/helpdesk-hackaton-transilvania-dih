import { pgTable, varchar, serial, integer, timestamp } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"
import { departmentsTable } from "./Departments"

export const ticketsTable = pgTable("Tickets", {
  id: serial().primaryKey(),
  senderDepartmentId: integer().notNull().references(() => departmentsTable.id, { onDelete: "cascade" }),
  destinationDepartmentId: integer().notNull().references(() => departmentsTable.id, { onDelete: "cascade" }),
  status: varchar({ length: 255 }).notNull().default("open"),
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

import { pgTable, varchar, serial } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"
import { ticketsTable } from "./Tickets"

export const departmentsTable = pgTable("Departments", {
  id: serial().primaryKey(),
  name: varchar({ length: 255 }).notNull().default(""),
})

export const departmentsRelations = relations(
  departmentsTable,
  ({ many }) => ({
    ticketsSent: many(ticketsTable, {
      relationName: "senderDepartment",
    }),
    ticketsReceived: many(ticketsTable, {
      relationName: "destinationDepartment",
    }),
  })
)

export type DepartmentSchema = typeof departmentsTable.$inferSelect
export type NewDepartmentSchema = typeof departmentsTable.$inferInsert

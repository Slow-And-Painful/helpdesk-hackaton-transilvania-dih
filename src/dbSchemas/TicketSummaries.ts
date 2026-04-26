import { pgTable, serial, integer, text, timestamp } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"
import { ticketsTable } from "./Tickets"
import { departmentsTable } from "./Departments"

export const ticketSummariesTable = pgTable("TicketSummaries", {
  id: serial().primaryKey(),
  ticketId: integer().notNull().unique().references(() => ticketsTable.id, { onDelete: "cascade" }),
  senderDepartmentId: integer().notNull().references(() => departmentsTable.id, { onDelete: "cascade" }),
  summary: text().notNull(),
  generatedAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
  inputTokens: integer().notNull().default(0),
  outputTokens: integer().notNull().default(0),
})

export const ticketSummariesRelations = relations(
  ticketSummariesTable,
  ({ one }) => ({
    ticket: one(ticketsTable, {
      fields: [ticketSummariesTable.ticketId],
      references: [ticketsTable.id],
    }),
    senderDepartment: one(departmentsTable, {
      fields: [ticketSummariesTable.senderDepartmentId],
      references: [departmentsTable.id],
    }),
  })
)

export type TicketSummarySchema = typeof ticketSummariesTable.$inferSelect
export type NewTicketSummarySchema = typeof ticketSummariesTable.$inferInsert

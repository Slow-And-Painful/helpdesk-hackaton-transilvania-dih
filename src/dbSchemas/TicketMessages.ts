import {
  serial,
  pgTable,
  integer,
  text
} from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"
import { departmentUsersTable } from "./DepartmentUsers"
import { ticketsTable } from "./Tickets"
import { timestamp } from "drizzle-orm/pg-core"

export const ticketMessagesTable = pgTable("TicketMessages", {
  id: serial().primaryKey(),
  text: text(),
  senderDepartmentUserId: integer().notNull().references(() => departmentUsersTable.id, { onDelete: "cascade" }),
  ticketId: integer().notNull().references(() => ticketsTable.id, { onDelete: "cascade" }),
  sentAt: timestamp(),
})

export const ticketMessagesRelations = relations(
  ticketMessagesTable,
  ({ one }) => ({
    ticket: one(ticketsTable, {
      fields: [ticketMessagesTable.ticketId],
      references: [ticketsTable.id],
    }),
    senderDepartmentUser: one(departmentUsersTable, {
      fields: [ticketMessagesTable.senderDepartmentUserId],
      references: [departmentUsersTable.id],
    }),
  })
)

export type TicketMessageSchema = typeof ticketMessagesTable.$inferSelect
export type NewTicketMessageSchema = typeof ticketMessagesTable.$inferInsert

import { pgTable, varchar, serial, timestamp } from "drizzle-orm/pg-core"

export const organizationsTable = pgTable("Organizations", {
  id: serial().primaryKey(),
  name: varchar({ length: 255 }).notNull().default(""),
  createdAt: timestamp({ withTimezone: true }).notNull().defaultNow()
})

export type OrganizationSchema = typeof organizationsTable.$inferSelect
export type NewOrganizationSchema = typeof organizationsTable.$inferInsert
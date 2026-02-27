import { pgTable, varchar, text } from "drizzle-orm/pg-core"

export const emailLayoutsTable = pgTable("EmailLayouts", {
  key: varchar("key", { length: 255 }).primaryKey(),
  content: text("content").notNull(),
})

export type EmailLayoutSchema = typeof emailLayoutsTable.$inferSelect
export type NewEmailLayoutSchema = typeof emailLayoutsTable.$inferInsert
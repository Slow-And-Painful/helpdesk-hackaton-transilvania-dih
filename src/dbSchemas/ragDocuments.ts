import { pgTable, varchar, serial, integer, timestamp } from "drizzle-orm/pg-core"
import { departmentsTable } from "./Departments"

export const ragDocumentsTable = pgTable("RAGDocuments", {
  id: serial().primaryKey(),
  s3Key: varchar({ length: 1024 }).notNull(),
  departmentId: integer().notNull().references(() => departmentsTable.id),
  createdAt: timestamp({ withTimezone: true }).notNull().defaultNow()
})

export type RAGDocumentsSchema = typeof ragDocumentsTable.$inferSelect
export type NewRAGDocumentsSchema = typeof ragDocumentsTable.$inferInsert
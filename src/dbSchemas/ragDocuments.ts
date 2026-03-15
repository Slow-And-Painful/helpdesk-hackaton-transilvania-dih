import { pgTable, varchar, serial, integer, timestamp } from "drizzle-orm/pg-core"
import { departmentsTable } from "./Departments"
import { relations } from "drizzle-orm"

export const ragDocumentsTable = pgTable("RAGDocuments", {
  id: serial().primaryKey(),
  s3Key: varchar({ length: 1024 }).notNull(),
  departmentId: integer().notNull().references(() => departmentsTable.id),
  createdAt: timestamp({ withTimezone: true }).notNull().defaultNow()
})

export const ragDocumentsRelations = relations(
  ragDocumentsTable,
  ({ one }) => ({
    department: one(departmentsTable, {
      fields: [ragDocumentsTable.departmentId],
      references: [departmentsTable.id]
    })
  }),
)

export type RAGDocumentSchema = typeof ragDocumentsTable.$inferSelect
export type NewRAGDocumentSchema = typeof ragDocumentsTable.$inferInsert
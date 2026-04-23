import { pgTable, varchar, serial, integer, timestamp, text } from "drizzle-orm/pg-core"
import { departmentsTable } from "./Departments"
import { documentFoldersTable } from "./DocumentFolders"
import { relations } from "drizzle-orm"

export const ragDocumentsTable = pgTable("RAGDocuments", {
  id: serial().primaryKey(),
  s3Key: varchar({ length: 1024 }).notNull(),
  name: varchar({ length: 255 }).notNull(),
  aiDescription: text().notNull().default(""),
  extractedText: text().notNull().default(""),
  extractionStatus: varchar({ length: 50 }).notNull().default("pending"),
  extractionInputTokens: integer().notNull().default(0),
  extractionOutputTokens: integer().notNull().default(0),
  departmentId: integer().notNull().references(() => departmentsTable.id),
  folderId: integer().references(() => documentFoldersTable.id, { onDelete: "set null" }),
  createdAt: timestamp({ withTimezone: true }).notNull().defaultNow()
})

export const ragDocumentsRelations = relations(
  ragDocumentsTable,
  ({ one }) => ({
    department: one(departmentsTable, {
      fields: [ragDocumentsTable.departmentId],
      references: [departmentsTable.id]
    }),
    folder: one(documentFoldersTable, {
      fields: [ragDocumentsTable.folderId],
      references: [documentFoldersTable.id]
    }),
  }),
)

export type RAGDocumentSchema = typeof ragDocumentsTable.$inferSelect
export type NewRAGDocumentSchema = typeof ragDocumentsTable.$inferInsert
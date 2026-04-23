import { pgTable, serial, varchar, integer, boolean, timestamp } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"
import { departmentsTable } from "./Departments"
import { ragDocumentsTable } from "./ragDocuments"

export const documentFoldersTable = pgTable("DocumentFolders", {
  id: serial().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  departmentId: integer().notNull().references(() => departmentsTable.id, { onDelete: "cascade" }),
  parentId: integer().references((): any => documentFoldersTable.id, { onDelete: "cascade" }),
  deletable: boolean().notNull().default(true),
  createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
})

export const documentFoldersRelations = relations(documentFoldersTable, ({ one, many }) => ({
  department: one(departmentsTable, {
    fields: [documentFoldersTable.departmentId],
    references: [departmentsTable.id],
  }),
  parent: one(documentFoldersTable, {
    fields: [documentFoldersTable.parentId],
    references: [documentFoldersTable.id],
    relationName: "children",
  }),
  children: many(documentFoldersTable, { relationName: "children" }),
  documents: many(ragDocumentsTable),
}))

export type DocumentFolderSchema = typeof documentFoldersTable.$inferSelect
export type NewDocumentFolderSchema = typeof documentFoldersTable.$inferInsert

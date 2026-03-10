import {
    serial,
    pgTable,
    integer
} from "drizzle-orm/pg-core"
import { chatMessagesTable } from "./ChatMessages"
import { relations } from "drizzle-orm"

export const chatMessageReferencedDocumentsTable = pgTable("ChatMessageReferencedDocuments", {
    id: serial().primaryKey(),
    documentId: integer().notNull(),
    chatMessageId: integer().notNull().references(() => chatMessagesTable.id, { onDelete: "cascade" }),
})

export const chatMessageReferencedDocumentsRelations = relations(
    chatMessageReferencedDocumentsTable,
    ({ one }) => ({
        chatMessage: one(chatMessagesTable, {
            fields: [chatMessageReferencedDocumentsTable.chatMessageId],
            references: [chatMessagesTable.id],
        })
    })
)

export type ChatMessageReferencedDocumentSchema = typeof chatMessageReferencedDocumentsTable.$inferSelect
export type NewChatMessageReferencedDocumentSchema = typeof chatMessageReferencedDocumentsTable.$inferInsert

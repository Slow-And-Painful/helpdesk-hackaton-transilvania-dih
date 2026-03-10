import {
    serial,
    pgTable,
    integer,
    text
} from "drizzle-orm/pg-core"
import { chatsTable } from "./Chats"
import { relations } from "drizzle-orm"

export const chatMessagesTable = pgTable("ChatMessages", {
    id: serial().primaryKey(),
    prompt: text().notNull(),
    response: text().notNull(),
    chatId: integer().notNull().references(() => chatsTable.id, { onDelete: "cascade" }),
})

export const chatMessagesRelations = relations(
    chatMessagesTable,
    ({ one }) => ({
        chat: one(chatsTable, {
            fields: [chatMessagesTable.chatId],
            references: [chatsTable.id],
        })
    })
)

export type ChatMessageSchema = typeof chatMessagesTable.$inferSelect
export type NewChatMessageSchema = typeof chatMessagesTable.$inferInsert

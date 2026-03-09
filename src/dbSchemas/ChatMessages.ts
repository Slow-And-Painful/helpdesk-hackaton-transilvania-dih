import {
    serial,
    pgTable,
    integer,
    varchar,
    unique
} from "drizzle-orm/pg-core"
import { chatsTable } from "./Chats"
import { relations } from "drizzle-orm"

export const chatMessagesTable = pgTable("ChatMessages", {
    id: serial().primaryKey(),
    prompt: varchar().notNull(),
    response: varchar().notNull(),
    chatId: integer().notNull().references(() => chatsTable.id, {onDelete: "cascade"}),
}, (t) => [
  unique().on(t.id, t.chatId),
])


export const chatMessagesRelations = relations(
    chatMessagesTable,
    ({ one }) => ({
        chat: one(chatsTable, {
            fields: [chatMessagesTable.chatId],
            references: [chatsTable.id],
        })
    })
)

export type ChatMessagesSchema = typeof chatMessagesTable.$inferSelect
export type NewChatMessagesSchema = typeof chatMessagesTable.$inferInsert

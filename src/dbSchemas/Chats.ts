import {
    serial,
    pgTable,
    integer,
    unique
} from "drizzle-orm/pg-core"
import { departmentUsersTable } from "./DepartmentUsers"
import { relations } from "drizzle-orm"

export const chatsTable = pgTable("Chats", {
    id: serial().primaryKey(),
    departmentUserId: integer().notNull().references(() => departmentUsersTable.id, {onDelete: "cascade"}),
}, (t) => [
    unique().on(t.departmentUserId),
])

export const chatsRelations = relations(
    chatsTable,
    ({ one }) => ({
        departmentUser: one(departmentUsersTable, {
            fields: [chatsTable.departmentUserId],
            references: [departmentUsersTable.id],
        })
    })
)

export type ChatsSchema = typeof chatsTable.$inferSelect
export type NewChatsSchema = typeof chatsTable.$inferInsert

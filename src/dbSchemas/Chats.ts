import {
    serial,
    pgTable,
    integer,
    uuid,
    varchar,
} from "drizzle-orm/pg-core"
import { departmentUsersTable } from "./DepartmentUsers"
import { relations } from "drizzle-orm"

export const chatsTable = pgTable("Chats", {
    id: serial().primaryKey(),
    uuid: uuid().defaultRandom().notNull().unique(),
    departmentUserId: integer().notNull().references(() => departmentUsersTable.id, {onDelete: "cascade"}),
    name: varchar({ length: 255 }),
})

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

import { integer, text, timestamp } from "drizzle-orm/pg-core"
import { serial, varchar } from "drizzle-orm/pg-core"
import { pgTable } from "drizzle-orm/pg-core"
import { usersTable } from "./Users"
import { relations } from "drizzle-orm"

export const projectsTable = pgTable("Projects", {
  id: serial().primaryKey(),
  name: varchar({ length: 255 }),
  description: text(),
  creationTimestamp: timestamp({ withTimezone: true }).notNull().defaultNow(),
  userId: integer().references(() => usersTable.id)
})

export const projectsRelations = relations(
  projectsTable,
  ({ one }) => ({
    user: one(usersTable, {
      fields: [projectsTable.userId],
      references: [usersTable.id]
    })
  })
)

export type ProjectSchema = typeof projectsTable.$inferSelect
export type NewProjectSchema = typeof projectsTable.$inferInsert
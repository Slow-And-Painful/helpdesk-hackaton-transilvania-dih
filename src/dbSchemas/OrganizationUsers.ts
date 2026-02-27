import { pgTable, varchar, serial, boolean, timestamp, integer, unique } from "drizzle-orm/pg-core"
import { organizationsTable } from "./Organizations"
import { relations } from "drizzle-orm"
import { ORGANIZATION_USER_ROLE } from "$types/organization"
import { usersTable } from "./Users"

export const organizationUsersTable = pgTable("OrganizationUsers", {
  id: serial().primaryKey(),
  role: varchar({ length: 255 }).$type<ORGANIZATION_USER_ROLE>().notNull(),
  createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
  organizationId: integer().notNull().references(() => organizationsTable.id, { onDelete: "cascade" }),
  blocked: boolean().notNull().default(false),
  userId: integer().notNull().references(() => usersTable.id, { onDelete: "cascade" }),
}, (t) => [
  unique().on(t.organizationId, t.userId),
])

export const organizationUsersRelations = relations(
  organizationUsersTable,
  ({ one }) => ({
    organization: one(organizationsTable, {
      fields: [organizationUsersTable.organizationId],
      references: [organizationsTable.id],
    }),
    user: one(usersTable, {
      fields: [organizationUsersTable.userId],
      references: [usersTable.id],
    })
  })
)

export type OrganizationUserSchema = typeof organizationUsersTable.$inferSelect
export type NewOrganizationUserSchema = typeof organizationUsersTable.$inferInsert
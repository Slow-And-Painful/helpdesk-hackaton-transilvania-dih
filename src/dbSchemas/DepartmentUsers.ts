import { pgTable, serial, timestamp, integer, unique } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"
// import { ORGANIZATION_USER_ROLE } from "$types/organization"
import { usersTable } from "./Users"
import { departmentsTable } from "./Departments"

export const departmentUsersTable = pgTable("DepartmentUsers", {
  id: serial().primaryKey(),
  // role: varchar({ length: 255 }).$type<ORGANIZATION_USER_ROLE>().notNull(),
  createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
  departmentId: integer().notNull().references(() => departmentsTable.id, { onDelete: "cascade" }),
  // blocked: boolean().notNull().default(false),
  userId: integer().notNull().references(() => usersTable.id, { onDelete: "cascade" }),
}, (t) => [
  unique().on(t.departmentId, t.userId),
])

export const departmentUsersRelations = relations(
  departmentUsersTable,
  ({ one }) => ({
    department: one(departmentsTable, {
      fields: [departmentUsersTable.departmentId],
      references: [departmentsTable.id],
    }),
    user: one(usersTable, {
      fields: [departmentUsersTable.userId],
      references: [usersTable.id],
    })
  })
)

export type DepartmentUserSchema = typeof departmentUsersTable.$inferSelect
export type NewDepartmentUserSchema = typeof departmentUsersTable.$inferInsert
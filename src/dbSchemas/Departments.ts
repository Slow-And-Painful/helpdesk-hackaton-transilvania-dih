import { relations } from "drizzle-orm"
import { pgTable,text, varchar, serial, timestamp } from "drizzle-orm/pg-core"
import { departmentUsersTable } from "./DepartmentUsers"

export const departmentsTable = pgTable("Departments", {
  id: serial().primaryKey(),
  name: varchar({ length: 255 }).notNull().default(""),
  createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
  systemPrompt: text().notNull().default(""),  
})

export const departmentRelations = relations(
  departmentsTable,
  ({ many }) => ({
    users: many(departmentUsersTable),
  })
)

export type DepartmentsSchema = typeof departmentsTable.$inferSelect
export type NewDepartmentSchema = typeof departmentsTable.$inferInsert

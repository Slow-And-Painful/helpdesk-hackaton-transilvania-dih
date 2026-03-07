import { pgTable, varchar, serial, timestamp } from "drizzle-orm/pg-core"

export const departmentsTable = pgTable("Departments", {
  id: serial().primaryKey(),
  name: varchar({ length: 255 }).notNull().default(""),
  createdAt: timestamp({ withTimezone: true }).notNull().defaultNow()
})

export type DepartmentsSchema = typeof departmentsTable.$inferSelect
export type NewDepartmentSchema = typeof departmentsTable.$inferInsert

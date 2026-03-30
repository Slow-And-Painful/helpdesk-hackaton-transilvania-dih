import { pgTable,text, varchar, serial, timestamp } from "drizzle-orm/pg-core"
//import { text } from "stream/consumers" - no more needed

export const departmentsTable = pgTable("Departments", {
  id: serial().primaryKey(),
  name: varchar({ length: 255 }).notNull().default(""),
  createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
  systemPrompt: text().notNull().default(""),
  
})

export type DepartmentsSchema = typeof departmentsTable.$inferSelect
export type NewDepartmentSchema = typeof departmentsTable.$inferInsert

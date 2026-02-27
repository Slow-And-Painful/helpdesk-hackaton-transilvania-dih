import { pgTable, serial, timestamp, integer } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"
import { usersTable } from "./Users"
import { codesTable } from "./Codes"

export const codesUtilizationsTable = pgTable("CodesUtilizations", {
  id: serial().primaryKey(),
  codeId: integer()
    .notNull()
    .references(() => codesTable.id, { onDelete: "cascade" }),
  userId: integer().references(() => usersTable.id, { onDelete: "set null" }),
  timestamp: timestamp({
    withTimezone: true,
  }).defaultNow(),
})

export const codesUtilizationRelations = relations(
  codesUtilizationsTable,
  ({ one }) => ({
    code: one(codesTable, {
      fields: [codesUtilizationsTable.codeId],
      references: [codesTable.id],
    }),
    user: one(usersTable, {
      fields: [codesUtilizationsTable.userId],
      references: [usersTable.id],
    }),
  }),
)

export type CodesUtilizationSchema = typeof codesUtilizationsTable.$inferSelect
export type NewCodesUtilizationSchema = typeof codesUtilizationsTable.$inferInsert

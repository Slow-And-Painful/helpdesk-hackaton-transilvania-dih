import {
  boolean,
  pgTable,
  serial,
  varchar,
  timestamp,
  integer,
} from "drizzle-orm/pg-core"
import { usersTable } from "./Users"
import { relations } from "drizzle-orm"
import { codesUtilizationsTable } from "./CodesUtilizations"

export enum CODE_TYPE {
  CONFIRM_EMAIL = "CONFIRM_EMAIL",
  RESET_PASSWORD = "RESET_PASSWORD",
  COMPLETE_CUSTOMER_ACCOUNT = "COMPLETE_CUSTOMER_ACCOUNT",
  LOGIN = "LOGIN"
}

export const codesTable = pgTable("Codes", {
  id: serial().primaryKey(),
  code: varchar({ length: 255 }).notNull().unique(),
  type: varchar({ length: 255 }).notNull().$type<CODE_TYPE>(),
  isActive: boolean().notNull().default(true),
  maximumUses: integer().notNull().default(1),
  creationTimestamp: timestamp({ withTimezone: true }).notNull().defaultNow(),
  expirationTimestamp: timestamp({ withTimezone: true }),
  lastEditTimestamp: timestamp({ withTimezone: true }),
  authorUserId: integer().references(() => usersTable.id, { onDelete: "set null" }),

  // additional prop for CONFIRM_EMAIL, RESET_PASSWORD, COMPLETE_ACCOUNT
  targetUserId: integer().references(() => usersTable.id, { onDelete: "set null" }),
})

export const codesRelations = relations(
  codesTable,
  ({ one, many }) => ({
    authorUser: one(usersTable, {
      fields: [codesTable.authorUserId],
      references: [usersTable.id],
    }),
    targetUser: one(usersTable, {
      fields: [codesTable.targetUserId],
      references: [usersTable.id],
    }),
    utilizations: many(codesUtilizationsTable)
  }),
)

export type CodeSchema = typeof codesTable.$inferSelect
export type NewCodeSchema = typeof codesTable.$inferInsert

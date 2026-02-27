import {
  boolean,
  pgTable,
  serial,
  varchar,
  timestamp,
} from "drizzle-orm/pg-core"
import USER_TYPE from "$types/USER_TYPE"
import { USER_COLORS } from "$constants/index"

export const usersTable = pgTable("Users", {
  id: serial().primaryKey(),
  firstName: varchar({ length: 255 }).notNull().default(""),
  lastName: varchar({ length: 255 }).notNull().default(""),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }),
  salt: varchar({ length: 255 }).notNull(),
  blocked: boolean().notNull().default(false),
  emailVerified: boolean().notNull().default(false),
  creationTimestamp: timestamp({ withTimezone: true }).defaultNow(),
  type: varchar({ length: 255 }).notNull().$type<USER_TYPE>(),
  privacyPolicyAcceptance: boolean().notNull(),
  termsConditionsAcceptance: boolean().notNull(),
  color: varchar({ length: 7 }).notNull().default(USER_COLORS[0])
})


export type UserSchema = typeof usersTable.$inferSelect
export type NewUserSchema = typeof usersTable.$inferInsert

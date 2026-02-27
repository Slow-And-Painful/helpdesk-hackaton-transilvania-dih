import GLOBAL_SETTINGS from "$types/GLOBAL_SETTINGS"
import { pgTable, varchar, jsonb } from "drizzle-orm/pg-core"

export type GlobalSettingsValue = string | number | boolean

export const globalSettingsTable = pgTable("GlobalSettings", {
  key: varchar({ length: 255 }).primaryKey().$type<GLOBAL_SETTINGS>(),
  value: jsonb().notNull().$type<GlobalSettingsValue>(),
})

export type GlobalSettingsSchema = typeof globalSettingsTable.$inferSelect
export type NewGlobalSettingsSchema = typeof globalSettingsTable.$inferInsert

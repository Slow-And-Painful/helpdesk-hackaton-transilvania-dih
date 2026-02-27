import {
  pgTable,
  uniqueIndex,
  varchar,
  jsonb,
  text,
  serial,
} from "drizzle-orm/pg-core"
import { emailLayoutsTable } from "./EmailLayouts"
import { relations } from "drizzle-orm"
import { language } from "./Common"

export const emailTemplatesTable = pgTable(
  "EmailTemplates",
  {
    id: serial("id").primaryKey(),
    key: varchar("key", { length: 255 }).notNull(),
    language: language("language").notNull(),
    subject: text("subject").notNull().default(""),

    // or
    emailLayoutKey: varchar("emailLayoutKey", { length: 255 }).references(
      () => emailLayoutsTable.key,
      { onDelete: "cascade" },
    ),
    bodyPayload: jsonb("bodyPayload"),

    // or
    body: text("body").notNull().default(""),
  },
  (t) => [uniqueIndex("key_language_unique").on(t.key, t.language)],
)

export const emailTemplatesRelation = relations(
  emailTemplatesTable,
  ({ one }) => ({
    emailLayout: one(emailLayoutsTable, {
      fields: [emailTemplatesTable.emailLayoutKey],
      references: [emailLayoutsTable.key],
    }),
  }),
)

export type EmailTemplateSchema = typeof emailTemplatesTable.$inferSelect
export type NewEmailTemplateSchema = typeof emailTemplatesTable.$inferInsert
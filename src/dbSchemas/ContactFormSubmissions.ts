import { pgTable, serial, varchar, timestamp } from "drizzle-orm/pg-core"

export const contactFormSubmissionsTable = pgTable("ContactFormSubmissions", {
  id: serial().primaryKey(),
  firstName: varchar({ length: 255 }).notNull(),
  lastName: varchar({ length: 255 }).notNull(),
  numeInstitutie: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull(),
  createdAt: timestamp({ withTimezone: true }).defaultNow().notNull(),
})

export type ContactFormSubmissionSchema = typeof contactFormSubmissionsTable.$inferSelect
export type NewContactFormSubmissionSchema = typeof contactFormSubmissionsTable.$inferInsert

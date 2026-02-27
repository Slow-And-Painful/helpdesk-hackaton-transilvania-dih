import { Session } from "fastify"
import { pgTable, varchar, json, timestamp, integer } from "drizzle-orm/pg-core"
import { usersTable } from "./Users"

export const sessions = pgTable("Sessions", {
  sid: varchar("sid", { length: 255 }).primaryKey(),
  data: json("data").$type<Omit<Session, "cookie">>().notNull(),
  cookie: json("cookie").$type<Session["cookie"]>().notNull(),
  expires: timestamp("expires", {
    withTimezone: true,
    mode: "string",
  }).notNull(),
  authenticatedUserId: integer("authenticatedUserId").references(
    () => usersTable.id,
    { onDelete: "cascade" }
  ),
  callerUserId: integer("callerUserId").references(() => usersTable.id, { onDelete: "cascade" }),
  sessionId: varchar("sessionId", { length: 255 }),
})

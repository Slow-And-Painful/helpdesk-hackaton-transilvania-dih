import "dotenv/config"
import { assertContainsValue } from "$utils/parsers"
import type { Config } from "drizzle-kit"

assertContainsValue(process.env, "POSTGRES_HOST")
assertContainsValue(process.env, "POSTGRES_USER")
assertContainsValue(process.env, "POSTGRES_PASSWORD")
assertContainsValue(process.env, "POSTGRES_DB")
assertContainsValue(process.env, "ENVIRONMENT")

const {
  POSTGRES_HOST,
  POSTGRES_PORT = "5432",
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  ENVIRONMENT,
} = process.env

export default {
  schema: "./src/dbSchemas",
  out: "./migrations",
  dialect: "postgresql",
  dbCredentials: {
    host: POSTGRES_HOST,
    port: +POSTGRES_PORT,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    database: POSTGRES_DB,
  },
  ...(ENVIRONMENT !== "local"
    ? {
        ssl: {
          rejectUnauthorized: false,
        },
      }
    : {}),
} satisfies Config

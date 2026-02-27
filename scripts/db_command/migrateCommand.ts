import { migrate } from "drizzle-orm/postgres-js/migrator"
import { CommandHandler } from "./index"

const migrateCommandHandler: CommandHandler = async ({ drizzle, env }) => {
  await migrate(drizzle, {
    migrationsFolder: env.DB_MIGRATIONS_PATH,
    migrationsTable: "DrizzleMigrations",
  })
}

export default migrateCommandHandler

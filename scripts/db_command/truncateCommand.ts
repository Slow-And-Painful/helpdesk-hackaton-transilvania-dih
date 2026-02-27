import { sql } from "drizzle-orm"
import { CommandHandler } from "./index"

const truncateCommandHandler: CommandHandler = async ({ drizzle }) => {
  const query = sql<string>`
    SELECT table_name as "name"
    FROM information_schema.tables
    WHERE table_schema = 'public'
      AND table_type = 'BASE TABLE';
  `

  const tables = await drizzle.execute<{ name: string }>(query)

  for (const table of tables) {
    const query = sql.raw(`
      TRUNCATE TABLE "${table.name}" 
      RESTART IDENTITY CASCADE;
    `)
    await drizzle.execute(query)
  }
}

export default truncateCommandHandler

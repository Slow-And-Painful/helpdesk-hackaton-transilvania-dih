import { sql } from "drizzle-orm"
import { CommandHandler } from "./index"

const dropCommandHandler: CommandHandler = async ({ drizzle }) => {
  const query = sql`
    DROP SCHEMA IF EXISTS public CASCADE;
    DROP SCHEMA IF EXISTS drizzle CASCADE;
    CREATE SCHEMA public;
  `
  await drizzle.execute(query)
}

export default dropCommandHandler

import Configs from "$components/Configs"
import { Command } from "commander"
import {
  askCommand,
  askEnvironment,
  askForConfirmation,
  countdown,
  tunnelAndConnect,
} from "scripts/db_command/utils"
import { container } from "tsyringe"
import { match } from "ts-pattern"
import Postgres from "postgres"
import { drizzle as Drizzle } from "drizzle-orm/postgres-js"

import migrateCommandHandler from "scripts/db_command/migrateCommand"
import truncateCommand from "scripts/db_command/truncateCommand"
import dropCommandHandler from "scripts/db_command/dropCommand"
import seedCommandHandler from "scripts/db_command/seedCommand"

export type Environment = (typeof environments)[number]
export type DbCommand = (typeof dbCommands)[number]

export type CommandHandler = (options: {
  drizzle: ReturnType<typeof Drizzle>
  postgres: ReturnType<typeof Postgres>
  environment: Environment
  env: Configs["env"]
}) => Promise<void>

export type CommandConfigs = {
  environment: Environment
  command: DbCommand
}

export const environments = ["local", "dev", "qua", "production"] as const
export const dbCommands = [
  "migrate",
  "truncate",
  "drop",
  "seed",
  "reset",
  "reseed",
] as const

const { env } = container.resolve<Configs>(Configs.token)
const program = new Command()

program.option(
  "--environment <environment>",
  `Environment (${environments.join(", ")})`,
)

program.option("--command <command>", `Command (${dbCommands.join(", ")})`)

program.action(async () => {
  const options = program.opts()

  const environment: Environment =
    options.environment || (await askEnvironment())
  const command: DbCommand = options.command || (await askCommand())

  await askForConfirmation(environment)
  await countdown(environment)

  const { drizzle, postgres, tunnel } = await tunnelAndConnect(environment, env)

  const commandsHandlers = match(command)
    .with("migrate", () => [migrateCommandHandler])
    .with("truncate", () => [truncateCommand])
    .with("drop", () => [dropCommandHandler])
    .with("seed", () => [seedCommandHandler])
    .with("reset", () => [
      dropCommandHandler,
      migrateCommandHandler,
      seedCommandHandler,
    ])
    .with("reseed", () => [truncateCommand, seedCommandHandler])
    .exhaustive()

  for (const commandHandler of commandsHandlers) {
    await commandHandler({
      drizzle,
      env,
      postgres,
      environment,
    })
  }

  await postgres.end()
  tunnel?.server?.close()
})

program.parse(process.argv)

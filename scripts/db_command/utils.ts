import Configs from "$components/Configs"
import { assertContainsValue } from "$utils/parsers"
import inquirer from "inquirer"
import {
  DbCommand,
  dbCommands,
  Environment,
  environments,
} from "scripts/db_command"
import { match } from "ts-pattern"
import {
  createTunnel,
  TunnelOptions,
  ServerOptions,
  SshOptions,
  ForwardOptions,
} from "tunnel-ssh"
import Postgres from "postgres"
import { drizzle as Drizzle } from "drizzle-orm/postgres-js"
import { readFileSync } from "fs"

const TMP_PORT = 35432

type CreateTunnelReturnType = Awaited<ReturnType<typeof createTunnel>>
type ServerType = CreateTunnelReturnType[0]
type ClientType = CreateTunnelReturnType[1]
type Tunnel = {
  server: ServerType
  client: ClientType
}
type SqlConfigs = {
  host: string
  port: number
  database: string
  password: string
  user: string
}

export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms))

export const askForConfirmation = async (
  environment: Environment,
): Promise<void> => {
  if (environment === "local") {
    return
  }

  const response = await inquirer.prompt([
    {
      type: "confirm",
      name: "proceed",
      message: `Are you sure you want to run the command in the "${environment}" environment?`,
      default: false,
    },
  ])

  if (!response.proceed) {
    console.log("Operation cancelled.")
    process.exit(0)
  }
}

export const askEnvironment = async (): Promise<Environment> => {
  const { environment } = await inquirer.prompt<{ environment: Environment }>([
    {
      type: "list",
      name: "environment",
      message: "Select the environment to run the command in:",
      choices: environments,
    },
  ])

  return environment
}

export const askCommand = async (): Promise<DbCommand> => {
  const { command } = await inquirer.prompt<{ command: DbCommand }>([
    {
      type: "list",
      name: "command",
      message: "Select the command to run:",
      choices: dbCommands,
    },
  ])

  return command
}

const SECONDS_DELAY = 3
export const countdown = async (environment: Environment): Promise<void> => {
  if (environment === "local") {
    return
  }

  for (let i = SECONDS_DELAY; i > 0; i--) {
    console.log(`Starting in ${i}...`)
    await delay(1000)
  }
}

const getPostgresConfigs = (
  environment: Environment,
  env: Configs["env"],
): SqlConfigs => {
  const partialConfigs = match<Environment, Partial<SqlConfigs>>(environment)
    .with("local", () => ({
      host: env.POSTGRES_HOST,
      port: env.POSTGRES_PORT,
      database: env.POSTGRES_DB,
      password: env.POSTGRES_PASSWORD,
      user: env.POSTGRES_USER,
      // Targeting a local environment in a non-local environment.
      // So we are connecting to staging/production DB. Disabling SSL verification.
      ...(env.ENVIRONMENT !== "local" && environment === "local"
        ? {
            ssl: {
              rejectUnauthorized: false,
            },
          }
        : {}),
    }))
    .with("dev", () => ({
      host: env.DEV_POSTGRES_HOST,
      port: env.DEV_POSTGRES_PORT,
      database: env.DEV_POSTGRES_DB,
      password: env.DEV_POSTGRES_PASSWORD,
      user: env.DEV_POSTGRES_USER,
      ssl: {
        rejectUnauthorized: false,
      },
    }))
    .with("qua", () => ({
      host: env.QUA_POSTGRES_HOST,
      port: env.QUA_POSTGRES_PORT,
      database: env.QUA_POSTGRES_DB,
      password: env.QUA_POSTGRES_PASSWORD,
      user: env.QUA_POSTGRES_USER,
      ssl: {
        rejectUnauthorized: false,
      },
    }))
    .with("production", () => ({
      host: env.PRODUCTION_POSTGRES_HOST,
      port: env.PRODUCTION_POSTGRES_PORT,
      database: env.PRODUCTION_POSTGRES_DB,
      password: env.PRODUCTION_POSTGRES_PASSWORD,
      user: env.PRODUCTION_POSTGRES_USER,
      ssl: {
        rejectUnauthorized: false,
      },
    }))
    .exhaustive()

  assertContainsValue(partialConfigs, "host")
  assertContainsValue(partialConfigs, "port")
  assertContainsValue(partialConfigs, "database")
  assertContainsValue(partialConfigs, "password")
  assertContainsValue(partialConfigs, "user")

  return partialConfigs as SqlConfigs
}

const getTunnel = async (
  environment: Environment,
  env: Configs["env"],
  sqlConfigs: SqlConfigs,
): Promise<Tunnel | null> => {
  if (environment === "local") {
    return null
  }

  const sshOptions = match<Environment, SshOptions>(environment)
    .with("local", () => null)
    .with("dev", () => ({
      host: env.DEV_BASTION_HOST,
      username: env.DEV_BASTION_USER,
      privateKey: readFileSync(env.DEV_BASTION_KEY_PATH!),
    }))
    .with("qua", () => ({
      host: env.QUA_BASTION_HOST,
      username: env.QUA_BASTION_USER,
      privateKey: readFileSync(env.QUA_BASTION_KEY_PATH!),
    }))
    .with("production", () => ({
      host: env.PRODUCTION_BASTION_HOST,
      username: env.PRODUCTION_BASTION_USER,
      privateKey: readFileSync(env.PRODUCTION_BASTION_KEY_PATH!),
    }))
    .exhaustive()

  assertContainsValue(sshOptions, "host")
  assertContainsValue(sshOptions, "username")
  assertContainsValue(sshOptions, "privateKey")

  const tunnelOptions: TunnelOptions = {
    autoClose: true,
    reconnectOnError: false,
  }

  const serverOptions: ServerOptions = {
    port: TMP_PORT,
  }

  const forwardOptions: ForwardOptions = {
    dstPort: sqlConfigs.port,
    dstAddr: sqlConfigs.host,
    srcPort: TMP_PORT,
  }

  const [server, client] = await createTunnel(
    tunnelOptions,
    serverOptions,
    sshOptions,
    forwardOptions,
  )

  // now the tunnel is open and you can use the client to connect to your database
  sqlConfigs.port = TMP_PORT
  sqlConfigs.host = "localhost"

  return { server, client }
}

export const tunnelAndConnect = async (
  environment: Environment,
  env: Configs["env"],
): Promise<{
  tunnel: Tunnel | null
  postgres: ReturnType<typeof Postgres>
  drizzle: ReturnType<typeof Drizzle>
  postgresConfigs: SqlConfigs
}> => {
  const postgresConfigs = getPostgresConfigs(environment, env)
  const tunnel = await getTunnel(environment, env, postgresConfigs)

  const postgres = Postgres(postgresConfigs)
  const drizzle = Drizzle(postgres)

  return {
    postgresConfigs,
    tunnel,
    postgres,
    drizzle,
  }
}

import Postgres from "postgres"
import { container, inject, singleton } from "tsyringe"
import Configs from "$components/Configs"

@singleton()
export default class PostgresDB {
  sql: Postgres.Sql

  constructor(
    @inject(Configs.token)
    configs: Configs,
  ) {
    this.sql = Postgres({
      host: configs.env.POSTGRES_HOST,
      port: configs.env.POSTGRES_PORT,
      database: configs.env.POSTGRES_DB,
      username: configs.env.POSTGRES_USER,
      password: configs.env.POSTGRES_PASSWORD,
      onnotice: configs.env.POSTGRES_NOTICES_ENABLED ? console.log : () => {},
      ...(configs.env.ENVIRONMENT !== "local"
        ? {
            ssl: {
              rejectUnauthorized: false,
            },
          }
        : {}),
      idle_timeout: configs.env.POSTGRES_IDLE_TIMEOUT,
    })
  }

  static token = Symbol("PostgresDB")
}

container.registerSingleton(PostgresDB.token, PostgresDB)

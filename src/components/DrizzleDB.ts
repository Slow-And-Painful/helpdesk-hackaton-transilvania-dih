import { drizzle } from "drizzle-orm/postgres-js"
import { injectable, container, inject } from "tsyringe"
import PostgresDB from "$components/PostgresDB"
import Postgres from "postgres"
import QueryLogger from "$components/QueryLogger"

import * as UsersSchemas from "$dbSchemas/Users"
import * as GlobalSettingsSchemas from "$dbSchemas/GlobalSettings"
import * as CodesSchemas from "$dbSchemas/Codes"
import * as CodesUtilizationsSchemas from "$dbSchemas/CodesUtilizations"
import * as OrganizationsSchemas from "$dbSchemas/Organizations"
import * as OrganizationUsersSchemas from "$dbSchemas/OrganizationUsers"
import * as ProjectsSchemas from "$dbSchemas/Projects"
import * as DepartmentsSchemas from "$dbSchemas/Departments"

import { Logger, sql } from "drizzle-orm"

const getDrizzle = (sql: Postgres.Sql, logger?: Logger) => {
  const d = drizzle(sql, {
    logger: logger || new QueryLogger(),
    schema: {
      ...UsersSchemas,
      ...CodesSchemas,
      ...CodesUtilizationsSchemas,
      ...GlobalSettingsSchemas,
      ...OrganizationsSchemas,
      ...OrganizationUsersSchemas,
      ...ProjectsSchemas,
      ...DepartmentsSchemas
    },
  })

  return d
}

export type DrizzleWithSchemas = ReturnType<typeof getDrizzle>

@injectable()
export default class DrizzleDB {
  drizzle: DrizzleWithSchemas
  _postgresSql: Postgres.Sql
  sql: typeof sql
  public logger: QueryLogger

  constructor(
    @inject(PostgresDB.token)
    PostgresDB: PostgresDB,
    logger?: QueryLogger,
  ) {
    this.logger = logger || new QueryLogger()
    this._postgresSql = PostgresDB.sql
    this.drizzle = getDrizzle(this._postgresSql, this.logger)
    this.sql = sql
  }

  static getDrizzleDB = () => {
    const postgresDB = container.resolve<PostgresDB>(PostgresDB)
    const drizzleDB = new DrizzleDB(postgresDB)

    return drizzleDB
  }

  static token = Symbol("DrizzleDB")
}

container.register(DrizzleDB.token, DrizzleDB)

import { container } from "tsyringe"
import Configs from "$components/Configs"

import { fakerIT as faker } from "@faker-js/faker"



import UsersService from "$services/UsersService"
import PostgresDB from "$components/PostgresDB"
import { CommandHandler } from "./index"
import USER_TYPE from "$types/USER_TYPE"
import GlobalSettingsService from "$services/GlobalSettingsService"

const seed = async () => {
  const { env } = container.resolve<Configs>(Configs.token)

  if (env.SEED) {
    faker.seed(env.SEED)
  }

  const usersService = container.resolve<UsersService>(UsersService.token)
  const globalSettingsService = container.resolve<GlobalSettingsService>(GlobalSettingsService.token)

  console.log("Seeding completed.")
}

const seedCommandHandler: CommandHandler = async ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  drizzle,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  env,
  postgres,
}) => {
  // override the postgres instance in the container. Now the service will resolve this instance
  const postgresDB = container.resolve<PostgresDB>(PostgresDB.token)
  postgresDB.sql = postgres

  await seed()
}

export default seedCommandHandler

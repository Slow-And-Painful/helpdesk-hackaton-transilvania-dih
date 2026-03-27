import { container } from "tsyringe"
import Configs from "$components/Configs"

import { fakerIT as faker } from "@faker-js/faker"

import UsersService from "$services/UsersService"
import DepartmentsService from "$services/DepartmentsService"
import DepartmentUserService from "$services/DepartmentUsersService"
import TicketsService from "$services/TicketsService"
import PostgresDB from "$components/PostgresDB"
import { CommandHandler } from "./index"
import USER_TYPE from "$types/USER_TYPE"
import { TICKET_STATUS } from "$types/tickets"
import { DEPARTMENT_USER_ROLE } from "$types/departments"

const STAFF_COUNT = 10
const CUSTOMER_COUNT = 30
const DEPARTMENT_COUNT = 10
const TICKETS_PER_DEPARTMENT = 2

const seed = async () => {
  const { env } = container.resolve<Configs>(Configs.token)

  if (env.SEED) {
    faker.seed(env.SEED)
  }

  const usersService = container.resolve<UsersService>(UsersService.token)
  const departmentsService = container.resolve<DepartmentsService>(DepartmentsService.token)
  const departmentUserService = container.resolve<DepartmentUserService>(DepartmentUserService.token)
  const ticketsService = container.resolve<TicketsService>(TicketsService.token)

  // Staff users
  console.log(`Seeding ${STAFF_COUNT} staff users...`)
  await usersService.insert(
    Array.from({ length: STAFF_COUNT }, () => ({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email().toLowerCase(),
      password: "password123",
      type: USER_TYPE.STAFF,
      privacyPolicyAcceptance: true,
      termsConditionsAcceptance: true,
      emailVerified: true,
    }))
  )

  // Customer users
  console.log(`Seeding ${CUSTOMER_COUNT} customer users...`)
  const customerUsersMembers = await usersService.insert(
    Array.from({ length: CUSTOMER_COUNT }, () => ({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email().toLowerCase(),
      password: "password123",
      type: USER_TYPE.CUSTOMER,
      privacyPolicyAcceptance: true,
      termsConditionsAcceptance: true,
      emailVerified: true,
    }))
  )

  const customerUsersAdmins = await usersService.insert(
    Array.from({ length: CUSTOMER_COUNT }, () => ({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email().toLowerCase(),
      password: "password123",
      type: USER_TYPE.CUSTOMER,
      privacyPolicyAcceptance: true,
      termsConditionsAcceptance: true,
      emailVerified: true,
    }))
  )

  // Departments
  console.log(`Seeding ${DEPARTMENT_COUNT} departments...`)
  const departments = await departmentsService.insert(
    Array.from({ length: DEPARTMENT_COUNT }, () => ({
      name: faker.commerce.department(),
    }))
  )

  // Assign each staff user to a department (round-robin)
  console.log("Assigning staff to departments...")
  // await departmentUserService.insert(
  //   staffUsers.map((user, i) => ({
  //     userId: user.id,
  //     departmentId: departments[i % departments.length].id,
  //   }))
  // )

  // Assign each customer to a department (round-robin)
  console.log("Assigning member customers to departments...")
  await departmentUserService.insert(
    customerUsersMembers.map((user, i) => ({
      userId: user.id,
      departmentId: departments[i % departments.length].id,
      role: DEPARTMENT_USER_ROLE.MEMBER
    }))
  )
  console.log("Assigning admin customers to departments...")
  await departmentUserService.insert(
    customerUsersAdmins.map((user, i) => ({
      userId: user.id,
      departmentId: departments[i % departments.length].id,
      role: DEPARTMENT_USER_ROLE.ADMIN
    }))
  )

  // Tickets: TICKETS_PER_DEPARTMENT per department, sender and destination are different departments
  console.log(`Seeding ${TICKETS_PER_DEPARTMENT} tickets per department...`)
  await ticketsService.insert(
    departments.flatMap((dept, i) =>
      Array.from({ length: TICKETS_PER_DEPARTMENT }, () => {
        const destinationDept = departments[(i + 1 + Math.floor(Math.random() * (departments.length - 1))) % departments.length]
        return {
          name: faker.lorem.sentence({ min: 3, max: 6 }),
          summary: faker.lorem.paragraph(),
          senderDepartmentId: dept.id,
          destinationDepartmentId: destinationDept.id,
          status: Math.random() > 0.5 ? TICKET_STATUS.OPEN : TICKET_STATUS.CLOSED,
        }
      })
    )
  )

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

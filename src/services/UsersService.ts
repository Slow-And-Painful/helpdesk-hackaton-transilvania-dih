import BaseService, { CommonOptions, MainQuery } from "$services/BaseService"
import DrizzleDB from "$components/DrizzleDB"
import { container, delay, inject, injectable } from "tsyringe"
import { usersTable, UserSchema, NewUserSchema } from "$dbSchemas/Users"
import { eq } from "drizzle-orm"
import UsersAuthComponent from "$components/UsersAuthComponent"
import USER_TYPE from "$types/USER_TYPE"
import { USER_COLORS } from "$constants/index"

export type WithoutSensitiveData<T> = Omit<T, "password" | "salt">

export type UserSchemaWithoutSensitiveData = WithoutSensitiveData<UserSchema>


type WithUserType<T> = Omit<T, "type"> & {
  type: USER_TYPE
}

export type User = (
  WithUserType<
    UserSchemaWithoutSensitiveData
  >
)

type TABLE = typeof usersTable
type PK_TYPE = number
type MAIN_QUERY_RESULT = User
type POST_PROCESS_RESULT = User
export type PRE_INSERT_DATA = Omit<NewUserSchema, "salt">

@injectable()
export default class UsersService extends BaseService<
  TABLE,
  PK_TYPE,
  MAIN_QUERY_RESULT,
  POST_PROCESS_RESULT,
  PRE_INSERT_DATA
> {
  mainTable = usersTable
  pk = usersTable.id
  allowedSearchField = ["firstName", "lastName", "email"]
  allowedFilters = { type: "string", blocked: "boolean", id: "string" } as Record<string, "string" | "boolean">

  constructor(
    @inject(delay(() => UsersAuthComponent))
    private usersAuthComponent: UsersAuthComponent,

    @inject(DrizzleDB.token)
    drizzleDB: DrizzleDB
  ) {
    super(drizzleDB)
  }

  mainQuery: MainQuery<MAIN_QUERY_RESULT> = async ({ db, ...options }) => {
    return db.query.usersTable.findMany({
      ...options,
      columns: {
        password: false,
        salt: false,
      },
    })
  }

  preInsertProcess = async (rawInserts: PRE_INSERT_DATA[]) => {
    return rawInserts.map((e) => {
      const salt = UsersAuthComponent.generateSalt()
      const color = USER_COLORS[Math.floor(Math.random() * USER_COLORS.length)]

      const email = e.email.trim().toLowerCase()

      if (e.password) {
        e.password = this.usersAuthComponent.hashPassword({
          password: e.password,
          salt,
        })
      }

      return {
        ...e,
        salt,
        color,
        email
      }
    })
  }

  getUserByEmail = async (email: string, options?: CommonOptions<User>): Promise<User | null> => {
    const [user] = await this.list({
      ...options,
      skipBaseWhere: true,
      where: eq(this.mainTable.email, email.trim().toLowerCase()),
    })

    return user || null
  }

  getUserByEmailOrFail = async (email: string): Promise<User> => {
    const user = await this.getUserByEmail(email)
    if (!user) {
      throw new Error("User not found")
    }

    return user
  }

  updatePassword = async (
    userId: number,
    password: string,
    options?: CommonOptions<MAIN_QUERY_RESULT>,
  ) => {
    const salt = UsersAuthComponent.generateSalt()
    const hashedPassword = this.usersAuthComponent.hashPassword({
      password,
      salt,
    })

    await this.update(
      userId,
      {
        password: hashedPassword,
        salt,
      },
      options,
    )
  }

  static token = Symbol("UsersService")
}

container.register(UsersService.token, UsersService)

import * as crypto from "crypto"
import { container, delay, inject, injectable } from "tsyringe"
import DrizzleDB from "./DrizzleDB"
import * as usersSchemas from "$dbSchemas/Users"
import { eq } from "drizzle-orm"
import Configs from "./Configs"
import USER_TYPE from "$types/USER_TYPE"
import UsersService, { User } from "$services/UsersService"

export enum VERIFY_CREDENTIALS_RESULT_REASON {
  PASSWORD_MISMATCH = "PASSWORD_MISMATCH",
  USER_NOT_FOUND = "USER_NOT_FOUND",
  ACCOUNT_DELETED = "ACCOUNT_DELETED",
  NOT_VERIFIED = "NOT_VERIFIED",
  ACCOUNT_BLOCKED = "ACCOUNT_BLOCKED",
  CUSTOMER_WITHOUT_ORGANIZATION = "CUSTOMER_WITHOUT_ORGANIZATION",
  ORGANIZATION_BLOCKED = "ORGANIZATION_BLOCKED",
  ACCOUNT_CREATION_NOT_COMPLETE = "ACCOUNT_CREATION_NOT_COMPLETE"
}

type VerifyCredentialsResult =
  | {
      valid: true
      reason: null
      user: User
    }
  | {
      valid: false
      reason: VERIFY_CREDENTIALS_RESULT_REASON.PASSWORD_MISMATCH
      user: User
    }
  | {
      valid: false
      reason: VERIFY_CREDENTIALS_RESULT_REASON.USER_NOT_FOUND
      user: null
    }
  | {
      valid: false
      reason: VERIFY_CREDENTIALS_RESULT_REASON.ACCOUNT_DELETED
      user: User
    }
  | {
      valid: false
      reason: VERIFY_CREDENTIALS_RESULT_REASON.NOT_VERIFIED
      user: User
    }
  | {
      valid: false
      reason: VERIFY_CREDENTIALS_RESULT_REASON.ACCOUNT_BLOCKED
      user: User
    }
  | {
      valid: false
      reason: VERIFY_CREDENTIALS_RESULT_REASON.CUSTOMER_WITHOUT_ORGANIZATION
      user: User
    }
  | {
      valid: false
      reason: VERIFY_CREDENTIALS_RESULT_REASON.ORGANIZATION_BLOCKED
      user: User
    }
  | {
    valid: false
    reason: VERIFY_CREDENTIALS_RESULT_REASON.ACCOUNT_CREATION_NOT_COMPLETE,
    user: User
  }

@injectable()
export default class UsersAuthComponent {
  private pepper: string

  constructor(
    @inject(DrizzleDB.token)
    private drizzleDB: DrizzleDB,
    @inject(Configs.token)
    private configs: Configs,
    @inject(delay(() => UsersService))
    private usersService: UsersService
  ) {
    this.pepper = this.configs.env.AUTH_USER_PASSWORD_PEPPER
  }

  verifyCredentials = async (options: {
    email: string
    password: string
  }): Promise<VerifyCredentialsResult> => {
    const { email, password } = options
    const db = this.drizzleDB.drizzle
    const usersTable = usersSchemas.usersTable

    const [userCredentials] = await db
      .select({
        id: usersTable.id,
        password: usersTable.password,
        salt: usersTable.salt
      })
      .from(usersTable)
      .where(eq(usersTable.email, email))

    if (!userCredentials) {
      return {
        valid: false,
        reason: VERIFY_CREDENTIALS_RESULT_REASON.USER_NOT_FOUND,
        user: null,
      }
    }

    const user = await this.usersService.getOrFail(userCredentials.id)

    if (!userCredentials.password) {
      return {
        valid: false,
        reason: VERIFY_CREDENTIALS_RESULT_REASON.ACCOUNT_CREATION_NOT_COMPLETE,
        user
      }
    }

    const hashedPassword = UsersAuthComponent.hashPassword({
      password,
      salt: userCredentials.salt,
      pepper: this.pepper,
    })


    if (hashedPassword !== userCredentials.password) {
      return {
        valid: false,
        reason: VERIFY_CREDENTIALS_RESULT_REASON.PASSWORD_MISMATCH,
        user,
      }
    }

    if (user.deleted) {
      return {
        valid: false,
        reason: VERIFY_CREDENTIALS_RESULT_REASON.ACCOUNT_DELETED,
        user,
      }
    }

    if (user.blocked) {
      return {
        valid: false,
        reason: VERIFY_CREDENTIALS_RESULT_REASON.ACCOUNT_BLOCKED,
        user,
      }
    }

    if (!user.emailVerified) {
      return {
        valid: false,
        reason: VERIFY_CREDENTIALS_RESULT_REASON.NOT_VERIFIED,
        user,
      }
    }

    if (user.type === USER_TYPE.CUSTOMER) {
      const organizations = user.organizations

      if (!organizations.length) {
        return {
          valid: false,
          reason: VERIFY_CREDENTIALS_RESULT_REASON.CUSTOMER_WITHOUT_ORGANIZATION,
          user,
        }
      }
    }

    return {
      valid: true,
      reason: null,
      user,
    }
  }

  hashPassword = (options: { password: string; salt: string }): string => {
    const { password, salt } = options
    return UsersAuthComponent.hashPassword({
      password,
      salt,
      pepper: this.pepper,
    })
  }

  static randomString = (length: number = 10): string => {
    return crypto
      .randomBytes(Math.ceil(length / 2))
      .toString("hex")
      .slice(0, length)
  }

  static generateSalt(length: number = 10): string {
    return UsersAuthComponent.randomString(length)
  }

  static hashPassword(options: {
    password: string
    salt: string
    pepper: string
  }): string {
    const { password, salt, pepper } = options
    const combinedString = pepper + password + salt
    const hash = crypto.createHash("sha256")
    hash.update(combinedString)
    return hash.digest("hex")
  }

  static token = Symbol("UsersAuthComponent")
}

container.register(UsersAuthComponent.token, UsersAuthComponent)

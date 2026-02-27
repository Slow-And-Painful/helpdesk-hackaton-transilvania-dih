import BaseService, { CommonOptions, MainQuery } from "./BaseService"
import { CODE_TYPE, CodeSchema, codesTable, NewCodeSchema } from "$dbSchemas/Codes"
import { container, injectable, inject } from "tsyringe"
import DrizzleDB from "$components/DrizzleDB"
import { CodesUtilizationSchema } from "$dbSchemas/CodesUtilizations"
import CodesUtilizationsService from "./CodesUtilizationsService"
import { eq, inArray } from "drizzle-orm"
import { UserSchemaWithoutSensitiveData } from "./UsersService"
import { match } from "ts-pattern"

type WithCodeUtilizations<T> = T & {
  utilizations: CodesUtilizationSchema[]
}

type WithAnnotations<T> = T & {
  uses: number
  isExpired: boolean
  isUsed: boolean
  isValid: boolean
}

type WithTarget<T> = T & {
  targetUser: UserSchemaWithoutSensitiveData | null
}

export type SpecificCode<T extends CodeSchema> = T & ({
  type: CODE_TYPE.CONFIRM_EMAIL,
  targetUserId: number,
  targetUser: UserSchemaWithoutSensitiveData
} | {
  type: CODE_TYPE.COMPLETE_CUSTOMER_ACCOUNT,
  targetUserId: number,
  targetUser: UserSchemaWithoutSensitiveData
} | {
  type: CODE_TYPE.RESET_PASSWORD,
  targetUserId: number,
  targetUser: UserSchemaWithoutSensitiveData
} | {
  type: CODE_TYPE.LOGIN
  targetUserId: number
  targetUser: UserSchemaWithoutSensitiveData
})

type TABLE = typeof codesTable
type PK_TYPE = number
export type MAIN_QUERY_RESULT = WithTarget<WithCodeUtilizations<CodeSchema>>
type POST_PROCESS_RESULT = SpecificCode<WithAnnotations<MAIN_QUERY_RESULT>>
type PRE_INSERT_DATA = NewCodeSchema
export type Code = POST_PROCESS_RESULT

@injectable()
export default class CodesService extends BaseService<
  TABLE,
  PK_TYPE,
  MAIN_QUERY_RESULT,
  POST_PROCESS_RESULT,
  PRE_INSERT_DATA
> {
  pk = codesTable.id
  mainTable = codesTable

  constructor(
    @inject(DrizzleDB.token)
    private drizzleDB: DrizzleDB,
    @inject(CodesUtilizationsService.token)
    public codesUtilizationsService: CodesUtilizationsService,
  ) {
    super(drizzleDB)
  }

  mainQuery: MainQuery<MAIN_QUERY_RESULT> = async ({ db, ...options }) => {
    return db.query.codesTable.findMany({
      ...options,
      with: {
        utilizations: true,
        targetUser: {
          columns: {
            password: false,
            salt: false,
          }
        }
      },
    })
  }

  _addAnnotations = <T extends MAIN_QUERY_RESULT>(
    codes: T[],
    _options?: CommonOptions<MAIN_QUERY_RESULT>,
  ): WithAnnotations<T>[] => {
    if (codes.length === 0) {
      return []
    }

    return codes.map(code => {
      const uses = code.utilizations.length
      const isExpired = code.expirationTimestamp !== null && new Date() >= code.expirationTimestamp
      const isUsed = code.maximumUses !== null && uses >= code.maximumUses
      const isValid = !isExpired && !isUsed && code.isActive

      return {
        ...code,
        uses,
        isExpired,
        isUsed,
        isValid 
      }
    })
  }

  _specializeCode = <T extends MAIN_QUERY_RESULT>(
    codes: T[],
    _options?: CommonOptions<MAIN_QUERY_RESULT>,
  ): SpecificCode<T>[] => {
    return codes.map(c => (
      match(c as MAIN_QUERY_RESULT)
        .with(
          { type: CODE_TYPE.CONFIRM_EMAIL},
          { type: CODE_TYPE.RESET_PASSWORD},
          (code) => {
            if (!code.targetUserId || !code.targetUser) {
              throw new Error(`Malformed code ${c.id}: expect a targetUserId in code of type ${code.type}`)
            }

            return {
              ...code,
              targetUserId: code.targetUserId,
              targetUser: code.targetUser,
            }
          }
        )
        .with(
          { type: CODE_TYPE.COMPLETE_CUSTOMER_ACCOUNT },
          (code) => {
            if (!code.targetUserId || !code.targetUser) {
              throw new Error(`Malformed code ${c.id}: expect a targetUserId and organizationId in code of type ${code.type}`)
            }

            return {
              ...code,
              targetUserId: code.targetUserId,
              targetUser: code.targetUser
            }
          }
        )
        .with(
          { type: CODE_TYPE.LOGIN },
          (code) => {
            if (!code.targetUserId || !code.targetUser) {
              throw new Error(`Malformed code ${c.id}: expect a targetUserId in code of type ${code.type}`)
            }

            return {
              ...code,
              targetUserId: code.targetUserId,
              targetUser: code.targetUser,
            }
          }
        )
        .exhaustive()
    ))
  }

  postProcess = async (
    codes: MAIN_QUERY_RESULT[],
    options?: CommonOptions<MAIN_QUERY_RESULT>,
  ) => {
    return this._specializeCode(
      this._addAnnotations(codes, options),
      options
    )
  }

  getByCodeValue = async (
    codeValue: string,
    options?: CommonOptions<MAIN_QUERY_RESULT>,
  ): Promise<(Code) | null> => {
    const [code] = await this.list({
      transaction: options?.transaction,
      where: eq(this.mainTable.code, codeValue),
    })

    return code || null
  }

  use = async (
    parameters: (
      | { codeId: number }
      | { codeValue: string }
    ) & {
      userId?: number
      options?: CommonOptions<MAIN_QUERY_RESULT>
    },
  ) => {
    const { userId, options } = parameters

    let codeId

    if ("codeValue" in parameters) {
      codeId = (await this.getByCodeValue(parameters.codeValue, options))!.id
    } else {
      codeId = parameters.codeId
    }

    await this.codesUtilizationsService.insert({
      codeId,
      userId,
    })
  }

  disableCodes = async (params: {
    options?: CommonOptions<MAIN_QUERY_RESULT>
  } & (
    { codeIds: number[] } | { codeValues: string[] }
  )) => {
    const { options } = params

    const db = options?.transaction || this.drizzle

    const filter =
      "codeIds" in params
        ? inArray(this.mainTable.id, params.codeIds)
        : inArray(this.mainTable.code, params.codeValues)

    await db
      .update(this.mainTable)
      .set({
        isActive: false,
        lastEditTimestamp: new Date(),
      })
      .where(filter)
  }

  static token = Symbol("CodesService")
}

container.register(CodesService.token, CodesService)

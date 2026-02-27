import crypto from "crypto"
import { container, inject, injectable } from "tsyringe"
import * as codesSchemas from "$dbSchemas/Codes"
import DrizzleDB, { DrizzleWithSchemas } from "./DrizzleDB"
import CodesService, {
  Code
} from "$services/CodesService"
import { CommonTransaction } from "$services/BaseService"
import { and, eq } from "drizzle-orm"

export enum GET_CODE_FAILURE {
  CODE_NOT_FOUND,
}

export enum VERIFY_CODE_RESULT_REASON {
  CODE_NOT_ACTIVE,
  CODE_EXPIRED,
  CODE_EXCEEDS_MAX_USES,
}

export const MESSAGES: Record<
  VERIFY_CODE_RESULT_REASON,
  { title: string; description: string }
> = {
  [VERIFY_CODE_RESULT_REASON.CODE_EXCEEDS_MAX_USES]: {
    title: "Code already used",
    description: "The code has already been used, request a new one",
  },
  [VERIFY_CODE_RESULT_REASON.CODE_EXPIRED]: {
    title: "Code expired",
    description: "The code has expired, request a new one",
  },
  [VERIFY_CODE_RESULT_REASON.CODE_NOT_ACTIVE]: {
    title: "Code disabled",
    description: "The code has been disabled, request a new one",
  },
}

type VerifyCodeResult =
  | {
      valid: true
      reason: null
    }
  | {
      valid: false
      reason: VERIFY_CODE_RESULT_REASON.CODE_NOT_ACTIVE
    }
  | {
      valid: false
      reason: VERIFY_CODE_RESULT_REASON.CODE_EXPIRED
    }
  | {
      valid: false
      reason: VERIFY_CODE_RESULT_REASON.CODE_EXCEEDS_MAX_USES
    }

type UseCodeResult =
  | VerifyCodeResult
  | {
      valid: false
      reason: GET_CODE_FAILURE.CODE_NOT_FOUND
    }

@injectable()
export default class CodesComponent {
  db: DrizzleWithSchemas
  schema = codesSchemas

  constructor(
    @inject(DrizzleDB.token)
    private drizzleDB: DrizzleDB,
    @inject(CodesService.token)
    private codesService: CodesService,
  ) {
    this.db = this.drizzleDB.drizzle
  }

  getCode = async (options: {
    transaction?: CommonTransaction
    resources: (
      | {
          codeId: number
        }
      | {
          codeValue: string
        }
    ) & {
      validate?: boolean
    }
  }): Promise<Code | null> => {
    const { transaction, resources } = options

    if ("codeId" in resources) {
      return await this.codesService.get(resources.codeId, { transaction })
    } else {
      return await this.codesService.getByCodeValue(resources.codeValue, {
        transaction,
      })
    }
  }

  validateCode = (
    code: Code,
  ): VerifyCodeResult => {
    if (code.isExpired) {
      return {
        valid: false,
        reason: VERIFY_CODE_RESULT_REASON.CODE_EXPIRED,
      }
    }

    if (code.isUsed) {
      return {
        valid: false,
        reason: VERIFY_CODE_RESULT_REASON.CODE_EXCEEDS_MAX_USES,
      }
    }

    if (!code.isActive) {
      return {
        valid: false,
        reason: VERIFY_CODE_RESULT_REASON.CODE_NOT_ACTIVE,
      }
    }

    return {
      valid: true,
      reason: null,
    }
  }

  private _randomCodeGenerator = (): string =>
    crypto.randomBytes(10).toString("hex").toUpperCase()

  generateCode = async (
    transaction?: CommonTransaction,
    generatorFunc?: () => string,
  ): Promise<string> => {
    let codeValue: string

    const generatorFn = generatorFunc || this._randomCodeGenerator

    for (;;) {
      codeValue = generatorFn()
      if (!(await this.getCode({ transaction, resources: { codeValue } }))) {
        break
      }
    }

    return codeValue
  }

  createCode = async (options: {
    code: codesSchemas.NewCodeSchema
    transaction?: CommonTransaction
  }): Promise<Code> => {
    const { code, transaction } = options
    return await this.codesService.insert(code, { transaction })
  }

  useCode = async (options: {
    transaction?: CommonTransaction
    resources: (
      | {
          codeId: number
        }
      | {
          codeValue: string
        }
    ) & {
      userId?: number
    }
  }): Promise<UseCodeResult> => {
    const {
      transaction,
      resources: { userId, ...getCodeParameters },
    } = options

    const code = await this.getCode({
      transaction,
      resources: getCodeParameters,
    })
    
    if (!code) {
      return {
        valid: false,
        reason: GET_CODE_FAILURE.CODE_NOT_FOUND,
      }
    }

    const validation = this.validateCode(code)
    if (!validation.valid) {
      return validation
    }

    await this.codesService.use({
      codeId: code.id,
      userId,
      options: { transaction },
    })

    return {
      valid: true,
      reason: null,
    }
  }

  disableCodes = async (options: {
    transaction?: CommonTransaction
  } & (
    | { codeIds: number[] } 
    | { codeValues: string[] }
  )): Promise<void> => {
    return this.codesService.disableCodes(options)
  }

  listActiveUserCodes = async (userId: number, transaction?: CommonTransaction): Promise<Code[]> => {
    return await this.codesService.list({
      transaction,
      where: and(
        eq(this.codesService.mainTable.targetUserId, userId),
        eq(this.codesService.mainTable.isActive, true)
      )
    })
  }

  static token = Symbol("CodesComponent")
}

container.register(CodesComponent.token, CodesComponent)

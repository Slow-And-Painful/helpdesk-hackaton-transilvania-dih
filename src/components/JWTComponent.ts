import jwt from "jsonwebtoken"
import { container, inject, singleton } from "tsyringe"
import Configs from "./Configs"

export enum TOKEN_TYPE {
  LAMBDA_INVOCATION_TOKEN = "LAMBDA_INVOCATION_TOKEN",
  SSE_LOGIN = "SSE_LOGIN",
  LANDING_COOKIE_LOGIN = "LANDING_COOKIE_LOGIN",
  LANDING_SSO = "LANDING_SSO",
}

export type JWTLandingCookieLoginPayload = {
  type: TOKEN_TYPE.LANDING_COOKIE_LOGIN,
  tenant: string,
}

export type JWTLandingSSOPayload = {
  type: TOKEN_TYPE.LANDING_SSO,
  userId: number,
  tenant: string
}

export type JWTCommonPayload = { iat: number, exp: number }
export type JWTSpecificPayload = {
  type: TOKEN_TYPE
} & ({
  type: TOKEN_TYPE.LAMBDA_INVOCATION_TOKEN,
  toolInstanceId: number,
  callerUserId: number
  projectId: number,
  organizationId: number,
  isDraft: boolean
} | {
  type: TOKEN_TYPE.SSE_LOGIN,
  callerUserId: number
  authenticatedUserId: number
  organizationId: number
} 
  | JWTLandingSSOPayload 
  | JWTLandingCookieLoginPayload
)

export type JWTPayload = JWTCommonPayload & JWTSpecificPayload

export type JWTGenericPayload = Record<string, string | number | boolean | undefined>

@singleton()
class JWTComponent {
  #secret: string

  constructor(
    @inject(Configs.token)
    configs: Configs
  ) {
    this.#secret = configs.env.JWT_SECRET
  }

  private _generateSecret = (payload: JWTGenericPayload): string => `${this.#secret}${Object.values(payload).filter(e => !!e).map(e => e!.toString()).sort().join("-")}${this.#secret}`

  private _formatTimestamp = (timestamp: number): number => Number(timestamp.toString().substr(0, 10))

  sign(payload: JWTSpecificPayload, expirationTime?: number): string {
    const now = new Date().getTime()

    let exp
    if (expirationTime) {
      exp = this._formatTimestamp(now + expirationTime)
    }

    return jwt.sign(payload, this._generateSecret({
      ...payload,
      iat: this._formatTimestamp(now),
      exp
    }))
  }

  decode<Payload extends JWTSpecificPayload>(token: string, type: Payload["type"]): (Payload & JWTCommonPayload) {
    let payload: Payload & JWTCommonPayload

    try {
      payload = jwt.decode(token, { json: true }) as Payload & JWTCommonPayload
    } catch (_) {
      throw new Error("Invalid token")
    }

    if (!payload || (type && payload.type !== type)) {
      throw new Error("Invalid token")
    }

    try {
      jwt.verify(token, this._generateSecret(payload))
    } catch (err) {
      const error = err as { name: string }
      if (error.name === "TokenExpiredError") {
        throw new Error("Expired token")
      } else {
        throw new Error("Invalid token")
      }
    }

    return payload
  }

  static token = Symbol("JWTComponent")
}

container.registerSingleton(JWTComponent.token, JWTComponent)

export default JWTComponent

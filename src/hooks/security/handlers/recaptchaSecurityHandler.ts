import { FastifyReply, FastifyRequest } from "fastify"
import { HandlerFunction, HandlerResponse } from "$types/hook"
import RecaptchaComponent from "$components/RecaptchaComponent"
import { container } from "tsyringe"
import Configs from "$components/Configs"

const recaptchaComponent = container.resolve<RecaptchaComponent>(
  RecaptchaComponent.symbol,
)

const { env } = container.resolve<Configs>(Configs.token)

const recaptchaSecurityHandler: HandlerFunction = async (
  req: FastifyRequest,
  _res: FastifyReply,
): Promise<HandlerResponse> => {
  if (!env.RECAPTCHA_ACTIVE) {
    return { valid: true }
  }

  if (!req.headers["recaptcha-token"]) {
    return { valid: false }
  }

  const recaptchaToken = req.headers["recaptcha-token"] as string

  const valid = await recaptchaComponent.verifyToken({
    token: recaptchaToken,
    throwOnError: false,
  })

  return { valid }
}

export default recaptchaSecurityHandler

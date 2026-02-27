import { OpenapiHookObject, HandlerFunction } from "$types/hook"
import { FastifyReply, FastifyRequest } from "fastify"
import ApiExtendedError from "$utils/ApiExtendedError"
import ERROR_CODE from "$types/ERROR_CODE"

const extractSecurity = (req: FastifyRequest): OpenapiHookObject => {
  const out: OpenapiHookObject = []

  if (req.routeOptions.config.security?.apiKey) {
    out.push({ apiKey: [] })
  }

  if (req.routeOptions.config.security?.basicAuth) {
    out.push({ basicAuth: [] })
  }

  if (req.routeOptions.config.security?.toolInstanceToken) {
    out.push({ toolInstanceToken: [] })
  }

  if (req.routeOptions.config.security?.session) {
    out.push({ session: [req.routeOptions.config.security.session] })
  }

  if (req.routeOptions.config.security?.recaptcha) {
    out.push({ recaptcha: [] })
  }

  return out
}

export default (securityHandlers: Record<string, HandlerFunction>) =>
  async (req: FastifyRequest, reply: FastifyReply): Promise<void> => {
    const additionalSecurity = extractSecurity(req)
    const securitySchema = (req.routeOptions?.schema?.security || []).concat(
      additionalSecurity,
    )

    const skipSecurity = securitySchema.length === 0
    if (skipSecurity) {
      return
    }
    let hasEmptySecurity = false
    Object.entries(securitySchema).forEach(([_, value]) => {
      if (Object.entries(value).length === 0) {
        hasEmptySecurity = true
      }
    })

    // empty security ( {} ), always pass
    if (hasEmptySecurity) {
      return
    }

    // validate securities
    let securityPassed = false

    let additionalData

    for (const i in securitySchema) {
      const security = securitySchema[i]
      let partialPassed = true

      for (const [securityKey, scopes] of Object.entries(security)) {
        const securityHandler = securityHandlers[securityKey]
        const { valid, metaData } = await securityHandler(req, reply, scopes)

        partialPassed = partialPassed && valid
        if (!partialPassed && reply.sent) {
          return
        }

        if (metaData) {
          additionalData = metaData
        }
      }

      if (partialPassed) {
        securityPassed = true
        break
      }
    }

    if (!securityPassed && !additionalData) {
      throw new ApiExtendedError(ERROR_CODE.FORBIDDEN, "Security check failed")
    }

    if (!securityPassed && additionalData) {
      throw new ApiExtendedError(
        ERROR_CODE.FORBIDDEN,
        "Security check failed",
        additionalData,
      )
    }

    return
  }

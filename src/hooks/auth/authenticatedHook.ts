import { OpenapiHookObject, HandlerFunction } from "$types/hook"
import { FastifyReply, FastifyRequest } from "fastify"
import { isHtmxRequest } from "$routers/website/utils"

const extractAuth = (req: FastifyRequest): OpenapiHookObject => {
  const out: OpenapiHookObject = []

  if (req.routeOptions.config.authenticated == true) {
    out.push({ authenticated: [] })
  }

  if (req.routeOptions.config.authenticated == false) {
    out.push({ notAuthenticated: [] })
  }

  if (req.routeOptions.config.isStaff == true) {
    out.push({ staff: [] })
  }

  return out
}

export default (authenticatedHandlers: Record<string, HandlerFunction>) =>
  async (req: FastifyRequest, res: FastifyReply): Promise<void> => {
    const authSchema = extractAuth(req)
    const skipAuth = authSchema.length === 0
    if (skipAuth) {
      return
    }

    let hasEmptyAuth = false

    Object.entries(authSchema).forEach(([_, value]) => {
      if (Object.entries(value).length === 0) {
        hasEmptyAuth = true
      }
    })

    // empty auth ( {} ), always pass
    if (hasEmptyAuth) {
      return
    }

    // validate auth
    let authPassed = false
    let returnPath = "/"

    for (const i in authSchema) {
      const auth = authSchema[i]
      let partialPassed = true

      for (const [authKey, scopes] of Object.entries(auth)) {
        const authenticatedHandler = authenticatedHandlers[authKey]
        const { valid, metaData } = await authenticatedHandler(req, res, scopes)

        if (metaData?.returnPath) {
          returnPath = metaData.returnPath
        }

        partialPassed = partialPassed && valid
        if (!partialPassed && res.sent) {
          return
        }
      }

      if (partialPassed) {
        authPassed = true
        break
      }
    }

    if (!authPassed) {
      if (isHtmxRequest(req)) {
        return res.header("HX-Redirect", returnPath).send()
      } else {
        return res.redirect(returnPath)
      }
    }

    return
  }

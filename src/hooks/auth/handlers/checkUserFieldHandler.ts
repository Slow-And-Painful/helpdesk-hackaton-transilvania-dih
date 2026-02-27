import { FastifyReply, FastifyRequest } from "fastify"
import { HandlerFunction, HandlerResponse } from "$types/hook"
import authenticatedUserHandler from "$hooks/auth/handlers/authenticatedUserHandler"
import { getViewPath } from "$routers/website/utils"
import { User } from "$services/UsersService"

const checkUserFieldHandler: (
  field: keyof User,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  requiredValue: any,
  redirectPath?: string,
) => HandlerFunction = (field, requiredValue, redirectPath) => {
  return async (
    req: FastifyRequest,
    reply: FastifyReply,
    scopes,
  ): Promise<HandlerResponse> => {
    const { valid } = await authenticatedUserHandler(req, reply, scopes)
    const returnPath = redirectPath ?? getViewPath("public", "HOME")

    if (!valid) {
      return { valid: false, metaData: { returnPath } }
    }

    const callerUser = req.callerUser
    if (callerUser === null) {
      return { valid: false, metaData: { returnPath } }
    }

    return {
      valid: callerUser[field] == requiredValue,
      metaData: { returnPath },
    }
  }
}

export default checkUserFieldHandler
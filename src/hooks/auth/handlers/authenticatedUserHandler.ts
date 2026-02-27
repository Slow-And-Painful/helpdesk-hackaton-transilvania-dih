import { FastifyReply, FastifyRequest } from "fastify"
import { HandlerFunction, HandlerResponse } from "$types/hook"
import { getViewPath } from "$routers/website/utils"
import USER_TYPE from "$types/USER_TYPE"

const authenticatedUserHandler: HandlerFunction = async (
  req: FastifyRequest,
  _: FastifyReply,
): Promise<HandlerResponse> => {
  const callerUser = req.callerUser
  const returnPath = getViewPath("auth", "LOGIN", {})

  if (!callerUser) {
    return { valid: false, metaData: { returnPath } }
  }

  if (callerUser && callerUser.type === USER_TYPE.CUSTOMER) {
    // organization checks
  }

  if (await req.services.usersService.getOrFail(callerUser.id)) {
    if (!callerUser.blocked) {
      return { valid: true }
    } else {
      await req.session.destroy()
    }
  }
  return { valid: false, metaData: { returnPath } }
}

export default authenticatedUserHandler
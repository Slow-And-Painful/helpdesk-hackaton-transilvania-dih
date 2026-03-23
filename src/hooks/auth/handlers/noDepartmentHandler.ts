import { FastifyReply, FastifyRequest } from "fastify"
import { HandlerFunction, HandlerResponse } from "$types/hook"
import { getViewPath } from "$routers/website/utils"

const noDepartmentHandler: HandlerFunction = async (
  req: FastifyRequest,
  _: FastifyReply,
): Promise<HandlerResponse> => {
  const returnPath = getViewPath("waitingRoom", "WAITING_ROOM")

  if (!req.callerUser) {
    return { valid: true }
  }

  if (req.userDepartments && req.userDepartments.length > 0) {
    return { valid: true }
  }

  return { valid: false, metaData: { returnPath } }
}

export default noDepartmentHandler

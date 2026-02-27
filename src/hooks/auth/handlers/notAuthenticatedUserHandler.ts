import { FastifyReply, FastifyRequest } from "fastify"
import { HandlerFunction, HandlerResponse } from "$types/hook"
import { getViewPath } from "$routers/website/utils"

export const buildQueryString = (query: Record<string, string>): string => {
  const params = new URLSearchParams()
  Object.entries(query).forEach(([key, value]) => {
    if (value) {
      params.append(key, value)
    }
  })
  return params.toString() ? `?${params.toString()}` : ""
}

const notAuthenticatedUserHandler: HandlerFunction = async (
  req: FastifyRequest,
  _: FastifyReply,
): Promise<HandlerResponse> => {
  const callerUser = req.callerUser
  const returnPath = getViewPath("public", "HOME")

  if (!callerUser || callerUser === null) {
    return { valid: true }
  }

  return { valid: false, metaData: { returnPath } }
}

export default notAuthenticatedUserHandler
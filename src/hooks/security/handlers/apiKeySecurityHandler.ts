import { FastifyRequest } from "fastify"
import { HandlerFunction, HandlerResponse } from "$types/hook"

const apiKeySecurityHandler: HandlerFunction = async (
  req: FastifyRequest,
): Promise<HandlerResponse> => {
  const apiKey = (req.headers["authorization"] || "").replace("Bearer ", "")

  if (!apiKey) {
    return { valid: false }
  }

  // check if apiKey is valid

  return { valid: true }
}

export default apiKeySecurityHandler

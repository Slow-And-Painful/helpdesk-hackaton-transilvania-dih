import { FastifyReply, FastifyRequest } from "fastify"

export type OpenapiHookObject = {
  [hookLabel: string]: readonly string[]
}[]

export type HandlerResponse = {
  valid: boolean
  metaData?: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any
  }
}

export type HandlerFunction = (
  req: FastifyRequest,
  reply: FastifyReply,
  scopes: readonly string[],
) => Promise<HandlerResponse>

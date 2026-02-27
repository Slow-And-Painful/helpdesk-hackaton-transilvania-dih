/* eslint-disable @typescript-eslint/no-explicit-any */

import ERROR_CODE from "$types/ERROR_CODE"
import { FastifyRequest, FastifyError } from "fastify"
import { env } from "process"

export const formatJsonResponse = <T extends FastifyError = FastifyError>(
  _request: FastifyRequest,
  error: T,
) => {
  const response: {
    statusCode: number
    code: string
    message?: string
    stack?: any
    details?: any
  } = {
    statusCode: error.statusCode || 500,
    code: error.code || ERROR_CODE.INTERNAL_SERVER_ERROR,
    details: (error as { details?: any }).details,
  }

  if (response.statusCode !== 500 || env.ENVIRONMENT !== "production") {
    response.message = error.message
  }

  if (env.ENVIRONMENT !== "production") {
    response.stack = error.stack
  }

  if (error.code === "FST_ERR_VALIDATION") {
    response.details = {
      validation: error.validation,
      validationContext: error.validationContext,
    }
  }

  return response
}

import { FastifyError, FastifyReply, FastifyRequest } from "fastify"
import ApiExtendedError from "$utils/ApiExtendedError"
import UnexpectedErrorPage from "$templates/views/error-pages/500UnexpectedError"
import { BaseLayout } from "$templates/layouts"
import { formatJsonResponse } from "$utils/handlers"
import Configs from "$components/Configs"
import { getViewPath, isHtmxRequest } from "$routers/website/utils"
import Toast from "$templates/components/Toast"
import { container } from "tsyringe"

// const extractRequestData = (req: FastifyRequest): Sentry.RequestEventData => {
//   const headers = req.headers || {}
//   const originalUrl = req.originalUrl || req.url || ""
//   const protocol = req.protocol
//   const host = headers.host || req.hostname || req.host || "<no host>"
//   const absoluteUrl = originalUrl.startsWith(protocol) ? originalUrl : `${protocol}://${host}${originalUrl}`

//   return {
//     url: absoluteUrl,
//     method: req.method,
//     headers: omitSensitiveInformation<Sentry.RequestEventData["headers"]>(req.headers || {}),
//     cookies: omitSensitiveInformation<Sentry.RequestEventData["cookies"]>(req.cookies || {}),
//     query_string: omitSensitiveInformation<Sentry.RequestEventData["query_string"]>(req.query || {}),
//     data: omitSensitiveInformation<Sentry.RequestEventData["data"]>(req.body || {})
//   }

// }

const { env } = container.resolve<Configs>(Configs.token)
export default (
  error: FastifyError | ApiExtendedError,
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const user = request.callerUser
  
  const jsonResponse = formatJsonResponse(request, error)
  const statusCode = jsonResponse.statusCode

  if (statusCode >= 500) {
    console.log(jsonResponse)
  }

  if (
    statusCode >= 500 &&
    ["qua", "dev", "production"].includes(env.ENVIRONMENT)
  ) {
    // const event: Sentry.Event = {
    //   message: `${statusCode} on ${request.url} - ${error.message}`,
    //   request: extractRequestData(request),
    //   level: "error",
    //   extra: {
    //     code: jsonResponse.code,
    //     details: jsonResponse.details,
    //     stack: error.stack,
    //     body: omitSensitiveInformation(request.body),
    //   },
    // }

    // Sentry.captureEvent(event, {
    //   originalException: error,
    // })
  }

  // if (request.url.includes("/api/")) {
  //   return reply.status(statusCode).send(jsonResponse)
  // }

  // if (statusCode == 403 && element && targetFormId) {
  //   if (isHtmxRequest(request)) {
  //     return reply
  //       .status(statusCode)
  //       .headers({
  //         "HX-Retarget": `#modal`,
  //         "HX-Reswap": "beforeend",
  //       })
  //       .view(element)
  //   }

  //   return reply.status(403).send({ element, targetFormId })
  // }

  if (isHtmxRequest(request)) {
    console.log("UNEXPECTED HTMX RESPONSE", jsonResponse)

    return reply
      .status(statusCode)
      .headers({
        "HX-Retarget": "#toast",
        "HX-Reswap": "beforeend",
      })
      .view(
        <Toast
          type={"error"}
          title="Unexpected error"
          message={"An unexpected error occured. Please try again later."}
        />,
      )
  }

  if (statusCode === 403) {    
    return reply.redirect(getViewPath("auth", "LOGIN", {}))
  }

  return reply.status(500).view(
    <UnexpectedErrorPage
      user={user}
    />,
    BaseLayout
  )
}

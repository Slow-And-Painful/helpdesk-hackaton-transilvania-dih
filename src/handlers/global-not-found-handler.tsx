import { FastifyRequest, FastifyReply } from "fastify"
import PageNotFound from "$templates/views/error-pages/404PageNotFound"
import { BaseLayout } from "$templates/layouts"

export default (req: FastifyRequest, res: FastifyReply) => {
  // const jsonResponse = formatJsonResponse(req, new ApiExtendedError(ERROR_CODE.ROUTE_NOT_FOUND, "Route not found"))
  // const statusCode = jsonResponse.statusCode

  if (req.url.includes("/api/")) {
    // return res.status(statusCode).send(jsonResponse)
  }

  const user = req.authenticatedUser

  // return res.code(statusCode).view(
  //   <PageNotFound
  //     user={user}
  //   />,
  //   BaseLayout
  // )
  return res.code(404).view(
    <PageNotFound
      user={user}
    />,
    BaseLayout
  )
}

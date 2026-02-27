import { JsonSchemaFastifyInstance } from "$types"

export default (server: JsonSchemaFastifyInstance) => {
  server.route({
    method: "GET",
    url: "/health",
    schema: {
      tags: ["common"],
      operationId: "health",
      summary: "Health Check",
      response: {
        200: {
          type: "string",
        },
      },
    },
    handler: async (_req, reply) => {
      reply.send("ok")
    },
  })
}

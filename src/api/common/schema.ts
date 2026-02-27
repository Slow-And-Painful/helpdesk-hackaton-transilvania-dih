import { JsonSchemaFastifyInstance } from "$types"

export default (server: JsonSchemaFastifyInstance) => {
  server.route({
    method: "GET",
    url: "/schema",
    schema: {
      tags: ["common"],
      operationId: "schema",
      summary: "Get the OpenAPI schema",
    },
    handler: async (req, reply) => {
      const openapiDefinition = req.server.swagger()
      return reply.send(openapiDefinition)
    },
  })
}

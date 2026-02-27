import { JSONSchema7 } from "json-schema"

export const toolInstanceReportSchema = {
  type: "object",
  properties: {
    id: { type: "number" },
    name: { type: "string" },
    artifactPartialKey: { type: "string" },
    creationTimestamp: { type: "string", format: "date-time" },
    toolInstance: {
        type: "object",
        properties: {
            id: { type: "number" },
            title: { type: "string" }
        },
        required: ["id", "title"],
        additionalProperties: false
    },
    authorUser: {
        type: ["object", "null"],
        properties: {
            id: { type: "number" },
            firstName: { type: "string" },
            lastName: { type: "string" },
        },
        required: ["id", "firstName", "lastName"],
        additionalProperties: false
    }
  },
  required: [
    "id",
    "name",
    "artifactPartialKey",
    "creationTimestamp",
    "toolInstance",
    "authorUser",
  ],
  additionalProperties: false
} as const satisfies JSONSchema7
import { JSONSchema7 } from "json-schema"

// Global max
const minInt = 0
const minId = 1
const maxInt = 1_000_000_000
// Field max
const maxLimit = 50
const defaultLimit = 10
const defaultOffset = 0
const shortStringMaxLength = 255

export const limit = {
  type: "integer",
  minimum: minInt,
  maximum: maxLimit,
  default: defaultLimit,
} as const satisfies JSONSchema7

export const offset = {
  type: "integer",
  minimum: minInt,
  maximum: maxInt,
  default: defaultOffset,
} as const satisfies JSONSchema7

export const id = {
  type: "integer",
  minimum: minId,
  maximum: maxInt,
} as const satisfies JSONSchema7

export const email = {
  type: "string",
  minLength: minInt,
  maxLength: shortStringMaxLength,
} as const satisfies JSONSchema7

export const timestamp = {
  type: "string",
  format: "date-time",
} as const satisfies JSONSchema7

export const nullValue = {
  type: "null",
} as const satisfies JSONSchema7

export const nullableTimestamp = {
  oneOf: [timestamp, nullValue],
} as const satisfies JSONSchema7

export const shortString = {
  type: "string",
  maxLength: shortStringMaxLength,
} as const satisfies JSONSchema7

export const nullableShortString = {
  oneOf: [shortString, nullValue],
} as const satisfies JSONSchema7

export const name = {
  type: "string",
  minLength: minInt,
  maxLength: shortStringMaxLength,
} as const satisfies JSONSchema7

export const notEmptyShortString = {
  type: "string",
  minLength: 1,
  maxLength: shortStringMaxLength,
} as const satisfies JSONSchema7

export const listingQuerystring = {
  type: "object",
  properties: {
    page: { type: "integer" },
    search: { type: "string" },
    autoFocus: { type: "string" },
    sorter: { type: "string" },
  },
  additionalProperties: { anyOf: [
    { type: "string" },
    { type: "array", items: { type: "string" } },
  ]},
} as const satisfies JSONSchema7

export const toolInstanceState = {
  type: ["object", "array", "string", "number", "boolean", "null"]
} as const satisfies JSONSchema7

export const unknownJsonSchema = {
  type: ["object", "array", "string", "number", "boolean", "null"]
} as const satisfies JSONSchema7

export const commonSettingConfigPropertySchema = {
  type: "object",
  properties: {
    name: {
      type: "string"
    },
    description: {
      type: "string"
    },
    label: {
      type: "string"
    },
  },
  required: ["name"],
  additionalProperties: false
} as const satisfies JSONSchema7

export const numberSettingConfigSchema = {
  type: "object",
  properties: {
    ...commonSettingConfigPropertySchema.properties,
    type: {
      type: "string",
      const: "number"
    },
    default: {
      type: "number"
    },
    min: {
      type: "number"
    },
    max: {
      type: "number"
    },
    unit: {
      type: "string"
    },
    integer: {
      type: "boolean"
    }
  },
  required: [
    ...commonSettingConfigPropertySchema.required,
    "type"
  ],
} as const satisfies JSONSchema7

export const textSettingConfigSchema = {
  type: "object",
  properties: {
    ...commonSettingConfigPropertySchema.properties,
    type: {
      type: "string",
      const: "text"
    },
    default: {
      type: "string"
    },
    pattern: {
      type: "string"
    },
    minLength: {
      type: "integer"
    },
    maxLength: {
      type: "integer"
    },
  },
  required: [
    ...commonSettingConfigPropertySchema.required,
    "type"
  ]
} as const satisfies JSONSchema7

export const multipleFilesSettingConfigSchema = {
  type: "object",
  properties: {
    ...commonSettingConfigPropertySchema.properties,
    type: {
      type: "string",
      const: "multiple_files"
    },
    extensions: {
      type: "array",
      items: {
        type: "string"
      }
    },
    maxFiles: {
      type: "integer"
    }
  },
  required: [
    ...commonSettingConfigPropertySchema.required,
    "type"
  ],
} as const satisfies JSONSchema7

export const selectSettingConfigSchema = {
  type: "object",
  properties: {
    ...commonSettingConfigPropertySchema.properties,
    type: {
      type: "string",
      const: "select"
    },
    values: {
      type: "array",
      items: {
        type: "object",
        properties: {
          label: {
            type: "string"
          },
          value: {
            type: "string"
          },
        },
        required: ["label", "value"],
      },
      minItems: 1
    }
  },
  required: [
    ...commonSettingConfigPropertySchema.required,
    "type",
    "values"
  ],
} as const satisfies JSONSchema7

export const settingConfigSchema = {
  type: "array",
  items: {
    oneOf: [
      numberSettingConfigSchema,
      textSettingConfigSchema,
      multipleFilesSettingConfigSchema,
      selectSettingConfigSchema
    ]
  }
} as const satisfies JSONSchema7

export const toolManifestSchema = {
  type: "object",
  properties: {
    name: {
      type: "string"
    },
    description: {
      type: "string"
    },
    lambdaName: {
      type: "string"
    },
    sources: {
      type: "array",
      items: {
        type: "string",
        enum: ["FIGMA", "NONE"]
      }
    },
    settings: settingConfigSchema
  },
  required: ["name", "lambdaName", "sources", "settings"]
} as const satisfies JSONSchema7

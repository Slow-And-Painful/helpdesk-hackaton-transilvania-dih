import "reflect-metadata"
import { Ajv } from "ajv"
import { container, singleton } from "tsyringe"
import { FromSchema } from "json-schema-to-ts"
import { join } from "path"
import { defaultIntegerMaxValue, defaultIntegerMinValue } from "$constants/input"

const envJsonSchema = {
  type: "object",
  additionalProperties: true,
  properties: {
    PORT: { type: "number" },

    DB_MIGRATIONS_PATH: { type: "string" },
    POSTGRES_HOST: { type: "string" },
    POSTGRES_PORT: { type: "number" },
    POSTGRES_USER: { type: "string" },
    POSTGRES_PASSWORD: { type: "string" },
    POSTGRES_DB: { type: "string" },
    POSTGRES_NOTICES_ENABLED: { type: "boolean" },

    SERVER_SENTRY_DSN: { type: "string" },
    SERVER_SENTRY_VERSION: { type: "string" },
    SERVER_SENTRY_PROJECT_ID: { type: "string" },

    CLIENT_SENTRY_DSN: { type: "string" },
    CLIENT_SENTRY_VERSION: { type: "string" },
    CLIENT_SENTRY_PROJECT_ID: { type: "string" },

    DEV_POSTGRES_HOST: { type: "string" },
    DEV_POSTGRES_PORT: { type: "number" },
    DEV_POSTGRES_DB: { type: "string" },
    DEV_POSTGRES_PASSWORD: { type: "string" },
    DEV_POSTGRES_USER: { type: "string" },
    DEV_BASTION_HOST: { type: "string" },
    DEV_BASTION_KEY_PATH: { type: "string" },
    DEV_BASTION_USER: { type: "string" },

    QUA_POSTGRES_HOST: { type: "string" },
    QUA_POSTGRES_PORT: { type: "number" },
    QUA_POSTGRES_DB: { type: "string" },
    QUA_POSTGRES_PASSWORD: { type: "string" },
    QUA_POSTGRES_USER: { type: "string" },
    QUA_BASTION_HOST: { type: "string" },
    QUA_BASTION_KEY_PATH: { type: "string" },
    QUA_BASTION_USER: { type: "string" },

    PRODUCTION_POSTGRES_HOST: { type: "string" },
    PRODUCTION_POSTGRES_PORT: { type: "number" },
    PRODUCTION_POSTGRES_DB: { type: "string" },
    PRODUCTION_POSTGRES_PASSWORD: { type: "string" },
    PRODUCTION_POSTGRES_USER: { type: "string" },
    PRODUCTION_BASTION_HOST: { type: "string" },
    PRODUCTION_BASTION_KEY_PATH: { type: "string" },
    PRODUCTION_BASTION_USER: { type: "string" },

    PRODUCTION_AM_POSTGRES_HOST: { type: "string" },
    PRODUCTION_AM_POSTGRES_PORT: { type: "number" },
    PRODUCTION_AM_POSTGRES_DB: { type: "string" },
    PRODUCTION_AM_POSTGRES_PASSWORD: { type: "string" },
    PRODUCTION_AM_POSTGRES_USER: { type: "string" },
    PRODUCTION_AM_BASTION_HOST: { type: "string" },
    PRODUCTION_AM_BASTION_KEY_PATH: { type: "string" },
    PRODUCTION_AM_BASTION_USER: { type: "string" },

    ENVIRONMENT: { type: "string", enum: ["local", "dev", "qua", "production"] },
    POSTGRES_IDLE_TIMEOUT: { type: "number" },

    GRACEFUL_SHUTDOWN_TIMEOUT: { type: "number" },
    SESSION_SECRET: { type: "string" },

    RECAPTCHA_ACTIVE: { type: "boolean" },
    RECAPTCHA_V2_SECRET: { type: "string" },
    RECAPTCHA_V2_SITE_KEY: { type: "string" },
    RECAPTCHA_V3_SECRET: { type: "string" },
    RECAPTCHA_V3_SITE_KEY: { type: "string" },

    AUTH_USER_PASSWORD_PEPPER: { type: "string" },

    SEED_DEFAULT_PASSWORD: { type: "string" },
    SEED: { type: "number" },

    EMAIL_FROM: { type: "string" },
    AWS_REGION: { type: "string" },
    LOCAL_MAILHOG_HOST: { type: "string" },
    LOCAL_MAILHOG_SMTP_PORT: { type: "number" },

    APP_BASE_URL: { type: "string" },
    LAMBDA_ENDPOINT: { type: "string" },
    JWT_SECRET: { type: "string" },

    S3_ENDPOINT: { type: "string" },
    TOOL_FILES_BUCKET_NAME: { type: "string" },
    TOOL_FRONTEND_BUCKET_NAME: { type: "string" },
    TOOL_FRONTEND_LOCAL_PROXY: { type: "boolean" },

    MAX_FILE_SIZE: { type: "number" },

    BEDROCK_MODEL_ID: { type: "string" },

    DESCRIPTION_CHARACTERS_LIMIT: { type: "number" },

    EXPERIMENTAL: { type: "boolean" },

    INTEGER_MIN_VALUE: { type: "number" },
    INTEGER_MAX_VALUE: { type: "number" },

    DEFAULT_TIMEZONE: { type: "string" },

    AI_KNOWLEDGE_BUCKET_NAME: { type: "string" },

    MAX_CONCURRENT_DOCUMENT_UPLOADS: { type: "number" },
    DEFAULT_FREE_TRIAL_PLAN_ID: { type: "number" },

    SUBSCRIPTION_PLAN_MAX_MONTHLY_COST_USAGE_LIMIT: { type: "number" },
    SUBSCRIPTION_PLAN_MIN_MONTHLY_COST_USAGE_LIMIT: { type: "number" },
    USAGE_WORKING_DAYS_PER_MONTH: { type: "number" },
    USAGE_WARNING_START_PERCENTAGE: { type: "number" },

    PROXY_SERVER_PORT: { type: "number" },
    PROXY_UPSTREAM: { type: "string" },
    PROXY_BASE_URL: { type: "string" },

    LANDING_DOMAIN_WHITELIST: { type: "array", items: { type: "string" } },
  },
  required: [
    "PORT",
    "POSTGRES_HOST",
    "POSTGRES_PORT",
    "POSTGRES_USER",
    "POSTGRES_PASSWORD",
    "POSTGRES_DB",
    "POSTGRES_NOTICES_ENABLED",
    "DB_MIGRATIONS_PATH",
    "ENVIRONMENT",
    "SESSION_SECRET",
    "RECAPTCHA_ACTIVE",
    "RECAPTCHA_V2_SECRET",
    "RECAPTCHA_V2_SITE_KEY",
    "RECAPTCHA_V3_SECRET",
    "RECAPTCHA_V3_SITE_KEY",
    "AUTH_USER_PASSWORD_PEPPER",
    "EMAIL_FROM",
    "AWS_REGION",
    "APP_BASE_URL",
    "JWT_SECRET",
    "MAX_FILE_SIZE",
    "EXPERIMENTAL",
    "DEFAULT_TIMEZONE",
    "LANDING_DOMAIN_WHITELIST"
  ],
} as const

export type Env = FromSchema<typeof envJsonSchema>

@singleton()
export default class Configs {
  env: Env

  constructor() {
    const env = {
      PORT: +(process.env.PORT || "3000"),

      DB_MIGRATIONS_PATH:
        process.env.DB_MIGRATIONS_PATH || join(__dirname, "../../migrations"),
      POSTGRES_HOST: process.env.POSTGRES_HOST || "localhost",
      POSTGRES_PORT: +(process.env.POSTGRES_PORT || "5432"),
      POSTGRES_USER: process.env.POSTGRES_USER,
      POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
      POSTGRES_DB: process.env.POSTGRES_DB,
      POSTGRES_IDLE_TIMEOUT: process.env.POSTGRES_IDLE_TIMEOUT
        ? +process.env.POSTGRES_IDLE_TIMEOUT
        : undefined,
      POSTGRES_NOTICES_ENABLED:
        (process.env.POSTGRES_NOTICES_ENABLED || "false") === "true",

      SERVER_SENTRY_VERSION: process.env.SERVER_SENTRY_VERSION,
      SERVER_SENTRY_DSN: process.env.SERVER_SENTRY_DSN,
      SERVER_SENTRY_PROJECT_ID: process.env.SERVER_SENTRY_PROJECT_ID,

      CLIENT_SENTRY_VERSION: process.env.CLIENT_SENTRY_VERSION,
      CLIENT_SENTRY_DSN: process.env.CLIENT_SENTRY_DSN,
      CLIENT_SENTRY_PROJECT_ID: process.env.CLIENT_SENTRY_PROJECT_ID,

      DEV_POSTGRES_HOST: process.env.DEV_POSTGRES_HOST,
      DEV_POSTGRES_PORT: +(process.env.DEV_POSTGRES_PORT || "5432"),
      DEV_POSTGRES_USER: process.env.DEV_POSTGRES_USER,
      DEV_POSTGRES_PASSWORD: process.env.DEV_POSTGRES_PASSWORD,
      DEV_POSTGRES_DB: process.env.DEV_POSTGRES_DB,
      DEV_BASTION_HOST: process.env.DEV_BASTION_HOST,
      DEV_BASTION_USER: process.env.DEV_BASTION_USER,
      DEV_BASTION_KEY_PATH: process.env.DEV_BASTION_KEY_PATH,

      QUA_POSTGRES_HOST: process.env.QUA_POSTGRES_HOST,
      QUA_POSTGRES_PORT: +(process.env.QUA_POSTGRES_PORT || "5432"),
      QUA_POSTGRES_USER: process.env.QUA_POSTGRES_USER,
      QUA_POSTGRES_PASSWORD: process.env.QUA_POSTGRES_PASSWORD,
      QUA_POSTGRES_DB: process.env.QUA_POSTGRES_DB,
      QUA_BASTION_HOST: process.env.QUA_BASTION_HOST,
      QUA_BASTION_USER: process.env.QUA_BASTION_USER,
      QUA_BASTION_KEY_PATH: process.env.QUA_BASTION_KEY_PATH,

      PRODUCTION_POSTGRES_HOST: process.env.PRODUCTION_POSTGRES_HOST,
      PRODUCTION_POSTGRES_PORT: +(process.env.PRODUCTION_POSTGRES_PORT || "5432"),
      PRODUCTION_POSTGRES_USER: process.env.PRODUCTION_POSTGRES_USER,
      PRODUCTION_POSTGRES_PASSWORD: process.env.PRODUCTION_POSTGRES_PASSWORD,
      PRODUCTION_POSTGRES_DB: process.env.PRODUCTION_POSTGRES_DB,
      PRODUCTION_BASTION_USER: process.env.PRODUCTION_BASTION_USER,
      PRODUCTION_BASTION_KEY_PATH: process.env.PRODUCTION_BASTION_KEY_PATH,
      PRODUCTION_BASTION_HOST: process.env.PRODUCTION_BASTION_HOST,

      PRODUCTION_AM_POSTGRES_HOST: process.env.PRODUCTION_AM_POSTGRES_HOST,
      PRODUCTION_AM_POSTGRES_PORT: +(process.env.PRODUCTION_AM_POSTGRES_PORT || "5432"),
      PRODUCTION_AM_POSTGRES_USER: process.env.PRODUCTION_AM_POSTGRES_USER,
      PRODUCTION_AM_POSTGRES_PASSWORD: process.env.PRODUCTION_AM_POSTGRES_PASSWORD,
      PRODUCTION_AM_POSTGRES_DB: process.env.PRODUCTION_AM_POSTGRES_DB,
      PRODUCTION_AM_BASTION_USER: process.env.PRODUCTION_AM_BASTION_USER,
      PRODUCTION_AM_BASTION_KEY_PATH: process.env.PRODUCTION_AM_BASTION_KEY_PATH,
      PRODUCTION_AM_BASTION_HOST: process.env.PRODUCTION_AM_BASTION_HOST,

      ENVIRONMENT: process.env.ENVIRONMENT || "local",

      GRACEFUL_SHUTDOWN_TIMEOUT: +(
        process.env.GRACEFUL_SHUTDOWN_TIMEOUT || "0"
      ),
      SESSION_SECRET: process.env.SESSION_SECRET,

      RECAPTCHA_ACTIVE: process.env.RECAPTCHA_ACTIVE === "true",
      RECAPTCHA_V2_SECRET: process.env.RECAPTCHA_V2_SECRET,
      RECAPTCHA_V2_SITE_KEY: process.env.RECAPTCHA_V2_SITE_KEY,
      RECAPTCHA_V3_SECRET: process.env.RECAPTCHA_V3_SECRET,
      RECAPTCHA_V3_SITE_KEY: process.env.RECAPTCHA_V3_SITE_KEY,

      AUTH_USER_PASSWORD_PEPPER: process.env.AUTH_USER_PASSWORD_PEPPER,

      SEED_DEFAULT_PASSWORD: process.env.SEED_DEFAULT_PASSWORD || "password",

      SEED: process.env.SEED ? +process.env.SEED : Date.now(),

      EMAIL_FROM: process.env.EMAIL_FROM,
      AWS_REGION: process.env.AWS_REGION,

      LOCAL_MAILHOG_HOST: process.env.LOCAL_MAILHOG_HOST || "localhost",
      LOCAL_MAILHOG_SMTP_PORT: +(process.env.LOCAL_MAILHOG_SMTP_PORT || "1025"),

      APP_BASE_URL: process.env.APP_BASE_URL,
      LAMBDA_ENDPOINT: process.env.LAMBDA_ENDPOINT,
      JWT_SECRET: process.env.JWT_SECRET,

      TOOL_FILES_BUCKET_NAME: process.env.TOOL_FILES_BUCKET_NAME,
      TOOL_FRONTEND_BUCKET_NAME: process.env.TOOL_FRONTEND_BUCKET_NAME,
      S3_ENDPOINT: process.env.S3_ENDPOINT,

      TOOL_FRONTEND_LOCAL_PROXY: process.env.TOOL_FRONTEND_LOCAL_PROXY === "true",

      MAX_FILE_SIZE: +(process.env.MAX_FILE_SIZE || "10000000" /* 10MB */),

      BEDROCK_MODEL_ID: process.env.BEDROCK_MODEL_ID,

      DESCRIPTION_CHARACTERS_LIMIT: +(process.env.DESCRIPTION_CHARACTERS_LIMIT || "1000"),

      EXPERIMENTAL: process.env.EXPERIMENTAL === "true",

      INTEGER_MIN_VALUE: +(process.env.INTEGER_MIN_VALUE || defaultIntegerMinValue.toString()),
      INTEGER_MAX_VALUE: +(process.env.INTEGER_MAX_VALUE || defaultIntegerMaxValue.toString()),

      DEFAULT_TIMEZONE: process.env.DEFAULT_TIMEZONE || "Europe/Rome",

      AI_KNOWLEDGE_BUCKET_NAME: process.env.AI_KNOWLEDGE_BUCKET_NAME,

      USAGE_WARNING_START_PERCENTAGE: +(process.env.USAGE_WARNING_START_PERCENTAGE || 80),

      PROXY_SERVER_PORT: process.env.PROXY_SERVER_PORT ? +(process.env.PROXY_SERVER_PORT) : undefined,
      PROXY_UPSTREAM: process.env.PROXY_UPSTREAM || undefined,
      PROXY_BASE_URL: process.env.PROXY_BASE_URL || undefined,

      LANDING_DOMAIN_WHITELIST: process.env.LANDING_DOMAIN_WHITELIST?.split(",").map((domain) => domain.trim()) || []
    }

    this.env = this._validateEnv(env)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _validateEnv(env: any): Env {
    const ajv = new Ajv()
    const validate = ajv.compile(envJsonSchema)
    const valid = validate(env)

    if (!valid) {
      // console.log(validate.errors)
      console.error("Error while validating env")
      throw new Error(ajv.errorsText(validate.errors))
    }

    return env as Env
  }

  static token = Symbol("Configs")
}

container.registerSingleton(Configs.token, Configs)

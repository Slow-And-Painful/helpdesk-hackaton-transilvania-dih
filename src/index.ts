import "reflect-metadata"
import "dotenv/config"

import Fastify from "fastify"
import * as Sentry from "@sentry/node"

import { container } from "tsyringe"

import fastifySwagger from "@fastify/swagger"
import fastifyRateLimit from "@fastify/rate-limit"
import fastifyStatic from "@fastify/static"
import fastifyCookie from "@fastify/cookie"
import fastifyFormBody from "@fastify/formbody"
import fastifySession from "@fastify/session"
import fastifyCors from "@fastify/cors"

import apiCommonRoutes from "$api/common"
import PeriodicTaskManager from "$components/PeriodicTaskManager"

import { createFaviconRouter } from "$routers/website/faviconRouter"
import {
  actionsRouter,
  actionsRouterPrefix,
} from "$routers/website/actionsRouter/index"
import {
  partialsRouter,
  partialsRouterPrefix,
} from "$routers/website/partialsRouter/index"
import {
  viewsRouter,
  viewsRouterPrefix,
} from "$routers/website/viewsRouter/index"
import internalRoutes from "./routers/internal/utilityToolsRouter"

import Configs from "$components/Configs"
import PostgresDB from "$components/PostgresDB"
import DrizzleDB, { DrizzleWithSchemas } from "$components/DrizzleDB"
import DrizzleSessionStore from "$components/DrizzleSessionStore"
import SSEManagerComponent from "$components/SSEManagerComponent"

import globalErrorHandler from "$handlers/global-error-handler"
import globalNotFoundHandler from "$handlers/global-not-found-handler"

import { LayoutAdditionalProps, LayoutFn } from "./types"
import { GlobalResources } from "$types/assets"
import { join } from "path"
import { generateMetafileGlobalResources } from "$utils/assets"

import { Metafile } from "esbuild"
import meta from "./meta.json"

import UsersService, { User } from "$services/UsersService"

// SECURITY
import securityHook from "$hooks/security/securityHook"
import securityHandlers from "$hooks/security/handlers"
import authenticatedHook from "$hooks/auth/authenticatedHook"
import authenticatedRequestHandler from "$hooks/auth/handlers"
import WinstonComponent from "$components/WinstonComponent"
import { registerViewFunction } from "$utils/fastify"
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'
import { setCallerUser } from "$utils/user"
import { DepartmentsSchema, departmentsTable } from "$dbSchemas/Departments"
import DepartmentsService, { Department } from "$services/DepartmentsService"
import DepartmentUserService from "$services/DepartmentUsersService"
import { departmentUsersTable } from "$dbSchemas/DepartmentUsers"
import TicketsService from "$services/TicketsService"
import { Ticket } from "$services/TicketsService"
import { eq, inArray, or } from "drizzle-orm"
import { ticketsTable } from "$dbSchemas/Tickets"

declare module "fastify" {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface FastifyTypeProviderDefault extends TypeBoxTypeProvider {}
  interface FastifyRequest {
    callerUser: this["routeOptions"]["config"] extends { authenticated: true } ? User :  User  | null
    authenticatedUser: this["routeOptions"]["config"] extends { authenticated: true } ? User : (User | null)
    requestId: string
    startTimestamp: Date
    globalResources: GlobalResources

    mainRouter: "actions" | "partials" | "views" | null
    router: string | null
    view: string | null

    drizzle: DrizzleWithSchemas
    services: {
      usersService: UsersService
      departmentsService: DepartmentsService 
    }

    activeDepartment: Department | null
    userDepartments: Department[]
    userTickets: Ticket[]

    resources: {
      user: User | null
    }
  }

  interface FastifyReply {
    view: (
      jsx: JSX.Element,
      layoutFn?: LayoutFn,
      layoutAdditionalProps?: LayoutAdditionalProps,
    ) => FastifyReply
  }

  interface FastifyContextConfig {
    security?: {
      apiKey?: boolean
      basicAuth?: boolean
      session?: string
      recaptcha?: boolean
      toolInstanceToken?: boolean
    }
    authenticated?: boolean
    isStaff?: boolean
  }
  
  interface Session {
    data: {
      sessionId: string
      callerUserId: number
      authenticatedUserId: number
      timezone: string
      activeDepartmentId: number
    }
  }
}

const winstonComponent = container.resolve<WinstonComponent>(WinstonComponent.token)
const logger = winstonComponent.createLogger("index")

void (async () => {
  const { env } = container.resolve<Configs>(Configs.token)

  if (env.ENVIRONMENT !== "local") {
    Sentry.init({
      dsn: env.SERVER_SENTRY_DSN,
      environment: env.ENVIRONMENT,
      // integrations: [
      //   Sentry.fastifyIntegration()
      // ],
      tracesSampleRate: 0.1,
      profilesSampleRate: 0.1,
      release: env.SERVER_SENTRY_VERSION
    })
  }

  const metafile = meta as unknown as Metafile
  const globalResources: GlobalResources = {
    ...generateMetafileGlobalResources(metafile),
    RECAPTCHA: {
      RECAPTCHA_ACTIVE: env.RECAPTCHA_ACTIVE,
      V2_SITE_KEY: env.RECAPTCHA_V2_SITE_KEY,
      V3_SITE_KEY: env.RECAPTCHA_V3_SITE_KEY,
    },
    SENTRY: {
      SENTRY_DSN: env.CLIENT_SENTRY_DSN ?? null,
      ENVIRONMENT: env.ENVIRONMENT,
      SENTRY_VERSION: env.CLIENT_SENTRY_VERSION ?? null,
    },
    APP_BASE_URL: env.APP_BASE_URL,
    user: null,
    MAX_FILE_SIZE: env.MAX_FILE_SIZE,
    DESCRIPTION_CHARACTERS_LIMIT: 100,
    EXPERIMENTAL: env.EXPERIMENTAL
  }

  const usersService = container.resolve<UsersService>(UsersService.token)
  const departmentsService = container.resolve<DepartmentsService>(DepartmentsService.token)


  const server = Fastify({
    ajv: {
      customOptions: {
        allErrors: true,
        useDefaults: true,
        removeAdditional: false,
        allowUnionTypes: true
      },
    },
  }).withTypeProvider<TypeBoxTypeProvider>()

  await server.register(createFaviconRouter(globalResources))

  server.addHook("preHandler", async (req, res) => {
    const user = req.callerUser

    await setCallerUser(req, res, user)
  })

  server.addHook("preHandler", async (req, res) => {
    req.startTimestamp = new Date()
    req.requestId =
      Math.random().toString(36).slice(2) + Date.now().toString(36)

    // ========== SERVICES ========== //

    const postgresDB = container.resolve<PostgresDB>(PostgresDB.token)
    const drizzleDB = new DrizzleDB(postgresDB)

    req.drizzle = drizzleDB.drizzle

    req.services = {
      usersService,
      departmentsService,
    }

    // ========== AUTH ========== //
    req.authenticatedUser = null
    req.callerUser = null

    if (req.session?.data?.authenticatedUserId) {
      const { authenticatedUserId, callerUserId } = req.session.data
      const authenticatedUser = await usersService.get(authenticatedUserId)

      let user = authenticatedUser
      if (!authenticatedUser) {
        logger.warn(
          `Authenticated user ID ${authenticatedUserId} in decoded token not found`,
        )
        await req.session.destroy()
        return
      }

      req.authenticatedUser = authenticatedUser
      await setCallerUser(req, res, user)

      if (callerUserId && callerUserId !== authenticatedUserId) {
        user = await usersService.get(callerUserId)
      }

      if (!user) {
        logger.warn(
          `Caller user ID ${callerUserId} in decoded token not found`,
        )
        await req.session.destroy()
        return
      }
      
      req.authenticatedUser = authenticatedUser

      await setCallerUser(req, res, user)

      // ========== DEPARTMENTS ========== //
      if (req.session.data.activeDepartmentId) {
        const activeDepartment = await req.services.departmentsService.get(req.session.data.activeDepartmentId)
        req.activeDepartment = activeDepartment
      }

      // ========== USER DEPARTMENTS ========== //
      const departmentUserService = container.resolve<DepartmentUserService>(DepartmentUserService.token)
      const userDepartmentLinks = await departmentUserService.list({
        where: eq(departmentUsersTable.userId, user.id)
      })
      if (userDepartmentLinks.length > 0) {
        const departments = await req.services.departmentsService.list({
          where: inArray(departmentsTable.id, userDepartmentLinks.map(d => d.departmentId))
        })
        req.userDepartments = departments
      } else {
        req.userDepartments = []
      }

      // ========== USER TICKETS ========== //
      const ticketsService = container.resolve<TicketsService>(TicketsService.token)
      if (req.activeDepartment) {
        const tickets = await ticketsService.list({
          where: or(
            eq(ticketsTable.senderDepartmentId, req.activeDepartment.id),
            eq(ticketsTable.destinationDepartmentId, req.activeDepartment.id)
          )
        })
        req.userTickets = tickets
      } else {
        req.userTickets = []
      }
    }

    // ========== GLOBAL RESOURCES ========== //

    req.globalResources = {
      ...globalResources,
      user: req.callerUser,
    }

    // ========== ROUTER ========== //

    req.mainRouter = null
    req.router = null
    req.view = null
  })

  // ========== COMPONENTS ========== //

  const { init: sseManagerInit } = container.resolve<SSEManagerComponent>(SSEManagerComponent.token)
  await sseManagerInit()

  const periodicTaskManager = container.resolve<PeriodicTaskManager>(PeriodicTaskManager.token)
  periodicTaskManager.init()

  let isShuttingDown = false

  const gracefulShutdown = (signal: string) => () => {
    isShuttingDown = true

    if (env.ENVIRONMENT === "local") {
      process.kill(process.pid, signal)
    }

    setTimeout(() => {
      logger.warn("Forcing shutdown")
      process.exit(0)
    }, env.GRACEFUL_SHUTDOWN_TIMEOUT)
  }

  process.on("SIGINT", gracefulShutdown("SIGINT"))
  process.on("SIGTERM", gracefulShutdown("SIGTERM"))

  if (env.ENVIRONMENT === "local") {
    process.on("SIGUSR2", gracefulShutdown("SIGUSR2"))
  }

  server.setSerializerCompiler(() => (data) => JSON.stringify(data))
  server.setReplySerializer((payload) => JSON.stringify(payload))

  const drizzleSessionStore = container.resolve<DrizzleSessionStore>(
    DrizzleSessionStore.token,
  )

  await server.register(fastifyCors, {
    origin: "*"
  })

  await server.register(fastifyCookie)
  await server.register(fastifySession, {
    secret: env.SESSION_SECRET,
    cookie: {
      secure: "auto",
      maxAge: 1000 * 60 * 60 * 24 * 7,
      path: "/",
      sameSite: "lax",
      httpOnly: true,
    },
    saveUninitialized: false,
    store: drizzleSessionStore.store,
  })

  await server.register(fastifyRateLimit, {
    max: env.ENVIRONMENT === "local" ? 10000 : 50,
    timeWindow: 1000,
    allowList: (req) => (req.url.startsWith("/api/tools/"))
  })

  server.addHook("onRequest", async (_, reply) => {
    if (isShuttingDown) {
      return reply.code(503).send("Server is shutting down")
    }
  })

  registerViewFunction(server)

  server.addHook("preHandler", async (req) => {
    const promises: Promise<void>[] = []

    req.resources = {
      user: null,
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const requestQuery = (req.query || {}) as Record<string, any>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const requestBody = (req.body || {}) as Record<string, any>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const requestParams = (req.params || {}) as Record<string, any>

    const userId =
      requestQuery.targetUserId ||
      requestBody.targetUserId ||
      requestBody.target?.userId ||
      requestBody.targets?.userId ||
      requestParams.targetUserId

    if (userId) {
      promises.push(
        (async () => {
          req.resources.user = await req.services.usersService.get(
            parseInt(userId),
          )
        })(),
      )
    }

    await Promise.all(promises)
  })

  server.addHook("preHandler", authenticatedHook(authenticatedRequestHandler))
  server.addHook("preHandler", securityHook(securityHandlers))

  await server.register(fastifyFormBody)
  await server.register(fastifyStatic, {
    root: join(__dirname, "public"),
    prefix: "/public/",
  })

  await server.register(fastifySwagger, {
    openapi: {
      openapi: "3.1.0",
      info: {
        title: "Transilvania Digital Innovation Hub Hackaton",
        version: "1.0.0",
      },
    },
    transform: (obj) => {
      if (obj) {
        if (!obj.schema) {
          Object.assign(obj, { schema: {} })
        }

        if (!obj.url.startsWith("/api/")) {
          obj.schema.hide = true
        }
      }

      return obj
    }
  })

  server.setNotFoundHandler(globalNotFoundHandler)
  server.setErrorHandler(globalErrorHandler)

  await server.register(apiCommonRoutes, { prefix: "/api" })

  await server.register(actionsRouter, { prefix: actionsRouterPrefix })
  await server.register(partialsRouter, { prefix: partialsRouterPrefix })
  await server.register(viewsRouter, { prefix: viewsRouterPrefix })

  if (env.ENVIRONMENT !== "production") {
    await server.register(internalRoutes, { prefix: "/internal" })
  }

  await server.ready()

  await server.listen({
    port: env.PORT,
    host: "0.0.0.0",
  })

  
  logger.info(`Server started on port http://localhost:${env.PORT}`)
})().catch((error) => {
  logger.error("Error starting server", { error })

  // try {
  //   if (["qua", "dev", "production"].includes(process.env.ENVIRONMENT || "local")) {
  //     Sentry.captureException(error)
  //   }
  // } catch (err) {
  //   logger.error("Error capturing exception", err)
  // }
})
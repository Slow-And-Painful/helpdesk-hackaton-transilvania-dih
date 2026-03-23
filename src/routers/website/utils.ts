import { JsonSchemaFastifyInstance } from "$types/index"
import {
  FastifyInstance,
  FastifyPluginCallback,
  FastifyReply,
  FastifyRequest,
} from "fastify"

import {
  COMMON_PARTIALS_ROUTE,
  commonPartialsRouterPrefix,
} from "$routers/website/partialsRouter/common"
import {
  AUTH_PARTIALS_ROUTE,
  authPartialsRouterPrefix,
} from "$routers/website/partialsRouter/auth"

import { PUBLIC_VIEW_ROUTE } from "./viewsRouter/public/index"
import { AUTH_VIEW_ROUTE } from "./viewsRouter/auth/index"


import { GlobalResources } from "$types/assets"
import { USERS_PARTIALS_ROUTE, usersPartialsRouterPrefix } from "./partialsRouter/users"
import { DEPARTMENTS_PARTIALS_ROUTE, departmentsPartialsRouterPrefix } from "./partialsRouter/departments"
import { TICKETS_PARTIALS_ROUTE, ticketsPartialsRouterPrefix } from "./partialsRouter/tickets"
import { AUTH_ACTIONS_ROUTE, authActionsRouterPrefix } from "./actionsRouter/auth"
import { DEPARTMENTS_ACTIONS_ROUTE, departmentsActionsRouterPrefix } from "./actionsRouter/departments"
import { TICKETS_ACTIONS_ROUTE, ticketsActionsRouterPrefix } from "./actionsRouter/tickets"
import { DASHBOARD_VIEW_ROUTE, dashboardViewsRouterPrefix } from "./viewsRouter/dashboard"

// ==================== ROUTER ===================== //

type CreateRouterCallback = (server: JsonSchemaFastifyInstance) => void

export function createRouter(
  routerName: string,
  callback: CreateRouterCallback,
): FastifyPluginCallback {
  return (server, _, done) => {
    server.addHook("preHandler", (request, _res, done) => {
      request.router = routerName

      return done()
    })

    callback(server)

    return done()
  }
}

export type CreateRouterAssetsWrapper = (
  globalResources: GlobalResources,
) => FastifyPluginCallback

// ==================== ACTIONS ==================== //

export function registerActionsRouter(
  server: FastifyInstance,
  router: FastifyPluginCallback,
  prefix?: `/${string}`,
) {
  server.register(
    (instance, _opts, done) => {
      instance.addHook("preHandler", (request, _res, done) => {
        request.mainRouter = "actions"

        return done()
      })

      instance.addHook("onError", async (_req, res, error) => {
        console.error("actions router onError", error)
        if (error.validation) {
          return res.status(400).send(error.validation)
        }
        return res
          .status(500)
          .send(`An unexpected error occurred: ${error.message}`)
      })

      instance.register(router)

      return done()
    },
    { prefix },
  )
}

type ActionRouter =
| "users"
| "auth"
| "departments"
| "tickets"

type ActionRoutersPaths = {
  users: typeof USERS_PARTIALS_ROUTE
  auth: typeof AUTH_ACTIONS_ROUTE
  departments: typeof DEPARTMENTS_ACTIONS_ROUTE
  tickets: typeof TICKETS_ACTIONS_ROUTE
}

type ActionRoutersParams = {
  auth: {
    RESEND_VERIFICATION_EMAIL: { targetUserId: number }
  }
}

const actionRoutersConfig: {
  [key in ActionRouter]: {
    paths: ActionRoutersPaths[key]
    prefix?: `/${string}`
  }
} = {
  users: {
    paths: USERS_PARTIALS_ROUTE,
    prefix: usersPartialsRouterPrefix
  },
  auth: {
    paths: AUTH_ACTIONS_ROUTE,
    prefix: authActionsRouterPrefix
  },
  departments: {
    paths: DEPARTMENTS_ACTIONS_ROUTE,
    prefix: departmentsActionsRouterPrefix
  },
  tickets: {
    paths: TICKETS_ACTIONS_ROUTE,
    prefix: ticketsActionsRouterPrefix
  },
}

export function getActionPath<
  R extends ActionRouter,
  P extends keyof ActionRoutersPaths[R],
>(
  router: R,
  routeName: P,
  ...params: R extends keyof ActionRoutersParams
    ? P extends keyof ActionRoutersParams[R]
      ? [params: ActionRoutersParams[R][P]]
      : [params?: undefined]
    : [params?: undefined]
) {
  return getPath({
    rootPrefix: "/actions",
    routerPrefix: actionRoutersConfig[router].prefix,
    path: actionRoutersConfig[router].paths[routeName] as `/${string}`,
    params: params
      ? {
          ...params[0],
        }
      : undefined,
  })
}

// ==================== PARTIALS ==================== //

export function registerPartialsRouter(
  server: FastifyInstance,
  router: FastifyPluginCallback,
  prefix?: `/${string}`,
) {
  server.register(
    (instance, _opts, done) => {
      instance.addHook("preHandler", (request, _res, done) => {
        request.mainRouter = "partials"

        return done()
      })

      instance.addHook("onError", async (_req, res, error) => {
        console.error("partials router onError", error)
        if (error.validation) {
          return res.status(400).send(error.validation)
        }
        return res
          .status(500)
          .send(`An unexpected error occurred: ${error.message}`)
      })

      instance.register(router)

      return done()
    },
    { prefix },
  )
}

type PartialRouter =
| "common"
| "auth"
| "users"
| "departments"
| "tickets"

type PartialRoutersPaths = {
  common: typeof COMMON_PARTIALS_ROUTE,
  auth: typeof AUTH_PARTIALS_ROUTE,
  users: typeof USERS_PARTIALS_ROUTE,
  departments: typeof DEPARTMENTS_PARTIALS_ROUTE,
  tickets: typeof TICKETS_PARTIALS_ROUTE,
}

type PartialRoutersParams = {
  auth: {
    TEST: { targetEntityId: number }
  }
}

const partialRoutersConfig: {
  [key in PartialRouter]: {
    paths: PartialRoutersPaths[key]
    prefix?: `/${string}`
  }
} = {
  common: {
    paths: COMMON_PARTIALS_ROUTE,
    prefix: commonPartialsRouterPrefix,
  },
  auth: {
    paths: AUTH_PARTIALS_ROUTE,
    prefix: authPartialsRouterPrefix,
  },
  users: {
    paths: USERS_PARTIALS_ROUTE,
    prefix: usersPartialsRouterPrefix
  },
  departments: {
    paths: DEPARTMENTS_PARTIALS_ROUTE,
    prefix: departmentsPartialsRouterPrefix
  },
  tickets: {
    paths: TICKETS_PARTIALS_ROUTE,
    prefix: ticketsPartialsRouterPrefix
  },
}

export function getPartialPath<
  R extends PartialRouter,
  P extends keyof PartialRoutersPaths[R],
>(
  router: R,
  routeName: P,
  ...params: R extends keyof PartialRoutersParams
    ? P extends keyof PartialRoutersParams[R]
      ? [params: PartialRoutersParams[R][P]]
      : [params?: undefined]
    : [params?: undefined]
) {
  return getPath({
    rootPrefix: "/partials",
    routerPrefix: partialRoutersConfig[router].prefix,
    path: partialRoutersConfig[router].paths[routeName] as `/${string}`,
    params: params
      ? {
          ...params[0],
        }
      : undefined,
  })
}

// ==================== VIEWS ==================== //

export function registerViewsRouter(
  server: FastifyInstance,
  router: FastifyPluginCallback,
  prefix?: `/${string}`,
) {
  server.register(
    (instance, _opts, done) => {
      instance.addHook("preHandler", (request, _res, done) => {
        request.mainRouter = "views"

        return done()
      })

      instance.register(router)

      return done()
    },
    { prefix },
  )
}

type ViewRouter = 
| "public" 
| "auth"
| "dashboard"

type ViewRoutersPaths = {
  public: typeof PUBLIC_VIEW_ROUTE
  auth: typeof AUTH_VIEW_ROUTE
  dashboard: typeof DASHBOARD_VIEW_ROUTE
}

export type ViewRoute<R extends ViewRouter = ViewRouter> = [
  R,
  keyof ViewRoutersPaths[R],
]

type ViewRoutersParams = {
  auth: {
    LOGIN: any
  }
}

export const viewsRouterPrefix: {
  [key in ViewRouter]: `/${string}`
} = {
  public: "/",
  auth: "/",
  dashboard: dashboardViewsRouterPrefix,
}

const viewRoutersConfig: {
  [key in ViewRouter]: {
    paths: ViewRoutersPaths[key]
    prefix?: `/${string}`
  }
} = {
  public: {
    paths: PUBLIC_VIEW_ROUTE,
  },
  auth: {
    paths: AUTH_VIEW_ROUTE,
  },
  dashboard: {
    paths: DASHBOARD_VIEW_ROUTE,
    prefix: dashboardViewsRouterPrefix
  },
}

export function getViewPath<
  R extends ViewRouter,
  P extends keyof ViewRoutersPaths[R],
>(
  router: R,
  routeName: P,
  ...params: R extends keyof ViewRoutersParams
    ? P extends keyof ViewRoutersParams[R]
      ? [params: ViewRoutersParams[R][P]]
      : [params?: undefined]
    : [params?: undefined]
) {
  return getPath({
    rootPrefix: "/",
    routerPrefix: viewRoutersConfig[router].prefix,
    path: viewRoutersConfig[router].paths[routeName] as `/${string}`,
    params: params?.length
      ? {
          ...params[0],
        }
      : undefined,
  })
}

// ==================== HELPERS ==================== //

type GetPathOptions = {
  rootPrefix?: `/${string}`
  routerPrefix?: `/${string}`
  path: `/${string}`
  params?: { [key: string]: string | number }
}
function getPath(options: GetPathOptions): string {
  const { rootPrefix, routerPrefix, path, params } = options
  let result = `${rootPrefix && rootPrefix.length > 1 ? rootPrefix : ""}${routerPrefix && routerPrefix.length > 1 ? routerPrefix : ""}${path}`
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      result = result.replace(`:${key}`, `${value}`)
    })
  }
  return result
}

export const isHtmxRequest = (req: FastifyRequest) =>
  req.headers["hx-request"]?.toString().toLowerCase() === "true"

export const redirect = (
  req: FastifyRequest,
  res: FastifyReply,
  path: string,
) => {
  if (isHtmxRequest(req)) {
    return res.header("HX-Redirect", path).send()
  }
  return res.redirect(path)
}

export const getHtmxBrowserUrl = (req: FastifyRequest): URL | null => {
  const currentUrlHeader = req.headers["hx-current-url"] as string
  if (!currentUrlHeader) {
    return null
  }
  return new URL(currentUrlHeader)
}

export function getQuerystringFromUrl<Schema extends object>(url: URL) {
  const params: Record<string, string | string[]> = {}

  // Needed to properly parse fields with same names but different values
  for (const [key, value] of url.searchParams.entries()) {
    if (Object.hasOwnProperty.call(params, key)) {
      if (!Array.isArray(params[key])) {
        params[key] = [params[key]]
      }
      params[key].push(value)
    } else {
      params[key] = value
    }
  }
  return params as Schema
}

export function getQuerystringFromUrlString(url: string) {
  return getQuerystringFromUrl(new URL(url))
}

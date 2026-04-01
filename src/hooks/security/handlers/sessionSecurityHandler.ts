import USER_ROLE from "$types/USER_ROLES"
import { FastifyRequest } from "fastify"
import { HandlerFunction, HandlerResponse } from "$types/hook"
import { container } from "tsyringe"
import WinstonComponent from "$components/WinstonComponent"
import USER_TYPE from "$types/USER_TYPE"
import { and, eq } from "drizzle-orm"
import { departmentUsersTable } from "$dbSchemas/DepartmentUsers"
import { DEPARTMENT_USER_ROLE } from "$types/departments"

const winstonComponent = container.resolve<WinstonComponent>(WinstonComponent.token)

const logger = winstonComponent.createLogger("SessionSecurityHandler")

export const getUserRoles = async (
  req: FastifyRequest,
): Promise<USER_ROLE[]> => {
  const roles: USER_ROLE[] = []

  const callerUser = req.callerUser
  const authenticatedUser = await req.services.usersService.get(
    req.session.data.authenticatedUserId,
  )


  const activeDepartmentId = req.session.data.activeDepartmentId

  const activeDepartmentUser = activeDepartmentId
    ? (await req.services.departmentUsersService.list({
        limit: 1,
        where: and(
          eq(departmentUsersTable.departmentId, activeDepartmentId),
          eq(departmentUsersTable.userId, callerUser?.id ?? -1)
        )
      }))[0]
    : undefined

  const targetUser = req.resources.user

  if (
    // callerUser is not set or is deleted or is blocked
    !callerUser ||
    callerUser.blocked ||
    // authenticatedUser is deleted or is blocked
    !authenticatedUser ||
    authenticatedUser.blocked
  ) {
    return []
  }
  
  if (authenticatedUser) {
    roles.push(USER_ROLE.AUTHENTICATED)
  }

  if (authenticatedUser && targetUser && targetUser.id === callerUser.id) {
    roles.push(USER_ROLE.SELF)
  }

  if (callerUser.type === USER_TYPE.STAFF) {
    roles.push(USER_ROLE.STAFF_ACCOUNT)
  } else if (callerUser.type === USER_TYPE.CUSTOMER) {
    roles.push(USER_ROLE.CUSTOMER_ACCOUNT)
  }

  if (activeDepartmentUser) {
    if (activeDepartmentUser.role === DEPARTMENT_USER_ROLE.ADMIN) {
      roles.push(USER_ROLE.DEPARTMENT_ADMIN)
    }
  
    if (activeDepartmentUser.role === DEPARTMENT_USER_ROLE.MEMBER) {
      roles.push(USER_ROLE.DEPARTMENT_MEMBER)
    }
  }

  return roles
}

const allRoles = Object.keys(USER_ROLE).sort(
  (a, b) => b.length - a.length,
) as USER_ROLE[]
const roleRegex = /^(true|false|not|\s|\|\||\(|\)|&&|!)+$/

const sessionSecurityHandler: HandlerFunction = async (
  req,
  _res,
  scopes,
): Promise<HandlerResponse> => {
  const { evaluate } = await import("mathjs")

  if (scopes.length > 1) {
    throw new Error("Invalid roles format")
  }

  if (scopes.length === 0) {
    return { valid: true }
  }

  const scope = scopes[0]

  if (!req.session.data) {
    return { valid: false }
  }

  const userRoles: USER_ROLE[] = await getUserRoles(req)

  let expression: string = allRoles.reduce(
    (acc: string, e) =>
      acc.replace(new RegExp(e, "g"), userRoles.includes(e).toString()),
    scope,
  )

  if (!roleRegex.test(expression)) {
    throw new Error(`Invalid role values: ${scope}`)
  }

  expression = expression
    .replace(/\|\|/g, "or")
    .replace(/&&/g, "and")
    .replace(/!/g, "not")

  try {
    if (!evaluate(expression)) {
      return { valid: false }
    }
  } catch (e) {
    logger.error(`Error evaluating session security expression: ${expression}`, {
      error: e,
      expression,
      userRoles,
      scopes,
    })
    return { valid: false }
  }

  return { valid: true }
}

export default sessionSecurityHandler
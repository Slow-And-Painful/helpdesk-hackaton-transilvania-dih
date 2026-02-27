import { User } from "$services/UsersService"
import USER_TYPE from "$types/USER_TYPE"
import { FastifyReply, FastifyRequest } from "fastify"

export const selectedOrganizationCookieName = "selected-organization-id"

export const setSelectedOrganizationIdCookie = async(request: FastifyRequest) => {
  request.session.data = {
    ...request.session.data
  }
  await request.session.save()
}

export const setCallerUser = async(
  req: FastifyRequest,
  _res: FastifyReply,
  user: User | null
): Promise<User | null> => {  
  if (user) {
    req.callerUser = user
    if (user.type === USER_TYPE.CUSTOMER) {
      req.session.data = {
        ...req.session.data
      }
      return user
    } else {
      req.session.data = {
        ...req.session.data
      }
    }

    await req.session.save()
  }

  return user
}
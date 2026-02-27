import { User } from "$services/UsersService"
import USER_TYPE from "$types/USER_TYPE"

export const canLoginAsUser = (user: User): { valid: false, reason: string } | { valid: true, reason: null } => {
  if (user.type === USER_TYPE.STAFF) {
    return {
      valid: false,
      reason: "You cannot login as a staff account"
    }
  }

  if (user.blocked) {
    return {
      valid: false,
      reason: "The user is currently blocked"
    }
  }

  if (!user.emailVerified) {
    return {
      valid: false,
      reason: "The user has not verified their email"
    }
  }

  return { valid: true, reason: null }
}
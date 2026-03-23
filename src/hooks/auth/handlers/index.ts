import authenticatedUserHandler from "./authenticatedUserHandler"
import notAuthenticatedUserHandler from "./notAuthenticatedUserHandler"
import checkUserFieldHandler from "./checkUserFieldHandler"
import noDepartmentHandler from "./noDepartmentHandler"
import USER_TYPE from "$types/USER_TYPE"

export default {
  authenticated: authenticatedUserHandler,
  notAuthenticated: notAuthenticatedUserHandler,
  staff: checkUserFieldHandler("type", USER_TYPE.STAFF),
  noDepartment: noDepartmentHandler,
}
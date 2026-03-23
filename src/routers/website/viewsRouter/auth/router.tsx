import CodesComponent from "$components/CodesComponents"
import { BaseLayout } from "$templates/layouts"
import LoginView from "$templates/views/LoginView"
import SignupView from "$templates/views/SignupView"
import { container } from "tsyringe"
import { createRouter, getViewPath } from "../../utils"
import { schemas } from "./schemas"
import { ROUTE } from "./types"
import { CODE_TYPE } from "$dbSchemas/Codes"
import VerifyLoginCodeView, { VERIFY_LOGIN_CODE_ERROR } from "$templates/views/VerifyLoginCodeView"
import VerifyEmailCodeView, { VERIFY_EMAIL_CODE_ERROR } from "$templates/views/VerifyEmailView"
import UsersComponent from "$components/UsersComponent"
import { setCallerUser } from "$utils/user"
import { departmentUsersTable } from "$dbSchemas/DepartmentUsers"
import { eq, inArray } from "drizzle-orm"
import DepartmentsService from "$services/DepartmentsService"
import { departmentsTable } from "$dbSchemas/Departments"
import DepartmentUserService from "$services/DepartmentUsersService"
import { getLanguage } from "$utils/i18n"

const codesComponent = container.resolve<CodesComponent>(CodesComponent.token)
const usersComponent = container.resolve<UsersComponent>(UsersComponent.token)
const departmentService = container.resolve<DepartmentsService>(DepartmentsService.token)
const departmentUsersService = container.resolve<DepartmentUserService>(DepartmentUserService.token)

export const router = createRouter("auth", (server) => {
  server.route({
    method: "GET",
    url: ROUTE.LOGIN,
    schema: schemas[ROUTE.LOGIN],
    handler: (req, res) => {
      const callerUser = req.callerUser

      if (callerUser) {
        return res.redirect(getViewPath("public", "HOME"))
      }

      return res.view(
        <LoginView lang={getLanguage((req.query as { lang?: string }).lang)} />,
        BaseLayout
      )
    }
  })

  server.route({
    method: "GET",
    url: ROUTE.SIGNUP,
    schema: schemas[ROUTE.SIGNUP],
    handler: (req, res) => {
      const callerUser = req.callerUser

      if (callerUser) {
        return res.redirect(getViewPath("public", "HOME"))
      }

      return res.view(
        <SignupView lang={getLanguage((req.query as { lang?: string }).lang)} />,
        BaseLayout
      )
    }
  })

  server.route({
    method: "GET",
    schema: schemas[ROUTE.VERIFY_LOGIN_CODE],
    url: ROUTE.VERIFY_LOGIN_CODE,
    handler: async (req, res) => {
      const codeValue = req.query.code

      const code = await codesComponent.getCode({ resources: { codeValue: codeValue ?? "" } })

      if (!code || code.type !== CODE_TYPE.LOGIN || !code.isActive) {
        return res.view(
          <VerifyLoginCodeView
            error={VERIFY_LOGIN_CODE_ERROR.CODE_NOT_FOUND}
          />,
          BaseLayout
        )
      }

      if (code.isExpired) {
        return res.view(
          <VerifyLoginCodeView
            error={VERIFY_LOGIN_CODE_ERROR.CODE_EXPIRED}
          />,
          BaseLayout
        )
      }

      if (code.isUsed) {
        return res.view(
          <VerifyLoginCodeView
            error={VERIFY_LOGIN_CODE_ERROR.CODE_ALREADY_USED}
          />,
          BaseLayout
        )
      }

      if (!code.isValid) {
        return res.view(
          <VerifyLoginCodeView
            error={VERIFY_LOGIN_CODE_ERROR.CODE_NOT_FOUND}
          />,
          BaseLayout
        )
      }

      const user = await req.services.usersService.getOrFail(code.targetUserId)

      const userDepartments = await departmentUsersService.list({
        where: eq(departmentUsersTable.userId, user.id)
      })

      const departments = await departmentService.list({
        where: inArray(departmentsTable.id, userDepartments.map(department => department.departmentId))
      })

      const activeDepartment = departments[0]

      req.session.data = {
        ...req.session.data,
        authenticatedUserId: user.id,
        callerUserId: user.id,
        ...activeDepartment ? {activeDepartmentId: activeDepartment.id} : undefined,
      }
      await req.session.save()

      await setCallerUser(req, res, user)

      return res.redirect(getViewPath("dashboard", "HOME"))
    }
  })

  server.route({
    method: "GET",
    schema: schemas[ROUTE.VERIFY_EMAIL],
    url: ROUTE.VERIFY_EMAIL,
    handler: async (req, res) => {
      const codeValue = req.query.code

      const code = await codesComponent.getCode({ resources: { codeValue: codeValue ?? "" } })

      if (!code || code.type !== CODE_TYPE.CONFIRM_EMAIL || !code.isActive) {
        return res.view(
          <VerifyEmailCodeView
            error={VERIFY_EMAIL_CODE_ERROR.CODE_NOT_FOUND}
          />,
          BaseLayout
        )
      }

      if (code.isExpired) {
        return res.view(
          <VerifyEmailCodeView
            error={VERIFY_EMAIL_CODE_ERROR.CODE_EXPIRED}
          />,
          BaseLayout
        )
      }

      if (code.isUsed) {
        return res.view(
          <VerifyEmailCodeView
            error={VERIFY_EMAIL_CODE_ERROR.CODE_ALREADY_USED}
          />,
          BaseLayout
        )
      }

      if (!code.isValid) {
        return res.view(
          <VerifyEmailCodeView
            error={VERIFY_EMAIL_CODE_ERROR.CODE_NOT_FOUND}
          />,
          BaseLayout
        )
      }

      await usersComponent.confirmEmail({
        userId: code.targetUserId,
        codeId: code.id
      })

      const user = await req.services.usersService.getOrFail(code.targetUserId)

      const userDepartments = await departmentUsersService.list({
        where: eq(departmentUsersTable.userId, user.id)
      })

      const departments = await departmentService.list({
        where: inArray(departmentsTable.id, userDepartments.map(department => department.departmentId))
      })

      const activeDepartment = departments[0]

      req.session.data = {
        ...req.session.data,
        authenticatedUserId: user.id,
        callerUserId: user.id,
        ...activeDepartment ? {activeDepartmentId: activeDepartment.id} : undefined,
      }
      await req.session.save()

      await setCallerUser(req, res, user)

      return res.redirect(getViewPath("dashboard", "HOME"))
    }
  })

  server.route({
    method: "GET",
    schema: schemas[ROUTE.LOGOUT],
    url: ROUTE.LOGOUT,
    handler: async (req, res) => {
      await req.session.destroy()
      return res.redirect(getViewPath("public", "HOME"))
    }
  })
})
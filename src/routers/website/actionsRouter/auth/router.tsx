import { container } from "tsyringe"
import { createRouter, getViewPath as _getViewPath, getViewPath } from "../../utils"
import { schemas } from "./schemas"
import { ROUTE } from "./types"
import UsersService, { User } from "$services/UsersService"
import { FormErrors } from "$types/ui"
import SignupForm, { signupFormId, Props as SignupFormProps } from "$templates/components/auth/SignupForm"
import { validateEmail } from "$utils/validation"
import USER_TYPE from "$types/USER_TYPE"
import CodesComponent from "$components/CodesComponents"
import { CODE_TYPE, NewCodeSchema } from "$dbSchemas/Codes"
import { CODE_EMAIL_VERIFY_EXPIRATION } from "$constants/codes"
import Configs from "$components/Configs"
import MessagerComponent from "$components/MessagerComponent"
import SignupCompleted from "$templates/components/auth/SignupCompleted"
import { signupViewContainerId } from "$templates/views/SignupView"
import LoginForm from "$templates/components/auth/LoginForm"
import LoginLinkSent from "$templates/components/auth/LoginLinkSent"
import { loginViewContainerId } from "$templates/views/LoginView"

export const routerPrefix = "/auth"

const usersService = container.resolve<UsersService>(UsersService.token)
const codesComponent = container.resolve<CodesComponent>(CodesComponent.token)
const configsComponent = container.resolve<Configs>(Configs.token)
const messagerComponent = container.resolve<MessagerComponent>(MessagerComponent.token)

const appBaseUrl = configsComponent.env.APP_BASE_URL

export const router = createRouter("auth", (server) => {
  server.route({
    method: "POST",
    url: ROUTE.SIGNUP,
    schema: schemas[ROUTE.SIGNUP],
    handler: async (req, res) => {
      const { firstName, lastName, email } = req.body

      const errors: FormErrors<SignupFormProps["values"]> = {}

      if (!validateEmail(email)) {
        errors.email = "Invalid email address"
      }

      let user = await req.services.usersService.getUserByEmail(email)

      if (user) {
        errors.email =  "Email already in use"
      }


      if (Object.keys(errors).length > 0) {
        return res.headers({
          "HX-Retarget": `#${signupFormId}`,
          "HX-Reswap": "outerHTML"
        }).view(
          <SignupForm
            values={{ email, firstName, lastName }}
            initialValues={{ email, firstName, lastName }}
            errors={errors}
          />
        )
      }

      user = await usersService.insert({
        email,
        firstName,
        lastName,
        type: USER_TYPE.CUSTOMER,
        privacyPolicyAcceptance: true,
        termsConditionsAcceptance: true
      })

      const newCodeVal = await codesComponent.generateCode()
      const newCode: NewCodeSchema = {
        code: newCodeVal,
        type: CODE_TYPE.CONFIRM_EMAIL,
        targetUserId: user.id,
        expirationTimestamp: new Date(
          Date.now() + CODE_EMAIL_VERIFY_EXPIRATION,
        )
      }
      const code = await codesComponent.createCode({ code: newCode })

      const activationLink =
        appBaseUrl + getViewPath("auth", "VERIFY_EMAIL") + `?code=${code.code}`

      await messagerComponent.sendConfirmationEmail({
        targetUserId: user.id,
        activationLink,
      })

      return res.headers({
        "HX-Retarget": `#${signupViewContainerId}`,
        "HX-Reswap": "outerHTML"
      }).view(
        <div
          id={signupViewContainerId}
          class="flex flex-col gap-y-4 justify-center w-full max-w-[400px]"
        >
          <SignupCompleted user={user} />
        </div>
      )
    }
  })

  server.route({
    method: "POST",
    url: ROUTE.REQUEST_LOGIN_CODE,
    schema: schemas[ROUTE.REQUEST_LOGIN_CODE],
    handler: async (req, res) => {
      const email = req.body.email

      const user = await usersService.getUserByEmail(email)

      const errors: Record<string, string> = {}

      if (!user) {
        errors["email"] = "Email not registered yet"
      }

      if (user && !user.emailVerified) {
        errors["email"] = "Account not verified yet"
      }

      if (Object.keys(errors).length > 0) {
        return res.view(
          <LoginForm
            values={{ email }}
            initialValues={{ email }}
            errors={errors}
          />
        )
      }

      const typedUser = user as User

      const newCodeVal = await codesComponent.generateCode()
      const newCode: NewCodeSchema = {
        code: newCodeVal,
        type: CODE_TYPE.LOGIN,
        targetUserId: typedUser.id,
        expirationTimestamp: new Date(
          Date.now() + CODE_EMAIL_VERIFY_EXPIRATION,
        )
      }

      const code = await codesComponent.createCode({ code: newCode })

      const activationLink =
        appBaseUrl + getViewPath("auth", "VERIFY_LOGIN_CODE") + `?code=${code.code}`

      await messagerComponent.sendLoginEmail({
        targetUserId: typedUser.id,
        activationLink,
      })

      return res.headers({
        "HX-Retarget": `#${loginViewContainerId}`,
        "HX-Reswap": "outerHTML"
      }).view(
        <div
          id={loginViewContainerId}
          class="flex flex-col gap-y-4 justify-center w-full max-w-[400px]"
        >
          <LoginLinkSent user={typedUser} />
        </div>
      )
    }
  })
})

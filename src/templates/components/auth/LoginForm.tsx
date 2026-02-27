import { getActionPath, getViewPath } from "$routers/website/utils"
import { FormCommonProps } from "$types/ui"
import Input from "$templates/components/Input"
import Button from "../Button"
import Form from "../Form"
import FormControl from "../FormControl"
import TimezoneHiddenInput from "../TimezoneHiddenInput"

type FormData = {
  email: string
}

type Props = FormCommonProps<FormData> & {
  swapOOB?: Htmx.Attributes["hx-swap-oob"]
}

export const loginFormId = "login-form"

const LoginForm = (props: Props) => {
  const formId = loginFormId

  return (
    <Form
      {...props}
      id={formId}
      action={getActionPath("auth", "REQUEST_LOGIN_CODE")}
      method="post"
      hx-boost="true"
      hx-target-error={`#${formId}`}
      hx-push-url="false"
      {...{
        ["hx-on::load"]: "onFormAfterRequest(this);",
        ["hx-on::before-request"]:
          "if (event.detail.elt === this) { recaptcha.executeV3(event, grecaptcha, RECAPTCHA_V3_SITE_KEY) };onFormBeforeRequest(event.target)",
        ["hx-on::after-request"]: "onFormAfterRequest(this);",
      }}
      render={({ errors, values, formId }) => (
        <>
          <div class="w-full h-full flex flex-col gap-y-4">
            <FormControl name={"email"} formId={formId} showChanged={false}>
              <Input
                id={`${formId}-email`}
                label={"Email"}
                name="email"
                required
                type="email"
                error={errors?.email}
                value={values?.email}
                ignoreOnePassword={false}
                placeholder={"Insert your email here"}
                omitRequiredStar
              />
            </FormControl>

            <TimezoneHiddenInput formId={formId} />

            <div class={"w-full flex items-center justify-between gap-x-4"}>
              <div class="flex items-center gap-x-1 text-sm text-gray-400">
                <span>Don't have an account?</span>
                <a
                  href={getViewPath("auth", "SIGNUP")}
                  hx-boost="true"
                  class="text-primary-700 hover:text-primary-600 transition-colors"
                >
                  Sign up
                </a>
              </div>
              
              <Button type="submit" size="sm" spinner>
                Sign In
              </Button>
            </div>
          </div>
        </>
      )}
    />
  )
}

export default LoginForm
import { getActionPath, getViewPath } from "$routers/website/utils"
import { FormCommonProps } from "$types/ui"
import Input from "$templates/components/Input"
import Button from "../Button"
import Form from "../Form"
import FormControl from "../FormControl"
import TimezoneHiddenInput from "../TimezoneHiddenInput"

type FormData = {
  email: string
  firstName: string
  lastName: string
}

export type Props = FormCommonProps<FormData> & {
  swapOOB?: Htmx.Attributes["hx-swap-oob"]
}

export const signupFormId = "signup-form"

const SignupForm = (props: Props) => {
  const formId = signupFormId

  return (
    <Form
      {...props}
      id={formId}
      action={getActionPath("auth", "SIGNUP")}
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
            <div class="grid grid-cols-12 gap-3">
              <div class="col-span-6">
                <FormControl name={"firstName"} formId={formId} showChanged={false}>
                  <Input
                    id={`${formId}-firstName`}
                    label={"Name"}
                    name="firstName"
                    required
                    type="firstName"
                    error={errors?.firstName}
                    value={values?.firstName}
                    ignoreOnePassword={false}
                    placeholder={"John"}
                    omitRequiredStar
                  />
                </FormControl>
              </div>

              <div class="col-span-6">
                <FormControl name={"lastName"} formId={formId} showChanged={false}>
                  <Input
                    id={`${formId}-firslastNametName`}
                    label={"Surname"}
                    name="lastName"
                    required
                    type="lastName"
                    error={errors?.lastName}
                    value={values?.lastName}
                    ignoreOnePassword={false}
                    placeholder={"Doe"}
                    omitRequiredStar
                  />
                </FormControl>
              </div>
            </div>

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
                <span>Already have an account?</span>
                <a
                  href={getViewPath("auth", "LOGIN", {})}
                  hx-boost="true"
                  class="text-primary-700 hover:text-primary-600 transition-colors"
                >
                  Sign in
                </a>
              </div>
              
              <Button type="submit" size="sm" spinner>
                Sign Up
              </Button>
            </div>
          </div>
        </>
      )}
    />
  )
}

export default SignupForm
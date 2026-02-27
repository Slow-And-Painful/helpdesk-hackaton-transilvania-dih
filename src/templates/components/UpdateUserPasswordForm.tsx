import { getActionPath } from "$routers/website/utils"
import { User } from "$services/UsersService"
import { FormCommonProps } from "$types/ui"
import Button from "./Button"
import Form from "./Form"
import FormControl from "./FormControl"
import FormResetButton from "./FormResetButton"
import PasswordInput from "./PasswordInput"


export type UpdateUserPasswordFormData = {
  password: string
  newPassword?: string
  newPasswordConfirmation?: string
}

export type Props = FormCommonProps<UpdateUserPasswordFormData> & {
  user: User
  swapOOB?: string
}

export const getUpdateUserPasswordFormId = (targetUserId: number) =>
  `update-user-password-form-${targetUserId}`

const UpdateUserPasswordForm = ({ user, errors, swapOOB, values, initialValues }: Props) => {
  const formId = getUpdateUserPasswordFormId(user.id)

  return (
    <Form
      id={formId}
      method={"post"}
      hx-boost={"true"}
      hx-post={getActionPath("users", "UPDATE_PASSWORD", { targetUserId: user.id })}
      hx-target={`#${formId}`}
      hx-swap={"none"}
      class={
        "flex flex-col w-full gap-4"
      }
      initialValues={initialValues}
      values={values}
      errors={errors}
      {...{
        ["hx-on::before-request"]: "onFormBeforeRequest(event.target)",
        ["hx-on::load"]: "onFormAfterRequest(this)",
        ["hx-on::after-request"]: "onFormAfterRequest(this)",
      }}
      {...(swapOOB
        ? {
            "hx-swap-oob": swapOOB,
          }
        : {})}
      render={({ formId, values, errors }) => (
        <>
          <div class="max-w-[400px] flex flex-col gap-y-4">

            <FormControl name="password" formId={formId} showChanged={false}>
              <PasswordInput
                id={`${formId}-password`}
                name={"password"}
                label={"Password"}
                value={values.password}
                error={errors?.password}
                required
                ignoreOnePassword={false}
              />
            </FormControl>

            <FormControl name="newPassword" formId={formId} showChanged={false}>
              <PasswordInput
                id={`${formId}-newPassword`}
                name={"newPassword"}
                label={"New Password"}
                value={values.newPassword}
                error={errors?.newPassword}
                required
                ignoreOnePassword={false}       
                oninput={`window.onPasswordUpdateInput('${formId}', "newPassword", "newPasswordConfirmation")`}
                data-revalidate-before-clear
              />
            </FormControl>

            <FormControl name="newPasswordConfirmation" formId={formId} showChanged={false}>
              <PasswordInput
                id={`${formId}-newPasswordConfirmation`}
                name={"newPasswordConfirmation"}
                label={"Confirm new password"}
                value={values.newPasswordConfirmation}
                error={errors?.newPasswordConfirmation}
                required
                ignoreOnePassword={false}
                oninput={`window.onPasswordUpdateInput('${formId}', "newPassword", "newPasswordConfirmation")`}
                data-revalidate-before-clear
              />
            </FormControl>
          </div>

          <div class={"flex items-center gap-x-3 justify-end"}>
            <FormResetButton
              formId={formId}
              preset={"outline"}
              class="!w-30"
              size="sm"
            >
              Cancel
            </FormResetButton>

            <Button
              class="!w-30"
              type={"submit"}
              size="sm"
            >Save changes</Button>
          </div>
        </>
      )}
    />
  )
}

export default UpdateUserPasswordForm

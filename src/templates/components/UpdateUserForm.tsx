// import { getActionPath } from "$routers/website/utils"
import { User } from "$services/UsersService"
import { FormCommonProps } from "$types/ui"
import Button from "./Button"
import Form from "./Form"
import FormControl from "./FormControl"
import FormResetButton from "./FormResetButton"
import Input from "./Input"
import Textarea from "./Textarea"

type Props = FormCommonProps<FormData> & {
  user: User
  swapOOB?: string
}

type FormData = {
  firstName: string
  lastName: string
  email: string
  description: string
}

export const getUpdateUserFormId = (targetUserId: number) =>
  `update-user-form-${targetUserId}`

const UpdateUserForm = ({ user, errors, values, initialValues, swapOOB }: Props) => {
  const formId = getUpdateUserFormId(user.id)

  return (
    <Form
      id={formId}
      method={"post"}
      hx-boost={"true"}
      // hx-post={getActionPath("users", "UPDATE", { targetUserId: user.id })}
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
            <FormControl name="firstName" formId={formId}>
              <Input
                id={`${formId}-firstName`}
                name={"firstName"}
                label={"Prenume"}
                value={values.firstName}
                error={errors?.firstName}
                required
              />
            </FormControl>
            <FormControl name="lastName" formId={formId}>
              <Input
                id={`${formId}-lastName`}
                name={"lastName"}
                label={"Nume"}
                value={values.lastName}
                error={errors?.lastName}
                required
              />
            </FormControl>
            <Input
              id={`${formId}-email`}
              name={"email"}
              label={"Email"}
              type={"email"}
              value={values.email}
              error={errors?.email}
              readonly
            />
          </div>

          <FormControl
            name="description" formId={formId}
          >
            <Textarea
              id={`${formId}-description`}
              name={"description"}
              label={"Descriere"}
              error={errors?.description}
              placeholder="Scrie aici descrierea sarcinilor tale de serviciu pentru a ajuta AI-ul"
              // maxLength={DESCRIPTION_CHARACTERS_LIMIT}
              maxLength={1000}
              initialLength={values.description.length}
            >{values.description as "safe"}</Textarea>
          </FormControl>

          <div class={"flex items-center gap-x-3 justify-end"}>
            <FormResetButton
              formId={formId}
              preset={"outline"}
              class="!w-30"
              size="sm"
            >
              Anulează
            </FormResetButton>

            <Button
              class="!w-30"
              type={"submit"}
              size="sm"
            >Salvează modificările</Button>
          </div>
        </>
      )}
    />
  )
}

export default UpdateUserForm

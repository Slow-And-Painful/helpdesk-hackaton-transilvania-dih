import Form from "$templates/components/Form"
import FormControl from "$templates/components/FormControl"
import Input from "$templates/components/Input"
import { getActionPath } from "$routers/website/utils"
import { FormCommonProps } from "$types/ui"

type FormData = {
  firstName: string
  lastName: string
  email: string
}

type Props = FormCommonProps<FormData>

export const createUserFormId = "create-user-form"

const CreateUserForm = ({ errors, values, initialValues }: Props) => {
  return (
    <Form
      id={createUserFormId}
      hx-post={getActionPath("users", "CREATE")}
      method="post"
      hx-boost="true"
      hx-push-url="false"
      {...{
        ["hx-on::after-request"]: "onFormAfterRequest(this);",
        ["hx-on::before-request"]: "onFormBeforeRequest(event.target)",
      }}
      hx-target-error={`#${createUserFormId}`}
      values={values}
      initialValues={initialValues}
      errors={errors}
      render={({ errors, values, formId }) => (
        <div class="flex flex-col gap-y-4">
          <FormControl name="firstName" formId={formId} showChanged={false}>
            <Input
              id={`${formId}-firstName`}
              label="Prenume"
              name="firstName"
              required
              type="text"
              error={errors?.firstName}
              value={values?.firstName}
              placeholder="Introdu prenumele"
              size={"sm"}
            />
          </FormControl>

          <FormControl name="lastName" formId={formId} showChanged={false}>
            <Input
              id={`${formId}-lastName`}
              label="Nume"
              name="lastName"
              required
              type="text"
              error={errors?.lastName}
              value={values?.lastName}
              placeholder="Introdu numele"
              size={"sm"}
            />
          </FormControl>

          <FormControl name="email" formId={formId} showChanged={false}>
            <Input
              id={`${formId}-email`}
              label="Email"
              name="email"
              required
              type="email"
              error={errors?.email}
              value={values?.email}
              placeholder="Introdu emailul"
              size={"sm"}
            />
          </FormControl>
        </div>
      )}
    />
  )
}

export default CreateUserForm

import Form from "$templates/components/Form"
import FormControl from "$templates/components/FormControl"
import Input from "$templates/components/Input"
import { getActionPath } from "$routers/website/utils"
import { FormCommonProps } from "$types/ui"

type FormData = {
  name: string
}

type Props = FormCommonProps<FormData>

export const createDepartmentFormId = "create-department-form"

const CreateDepartmentForm = ({ errors, values, initialValues }: Props) => {
  return (
    <Form
      id={createDepartmentFormId}
      hx-post={getActionPath("departments", "CREATE")}
      method="post"
      hx-boost="true"
      hx-push-url="false"
      {...{
        ["hx-on::after-request"]: "onFormAfterRequest(this);",
        ["hx-on::before-request"]: "onFormBeforeRequest(event.target)",
      }}
      hx-target-error={`#${createDepartmentFormId}`}
      values={values}
      initialValues={initialValues}
      errors={errors}
      render={({ errors, values, formId }) => (
        <div class="flex flex-col gap-y-4">
          <FormControl name="name" formId={formId} showChanged={false}>
            <Input
              id={`${formId}-name`}
              label="Name"
              name="name"
              required
              type="text"
              error={errors?.name}
              value={values?.name}
              placeholder="Enter department name"
              size={"sm"}
            />
          </FormControl>
        </div>
      )}
    />
  )
}

export default CreateDepartmentForm

import { Department } from "$services/DepartmentsService"
import { FormCommonProps } from "$types/ui"
import Form from "../Form"
import FormControl from "../FormControl"
import Input from "../Input"
import Button from "../Button"
import { getActionPath } from "$routers/website/utils"

type FormData = {
  name: string
}

type Props = FormCommonProps<FormData> & {
  department: Department
}

export const getDepartmentGeneralFormId = (deptId: number) =>
  `department-general-form-${deptId}`

const DepartmentGeneralForm = ({
  department,
  errors,
  values,
  initialValues,
}: Props) => {
  const formId = getDepartmentGeneralFormId(department.id)

  return (
    <Form
      id={formId}
      method="post"
      action={getActionPath("departments", "UPDATE_GENERAL")}
      hx-boost="true"
      hx-target={`#${formId}`}
      hx-swap="none"
      class="flex flex-col w-full gap-4"
      initialValues={initialValues}
      values={values}
      errors={errors}
      {...{
        ["hx-on::after-request"]: "onFormAfterRequest(this)",
        ["hx-on::before-request"]: "onFormBeforeRequest(event.target)",
      }}
      render={({ formId }) => (
        <>
          <input type="hidden" name="departmentId" value={department.id.toString()} />

          <FormControl name="name" formId={formId}>
            <Input
              id={`${formId}-name`}
              name="name"
              label="Numele Departamentului"
              value={values.name}
              error={errors?.name}
              required
            />
          </FormControl>

          <div class="flex items-center gap-x-3 justify-end">
            <Button type="submit" preset="primary" size={"sm"}>
              Salvează Modificările
            </Button>
          </div>
        </>
      )}
    />
  )
}

export default DepartmentGeneralForm

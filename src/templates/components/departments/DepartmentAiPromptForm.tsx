import { Department } from "$services/DepartmentsService"
import { FormCommonProps } from "$types/ui"
import Form from "../Form"
import FormControl from "../FormControl"
import Textarea from "../Textarea"
import Button from "../Button"
import { getActionPath } from "$routers/website/utils"

type FormData = {
  systemPrompt: string
}

type Props = FormCommonProps<FormData> & {
  department: Department
}

export const getDepartmentAiPromptFormId = (deptId: number) =>
  `department-ai-prompt-form-${deptId}`

const DepartmentAiPromptForm = ({
  department,
  errors,
  values,
  initialValues,
}: Props) => {
  const formId = getDepartmentAiPromptFormId(department.id)

  return (
    <Form
      id={formId}
      method="post"
      action={getActionPath("departments", "UPDATE_PROMPT")}
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
          
          <FormControl name="systemPrompt" formId={formId}>
            <Textarea
              id={`${formId}-systemPrompt`}
              name="systemPrompt"
              label="AI System Prompt"
              placeholder="Enter the system prompt for this department's AI assistant..."
              error={errors?.systemPrompt}
            >
              {values.systemPrompt as "safe"}
            </Textarea>
          </FormControl>

          <div class="flex items-center gap-x-3 justify-end">
            <Button type="submit" preset="primary" size={"sm"}>
              Save Changes
            </Button>
          </div>
        </>
      )}
    />
  )
}

export default DepartmentAiPromptForm
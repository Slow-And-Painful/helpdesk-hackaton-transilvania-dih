import Form from "$templates/components/Form"
import { FormCommonProps } from "$types/ui"
import FormControl from "../FormControl"
import Input from "../Input"
import Textarea from "../Textarea"
import Button from "../Button"
import { getActionPath } from "$routers/website/utils"


type Props = FormCommonProps<FormData> & {
  swapOOB?: string
  modalId?: string
}

type FormData = {
  name: string
  description: string
}

export const createProjectFormId = "create-project-form"

const CreateProjectForm = (props: Props) => {
  const {
    values,
    initialValues,
    errors,
    swapOOB,
    modalId
  } = props

  const formId = createProjectFormId

  return (
    <Form
      id={formId}
      method={"post"}
      action={getActionPath("projects", "CREATE")}
      hx-boost={"true"}
      hx-target={`#${formId}`}
      hx-swap={"none"}
      initialValues={initialValues}
      values={values}
      errors={errors}
      {...{
        ["hx-on::before-request"]: "onFormBeforeRequest(event.target)",
        ["hx-on::load"]: "onFormAfterRequest(this)",
        ...(modalId ? {
          ["hx-on::after-request"]: `closeModal("${modalId}")`,
        } : {})
      }}
      {...(swapOOB
        ? {
            "hx-swap-oob": swapOOB,
          }
        : {})}
      render={({ formId, values, errors }) => (
        <div class="flex flex-col gap-y-4">
          <FormControl name="name" showChanged={false} formId={formId}>
            <Input
              name="name"
              value={values.name}
              error={errors?.name}
              label="Name"
              placeholder="My Project"
              size="sm"
              required
            />
          </FormControl>

          <FormControl name="description" showChanged={false} formId={formId}>
            <Textarea
              name="description"
              error={errors?.description}
              label="Description"
              placeholder="A brief summary about your project"
            >{values.description}</Textarea>
          </FormControl>

          <div class="w-full flex items-center justify-end gap-x-2">
            <Button
              size="sm"
              preset="primary"
              type="submit"
            >
              Create
            </Button>
          </div>
        </div>
      )}
    />
  )
}

export default CreateProjectForm
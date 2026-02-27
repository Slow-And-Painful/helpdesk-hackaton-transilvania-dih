import { getActionPath } from "$routers/website/utils"
import { Project } from "$services/ProjectsService"
import { FormCommonProps } from "$types/ui"
import classNames from "classnames"
import Button from "./Button"
import Form from "./Form"
import FormControl from "./FormControl"
import FormResetButton from "./FormResetButton"
import Input from "./Input"
import Textarea from "./Textarea"
import { modalId } from "./RenameProjectModal"
import { DESCRIPTION_CHARACTERS_LIMIT } from "$constants/descriptions"

export type UpdateProjectFormTemplateType = "projects-listing" | "project-settings"

type FormData = {
  name: string
  description?: string
}

type Props = FormCommonProps<FormData> & {
  swapOOB?: string,
  project: Project,
  template: UpdateProjectFormTemplateType
}

export const getUpdateProjectFormId = (projectId: number) => `update-project-form-${projectId}`

const UpdateProjectForm = ({ values, initialValues, errors, swapOOB, project, template }: Props) => {
  const formId = getUpdateProjectFormId(project.id)

  return (
    <Form
      id={formId}
      method={"post"}
      hx-boost={"true"}
      hx-target={`#${formId}`}
      hx-swap={"none"}
      class={
        "flex flex-col w-full gap-4"
      }
      initialValues={initialValues}
      values={values}
      errors={errors}
      action={getActionPath("projects", "UPDATE")}
      hx-push-url={"false"}
      hx-headers={JSON.stringify({ "hx-template": template })}
      {...{
        ["hx-on::before-request"]: "onFormBeforeRequest(event.target)",
        ["hx-on::load"]: "onFormAfterRequest(this)",
        ["hx-on::after-request"]: template === "projects-listing" ? `closeModal("${modalId}")` : "onFormAfterRequest(this)",
      }}
      {...(swapOOB
        ? {
            "hx-swap-oob": swapOOB,
          }
        : {})}
      render={({ formId, values, errors }) => (
        <>
          <input hidden value={project.id.toString()} name="targetProjectId" />

          <FormControl
            name="name"
            formId={formId}
            showChanged={true}
          >            
            <Input
              label="Name"
              id={`${formId}-name`}
              name={"name"}
              value={values.name}
              error={errors?.name}
              required
              class={classNames({ "mb-4": template === "project-settings" })}
              placeholder="Project name"
            />
          </FormControl>

          {template === "project-settings" ?
            <>
              <FormControl
                name="description"
                formId={formId}
                showChanged={true}
              >
                <Textarea
                  name="description"
                  id={`${formId}-description`}
                  label={"Project description"}
                  error={errors?.description}
                  placeholder="Write here the description about your project in order to help the AI "
                  maxLength={DESCRIPTION_CHARACTERS_LIMIT}
                  initialLength={values.description?.length || 0}
                >
                  {values.description as "safe"}
                </Textarea>
              </FormControl>

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
            
            : null
          }
        </>
      )}
    />
  )
}

export default UpdateProjectForm

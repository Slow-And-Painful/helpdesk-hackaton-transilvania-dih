import { getActionPath } from "$routers/website/utils"
import { Project } from "$services/ProjectsService"
import { ToolInstance } from "$services/ToolsInstancesService"
import { FormCommonProps } from "$types/ui"
import classNames from "classnames"
import Button from "./Button"
import Form from "./Form"
import FormControl from "./FormControl"
import FormResetButton from "./FormResetButton"
import Input from "./Input"
import Textarea from "./Textarea"
import { modalId } from "./RenameToolModal"
import { DESCRIPTION_CHARACTERS_LIMIT } from "$constants/descriptions"

export type UpdateToolMetadataFormTemplateType = "tool-instances-listing" | "tool-instance-settings"

type FormData = {
  title: string
  description?: string
}

type Props = FormCommonProps<FormData> & {
  swapOOB?: string,
  project: Project,
  tool: ToolInstance,
  template: UpdateToolMetadataFormTemplateType
}

export const getUpdateToolMetadataFormId = (projectId: number, toolId: number, template: Props["template"]) => `update-tool-metadata-form-${projectId}-${toolId}-${template}`

const UpdateToolMetadataForm = ({
  values,
  initialValues,
  errors,
  swapOOB,
  project,
  tool,
  template
}: Props) => {
  const formId = getUpdateToolMetadataFormId(project.id, tool.id, template)

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
      action={getActionPath("projects", "UPDATE_TOOL_INSTANCE")}
      hx-push-url={"false"}
      {...{
        ["hx-on::before-request"]: "onFormBeforeRequest(event.target)",
        ["hx-on::load"]: "onFormAfterRequest(this)",
        ["hx-on::after-request"]: template === "tool-instances-listing" ? `closeModal("${modalId}")` : "onFormAfterRequest(this)",
      }}
      {...(swapOOB
        ? {
            "hx-swap-oob": swapOOB,
          }
        : {})}
      render={({ formId, values, errors }) => (
        <>
          <input hidden value={project.id.toString()} name="targetProjectId" />
          <input hidden value={tool.id.toString()} name="targetToolInstanceId" />

          <FormControl
            name="title"
            formId={formId}
            showChanged={true}
          >            
            <Input
              label={"Name"}
              id={`${formId}-title`}
              name={"title"}
              value={values.title}
              error={errors?.title}
              required
              class={classNames({
                "max-w-[310px]": template === "tool-instance-settings"
              })}
              placeholder="Tool name"
            />
          </FormControl>

          {template === "tool-instance-settings" ?
            <>
              <FormControl
                name="description"
                formId={formId}
                showChanged={true}
              >            
                <Textarea
                  label="Description"
                  id={`${formId}-description`}
                  name={"description"}
                  error={errors?.description}
                  placeholder="Write here the description of the tool, for what kind of task is used?"
                  maxLength={DESCRIPTION_CHARACTERS_LIMIT}
                  initialLength={values.description?.length || 0}
                >{values.description as "safe"}</Textarea>
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

export default UpdateToolMetadataForm

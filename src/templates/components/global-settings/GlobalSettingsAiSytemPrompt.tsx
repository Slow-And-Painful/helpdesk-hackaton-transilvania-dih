import { getActionPath } from "$routers/website/utils"
import { FormCommonProps } from "$types/ui"
import Button from "../Button"
import Form from "../Form"
import FormControl from "../FormControl"
import Textarea from "../Textarea"

type FormData = {
  systemPrompt: string
}

type Props = FormCommonProps<FormData>

export const globalSettingsAiSystemPromptFormId = "global-settings-ai-system-prompt-form"

const GlobalSettingsAiSystemPrompt = ({
  errors,
  values,
  initialValues,
}: Props) => {
  const formId = globalSettingsAiSystemPromptFormId

  return (
    <Form
      id={formId}
      method="post"
      hx-post={getActionPath("staff", "UPDATE_SYSTEM_PROMPT")}
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
          <FormControl name="systemPrompt" formId={formId}>
            <Textarea
              id={`${formId}-systemPrompt`}
              name="systemPrompt"
              label="AI System Prompt"
              placeholder="Enter the system prompt for the AI assistant..."
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

export default GlobalSettingsAiSystemPrompt

import Form from "$templates/components/Form"
import FormControl from "$templates/components/FormControl"
import Input from "$templates/components/Input"
import { getActionPath } from "$routers/website/utils"
import { FormCommonProps } from "$types/ui"

type FormData = {
  name: string
  parentFolderId: number
}

type Props = FormCommonProps<FormData> & {
  parentFolderId: number
}

export const createFolderFormId = "create-folder-form"

const CreateFolderForm = ({ errors, values, initialValues, parentFolderId }: Props) => {
  return (
    <Form
      id={createFolderFormId}
      hx-post={getActionPath("departments", "CREATE_FOLDER")}
      method="post"
      hx-push-url="false"
      hx-target="this"
      hx-swap="none"
      hx-target-error={`#${createFolderFormId}`}
      {...{
        ["hx-on::after-request"]: "onFormAfterRequest(this);",
        ["hx-on::before-request"]: "onFormBeforeRequest(event.target)",
      }}
      values={values}
      initialValues={initialValues}
      errors={errors}
      render={({ errors, values, formId }) => (
        <div class="flex flex-col gap-y-4">
          <input type="hidden" name="parentFolderId" value={String(parentFolderId)} />
          <FormControl name="name" formId={formId} showChanged={false}>
            <Input
              id={`${formId}-name`}
              name="name"
              label="Nume folder"
              placeholder="ex: Contracte 2024"
              required
              size="sm"
              error={errors?.name}
              value={values?.name}
            />
          </FormControl>
        </div>
      )}
    />
  )
}

export default CreateFolderForm

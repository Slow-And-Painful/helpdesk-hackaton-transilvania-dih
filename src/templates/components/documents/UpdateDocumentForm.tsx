import { RAGDocument } from "$services/RAGDocumentsService"
import { FormCommonProps } from "$types/ui"
import Form from "$templates/components/Form"
import FormControl from "$templates/components/FormControl"
import Input from "$templates/components/Input"
import Textarea from "$templates/components/Textarea"
import Button from "$templates/components/Button"
import { getActionPath } from "$routers/website/utils"

type FormData = {
  name: string
  aiDescription: string
}

type Props = FormCommonProps<FormData> & {
  document: RAGDocument
  swapOOB?: Htmx.Attributes["hx-swap-oob"]
}

export const getUpdateDocumentFormId = (documentId: number) =>
  `update-document-form-${documentId}`

const UpdateDocumentForm = ({ document, errors, values, initialValues, swapOOB }: Props) => {
  const formId = getUpdateDocumentFormId(document.id)

  return (
    <Form
      {...swapOOB && { "hx-swap-oob": swapOOB }}
      id={formId}
      method="post"
      action={getActionPath("departments", "UPDATE_DOCUMENT")}
      hx-boost="true"
      hx-target={`#${formId}`}
      hx-swap="none"
      class="flex flex-col gap-4"
      initialValues={initialValues}
      values={values}
      errors={errors}
      {...{
        ["hx-on::after-request"]: "onFormAfterRequest(this)",
        ["hx-on::before-request"]: "onFormBeforeRequest(event.target)",
      }}
      render={({ formId }) => (
        <>
          <input type="hidden" name="documentId" value={document.id.toString()} />

          <FormControl name="name" formId={formId}>
            <Input
              id={`${formId}-name`}
              name="name"
              label="Name"
              value={values.name}
              error={errors?.name}
              required
            />
          </FormControl>

          <FormControl name="aiDescription" formId={formId}>
            <Textarea
              id={`${formId}-aiDescription`}
              name="aiDescription"
              label="Description"
              error={errors?.aiDescription}
              rows={"4"}
            >
              {values.aiDescription as "safe"}
            </Textarea>
          </FormControl>

          <div class="flex justify-end">
            <Button type="submit" preset="primary" size="sm" icon="check">
              Save Changes
            </Button>
          </div>
        </>
      )}
    />
  )
}

export default UpdateDocumentForm

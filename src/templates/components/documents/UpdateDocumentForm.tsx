import { RAGDocument } from "$services/RAGDocumentsService"
import { FormCommonProps } from "$types/ui"
import Form from "$templates/components/Form"
import FormControl from "$templates/components/FormControl"
import Input from "$templates/components/Input"
import Textarea from "$templates/components/Textarea"
import Button from "$templates/components/Button"
import Icon from "$templates/components/Icon"
import { getActionPath } from "$routers/website/utils"

type FormData = {
  name: string
  aiDescription: string
  extractedText?: string
}

type Props = FormCommonProps<FormData> & {
  document: RAGDocument
  swapOOB?: Htmx.Attributes["hx-swap-oob"]
  showExtractedText?: boolean
}

export const getUpdateDocumentFormId = (documentId: number) =>
  `update-document-form-${documentId}`

const ExtractionStatusBadge = ({ status }: { status: string }) => {
  if (status === "done") {
    return (
      <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-green-900/30 text-green-400 border border-green-800/50">
        <Icon name="check" size={10} />
        Extracted
      </span>
    )
  }
  if (status === "extracting") {
    return (
      <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-blue-900/30 text-blue-400 border border-blue-800/50 animate-pulse">
        <Icon name="loader-icon" size={10} />
        Extracting…
      </span>
    )
  }
  if (status === "failed") {
    return (
      <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-red-900/30 text-red-400 border border-red-800/50">
        <Icon name="alert-triangle" size={10} />
        Failed
      </span>
    )
  }
  return (
    <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-gray-800 text-gray-400 border border-gray-700">
      <Icon name="clock" size={10} />
      Pending
    </span>
  )
}

const UpdateDocumentForm = ({ document, errors, values, initialValues, swapOOB, showExtractedText }: Props) => {
  const formId = getUpdateDocumentFormId(document.id)
  const extractionStatus = document.extractionStatus ?? "pending"
  const canReExtract = extractionStatus !== "extracting"

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
              label="Description for AI"
              error={errors?.aiDescription}
            >
              {values.aiDescription as "safe"}
            </Textarea>
          </FormControl>

          {showExtractedText && (
            <div class="flex flex-col gap-2">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <label class="text-sm font-medium text-gray-300">Extracted Text</label>
                  <ExtractionStatusBadge status={extractionStatus} />
                </div>
                {canReExtract && (
                  <button
                    type="button"
                    class="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-gray-300 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-md transition-colors"
                    hx-post={getActionPath("departments", "EXTRACT_DOCUMENT_TEXT")}
                    hx-vals={JSON.stringify({ documentId: document.id })}
                    hx-target={`#${formId}`}
                    hx-swap="outerHTML"
                  >
                    <Icon name="refresh-cw" size={12} />
                    {extractionStatus === "failed" ? "Retry extraction" : "Re-extract"}
                  </button>
                )}
              </div>

              {extractionStatus === "extracting" ? (
                <div class="rounded-lg border border-blue-800/50 bg-blue-900/10 p-3 text-sm text-blue-400">
                  Text extraction is in progress. This will update automatically when done.
                </div>
              ) : extractionStatus === "failed" ? (
                <div class="rounded-lg border border-red-800/50 bg-red-900/10 p-3 text-sm text-red-400">
                  Extraction failed. Click "Retry extraction" to try again.
                </div>
              ) : (
                <FormControl name="extractedText" formId={formId}>
                  <Textarea
                    id={`${formId}-extractedText`}
                    name="extractedText"
                    label=""
                    error={errors?.extractedText}
                    rows={"10"}
                    resizable={true}
                  >
                    {(values.extractedText ?? "") as "safe"}
                  </Textarea>
                </FormControl>
              )}
            </div>
          )}

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

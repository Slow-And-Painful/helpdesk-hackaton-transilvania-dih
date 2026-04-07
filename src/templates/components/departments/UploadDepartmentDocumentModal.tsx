import { getActionPath, getPartialPath } from "$routers/website/utils"
import UploadDocumentsModal from "$templates/components/documents/UploadDocumentsModal"
import Input from "$templates/components/Input"
import Textarea from "$templates/components/Textarea"

export const uploadDepartmentDocumentModalId = "upload-department-document-modal"

const SUPPORTED_DOCUMENT_FORMATS = ["jpeg", "jpg", "png", "webp", "pdf", "doc", "docx"]
const MAX_DOCUMENT_SIZE = 10 * 1024 * 1024 // 10MB

const UploadDepartmentDocumentModal = () => {
  const accept = SUPPORTED_DOCUMENT_FORMATS.map((format) => `.${format}`).join(",")
  const uploadUrl = getPartialPath("departments", "GET_UPLOAD_DOCUMENT_PRESIGNED_URL")
  const updateUrl = getActionPath("departments", "UPLOAD_DOCUMENT")

  return (
    <UploadDocumentsModal
      id={uploadDepartmentDocumentModalId}
      modalId={uploadDepartmentDocumentModalId}
      title={"Upload Document"}
      inputName={"departmentDocument"}
      maxFiles={1}
      maxFileSize={MAX_DOCUMENT_SIZE}
      uploadUrl={uploadUrl}
      updateUrl={updateUrl}
      accept={accept}
      isOpen
      loadingComponent={
        <div class={"w-full h-full flex flex-col items-center justify-center gap-2 p-2"}>
          <div class={"text-sm font-medium"}>Uploading document...</div>
          <div data-loading-bar class="w-full rounded-full bg-gray-200 h-2 overflow-hidden">
            <div class="bg-primary-600 h-full rounded-full transition-[width]" style={{ width: "0%" }}></div>
          </div>
        </div>
      }
      onChange={`
        const file = this.files[0];
        const dropzone = this.closest('.dropzone');
        window.documentFileUploader?.onInputChange(this, dropzone);
      `}
      dropzoneText={null}
      confirmButtonText={"Upload"}
      onConfirm={`
        window.documentFileUploader?.confirmUpload()
      `}
      showBackButton={false}
      description={
        <div class="flex flex-col gap-3 mb-2">
          <Input
            id="document-name"
            name="documentName"
            label="Name"
            placeholder="Document name"
            required
          />
          <Textarea
            id="document-ai-description"
            name="documentAiDescription"
            label="Description for AI"
            placeholder="Describe when and how the AI should use this document"
            rows={3}
            resizable={false}
          />
        </div>
      }
    />
  )
}

export default UploadDepartmentDocumentModal

import { getActionPath, getPartialPath } from "$routers/website/utils"
import UploadDocumentsModal from "$templates/components/documents/UploadDocumentsModal"
import Input from "$templates/components/Input"
import Textarea from "$templates/components/Textarea"

export const uploadDepartmentDocumentModalId = "upload-department-document-modal"

const SUPPORTED_DOCUMENT_FORMATS = ["pdf"]
const MAX_DOCUMENT_SIZE = 10 * 1024 * 1024 // 10MB

const UploadDepartmentDocumentModal = ({ folderId }: { folderId?: number }) => {
  const accept = SUPPORTED_DOCUMENT_FORMATS.map((format) => `.${format}`).join(",")
  const uploadUrl = getPartialPath("departments", "GET_UPLOAD_DOCUMENT_PRESIGNED_URL")
  const updateUrl = getActionPath("departments", "UPLOAD_DOCUMENT")

  return (
    <UploadDocumentsModal
      id={uploadDepartmentDocumentModalId}
      modalId={uploadDepartmentDocumentModalId}
      title={"Încarcă Document"}
      inputName={"departmentDocument"}
      maxFiles={1}
      maxFileSize={MAX_DOCUMENT_SIZE}
      uploadUrl={uploadUrl}
      updateUrl={updateUrl}
      accept={accept}
      {...folderId ? { updateUrlBody: { folderId } } : {}}
      isOpen
      loadingComponent={
        <div class={"w-full h-full flex flex-col items-center justify-center gap-2 p-2"}>
          <div class={"text-sm font-medium"}>Se încarcă documentul...</div>
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
      confirmButtonText={"Încarcă"}
      onConfirm={`
        window.documentFileUploader?.confirmUpload()
      `}
      showBackButton={false}
      description={
        <div class="flex flex-col gap-3 mb-2">
          <Input
            id="document-name"
            name="documentName"
            label="Nume"
            placeholder="Numele documentului"
            required
          />
          <Textarea
            id="document-ai-description"
            name="documentAiDescription"
            label="Descriere pentru AI"
            placeholder="Descrie când și cum ar trebui să folosească AI-ul acest document"
            rows={"3"}
            resizable={false}
          />
        </div>
      }
    />
  )
}

export default UploadDepartmentDocumentModal

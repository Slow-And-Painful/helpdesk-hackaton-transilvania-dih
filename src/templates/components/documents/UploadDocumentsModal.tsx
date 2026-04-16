import classNames from "classnames"
import Modal from "$templates/components/Modal"
import Button from "$templates/components/Button"
import Tooltip from "$templates/components/Tooltip"
import Icon from "$templates/components/Icon"
import { formatDate } from "$utils/dates"

export type UploadDocumentsModalProps = JSX.HtmlTag & {
  inputName: string
  accept?: string
  maxFiles?: number
  isOpen: boolean
  title?: string
  modalId?: string
  uploadUrl: string
  updateUrl?: string
  updateUrlBody?: Record<string, unknown>
  formId?: string
  onClose?: string
  onConfirm?: string
  onChange?: string
  dropzoneClass?: string
  dropzoneText?: JSX.Element | null
  supportedFormatsText?: string
  showBackButton?: boolean
  backButtonText?: string
  confirmButtonText?: string
  additionalButtonSectionProps?: Record<string, string>
  description?: JSX.Element
  withDate?: boolean
  initialData?: { id: number, name: string, creationTimestamp?: Date, status: "SUCCESS" | "ERROR", size?: number }[]
  removeUrl?: string
  timeZone?: string
  maxFileSize?: number
  availableSpace?: number
  loadingComponent?: JSX.Element
}

const UploadDocumentsModal = ({
  inputName,
  accept,
  maxFiles,
  isOpen,
  title,
  modalId = "upload-documents-modal",
  uploadUrl,
  updateUrl,
  updateUrlBody,
  formId,
  onClose,
  onConfirm,
  onChange,
  dropzoneClass,
  dropzoneText,
  supportedFormatsText,
  showBackButton = true,
  backButtonText = "Cancel",
  confirmButtonText = "Confirm",
  description,
  withDate = false,
  initialData = [],
  timeZone,
  removeUrl,
  maxFileSize,
  availableSpace,
  loadingComponent,
  ...props
}: UploadDocumentsModalProps) => {
  const isMultiple = maxFiles !== 1
  const displayTitle = title || `Upload Document${isMultiple ? "s" : ""}`
  
  const acceptFormats = accept 
    ? accept
        .split(",")
        .map(type => type.replace("image/", ""))
        .join(", ")
    : ""

  const dropzoneLabel = dropzoneText === undefined ? <span>{"Text 1"} <button onclick={`this.closest(".modal")?.querySelector("input[type=file][name='${inputName}']")?.click()`} class="font-medium underline">Dropzone text 2</button></span> : dropzoneText 

  const realMaxFiles = maxFiles !== undefined ? maxFiles - (initialData.length ?? 0) : undefined
  const realMaxTotalSize = availableSpace !== undefined ? availableSpace - (initialData.reduce((acc, file) => acc + (file.size || 0), 0)) : undefined

  return (
    <Modal
      id={modalId}
      title={displayTitle}
      isOpen={isOpen}
      {...props}
    >
      {description ? (
        <div class="text-sm mb-4">
          {description}
        </div>
      ) : null}
      {dropzoneLabel ?
        <div class="text-sm font-medium mb-2" data-browse-button>
          {dropzoneLabel as "safe"}
        </div>
      : null}
      <div
        class={classNames("dropzone", dropzoneClass, {
          "dropzone--has-file": initialData.length > 0,
        })}
        data-input-file
        data-max-file-size={maxFileSize}
        data-max-total-size={realMaxTotalSize}
      >
        {loadingComponent ? (
          <div class="absolute inset-0 hidden items-center justify-center z-10 w-full h-full backdrop-blur-sm" style="background:rgba(17,24,39,0.75)" data-loading-component>
            {loadingComponent}
          </div>
        ) : null}
        <input
          type="file"
          class="hidden"
          name={inputName}
          required
          accept={accept}
          multiple={isMultiple}
          data-max-files={realMaxFiles}
          disabled={realMaxFiles === 0}
          {...withDate ? {
            "data-with-date": "true",
          } : {}}
          onchange={onChange}
        />
        <div
          data-no-file-message
          onclick="
            const input = this.closest('.dropzone').querySelector('input');
            input.click();
          "
        >
          <Icon name="upload" size={24} />
          {acceptFormats ? (
            <span class="text-xs" safe>
              {supportedFormatsText || acceptFormats}
            </span>
          ) : null}
        </div>
        <div
          data-uploaded-files-section
          class={classNames("h-full overflow-auto cursor-pointer", { "single-file": !isMultiple || maxFiles === 1 })}
          onclick="
            const input = this.closest('.dropzone').querySelector('input');
            input.click();
          "
        >
          {initialData.length > 0 ? 
            initialData.map((file) => {
              const removeScript = `
                event.stopPropagation()
                const fileItem = this.closest('.file-uploaded-item')
                const dropzone = fileItem.closest('.dropzone')
                fileItem.remove()
                const input = dropzone.querySelector('input[type=file][name=${inputName}]')
                const uploadedFilesSection = dropzone.querySelector('[data-uploaded-files-section]')
                const maxFiles = input.getAttribute('data-max-files')
                const alreadyUploadedFiles = uploadedFilesSection.querySelectorAll('.file-uploaded-item').length
                if (maxFiles) {
                  input.setAttribute('data-max-files', parseInt(maxFiles) + 1);
                  input.removeAttribute('disabled');
                }
                dropzone.classList.toggle('dropzone--has-file', alreadyUploadedFiles > 0);
                const filesToRemoveInputs = dropzone.closest(".modal")?.querySelector('[data-files-to-remove-hidden-inputs]');
                if (!filesToRemoveInputs) {
                  return;
                }
                const inputToRemove = document.createElement('input');
                inputToRemove.type = 'hidden';
                inputToRemove.name = 'filesToRemove[]';
                const fileId = ${file.id};
                inputToRemove.value = fileId.toString();
                filesToRemoveInputs.appendChild(inputToRemove);

                const submitButton = dropzone.closest(".modal")?.querySelector('[data-uploaded-files-button] button');
                if (submitButton) {
                  submitButton.disabled = false;
                  submitButton.classList.remove('btn--disabled');
                }
              `
              const element = (
                <div class={classNames("file-uploaded-item", file.status === "ERROR" && "!text-red-600")}>
                  <div class={"file-uploaded-item__name-container"}>
                    <Icon name={file.status === "ERROR" ? "alert-triangle" : "document"} size={16} />
                    <div class={"file-uploaded-item__name"} safe>
                      {file.name}
                    </div>     
                  </div>
                  <div class={"flex items-center gap-2.5"}>
                    {file.creationTimestamp ? 
                      <div safe>{formatDate(file.creationTimestamp, { timeZone })}</div> : null
                    }
                    <button
                      class={"file-uploaded-item__button"}
                      onclick={removeScript}
                    >
                      <Icon name={"x"} size={16} />
                    </button>
                  </div>
                </div>
              )
              if (file.status === "ERROR") {
                return (
                  <Tooltip
                    text={element}
                    content={"Upload failed, please remove and upload again"}
                  />
                )
              } else {
                return element
              }
            }) : <></>
          }
        </div>
      </div>

      <div data-uploaded-files-hidden-inputs class={"hidden"} />
      <div data-files-to-remove-hidden-inputs data-remove-url={removeUrl} class={"hidden"} />
      
      <div class={"flex gap-2 mt-4 justify-end items-center pb-[1px]"}>
        {showBackButton ?
          <Button
            type={"button"}
            size="sm"
            class={"!w-30"}
            preset="tertiary"
            onclick={onClose ? `(${onClose.toString()})()` : `closeModal('${modalId}')`}
          >
            {backButtonText as "safe"}
          </Button>
        : null}
        
        <div
          data-uploaded-files-button
          data-upload-url={uploadUrl}
          data-update-url={updateUrl}
          data-update-url-body={updateUrlBody ? JSON.stringify(updateUrlBody) : undefined}
          data-form-id={formId}
          {...props.additionalButtonSectionProps}
        >
          <Button
            size="sm"
            class={"!w-30"}
            spinner
            disabled
            onclick={onConfirm}
            icon={"upload"}
            iconPosition={"right"}
          >
            {confirmButtonText as "safe"}
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default UploadDocumentsModal

import axios from "axios"
import htmx from "htmx.org"
import md5 from "md5"
import { onInputChange, init } from "./fileUploader"

declare global {
  interface Window {
    documentFileUploader: {
      init: () => void
      onInputChange: (fileInput: HTMLInputElement, dropzone: HTMLElement) => void
      confirmUpload: () => Promise<void>
    }
  }
}

let progressInterval: number

const updateProgressBar = (dropzone: HTMLElement, percentCompleted: number) => {
  const progressBar = dropzone.querySelector("[data-loading-bar]>div") as HTMLDivElement | null
  if (progressBar) {
    progressBar.style.width = `${percentCompleted}%`
  }
}

const documentConfirmUpload = async () => {
  const buttonSection = document.querySelector("[data-uploaded-files-button]")
  if (!buttonSection) throw new Error("Button not found")

  const button = buttonSection.querySelector("button")
  if (!button) throw new Error("Button not found")

  const dropzone = button.closest(".modal")?.querySelector(".dropzone") as HTMLDivElement | undefined
  if (!dropzone) throw new Error("Dropzone not found")

  const closeModalButton = dropzone.closest(".modal")?.querySelector(".modal__close") as HTMLButtonElement | undefined
  if (!closeModalButton) throw new Error("Close modal button not found")

  button.classList.add("btn--loading")
  closeModalButton.setAttribute("disabled", "true")

  const hiddenInputsSection = document.querySelector("[data-uploaded-files-hidden-inputs]")
  if (!hiddenInputsSection) throw new Error("Hidden inputs section not found")

  const filesInput = hiddenInputsSection.querySelectorAll("input")
  if (!filesInput) throw new Error("Files not found")

  dropzone.classList.add("loading")

  const now = new Date()

  if (filesInput.length === 0 || !filesInput[0].files || filesInput[0].files.length === 0) {
    dropzone.classList.remove("loading")
    button.classList.remove("btn--loading")
    closeModalButton.removeAttribute("disabled")
    throw new Error("No file selected")
  }

  const fileObject = {
    name: filesInput[0].files[0].name,
    timestamp: now.toISOString(),
  }

  const file = filesInput[0].files[0]

  const fileWithKeysAndTimestamps = {
    name: fileObject.name,
    key: "",
    timestamp: fileObject.timestamp,
    size: 0,
    type: file.type,
  }

  const endpoint = buttonSection.getAttribute("data-upload-url")
  if (!endpoint) {
    dropzone.classList.remove("loading")
    throw new Error("Endpoint not found")
  }

  let error = false
  try {
    const key = md5(`${fileObject.name}-${fileObject.timestamp}`)
    const response = await axios({
      method: "POST",
      url: endpoint,
      headers: { "Content-Type": "application/json" },
      data: { key },
    })

    if (response.status !== 200) {
      window.toast.error("Upload failed")
      throw new Error(JSON.stringify({ type: "UPLOAD_FAILED", status: response.status }))
    }

    const fileInput = hiddenInputsSection.querySelector(
      `input[name="${fileObject.name.replace(/\s/g, "-")}"]`
    ) as HTMLInputElement
    if (!fileInput) throw new Error("File input not found")

    const uploadedFile = fileInput.files?.[0]
    if (!uploadedFile) throw new Error("File not found")

    const url = response.data.url
    const res = await axios({
      method: "PUT",
      url,
      headers: { "Content-Type": uploadedFile.type },
      data: uploadedFile,
      onUploadProgress: (progressEvent) => {
        const percentCompleted = progressEvent.total
          ? Math.round((progressEvent.loaded * 35) / progressEvent.total)
          : 0
        updateProgressBar(dropzone, Math.min(percentCompleted, 35))
      },
    })

    if (res.status !== 200) {
      window.toast.error("Upload failed")
      throw new Error(JSON.stringify({ type: "UPLOAD_FAILED_PUT", status: res.status }))
    }

    Object.assign(fileWithKeysAndTimestamps, { key, size: uploadedFile.size })
  } catch (err) {
    const submitButton = document.querySelector("[data-uploaded-files-button]")?.querySelector("button")
    submitButton?.classList.remove("btn--loading")
    closeModalButton.removeAttribute("disabled")
    dropzone.classList.remove("loading")
    window.toast.error("Upload failed")
    error = true
    throw err
  }

  if (error) {
    window.toast.error("Upload failed")
    const submitButton = document.querySelector("[data-uploaded-files-button]")?.querySelector("button")
    submitButton?.classList.remove("btn--loading")
    closeModalButton.removeAttribute("disabled")
    throw new Error("Upload failed")
  }

  const updateUrl = buttonSection.getAttribute("data-update-url")
  const updateUrlBody = buttonSection.getAttribute("data-update-url-body") ?? "{}"
  if (!updateUrl) throw new Error("Update URL not found")

  let progress = 35
  let firstIteration = true

  progressInterval = setInterval(() => {
    if (firstIteration) {
      firstIteration = false
      return
    }
    const increment = Math.floor(Math.random() * 17) + 1
    progress = Math.min(progress + increment, 95)
    updateProgressBar(dropzone, progress)
  }, 2000) as never

  const nameInput = document.getElementById("document-name") as HTMLInputElement | null
  const aiDescriptionInput = document.getElementById("document-ai-description") as HTMLTextAreaElement | null

  await htmx.ajax("post", updateUrl, {
    values: {
      ...JSON.parse(updateUrlBody),
      documentKey: fileWithKeysAndTimestamps.key,
      documentType: fileWithKeysAndTimestamps.type,
      name: nameInput?.value ?? "",
      aiDescription: aiDescriptionInput?.value ?? "",
    },
  })

  clearInterval(progressInterval)
  dropzone.classList.remove("loading")

  const submitButton = document.querySelector("[data-uploaded-files-button]")?.querySelector("button")
  if (submitButton) {
    submitButton.classList.remove("btn--loading")
  }
  closeModalButton.removeAttribute("disabled")

  const modal = dropzone.closest(".modal__wrap")
  if (modal?.id) {
    window.closeModal(modal.id)
  }
}

window.documentFileUploader = {
  init,
  onInputChange,
  confirmUpload: documentConfirmUpload,
}

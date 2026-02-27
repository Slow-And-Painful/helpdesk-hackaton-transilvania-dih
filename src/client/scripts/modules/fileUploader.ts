import { IconName } from "$templates/components/Icon"
import { formatDate } from "$utils/dates"
import axios from "axios"
import htmx from "htmx.org"

declare global {
  interface Window {
    uploadFile: (input: HTMLInputElement) => Promise<UploadfileResponse>
  }
}

const MAX_FILE_SIZE = 200 * 1024 // 200kb
const MAX_FILE_SIZE_HUMAN = "200kb"

type UploadfileResponse =
  | {
      success: true
      partialKey: string
      error: null
    }
  | {
      success: false
      partialKey: null
      error: string
    }

window.uploadFile = async (
  input: HTMLInputElement,
  keepLoadingState: boolean = false,
): Promise<UploadfileResponse> => {
  const file = input.files?.[0]
  const getPutEndpoint = input.getAttribute("data-put-url-endpoint")
  const fileUploader = input.closest("[data-input-file]")

  if (!file || !getPutEndpoint || !fileUploader) {
    window.toast.error("Oops! Si è verificato un errore. Riprova più tardi.")

    console.error("window.uploadFile: Invalid input", {
      file,
      getPutEndpoint,
      fileUploader,
    })

    return {
      success: false,
      partialKey: null,
      error: "Invalid input",
    }
  }

  if (file.size > MAX_FILE_SIZE) {
    window.toast.error(
      `Il file è troppo grande. Dimensione massima: ${MAX_FILE_SIZE_HUMAN}`,
    )

    return {
      success: false,
      partialKey: null,
      error: "File is too large",
    }
  }

  fileUploader.classList.add("loading")

  const {
    data: { url: putUrl, partialKey },
  } = await axios.post(getPutEndpoint, {
    fileName: file.name,
  })
  if (!putUrl) {
    window.toast.error("Oops! Si è verificato un errore. Riprova più tardi.")

    fileUploader.classList.remove("loading")

    console.error("Failed to get put url", {
      endpoint: getPutEndpoint,
      partialKey,
    })

    return {
      success: false,
      partialKey: null,
      error: "Failed to get put url",
    }
  }

  await axios.put(putUrl, file, {
    headers: {
      "Content-Type": file.type,
    },
  })

  const onSuccessData = input.getAttribute("data-on-upload-success")
  if (onSuccessData) {
    try {
      const { method, endpoint, vals } = JSON.parse(onSuccessData)

      htmx.ajax(method, endpoint, {
        values: {
          ...vals,
          partialKey,
        },
        target: fileUploader,
        swap: "none",
      })
    } catch (err) {
      window.toast.error("Oops! Si è verificato un errore. Riprova più tardi.")

      console.error(err)
      fileUploader.classList.remove("loading")
      return {
        success: false,
        partialKey,
        error: "Failed on upload success",
      }
    }
  }

  if (!keepLoadingState) {
    fileUploader.classList.remove("loading")
  }

  input.value = ""
  input.files = null

  return {
    success: true,
    partialKey,
    error: null,
  }
}


export const checkFileAlreadyExists = (fileName: string) => {
  const hiddenInputsSection = document.querySelector("[data-uploaded-files-hidden-inputs]")
  if (!hiddenInputsSection) {
    throw new Error("Hidden inputs section not found")
  }
  const hiddenInputs = hiddenInputsSection.querySelectorAll("input")
  const parsedFileName = fileName.replace(/\s/g, "-")
  for (let i = 0; i < hiddenInputs.length; i++) {
    if (hiddenInputs[i].name === parsedFileName) {
      return true
    }
  }
  return false
}

export const checkLimitReached = (dropzone: HTMLElement) => {
  const fileInput = dropzone.querySelector("input")
  if (!fileInput) {
    throw new Error("File input not found")
  }
  
  const hiddenInputsSection = document.querySelector("[data-uploaded-files-hidden-inputs]")
  if (!hiddenInputsSection) {
    throw new Error("Hidden inputs section not found")
  }
  
  const hasMax = fileInput.hasAttribute("data-max-files")
  const maxFiles = hasMax ? parseInt(fileInput.getAttribute("data-max-files") as string) : Infinity
  
  const hiddenInputs = hiddenInputsSection.querySelectorAll("input")
  if (hiddenInputs.length >= maxFiles) {
    dropzone.classList.add("disabled")
    fileInput.setAttribute("disabled", "true")
  } else {
    dropzone.classList.remove("disabled")
    fileInput.removeAttribute("disabled")
  }
}

export const checkFileSize = (file: File, maxSize: number = window.MAX_FILE_SIZE) => {
  const maxSizeMb = (maxSize / 1024 / 1024).toFixed(2)
  if (file.size > maxSize) {
    window.toast.error(`File too large. Max size: ${maxSizeMb} MB`)
    return false
  }
  return true
}

export const checkMaxTotalSize = (files: FileList, maxTotalSize?: number) => {
  if (!maxTotalSize) {
    return true
  }

  const totalSize = Array.from(files).reduce((acc, file) => acc + file.size, 0)

  if (totalSize > maxTotalSize) {
    const maxTotalSizeMb = (maxTotalSize / 1024 / 1024).toFixed(2)
    window.toast.error(`Total files size exceeds the limit. Space available: ${maxTotalSizeMb} MB`)
    return false
  }

  return true
}

export const addFileLine = (file: File, options: { withCopyrightOption: boolean, withShowRealNameOption: boolean, withDate: boolean }) => {
  const { withDate } = options
  
  if (checkFileAlreadyExists(file.name)) {
    return
  }

  const section = document.querySelector("[data-uploaded-files-section]")
  const hiddenInputsSection = document.querySelector("[data-uploaded-files-hidden-inputs]")
  const submitButton = document.querySelector("[data-uploaded-files-button]")?.querySelector("button")
  
  if (!section || !hiddenInputsSection || !submitButton) {
    throw new Error("Title or section not found")
  }

  if (section.classList.contains("hidden")) {
    section.classList.remove("hidden")
    section.classList.add("flex")
  }
  if (submitButton.classList.contains("btn--disabled")) {
    submitButton.removeAttribute("disabled")
    submitButton.classList.remove("btn--disabled")
  }

  const item = document.createElement("div")
  item.classList.add("file-uploaded-item")
  const nameContainer = document.createElement("div")
  nameContainer.classList.add("file-uploaded-item__name-container")
  const icon = document.createElement("div")
  icon.classList.add("icon")
  icon.style.setProperty("--icon-size", "16")
  icon.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 24 24" role="img">
      <use href="#document"></use>
    </svg>
  `
  nameContainer.appendChild(icon)
  const name = document.createElement("div")
  name.classList.add("file-uploaded-item__name")
  name.innerText = file.name
  nameContainer.appendChild(name)
  item.appendChild(nameContainer)
  const button = document.createElement("button")
  button.classList.add("file-uploaded-item__button")
  button.innerHTML = `
    <div class="icon" style="--icon-size:16;">
      <svg width="16" height="16" viewBox="0 0 24 24" role="img">
        <use href="#x"></use>
      </svg>
    </div>
  `
  button.setAttribute("data-file-name", file.name.replace(/\s/g, "-"))
  // if (withCopyrightOption) {
  //   const copyrightCheckbox = createCopyrightCheckbox(file.name.replace(/\s/g, "-"))
  //   item.appendChild(copyrightCheckbox)
  // }

  if (withDate) {
    const buttonAndDateContainer = document.createElement("div")
    buttonAndDateContainer.classList.add("flex", "items-center", "gap-2.5")
    const date = formatDate(new Date())
    const dateContainer = document.createElement("div")
    dateContainer.innerText = date
    buttonAndDateContainer.appendChild(dateContainer)
    buttonAndDateContainer.appendChild(button)
    item.appendChild(buttonAndDateContainer)
  } else {
    item.appendChild(button)
  }

  
  section.appendChild(item)
  button.addEventListener("click", (event) => removeFile(event, button))

  const input = document.createElement("input")
  input.type = "file"
  input.style.display = "none"  
  input.name = file.name.replace(/\s/g, "-")
  input.id = `file-${file.name.replace(/\s/g, "-")}`
  const dataTransfer = new DataTransfer()
  dataTransfer.items.add(file)
  input.files = dataTransfer.files
  
  hiddenInputsSection.appendChild(input)
  const dropzone = button.closest(".dropzone")
  if (!dropzone) {
    throw new Error("Dropzone not found")
  }
  dropzone.classList.add("dropzone--has-file")
  const copyrightCheckbox = dropzone.closest(".modal")?.querySelector(".copyright-checkbox-container .checkbox__wrap")
  if (copyrightCheckbox) {
    const checkbox = copyrightCheckbox.querySelector("input[type='checkbox']") as HTMLInputElement
    copyrightCheckbox.classList.remove("checkbox__wrap--disabled")
    checkbox.removeAttribute("disabled")
  }
  const showRealNameCheckbox = dropzone.closest(".modal")?.querySelector(".show-real-name-checkbox-container .checkbox__wrap")
  if (showRealNameCheckbox) {
    const checkbox = showRealNameCheckbox.querySelector("input[type='checkbox']") as HTMLInputElement
    showRealNameCheckbox.classList.remove("checkbox__wrap--disabled")
    checkbox.removeAttribute("disabled")
  }
}

const createCopyrightCheckbox = (fileName: string) => {
  const el = `<div class="checkbox__wrap mr-3">
    <label class="checkbox__container">
      <input type="checkbox" class="checkbox" name="${fileName}-copyright" required="">
      <div class="checkbox__box" tabindex="0">
        <div class="checkbox__box-icon">
          <div class="icon" style="--icon-size:10;">
            <svg width="10" height="10" viewBox="0 0 24 24" role="img">
              <use href="#check"></use>
            </svg>
          </div>
        </div>
      </div>
      <div class="checkbox__label">
        <div class="icon" style="--icon-size:14;">
          <svg width="14" height="14" viewBox="0 0 24 24" role="img">
            <use href="#copyright"></use>
          </svg>
        </div>
      </div>
    </label>
  </div>`

  const wrapper = document.createElement("div")
  wrapper.innerHTML = el

  return wrapper.firstChild as HTMLDivElement
}

export const getFileCopyrightCheckboxValue = (fileName: string) => {
  const checkbox = document.querySelector(`input[name="${fileName}-copyright"]`) as HTMLInputElement | null
  if (!checkbox) {
    throw new Error("Checkbox not found")
  }
  return checkbox.checked
}

export const getCopyrightCheckboxValue = (dropzone: HTMLElement) => {
  const copyrightCheckbox = dropzone.closest(".modal")?.querySelector(".copyright-checkbox-container .checkbox__wrap")
  if (!copyrightCheckbox) {
    throw new Error("Copyright checkbox not found")
  }
  const checkbox = copyrightCheckbox.querySelector("input[type='checkbox']") as HTMLInputElement
  return checkbox.checked
}

export const getShowRealNameCheckboxValue = (dropzone: HTMLElement) => {
  const showRealNameCheckbox = dropzone.closest(".modal")?.querySelector(".show-real-name-checkbox-container .checkbox__wrap")
  if (!showRealNameCheckbox) {
    throw new Error("Show real name checkbox not found")
  }
  const checkbox = showRealNameCheckbox.querySelector("input[type='checkbox']") as HTMLInputElement
  return checkbox.checked
}

export const removeFileLine = (event: Event, button: HTMLButtonElement) => {
  event.stopPropagation()
  const item = button.closest(".file-uploaded-item")
  if (!item) {
    throw new Error("Item not found")
  }
  item.remove()

  const hiddenInputsSection = document.querySelector("[data-uploaded-files-hidden-inputs]")
  if (!hiddenInputsSection) {
    throw new Error("Hidden inputs section not found")
  }

  const fileName = button.getAttribute("data-file-name")
  const input = hiddenInputsSection.querySelector(`input[id="file-${fileName}"]`)
  if (!input) {
    throw new Error("Input not found")
  }
  input.remove()

  const section = document.querySelector("[data-uploaded-files-section]")
  if (!section) {
    throw new Error("Section not found")
  }

  if (section.children.length === 0) {
    const submitButton = document.querySelector("[data-uploaded-files-button]")?.querySelector("button")
    if (!submitButton) {
      throw new Error("Title or submit button not found")
    }
    section.classList.add("hidden")
    section.classList.remove("flex")
    submitButton.setAttribute("disabled", "true")
    submitButton.classList.add("btn--disabled")
    const dropzone = section.closest(".dropzone")
    if (!dropzone) {
      throw new Error("Dropzone not found")
    }
    dropzone.classList.remove("dropzone--has-file")
    const copyrightCheckbox = dropzone.closest(".modal")?.querySelector(".copyright-checkbox-container .checkbox__wrap")
    if (copyrightCheckbox) {
      const checkbox = copyrightCheckbox.querySelector("input[type='checkbox']") as HTMLInputElement
      copyrightCheckbox.classList.add("checkbox__wrap--disabled")
      checkbox.setAttribute("disabled", "true")
      checkbox.checked = false
      checkbox.value = "off"
      checkbox.dispatchEvent(new Event("change"))
    }

    const showRealNameCheckbox = dropzone.closest(".modal")?.querySelector(".show-real-name-checkbox-container .checkbox__wrap")
    if (showRealNameCheckbox) {
      const checkbox = showRealNameCheckbox.querySelector("input[type='checkbox']") as HTMLInputElement
      showRealNameCheckbox.classList.add("checkbox__wrap--disabled")
      checkbox.setAttribute("disabled", "true")
      checkbox.checked = false
      checkbox.value = "off"
      checkbox.dispatchEvent(new Event("change"))
    }
  }
}

export const removeFile = (event: Event, button: HTMLButtonElement) => {
  event.stopPropagation()
  const dropzone = button.closest(".modal")?.querySelector(".dropzone")
  if (!dropzone) {
    throw new Error("Dropzone not found")
  }

  removeFileLine(event, button)
  checkLimitReached(dropzone as HTMLElement)
}

export const onInputChange = (fileInput: HTMLInputElement, dropzone: HTMLElement, maxSize?: number) => {
  const files = fileInput.files
  if (!files || files.length === 0) {
    return
  }

  const hasMax = fileInput.hasAttribute("data-max-files")
  const maxFiles = hasMax ? parseInt(fileInput.getAttribute("data-max-files") as string) : Infinity
  const withCopyrightOption = fileInput.getAttribute("data-with-copyright-option") === "true"
  const withShowRealNameOption = fileInput.getAttribute("data-with-show-real-name-option") === "true"
  const withDate = fileInput.getAttribute("data-with-date") === "true"
  const maxTotalSize = dropzone.getAttribute("data-max-total-size") ? parseFloat(dropzone.getAttribute("data-max-total-size") as string) : undefined

  if (files.length > maxFiles) {
    window.toast.error(`Max files limit reached (${maxFiles})`)
    return
  }

  if (maxTotalSize && !checkMaxTotalSize(files, maxTotalSize)) {
    return
  }
  
  const hiddenInputsSection = document.querySelector("[data-uploaded-files-hidden-inputs]")
  if (!hiddenInputsSection) {
    throw new Error("Hidden inputs section not found")
  }

  const hiddenInputs = hiddenInputsSection.querySelectorAll("input")
  const remainingFiles = maxFiles - hiddenInputs.length

  if (remainingFiles < files.length) {
    window.toast.error(`Max files limit reached (${maxFiles})`)
    return
  }
  
  for (let i = 0; i < files.length; i++) {
    if (!checkFileSize(files[i], maxSize)) {
      continue
    }
    addFileLine(files[i], { withCopyrightOption, withShowRealNameOption, withDate })
  }

  checkLimitReached(dropzone as HTMLElement)

  // Reset the file input to allow re-uploading the same file after removing it
  fileInput.value = ""
  fileInput.files = null
  fileInput.dispatchEvent(new Event("change"))
}

export const onDragOver = (event: DragEvent) => {
  event.preventDefault()
  const target = event.target as HTMLElement
  const dropzone = target.classList.contains("dropzone")
    ? target
    : target.closest(".dropzone")
  if (!dropzone) {
    throw new Error("Dropzone not found")
  }

  dropzone.classList.add("dragover")
}

export const onDragLeave = (event: DragEvent) => {
  const target = event.target as HTMLElement
  const dropzone = target.classList.contains("dropzone")
    ? target
    : target.closest(".dropzone")
  if (!dropzone) {
    throw new Error("Dropzone not found")
  }
  
  dropzone.classList.remove("dragover")
}

export const onDrop = async(event: DragEvent) => {
  // Prevent default behavior (Prevent file from being opened)
  event.preventDefault()
  const target = event.target as HTMLElement
  const dropzone = target.classList.contains("dropzone")
    ? target
    : target.closest(".dropzone")
  if (!dropzone) {
    throw new Error("Dropzone not found")
  }

  const maxSize = dropzone.getAttribute("data-max-file-size") ? parseInt(dropzone.getAttribute("data-max-file-size") as string) : undefined
  const maxTotalSize = dropzone.getAttribute("data-max-total-size") ? parseFloat(dropzone.getAttribute("data-max-total-size") as string) : undefined

  dropzone.classList.remove("dragover")

  const fileInput = dropzone.querySelector("input")
  if (!fileInput) {
    throw new Error("File input not found")
  }

  if (!event.dataTransfer?.files) {
    return
  }

  const files = Array.from(event.dataTransfer.files)

  const hasMax = fileInput.hasAttribute("data-max-files")
  const maxFiles = hasMax ? parseInt(fileInput.getAttribute("data-max-files") as string) : Infinity

  if (files.length > maxFiles) {
    window.toast.error(`Max files limit reached (${maxFiles})`)
    return
  }

  if (maxTotalSize && !checkMaxTotalSize(event.dataTransfer.files, maxTotalSize)) {
    return
  }

  const { fileTypeFromStream } = await import("file-type")

  const accept = fileInput.getAttribute("accept")
  if (accept) {
    const acceptedTypes = accept.split(",").map((type) => type.trim().toLowerCase())
    for (let i = 0; i < files.length; i++) {

      const file = files[i]
      let fileType: string | undefined = file.type
     
      /**
       * Need to check if the file is a JSON file or CSV file
       * because fileTypeFromStream doesn't support JSON and CSV
       * and it returns undefined
       * List of supported types: https://www.npmjs.com/package/file-type#supported-file-types
       */
      if (fileType === "application/json") {
        fileType = "json"
      } else if (fileType === "text/csv") {
        fileType = "csv"
      } else if (fileType === "text/plain") {
        fileType = "txt"
      } else {
        fileType = (await fileTypeFromStream(file.stream()))?.ext
      }

      if (!fileType) {
        window.toast.error(`File type not allowed. Allowed types: ${accept}`)
        return
      }
      
      if (!acceptedTypes.includes(`.${fileType}`)) {
        window.toast.error(`File type not allowed. Allowed types: ${accept}`)
        return
      }
    }
  }

  for (let i = 0; i < files.length; i++) {
    if (!checkFileSize(files[i], maxSize)) {
      return
    }
  }

  const dataTransfer = new DataTransfer()
  files.forEach((file) => dataTransfer.items.add(file))

  fileInput.files = dataTransfer.files

  fileInput.dispatchEvent(new Event("change"))
}

export const updateFileLineButtonContent = (fileName: string, options: { iconName?: IconName, text?: string, loading?: boolean }) => {
  const button = document.querySelector(`button[data-file-name="${fileName.replace(/\s/g, "-")}"]`)
  if (!button) {
    throw new Error("Button not found")
  }

  if (options.iconName) {
    button.innerHTML = `
      <div class="icon" style="--icon-size:16;">
        <svg width="16" height="16" viewBox="0 0 24 24" role="img">
          <use href="#${options.iconName}"></use>
        </svg>
      </div>
    `
    button.classList.remove("text-sm")
  } else if (options.text) {
    button.innerHTML = options.text
    button.classList.add("text-sm")
  }

  button.classList.toggle("text-gray-500", options.loading)
}

export const toggleFileLineButtonStatus = (fileName: string, force?: boolean) => {
  const button = document.querySelector(`button[data-file-name="${fileName.replace(/\s/g, "-")}"]`)
  if (!button) {
    throw new Error("Button not found")
  }

  button.toggleAttribute("disabled", force)
}

export const init = () => {
  const dropZones = document.querySelectorAll(
    "[data-input-file].dropzone",
  ) as NodeListOf<HTMLDivElement>

  dropZones.forEach((dropzone) => {
    // Remove existing event listeners
    dropzone.removeEventListener("dragover", onDragOver)
    dropzone.removeEventListener("dragleave", onDragLeave)
    dropzone.removeEventListener("drop", onDrop)

    // Add new event listeners
    dropzone.addEventListener("dragover", onDragOver)
    dropzone.addEventListener("dragleave", onDragLeave)
    dropzone.addEventListener("drop", onDrop)
  })
}

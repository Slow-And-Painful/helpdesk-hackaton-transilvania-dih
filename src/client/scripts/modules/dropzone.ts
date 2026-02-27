declare global {
  interface Window {
    dropZones: {
      init: () => void
      onInputChange: (input: HTMLInputElement, dropzone: HTMLElement) => void
      removeFile: (event: Event, button: HTMLButtonElement) => void
    }
  }
}

const init = () => {
  const dropZones = document.querySelectorAll(
    "[data-input-file].dropzone",
  ) as NodeListOf<HTMLDivElement>

  dropZones.forEach((dropzone) => {
    // Remove existing event listeners
    dropzone.removeEventListener("dragover", onDragOver)
    dropzone.removeEventListener("drop", onDrop)

    // Add new event listeners
    dropzone.addEventListener("dragover", onDragOver)
    dropzone.addEventListener("drop", onDrop)
  })
}

const onDragOver = (event: DragEvent) => {
  event.preventDefault()
}

const onDrop = (event: DragEvent) => {
  // Prevent default behavior (Prevent file from being opened)
  event.preventDefault()
  const target = event.target as HTMLElement
  const dropzone = target.classList.contains("dropzone")
    ? target
    : target.closest(".dropzone")
  if (!dropzone) {
    throw new Error("Dropzone not found")
  }

  const fileInput = dropzone.querySelector("input")
  if (!fileInput) {
    throw new Error("File input not found")
  }

  if (!event.dataTransfer?.files) {
    return
  }

  // if (event.dataTransfer.files.length > 1) {
  //   window.toast.error("Puoi caricare solo un file alla volta")
  //   return
  // }

  fileInput.files = event.dataTransfer.files
  fileInput.dispatchEvent(new Event("change"))
}

const onInputChange = (input: HTMLInputElement, dropzone: HTMLElement) => {
  const file = input.files?.[0]
  if (!file) {
    return
  }

  const noFile = dropzone.querySelector(".dropzone__no-file")
  const hasFile = dropzone.querySelector(".dropzone__has-file")
  const fileNameContainer = dropzone.querySelector(
    ".dropzone__filename",
  ) as HTMLElement
  if (!noFile || !hasFile || !fileNameContainer) {
    throw new Error("Element not found")
  }

  noFile.classList.add("!hidden")
  hasFile.classList.remove("!hidden")

  let fileName = file.name
  if (fileName?.length > 15) {
    fileName = fileName.slice(0, 5) + "..." + fileName.slice(-5)
  }
  fileNameContainer.innerText = fileName
}

const removeFile = (event: Event, button: HTMLButtonElement) => {
  event.stopPropagation()
  const dropzone = button.closest(".dropzone")
  if (!dropzone) {
    throw new Error("Dropzone not found")
  }

  const input = dropzone.querySelector("input")
  if (!input) {
    throw new Error("Input not found")
  }

  input.value = ""

  const noFile = dropzone.querySelector(".dropzone__no-file")
  const hasFile = dropzone.querySelector(".dropzone__has-file")
  if (!noFile || !hasFile) {
    throw new Error("Element not found")
  }

  noFile.classList.remove("!hidden")
  hasFile.classList.add("!hidden")
}

window.dropZones = {
  init,
  onInputChange,
  removeFile,
}

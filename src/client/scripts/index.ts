import "./htmx"
import htmx from "htmx.org"
import "htmx-ext-response-targets"
import { handleSidebarDropdownActiveElement } from "./modules/sidebar"
import "./modules/dropdown"
import "./modules/form"
import "./modules/toast"
import "./modules/filters"
import { initTooltips } from "./modules/tooltip"
import "./modules/fileUploader"
import "./modules/select-searchable"
import recaptcha, { Recaptcha, Grecaptcha } from "./modules/recaptcha"
import { loader } from "./modules/loader"
import sentry from "./modules/sentry"
import { initTextEllipsis } from "src/client/scripts/modules/text-ellipsis"
import { BUTTON_DEBOUNCE } from "./modules/form"
import { formatMarkdown, addPreCopyButtons } from "./modules/markdown"
import "./modules/textarea"
import axios from "axios"
import "./modules/card-slider"
import "./modules/auth"
import "./modules/chatbot"
import "./modules/sidebar-chats"
import "./modules/charts"
import "./modules/documentFileUploader"
import { docDrawerStartResize, docDrawerStartEdgeResize, restoreDocDrawerWidth } from "./modules/docDrawerResize"
import { ticketDrawerStartEdgeResize, ticketDrawerStartColResize, restoreTicketDrawerWidth } from "./modules/ticketDrawerResize"
import "./modules/documentExtraction"


declare global {
  interface Window {
    docDrawerStartResize: typeof docDrawerStartResize
    docDrawerStartEdgeResize: typeof docDrawerStartEdgeResize
    ticketDrawerStartEdgeResize: typeof ticketDrawerStartEdgeResize
    ticketDrawerStartColResize: typeof ticketDrawerStartColResize
    htmx: typeof htmx
    togglePasswordInput: (event: MouseEvent) => void
    toggleNavbarVisibility: (event: MouseEvent) => void
    copyToClipboard: (
      event: MouseEvent,
      value: string,
      onSuccess: () => void,
    ) => void
    toggleCopyIcon: (element: HTMLElement, timeout?: number) => void
    recaptcha: Recaptcha
    onLoadCallback: (a: string) => void
    grecaptcha: Grecaptcha
    RECAPTCHA_ACTIVE: boolean
    RECAPTCHA_V3_SITE_KEY: string
    RECAPTCHA_V2_SITE_KEY: string
    APP_BASE_URL: string
    MAX_FILE_SIZE: number
    closeModal: (eventOrId: MouseEvent | string, remove?: boolean) => void
    downloadAfterRequest: (event: CustomEvent) => void
    onFileInputChange: (event: Event) => void
    toggleAccordion: (event: MouseEvent) => void
    // SENTRY
    SENTRY_DSN: string | null
    ENVIRONMENT: string
    SENTRY_VERSION: string | null
    loader: {
      show: () => void
      hide: () => void
      isReady: () => boolean
    }
    handleSwapScrollBeforeRequest: (elementId: string) => void
    handleSwapScrollAfterRequest: (elementId: string) => void
    autoResizeTextarea: (el: HTMLTextAreaElement) => void
    handleChatKeydown: (e: KeyboardEvent) => void
    submitSuggestion: (btn: HTMLElement) => void
    handleHelpdeskChat: (e: SubmitEvent) => boolean
    documentFileUploader: {
      init: () => void
      onInputChange: (fileInput: HTMLInputElement, dropzone: HTMLElement) => void
      confirmUpload: () => Promise<void>
    }
  }
  interface HTMLElementEventMap {
    "htmx:beforeRequest": CustomEvent
    "htmx:historyRestore": CustomEvent
  }
}

htmx.config.scrollIntoViewOnBoost = false
htmx.config.defaultSwapStyle = "outerHTML"

window.loader = loader

window.addEventListener("blur", () => {
  window.closeDropdowns()
})

window.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded and parsed")

  initTooltips()
  sentry.init()
  window.initForms()
  handleSidebarDropdownActiveElement()
  initTextEllipsis()
  formatMarkdown()
  addPreCopyButtons()

  let debounceTimeout: number

  document.addEventListener("scroll", (event) => {
    const target = event.target
    if (target && target instanceof HTMLElement && target.closest(".dropdown")) {
      return
    }

    window.closeDropdowns()
  }, true)

  document.body.addEventListener("click", () => {
    window.closeDropdowns()
  })

  document.body.addEventListener("htmx:historyRestore", () => {
    window.closeDropdowns()
  })

  document.body.addEventListener("htmx:beforeRequest", (event: CustomEvent) => {
    const headers = event.detail.requestConfig.headers
    if (!headers["HX-Keep-Dropdown"]) {
      window.closeDropdowns()
    }

    if (!headers["HX-Disable-Loader"] && !headers["HX-Preload"]) {
      loader.show()
    }
  })

  document.body.addEventListener("htmx:afterRequest", (_event) => {
    loader.hide()
  })

  window.addEventListener("htmx:afterSwap", () => {
    formatMarkdown()
  })

  window.addEventListener("htmx:afterSettle", () => {
    initTooltips()
    handleSidebarDropdownActiveElement()
    window.initForms()
    initTextEllipsis()
    addPreCopyButtons()
    restoreDocDrawerWidth()
    restoreTicketDrawerWidth()
  })

  document.body.addEventListener("showSuccessToast", (event) => {
    const message = (event as CustomEvent).detail.value ?? "Operation completed successfully"
    window.toast.success(message)
  })

  document.body.addEventListener("showErrorToast", (event) => {
    const errorMessage = (event as CustomEvent).detail.value ?? "An unexpected error occurred, we're already working on it. Try again later or contact us"
    window.toast.error(errorMessage)
  })

  document.body.addEventListener("closeModal", (event) => {
    const modalId = (event as CustomEvent).detail.value
    if (modalId) {
      window.closeModal(modalId)
    }
  })

  document.body.addEventListener("openDocumentDrawer", (event) => {
    const documentId = (event as CustomEvent).detail.value
    if (documentId) {
      window.htmx.ajax("get", `/partials/departments/document-detail/${documentId}`, {
        target: "#drawer",
        swap: "innerHTML",
      })
    }
  })

  document.body.addEventListener("folderCreated", (event) => {
    const { folderId, modalId } = (event as CustomEvent).detail as { folderId: number; modalId: string }

    // Reload the explorer first, then close the modal so HTMX doesn't lose its context element
    const explorer = document.getElementById("document-explorer")
    const currentFolderId = explorer?.dataset.folderId ?? String(folderId)

    window.htmx.ajax("get", `/partials/departments/folder-contents/${currentFolderId}`, {
      target: "#document-explorer",
      swap: "outerHTML",
    })

    window.closeModal(modalId)
    window.toast.success("Folderul a fost creat cu succes")
  })

  window.addEventListener("resize", () => {
    initTextEllipsis()
    clearTimeout(debounceTimeout)
    debounceTimeout = window.setTimeout(() => {
      window.onDropdownResize()
    }, BUTTON_DEBOUNCE)
  })
})

window.addEventListener("popstate", () => {
  window.initForms()

  setTimeout(() => {
    initTextEllipsis()
    initTooltips()
    formatMarkdown()
    addPreCopyButtons()
  }, 200)

  const id = setInterval(() => {
    if (loader.isReady()) {
      loader.hide()

      const buttons = document.querySelectorAll(".btn--loading")
      buttons.forEach((button) => {
        button.classList.remove("btn--loading")
      })

      clearInterval(id)
    }
  }, 20)
})

window.closeModal = (eventOrId: MouseEvent | string, remove = true) => {
  let modal: HTMLElement | null = null
  if (typeof eventOrId === "string") {
    modal = document.getElementById(eventOrId)
  } else {
    modal = (eventOrId.target as HTMLElement).closest(".modal__wrap")
  }

  if (modal) {
    if (remove) {
      modal.remove()
    } else {
      modal.classList.remove("is-open")
    }
  }
}

window.copyToClipboard = async (
  event: MouseEvent,
  value?: string,
  onSuccess?: (copiedValue: string) => void,
) => {
  event.preventDefault()
  event.stopPropagation()
  if (!value) {
    const target = event.target as HTMLElement
    value =
      target?.dataset?.["value"] ??
      (target
        ?.closest("[data-clipboard-value]")
        ?.getAttribute("data-clipboard-value") ||
        target
          ?.querySelector("[data-clipboard-value]")
          ?.getAttribute("data-clipboard-value") ||
        "")
  }
  try {
    await navigator.clipboard.writeText(value)
    onSuccess?.(value)
  } catch (_err) {
    window.toast.error("Failed to copy text to clipboard")
  }
}

const TOGGLE_COPY_ICON_TIMEOUT = 2000
window.toggleCopyIcon = (
  element: HTMLElement,
  timeout = TOGGLE_COPY_ICON_TIMEOUT,
) => {
  const tag = element.tagName === "use" ? element : element.querySelector("use")
  if (tag) {
    tag.setAttribute("href", "#check")
    setTimeout(() => {
      tag?.setAttribute("href", "#copy")
    }, timeout)
  }
}

window.togglePasswordInput = (e: MouseEvent) => {
  const parent = (e.target as HTMLDivElement).closest(".input__container")
  parent
    ?.querySelector("input")
    ?.setAttribute(
      "type",
      parent.querySelector("input")?.getAttribute("type") === "password"
        ? "text"
        : "password",
    )
  const tag = (e.currentTarget as HTMLDivElement).querySelector("svg use")
  tag?.setAttribute(
    "href",
    tag.getAttribute("href") === "#eye" ? "#eye-slash" : "#eye",
  )
}

window.toggleNavbarVisibility = (e: MouseEvent) => {
  const navContainer = (e.target as HTMLElement).closest(".nav__container")
  const labels = navContainer?.querySelectorAll(".nav__menu-item-label")
  const links = navContainer?.querySelectorAll(".nav__menu-item-link")

  const navHeader = navContainer?.querySelector(".nav__header")
  const extendedLogo = navHeader?.querySelector("#extended-logo")
  const collapsedLogo = navHeader?.querySelector("#logo")

  const tag = (e.currentTarget as HTMLDivElement).querySelector("svg use")

  navHeader?.classList.toggle("flex-col")
  extendedLogo?.classList.toggle("hidden")
  collapsedLogo?.classList.toggle("hidden")
  labels?.forEach((label) => label.classList.toggle("hidden"))
  links?.forEach((link) => link.classList.toggle("justify-center"))

  tag?.setAttribute(
    "href",
    tag.getAttribute("href") === "#expand" ? "#collapse" : "#expand",
  )

  const body = document.body
  body.setAttribute(
    "data-sidebar-collapse",
    body.getAttribute("data-sidebar-collapse") === "true" ? "false" : "true",
  )
}

window.recaptcha = recaptcha

window.downloadAfterRequest = (event: CustomEvent) => {
  const { detail } = event
  if (!detail) {
    return
  }

  const xhr = detail.xhr
  if (!xhr) {
    return
  }

  try {
    const response = JSON.parse(xhr.response)
    const { url, fileName } = response
    if (response.url) {
      axios.get(url, {
        responseType: "blob",
        headers: {
          "Content-Disposition": `attachment;`,
        },
      }).then((response) => {
        const blob = new Blob([response.data])
        const link = document.createElement("a")
        link.href = URL.createObjectURL(blob)
        link.download = fileName
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(link.href)
      }).catch((error) => {
        console.error("Download error:", error)
        window.toast.error("Failed to download file")
      })
    } else if (response.error) {
      window.toast.error(response.error)
    }
  } catch (err) {
    if (err instanceof Error) {
      window.toast.error(err.toString())
    } else {
      console.error(err)
      window.toast.error("Failed to redirect")
    }
  }
}

window.onFileInputChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const files = target.files
  const label = target.nextElementSibling as HTMLLabelElement
  const labelText = label.querySelector(
    ".js-file-input-text",
  ) as HTMLSpanElement
  const labelValue = labelText.innerHTML
  let fileName: string | undefined

  if (files && files.length) {
    fileName = files[0].name
    if (fileName && fileName.length > 20) {
      fileName = `${fileName.slice(0, 20)}...${fileName.slice(
        fileName.length - 4,
      )}`
    }
    labelText.innerHTML = fileName || labelValue
  }
}

window.toggleAccordion = (e: MouseEvent) => {
  const accordion = (e.target as HTMLDivElement).closest(".accordion")
  accordion?.classList.toggle("accordion--open")
}

window.handleSwapScrollBeforeRequest = (elementId: string) => {
  const element = document.getElementById(elementId)
  if (!element) {
    return
  }

  localStorage.setItem(elementId, element.scrollTop.toString())
}

window.handleSwapScrollAfterRequest = (elementId: string) => {
  const element = document.getElementById(elementId)
  if (!element) {
    return
  }

  const scrollValue = localStorage.getItem(elementId)
  if (!scrollValue) {
    return
  }

  localStorage.removeItem(elementId)

  const parsedScrollValue = parseFloat(scrollValue)
  if (isNaN(parsedScrollValue) || !parsedScrollValue) {
    return
  }

  element.scrollTo({
    top: parsedScrollValue
  })
}

import htmx from "htmx.org"

declare global {
  interface Window {
    initToast: () => void
    toast: {
      success: (message: string, title?: string) => void
      info: (message: string, title?: string) => void
      warning: (message: string, title?: string) => void
      error: (message: string, title?: string) => void
    }
  }
}

type InstanceData = {
  timeoutId?: NodeJS.Timeout
  isAppearing?: boolean
  isDisappearing?: boolean
}

const DEFAULT_TOAST_TIMEOUT = 5000

type CreateToastParams = {
  type: "info" | "success" | "warning" | "error"
  message: string
  title?: string
}

const createToast = async ({ type, message, title }: CreateToastParams) => {
  const endpoint = document
    .getElementById("toast")
    ?.getAttribute("data-endpoint")
  if (!endpoint) {
    throw new Error("Toast endpoint not found")
  }

  void htmx.ajax("post", endpoint, {
    values: {
      ...(title ? { title } : {}),
      message,
      type,
    },
    target: "#toast",
    swap: "beforeend",
  })
}

const createSuccessToast = (message: string, title?: string) =>
  createToast({ type: "success", message, title })
const createInfoToast = (message: string, title?: string) =>
  createToast({ type: "info", message, title })
const createWarningToast = (message: string, title?: string) =>
  createToast({ type: "warning", message, title })
const createErrorToast = (message: string, title?: string) =>
  createToast({ type: "error", message, title })

window.toast = {
  success: createSuccessToast,
  info: createInfoToast,
  warning: createWarningToast,
  error: createErrorToast,
}

window.initToast = () => {
  const toasts = document.querySelectorAll("[data-toast]")

  const recalculateHeights = () => {
    const toasts = document.querySelectorAll("[data-toast]")

    const containers = Array.from(toasts).map(
      (container) => container as HTMLElement,
    )
    let y = 0
    for (let i = containers.length - 1; i >= 0; i--) {
      const height = containers[i].clientHeight
      containers[i].style.setProperty("--tw-translate-y", `${y}px`)
      y -= height + 16
    }
  }

  const getToast = (container: Element): InstanceData | undefined => {
    try {
      return container.getAttribute("data-toast-instance")
        ? JSON.parse(container.getAttribute("data-toast-instance") as string)
        : undefined
    } catch (_) {
      return undefined
    }
  }

  toasts.forEach((container) => {
    const setInstance = (newInstance: InstanceData) => {
      const oldInstance = getToast(container) || {}
      container.setAttribute(
        "data-toast-instance",
        JSON.stringify({
          ...oldInstance,
          ...newInstance,
        }),
      )
    }

    if (!container.getAttribute("data-toast-instance")) {
      container.classList.add("htmx-added")
      const onTransitionEnd = () => {
        setInstance({
          isAppearing: false,
          isDisappearing: false,
        })
      }
      container.addEventListener("transitionend", onTransitionEnd)
      setTimeout(() => {
        container.classList.remove("htmx-added")
      }, 20)
      const closeButton = container.querySelector(
        "[data-close]",
      ) as HTMLButtonElement
      const onClose = (force = false) => {
        const instance = getToast(container)
        if (
          instance &&
          ((!instance.isAppearing && !instance.isDisappearing) || force)
        ) {
          setInstance({ isDisappearing: true })
          container.classList.add("htmx-added")
          setTimeout(() => {
            setInstance({ isDisappearing: false })
            container.remove()
            recalculateHeights()
          }, 300)
          clearTimeout(instance.timeoutId)
        }
      }
      if (closeButton) {
        closeButton.addEventListener("click", () => onClose(true))
      }
      let timeout = container.getAttribute("data-timeout")
        ? parseInt(container.getAttribute("data-timeout") as string)
        : DEFAULT_TOAST_TIMEOUT
      if (isNaN(timeout) || timeout <= 0) {
        timeout = DEFAULT_TOAST_TIMEOUT
      }

      const timeoutId = setTimeout(() => {
        onClose(true)
      }, timeout)
      setInstance({
        timeoutId,
        isAppearing: true,
        isDisappearing: false,
      })
    }
  })

  recalculateHeights()
}

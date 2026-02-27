import htmx, { HttpVerb } from "htmx.org"

type ResponseType = {
  element: string
  targetFormId: string
}

export type Grecaptcha = object & {
  ready: (callback: () => void) => void
  execute: (siteKey: string, options: { action: string }) => Promise<string>
  render: (
    element: string | HTMLElement,
    options: { sitekey: string; callback: (token: string) => void },
  ) => void
  reset: () => void
}

const getFormData = (form: HTMLFormElement): { [key: string]: string } => {
  const data = new FormData(form)
  const payload: { [key: string]: string } = {}
  data.forEach((value, key) => {
    payload[key] = value.toString()
  })

  return payload
}

const ALLOWED_METHODS = ["post", "get"]

const executeV3 = async (
  event: CustomEvent,
  grecaptcha: Grecaptcha,
  recaptchaKey: string,
) => {
  const form = event.target as HTMLFormElement
  event.preventDefault()

  if (!window.RECAPTCHA_ACTIVE) {
    const formData = { ...getFormData(form), targetFormId: form.id }
    const httpVerb = form.getAttribute("method")
    if (!httpVerb || !ALLOWED_METHODS.includes(httpVerb.toLowerCase())) {
      return
    }

    const hxTarget = form.getAttribute("hx-target") ?? form
    const hxSwap = form.getAttribute("hx-swap") ?? "outerHTML"

    await htmx.ajax(httpVerb as HttpVerb, form.action, {
      values: formData,
      target: hxTarget,
      swap: hxSwap,
    })

    window.onFormAfterRequest(form)

    return
  }

  grecaptcha.ready(() => {
    grecaptcha
      .execute(recaptchaKey, { action: "submit" })
      .then(async (token: string) => {
        const httpVerb = form.getAttribute("method")
        if (!httpVerb || !ALLOWED_METHODS.includes(httpVerb.toLowerCase())) {
          return
        }

        const formData = {
          ...getFormData(form),
          targetFormId: form.id,
        }
        const hxTarget = form.getAttribute("hx-target") ?? form
        const hxSwap = form.getAttribute("hx-swap") ?? "outerHTML"

        // submit the form
        await htmx.ajax(httpVerb as HttpVerb, form.action, {
          headers: {
            "recaptcha-token": token,
          },
          values: formData,
          target: hxTarget,
          swap: hxSwap
        })

        window.onFormAfterRequest(form)
      })
  })
}

const recaptchaV2onLoad = (grecaptcha: Grecaptcha, recaptchaKey: string) => {
  const container = document.getElementById("recaptcha-v2-container")
  if (!container) {
    return
  }

  setTimeout(() => {
    for (const child of Array.from(container.children)) {
      container.removeChild(child)
    }
    grecaptcha.render("recaptcha-v2-container", {
      sitekey: recaptchaKey,
      callback: async function (token: string) {
        const container = document.getElementById("recaptcha-v2-container")
        if (!container) {
          return
        }

        const httpVerb = container.getAttribute("data-method")
        const action = container.getAttribute("data-action")
        const dataValues = container.getAttribute("data-values") ?? "{}"

        if (!httpVerb || !action) {
          return
        }

        container.removeAttribute("data-method")
        container.removeAttribute("data-action")
        container.removeAttribute("data-values")

        const formId = JSON.parse(dataValues).targetFormId
        if (!formId) {
          return
        }

        const form = document.getElementById(formId) as HTMLFormElement
        if (!form) {
          return
        }

        const formData = {
          ...JSON.parse(dataValues),
          targetFormId: form.id,
        }

        const hxTarget = form.getAttribute("hx-target") ?? form
        const hxSwap = form.getAttribute("hx-swap") ?? "outerHTML"

        // submit the form
        await htmx.ajax(httpVerb as HttpVerb, action, {
          headers: {
            "recaptcha-token": token,
          },
          values: formData,
          target: hxTarget,
          swap: hxSwap,
        })

        const modal = container.closest(".modal__wrap.is-open")
        if (modal) {
          window.closeModal(modal.id)
        }
      },
    })
  }, 1000)
}

window.onLoadCallback = function () {
  window.recaptcha.recaptchaV2onLoad(
    window.grecaptcha,
    window.RECAPTCHA_V2_SITE_KEY,
  )
}

export type Recaptcha = {
  executeV3: (
    event: CustomEvent,
    grecaptcha: Grecaptcha,
    recaptchaKey: string,
  ) => Promise<void>
  recaptchaV2onLoad: (grecaptcha: Grecaptcha, recaptchaKey: string) => void
}

const recaptcha: Recaptcha = {
  executeV3,
  recaptchaV2onLoad,
}

export default recaptcha

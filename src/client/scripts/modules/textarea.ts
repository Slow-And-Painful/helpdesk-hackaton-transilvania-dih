import { getElement } from "../utils"

declare global {
  interface Window {
    textareaOnInput: (elementOrSelector: HTMLFormElement | string) => void
  }
}

window.textareaOnInput = (element) => {
  const textarea = getElement(element) as HTMLTextAreaElement

  if (!textarea) {
    return
  }

  const textareaContainer = textarea.closest(".textarea__container")

  if (!textareaContainer) {
    return
  }

  const charCountContainer = textareaContainer.querySelector(".textarea__char-count-container")

  if (!charCountContainer) {
    return
  }

  const len = textarea.value.length

  charCountContainer.innerHTML = len.toString()

  const form = textarea.closest("form")
  if (form) {
    const formId = form.getAttribute("id")
    if (formId) {
      window.onFormUpdate(formId)
    }
  }

}

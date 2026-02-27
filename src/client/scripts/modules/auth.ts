import { PASSWORDS_DO_NOT_MATCH_ERROR_TEXT } from "$constants/messages"
import { checkRequiredFields, getForm } from "./form"

declare global {
  interface Window {
    onPasswordUpdateInput: (formId: string, newPasswordInputName?: string, newPasswordConfirmationInputName?: string) => void
  }
}

window.onPasswordUpdateInput = (formId: string, optionalNewPasswordInputName, optionalNewPasswordConfirmationInputName) => {  
  const newPasswordInputName = optionalNewPasswordInputName || "password"
  const newPasswordConfirmationInputName = optionalNewPasswordConfirmationInputName || "passwordConfirmation"

  const delay = 500

  const form = getForm(formId)

  if (!form) {
    return
  }

  const newPasswordInput = form.querySelector<HTMLInputElement>(`input[name="${newPasswordInputName}"]`)
  const newPasswordConfirmationInput = form.querySelector<HTMLInputElement>(`input[name="${newPasswordConfirmationInputName}"]`)

  if (!newPasswordInput || !newPasswordConfirmationInput) {
    return
  }

  const newPassword = newPasswordInput.value
  const newPasswordConfirmation = newPasswordConfirmationInput.value

  if (newPasswordConfirmation !== "") {
    newPasswordConfirmationInput.setAttribute("data-edit", "true")
  }

  // @ts-ignore
  clearTimeout(newPasswordInput._passwordTimeout)

  const submitButtons = form.querySelectorAll("button[type='submit']")

  // @ts-ignore
  newPasswordInput._passwordTimeout = setTimeout(() => {
    const newPasswordConfirmationEdited = newPasswordConfirmationInput.getAttribute("data-edit") !== null

    const newPasswordConfirmationInputWrap = newPasswordConfirmationInput.closest(".input__wrap")
    
    if (newPassword !== newPasswordConfirmation && newPasswordConfirmationEdited) {
      if (!newPasswordConfirmationInputWrap) {
        return
      }

      newPasswordConfirmationInputWrap.classList.add("input__wrap--error")

      const existingPasswordMismatchError = newPasswordConfirmationInputWrap.querySelector(`#${formId}-newPasswordConfirmation-error`)
      if (!existingPasswordMismatchError) {
        const errorDiv = document.createElement("div")
        errorDiv.className = "input__caption input__caption--error"
        errorDiv.textContent = PASSWORDS_DO_NOT_MATCH_ERROR_TEXT
        errorDiv.id = `${formId}-newPasswordConfirmation-error`
  
        newPasswordConfirmationInputWrap.append(errorDiv)
      }

      submitButtons.forEach(submitButton => {
        submitButton?.toggleAttribute("disabled", true)
        submitButton?.classList.toggle("btn--disabled", true)
      })
    } else {
      const errorCaption = newPasswordConfirmationInputWrap?.querySelector(".input__caption--error")
      
      if (errorCaption) {
        errorCaption.remove()
      }

      newPasswordConfirmationInputWrap?.classList.remove("input__wrap--error")

      submitButtons.forEach(submitButton => {
        submitButton?.toggleAttribute("disabled", !checkRequiredFields(form))
        submitButton?.classList.toggle("btn--disabled", !checkRequiredFields(form))
      })
    }
  }, delay)

  window.onFormUpdate(formId, false, false)
}

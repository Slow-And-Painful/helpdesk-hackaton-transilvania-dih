import { SelectOption } from "$templates/components/Select"
import { FormValues } from "$types/ui"
import { getElement, getFormButtons, sortObject } from "../utils"

// const MAX_FILE_SIZE = 200 * 1024 // 200kb
// const MAX_FILE_SIZE_HUMAN = "200kb"

declare global {
  interface Window {
    formValues: {
      [formId: string]: {
        [key: string]: number | string
      }
    }
    initForms: () => void
    registerForm: (formId: string) => void
    registerFormControl: (formId: string, inputName: string) => void
    onFormUpdate: (formOrId: HTMLFormElement | string, clearInputError?: boolean, updateSubmitButtonDisabled?: boolean) => void
    resetForm: (formOrId: HTMLFormElement | string) => void
    clearInputError: (elementOrSelector: HTMLInputElement | string) => void
    onFormBeforeRequest: (elementOrSelector: HTMLFormElement | string) => void
    onFormAfterRequest: (elementOrSelector: HTMLFormElement | string) => void
    handleNumberInputOnKeyDown: (event: KeyboardEvent) => void
    checkNumberInputMaxValueReached: (event: Event) => void
  }
  interface HTMLInputElement {
    hasFormListener?: boolean
  }
  interface HTMLSelectElement {
    hasFormListener?: boolean
  }
  interface HTMLTextAreaElement {
    hasFormListener?: boolean
  }
}

export const BUTTON_DEBOUNCE = 200
let form_debounce_timeout: number

export const getForm = (formOrId: HTMLFormElement | string): HTMLFormElement => {
  const form = getElement(
    typeof formOrId === "string" ? `#${formOrId}` : formOrId,
  ) as HTMLFormElement
  if (!form) {
    console.error(formOrId)
    throw new Error("Form not found")
  }

  if (!(form instanceof HTMLFormElement)) {
    console.error(formOrId)
    throw new Error("The element is not an `HTMLFormElement`")
  }

  return form
}
export const getFormId = (form: HTMLFormElement): string => {
  if (!form.id) {
    console.error(form)
    throw new Error("Form ID not defined")
  }

  return form.id
}
const parseFormValues = (value: string): FormValues => {
  const values = JSON.parse(value)
  if (typeof values !== "object" || Array.isArray(values)) {
    throw new Error("Form values are not an object")
  }
  return values
}
const getFormValuesFromElement = (form: HTMLFormElement) => {
  const valuesElement = form.querySelector(
    "[data-form-values]",
  ) as HTMLDivElement
  if (!valuesElement) {
    throw new Error(
      `getFormInitialValues error: [data-form-values] for form with ID "${form.id}" not found`,
    )
  }

  try {
    return sortObject(
      parseFormValues(valuesElement.getAttribute("data-form-values") as string),
    )
  } catch (e) {
    console.error(e)
    throw new Error(
      `getFormInitialValues error: cannot parse values in form with ID "${form.id}"`,
    )
  }
}
export const getFormInitialValues = (
  formOrId: HTMLFormElement | string,
): FormValues => {
  const form = getForm(formOrId)
  getFormId(form)
  return getFormValuesFromElement(form)
}
export const getFormCurrentValues = (
  formInitialValues: FormValues,
  form: HTMLFormElement,
): FormValues => {
  const keys = Object.keys(formInitialValues)
  const values = {} as FormValues
  keys.forEach((key) => {
    const inputs = Array.from(
      form.querySelectorAll(`[name="${key}"]`),
    ) as unknown as (
      | HTMLInputElement
      | HTMLSelectElement
      | HTMLTextAreaElement
    )[]

    if (!inputs.length) {
      values[key] = formInitialValues[key]
      return
    }

    if (inputs.length === 1) {
      const input = inputs[0]
      if (input.type === "checkbox") {
        if ((input as HTMLInputElement).checked) {
          values[key] = "on"
        } else {
          values[key] = "off"
        }
        return
      }

      values[key] = input.value

      return
    }

    const inputValues = inputs
      .map((input) => {
        if (input.type === "checkbox") {
          if ((input as HTMLInputElement).checked) {
            return "on"
          } else {
            return "off"
          }
        }

        if (input.type === "radio") {
          if ((input as HTMLInputElement).checked) {
            return input.value
          }

          return null
        }

        return input.value
      })
      .filter(value => value !== null)
      .sort()

    values[key] = inputValues.join(",")
  })
  return sortObject(values)
}
const validateFieldsValues = (
  initialValues: FormValues,
  currentValues: FormValues,
): void => {
  const initialKeys = Object.keys(initialValues).sort()
  const currentKeys = Object.keys(currentValues).sort()
  if (
    initialKeys.length !== currentKeys.length ||
    JSON.stringify(initialKeys) !== JSON.stringify(currentKeys)
  ) {
    console.error(initialKeys, currentKeys)
    throw new Error(
      "validateFieldsValues error: initialValues and currentValues have different keys",
    )
  }
}
export const getFormFieldsDiff = (
  initialValues: FormValues,
  currentValues: FormValues,
): string[] | null => {
  validateFieldsValues(initialValues, currentValues)

  const diff = Object.keys(initialValues).reduce((arr, key) => {
    if (initialValues[key].toString() !== currentValues[key].toString()) {
      arr.push(key)
    }
    return arr
  }, [] as string[])

  return diff.length ? diff : null
}

const hasFormErrors = (form: HTMLFormElement): boolean => {
  const errorMessages = [
    ...Array.from(form.querySelectorAll(".input__caption--error")),
    ...Array.from(form.querySelectorAll(".select__caption--error")),
    ...Array.from(form.querySelectorAll(".alert--danger")),
  ]
  return !!errorMessages.length
}

window.initForms = () => {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.removedNodes.forEach((node) => {
        if (node instanceof HTMLElement) {
          const forms = Array.from(node.querySelectorAll("[data-form]"))
          forms.forEach((form) => {
            if (form instanceof HTMLFormElement && node.id) {
              delete window.formValues[form.id]
            }
          })
        }
      })
    })
  })

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  })
}

window.registerForm = (formId: string) => {
  if (!window.formValues) {
    window.formValues = {}
  }
  window.formValues[formId] = getFormInitialValues(formId)
}

window.registerFormControl = (formId: string, inputName: string) => {
  const control = document.querySelector(
    `[data-form-control="${formId}-${inputName}"]`,
  ) as HTMLDivElement
  if (!control) {
    throw new Error(
      `FormControl component with name "${inputName}" in form "${formId}" not found`,
    )
  }

  const inputs = [
    ...Array.from(control.querySelectorAll(`input[name="${inputName}"]`)),
    ...Array.from(control.querySelectorAll(`textarea[name="${inputName}"]`)),
    ...Array.from(control.querySelectorAll(`select[name="${inputName}"]`)),
  ] as unknown as (HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement)[]

  if (!inputs.length) {
    throw new Error(
      `Input with name "${inputName}" in form "${formId}" not found`,
    )
  }

  inputs.forEach((input) => {
    if (!input.hasFormListener && !input.hasAttribute("oninput") && !input.hasAttribute("onchange")) {
      if (input.type === "checkbox" || input.type === "radio") {
        // checkbox or radio input
        input.addEventListener("change", () => {
          window.onFormUpdate(formId)
        })
      } else {
        if (input instanceof HTMLSelectElement) {
          // normal select input
          input.addEventListener("change", () => {
            window.onFormUpdate(formId)
          })
        } else {
          // normal input
          input.addEventListener("input", () => {
            window.onFormUpdate(formId)
          })
          // Searchable select input
          input.addEventListener("change", () => {
            window.onFormUpdate(formId)
          })
        }
      }

      input.hasFormListener = true
    }
  })
}

export const cleanInputError = (
  input: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement,
): void => {
  const inputWrap = input.closest(".input__wrap")
  if (inputWrap) {
    inputWrap.classList.remove("input__wrap--error")
    const errorMessages = Array.from(
      inputWrap.querySelectorAll(".input__caption--error"),
    ) as HTMLDivElement[]
    errorMessages.forEach((message) => {
      message.remove()
    })
  }
  const selectWrap = input.closest(".select__wrap")
  if (selectWrap) {
    selectWrap.classList.remove("select__wrap--error")
    const errorMessages = Array.from(
      selectWrap.querySelectorAll(".select__caption--error"),
    ) as HTMLDivElement[]
    errorMessages.forEach((message) => {
      message.remove()
    })
  }
  const textareaWrap = input.closest(".textarea__wrap")
  if (textareaWrap) {
    textareaWrap.classList.remove("textarea__wrap--error") 
    const errorMessages = Array.from(
      textareaWrap.querySelectorAll(".textarea__caption--error"),
    ) as HTMLDivElement[]
    errorMessages.forEach((message) => {
      message.remove()
    })
  }
}

export const checkRequiredFields = (
  form: HTMLFormElement
): boolean => {
  const requiredFields = Array.from(
    form.querySelectorAll("[required]:not([disabled])"),
  ) as HTMLInputElement[]
  let allRequiredFieldsComplete = true
  requiredFields.forEach((input) => {
    if (input instanceof HTMLInputElement) {
      if (input.type === "checkbox" || input.type === "radio") {
        if (!input.checked) {
          allRequiredFieldsComplete = false
        }
      } else {
        if (!input.value || input.value.trim() === "") {
          allRequiredFieldsComplete = false
        }
      }

      // check for select
      const wrap = input.closest(".select__wrap")
      const innerContainer = input.closest(".select__container__inner")
      if (wrap && !innerContainer) {
        const options = wrap.getAttribute("data-options")
        if (options) {
          const decodedOptions = atob(options)
          const parsedOptions = JSON.parse(decodedOptions) as SelectOption[]

          const option = parsedOptions.find(
            (option) => option.value.toString() === input.value.toString() && !option.disabled,
          )

          if (!option) {
            allRequiredFieldsComplete = false
          }
        }
      }
    }
    if (input instanceof HTMLSelectElement) {
      if (!input.value || input.value.trim() === "") {
        allRequiredFieldsComplete = false
      }
    }
    if (input instanceof HTMLTextAreaElement) {
      if (!input.value || input.value.trim() === "") {
        allRequiredFieldsComplete = false
      }
    }
  })
  
  return allRequiredFieldsComplete
}

window.onFormUpdate = (formOrId: HTMLFormElement | string, clearInputError = true, updateSubmitButtonDisabled = true) => {  
  const form = getForm(formOrId)
  const formId = getFormId(form)

  const initialValues = getFormInitialValues(form)
  const currentValues = getFormCurrentValues(initialValues, form)
  const changedFields = getFormFieldsDiff(initialValues, currentValues)

  const controls = Array.from(form.querySelectorAll("[data-form-control]"))
  controls.forEach((control) => {
    const attr = control.getAttribute("data-form-control") as string
    const name = attr.substring(attr.lastIndexOf("-") + 1)
    const showChanged =
      control.getAttribute("data-form-control-show-changed") === "true"
    if (!showChanged) {
      return
    }
    const isTextarea = control.querySelector("textarea")
    const isInput = control.querySelector("input")
    const isCheckbox = control.querySelector("input[type='checkbox']")
    if (isTextarea) {
      control.classList.toggle(
        "textarea-changed",
        !!changedFields && changedFields.includes(name),
      )
    } else if (isInput) {
      if (isCheckbox) {
        control.classList.toggle(
          "checkbox-changed",
          !!changedFields && changedFields.includes(name),
        )
      } else {
        control.classList.toggle(
          "input-changed",
          !!changedFields && changedFields.includes(name),
        )
      }
    }
  })

  const resetButtons = Array.from(
    document.querySelectorAll(`[data-form-reset="${formId}"]`),
  )
  const submitButton = getFormButtons(form).find(
    (button) => button.type === "submit",
  )

  if (resetButtons.length) {
    resetButtons.forEach((button) => {
      if (changedFields) {
        button.removeAttribute("disabled")
        button.classList.remove("btn--disabled")
      } else {
        button.setAttribute("disabled", "")
        button.classList.add("btn--disabled")
      }
    })
  }

  if (changedFields) {
    form.setAttribute("data-form-changed", "true")
    
    if (updateSubmitButtonDisabled) {
      submitButton?.toggleAttribute("disabled", !checkRequiredFields(form))
      submitButton?.classList.toggle("btn--disabled", !checkRequiredFields(form))
    }
    if (checkRequiredFields(form)) {
      submitButton?.classList.remove("btn--loading")
    }
    
    const formInputs = Array.from(
      form.querySelectorAll(
        `input[name="${changedFields.join('"], input[name="')}"]`,
      ),
    ) as HTMLInputElement[]
    formInputs.forEach((input) => {
      if (clearInputError) {
        if (input instanceof HTMLInputElement) {
          if (input.hasAttribute("data-revalidate-before-clear")) {
            const onInputHandler = input.getAttribute("oninput")
            const onChangeHandler = input.getAttribute("onchange")
            if (onInputHandler) {
              input.dispatchEvent(new Event("input", { bubbles: true }))
            } else if (onChangeHandler) {
              input.dispatchEvent(new Event("change", { bubbles: true }))
            } else {
              cleanInputError(input)
            }
          } else {
            cleanInputError(input)
          }
        }
        if (input instanceof HTMLSelectElement) {
          cleanInputError(input)
        }
        if (input instanceof HTMLTextAreaElement) {
          cleanInputError(input)
        }
      }
    })
  } else {
    form.removeAttribute("data-form-changed")
    submitButton?.setAttribute("disabled", "")
    submitButton?.classList.add("btn--disabled")
  }
}

window.resetForm = (formOrId: HTMLFormElement | string) => {
  const form = getForm(formOrId)
  const initialValues = getFormInitialValues(form) as { [key: string]: string }

  Object.entries(initialValues).forEach(([key, value]) => {
    const inputs = [
      ...Array.from(form.querySelectorAll(`input[name="${key}"]`)),
      ...Array.from(form.querySelectorAll(`textarea[name="${key}"]`)),
      ...Array.from(form.querySelectorAll(`select[name="${key}"]`)),
    ] as unknown as (
      | HTMLInputElement
      | HTMLSelectElement
      | HTMLTextAreaElement
    )[]
    inputs.forEach((input) => {
      if (
        input instanceof HTMLInputElement &&
        input.type === "radio"
      ) {
        input.checked = `${value}`.split(",").includes(input.value)
      } else if (
        input instanceof HTMLInputElement &&
        input.type === "checkbox"
      ) {
        input.checked = value === "on" || value === "true"
      } else {
        if (!isNaN(Date.parse(value.toString())) && input.type === "date") {
          input.value = new Date(value).toISOString().split("T")[0]
        } else {
          input.value = `${value}`
          const select = input.closest(".select__wrap")
          if (select) {
            const selectedOptionContainer = select.querySelector(".select__selected-option-container")
            
            if (selectedOptionContainer) {
              const options = select.getAttribute("data-options")

              if (options) {
                const decodedOptions = atob(options)
                const parsedOptions = JSON.parse(decodedOptions)
                const option = parsedOptions.find((option: { value: string }) => option.value === value)

                if (option) {
                  const selectedOptionLabel = selectedOptionContainer.querySelector(".select__selected-option-container__label")
                  const selectedOptionSubtitle = selectedOptionContainer.querySelector(".select__selected-option-subtitle")
                  if (selectedOptionLabel) {
                    selectedOptionLabel.innerHTML = option.label
                  }
                  if (selectedOptionSubtitle && option.subtitle) {
                    selectedOptionSubtitle.innerHTML = option.subtitle
                  }
                }

                const activeOption = select.querySelector(".dropdown__item--selected")
                if (activeOption) {
                  activeOption.classList.remove("dropdown__item--selected")
                }

                const dropdownItem = select.querySelector(`[data-value="${value}"]`)
                if (dropdownItem) {
                  dropdownItem.classList.add("dropdown__item--selected")
                }
              }
            }
          }

          if (input.type === "textarea") {
            const textareaContainer = input.closest(".textarea__container")

            if (textareaContainer) {
              const textareaCharCountContainer = textareaContainer.querySelector(".textarea__char-count-container")

              if (textareaCharCountContainer) {
                textareaCharCountContainer.innerHTML = value.length.toString()
              }
            }
          }
        }
      }
      if (input instanceof HTMLInputElement) {
        window.clearInputError(input)
      }

      const control = input.closest("[data-form-control]")
      if (control) {
        control.classList.remove("input-changed")
        control.classList.remove("textarea-changed")
        control.classList.remove("checkbox-changed")
      }
    })
  })

  const resetButton = form.querySelector(
    "button[type=reset]",
  ) as HTMLButtonElement
  if (resetButton) {
    resetButton.setAttribute("disabled", "")
    resetButton.classList.add("btn--disabled")
  }

  const submitButton = getFormButtons(form).find(
    (button) => button.type === "submit",
  )
  if (submitButton) {
    submitButton.setAttribute("disabled", "")
  }
}

window.clearInputError = (elementOrSelector: HTMLInputElement | string, ...additionalErrorSelectors: string[]) => {
  const input = getElement(elementOrSelector)
  // input
  input?.closest(".input__wrap")?.classList.remove("input__wrap--error")
  const errorMessages = Array.from(
    input
      ?.closest(".input__wrap")
      ?.querySelectorAll(".input__caption--error") ?? [],
  )

  const additionalErrors = additionalErrorSelectors.map(error => document.querySelector(error))

  errorMessages.forEach((message) => {
    message.remove()
  })

  additionalErrors.forEach((message) => {
    message && message.remove()
  })

  // select
  input?.closest(".select__wrap")?.classList.remove("select__wrap--error")
  const errorMessagesSelect = Array.from(
    input
      ?.closest(".select__wrap")
      ?.querySelectorAll(".select__caption--error") ?? [],
  )
  errorMessagesSelect.forEach((message) => {
    message.remove()
  })
}

window.onFormBeforeRequest = (elementOrSelector: HTMLFormElement | string) => {
  const form = getElement(elementOrSelector) as HTMLFormElement
  if (form) {
    const buttons = getFormButtons(form)
    buttons.forEach((button) => {
      if (button.hasAttribute("data-ignore")) {
        return
      }
      if (button.type === "submit") {
        clearTimeout(form_debounce_timeout)
        form_debounce_timeout = window.setTimeout(() => {
          button.classList.add("btn--loading")
        }, BUTTON_DEBOUNCE)
      }
      button.setAttribute("disabled", "")
    })
  }
}

window.onFormAfterRequest = (elementOrSelector: HTMLFormElement | string) => {
  const form = getElement(elementOrSelector) as HTMLFormElement
  if (form) {
    const buttons = getFormButtons(form)
    buttons.forEach((button) => {
      if (button.type === "submit") {
        clearTimeout(form_debounce_timeout)
        button.classList.remove("btn--loading")
        const errors = hasFormErrors(form)
        if (errors) {
          button.removeAttribute("disabled")
        }
      }
    })

    if (hasFormErrors(form)) {
      const resetButtons = Array.from(
        document.querySelectorAll(`[data-form-reset="${form.id}"]`),
      )
      resetButtons.forEach((button) => {
        button.removeAttribute("disabled")
      })
    }
  }
}

window.handleNumberInputOnKeyDown = (event) => {
  const allowedKeys = [
    "Backspace",
    "Tab",
    "ArrowLeft",
    "ArrowRight",
    "Delete",
    "Enter",
    "Escape",
    "Shift",
    "Control",
    "Alt",
    "Meta",
    "ArrowUp",
    "ArrowDown",
    ","
  ]
  
  const isNumberPadDigit = event.key >= "0" && event.key <= "9" // numpad 0 - 9

  if (allowedKeys.includes(event.key) || isNumberPadDigit) {
    return
  }

  if (event.which != 8 && event.which != 0 && event.which < 48 || event.which > 57) {
    event.preventDefault()
  }
}

window.checkNumberInputMaxValueReached = (e) => {
  const target = (e.target as HTMLInputElement)

  const targetValue = +(target.value)

  const maxValueAttribute = target.getAttribute("max")
  
  if (maxValueAttribute && !isNaN(targetValue)) {
    const maxValue = +(maxValueAttribute)
    
    if (targetValue > maxValue) {
      const newValue = Math.floor(targetValue / 10)
      target.value = newValue.toString()
    }
  }
}

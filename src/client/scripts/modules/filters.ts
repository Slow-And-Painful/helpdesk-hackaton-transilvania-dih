import htmx from "htmx.org"

declare global {
  interface Window {
    handleBoolEnumClick: (
      event: InputEvent,
      valueKey: string,
      formId: string,
    ) => void
    handleEnumClick: (
      event: InputEvent,
      isChecked: boolean,
      formId: string,
    ) => void
  }
}

window.handleBoolEnumClick = (event, valueKey, formId) => {
  const parentNode = (event.target as HTMLInputElement)?.parentNode?.parentNode
    ?.parentNode
  if (!parentNode) {
    htmx.trigger(formId, "submit")
    return
  }
  const nodeList = parentNode.querySelectorAll(
    `input:not([name="${valueKey}"])`,
  )
  for (const node of Array.from(nodeList)) {
    node.remove()
  }
  htmx.trigger(formId, "submit")
}

window.handleEnumClick = (event, isChecked, formId) => {
  const self = event.target as HTMLInputElement
  if (isChecked) {
    self.checked = false
  } else {
    self.checked = true
  }
  htmx.trigger(formId, "submit")
}

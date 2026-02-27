import { SelectOption } from "$templates/components/Select"
import htmx from "htmx.org"

declare global {
  interface Window {
    onSelectSearchBeforeRequest: (event: InputEvent) => void
    onSelectSearchAfterRequest: (event: CustomEvent) => void
    onSelectSearchItemClick: (options: OnSelectSearchItemClickOptions) => void
    onSelectSearchBlur: (
      value: string,
      options: string,
      id: string,
      canBeEmpty: boolean,
    ) => void
    hideSelect: (event: CustomEvent, selectId: string) => void
  }
}

export type OnSelectSearchItemClickOptions = {
  id: string
  label: string
  value: string
}

window.onSelectSearchBeforeRequest = (event: InputEvent) => {
  const input = event.target as HTMLInputElement
  if (!input) {
    return
  }
  const container = input.closest(".select__wrap")
  if (!container) {
    return
  }
  const inputHidden = container.querySelector(
    "input[type='hidden']",
  ) as HTMLInputElement | null
  if (inputHidden) {
    inputHidden.value = "0"
  }

  const options = Array.from(
    container
      .querySelector(".dropdown__items")
      ?.querySelectorAll(".dropdown__item") ?? [],
  ) as HTMLLIElement[]
  const search = input.value
  options.forEach((option) => {
    const label = option.textContent?.toLowerCase() || ""
    const value = option.getAttribute("data-value") || ""
    const valuesToSearch = [label, value.split("-").join(" ")]
    if (
      search === "" ||
      valuesToSearch.some((v) => v.includes(search.toLowerCase()))
    ) {
      option.style.display = "block"
    } else {
      option.style.display = "none"
    }
  })
  const visibleOptions = options.filter(
    (option) => option.style.display !== "none",
  )
  if (visibleOptions.length === 0) {
    const noResults = document.createElement("li")
    noResults.setAttribute("data-no-results", "true")
    noResults.classList.add("dropdown__item")
    const link = document.createElement("div")
    link.classList.add("dropdown__link")
    link.style.pointerEvents = "none"
    link.textContent = "No results found"
    noResults.appendChild(link)
    container.querySelector(".dropdown__items")?.appendChild(noResults)
  } else {
    const noResults = container.querySelectorAll("[data-no-results]")
    noResults?.forEach((el) => el.remove())
  }

  const dropdown = container.querySelector<HTMLElement>(".dropdown")
  if (!dropdown) {
    return
  }

  handleDropdownPosition(dropdown)
}

const handleDropdownPosition = (dropdown: HTMLElement) => {
  const position = dropdown.getAttribute("data-position")
  if (!position) {
    return
  }

  const positionValues = dropdown.getAttribute("data-position-values")
  if (!positionValues) {
    return
  }

  const parsedPositionValues = JSON.parse(positionValues) as
    | { top: number; bottom: number; left: number; width: number }
    | undefined
  if (!parsedPositionValues) {
    return
  }

  if (position === "top") {
    const { height } = dropdown.getBoundingClientRect()
    const newTop = parsedPositionValues.bottom - height
    dropdown.style.top = `${newTop}px`
  }
}

window.onSelectSearchAfterRequest = (event: CustomEvent) => {
  const input = event.detail?.elt as HTMLInputElement
  if (!input) return
  const container = input.closest(".select__wrap")
  const iconTag = container?.querySelector(".select__icon use")
  if (iconTag) {
    iconTag.closest("div")?.classList.remove("animation-spin")
    iconTag.setAttribute("href", "#angle-down")
  }
}

window.onSelectSearchItemClick = (options: OnSelectSearchItemClickOptions) => {
  const container = document.getElementById(options.id)
  if (!container) {
    return
  }

  const dropdown = document.getElementById(`${options.id}-dropdown`)
  if (dropdown) {
    const items = dropdown.querySelectorAll(".dropdown__item")
    items.forEach((item) => {
      item.classList.toggle(
        "dropdown__item--selected",
        item.getAttribute("data-value") === options.value,
      )
      if (item.getAttribute("data-value") === options.value) {
        container.setAttribute("data-value", options.value)
      }
    })
  }

  const inputHidden = container.querySelector(
    "input[type='hidden']",
  ) as HTMLInputElement | null
  if (inputHidden) {
    inputHidden.value = options.value
  }

  const inputText = container.querySelector(
    "input[type='text']",
  ) as HTMLInputElement | null
  if (inputText) {
    inputText.value = options.label
  }

  // dispatch change event
  inputHidden?.dispatchEvent(new Event("change"))
  inputText?.dispatchEvent(new Event("change"))
}

window.hideSelect = (event: CustomEvent, selectId: string) => {
  const select = document.getElementById(selectId)
  if (select?.getAttribute("data-permanently-open")) {
    return
  }
  if (select) {
    select.innerHTML = ""
  }
}

window.onSelectSearchBlur = (
  value: string,
  options: string,
  id: string,
  canBeEmpty: boolean,
) => {
  const decodedOptions = atob(options)
  const parsedOptions = JSON.parse(decodedOptions) as SelectOption[]
  if (!value || value.length === 0) {
    if (canBeEmpty) {
      window.onSelectSearchItemClick({ id, label: "", value: "0" })
    } else {
      selectDefaultOption(id, parsedOptions)
    }
  } else {
    const possibleOption = parsedOptions.find(
      (option) => option.label.toString().toLowerCase() === value.toLowerCase(),
    )
    if (possibleOption) {
      window.onSelectSearchItemClick({
        id,
        label: possibleOption.label.toString(),
        value: possibleOption.value.toString(),
      })
      const liElement = document.getElementById(`${id}-dropdown`)?.querySelector(
        `[data-value="${possibleOption.value}"]`,
      ) as HTMLLIElement | null
      if (liElement) {
        htmx.trigger(liElement, "htmx:option-selected")
      }
    } else {
      if (canBeEmpty) {
        window.onSelectSearchItemClick({ id, label: "", value: "0" })
      } else {
        selectDefaultOption(id, parsedOptions)
      }
    }
  }
}

const selectDefaultOption = (id: string, options: SelectOption[]) => {
  const initialValue =
    document.getElementById(id)?.getAttribute("data-value") || ""
  const selectedOption =
    options.find((option) => option.value === initialValue) ?? options[0]
  window.onSelectSearchItemClick({
    id,
    label: selectedOption.label.toString(),
    value: selectedOption.value.toString(),
  })
  const liElement = document.getElementById(`${id}-dropdown`)?.querySelector(
    `[data-value="${selectedOption.value}"]`,
  ) as HTMLLIElement | null
  if (liElement) {
    htmx.trigger(liElement, "htmx:option-selected")
  }
}

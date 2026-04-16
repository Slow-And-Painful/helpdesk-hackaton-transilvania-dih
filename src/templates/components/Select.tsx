import Dropdown from "$templates/components/dropdown/Dropdown"
import DropdownTrigger from "$templates/components/dropdown/DropdownTrigger"
import Icon from "$templates/components/Icon"
import { Children } from "@kitajs/html"
import classNames from "classnames"

type SelectSize = "sm" | "md" | "lg"
export type SelectOption = {
  label: number | string
  value: number | string
  selected?: boolean
  disabled?: boolean
  subtitle?: string
}
export type SelectOptions = SelectOption[]
type SelectProps = Omit<JSX.HtmlSelectTag, "children"> & {
  id: string
  append?: Children
  caption?: Children
  error?: boolean | JSX.Element
  options?: SelectOptions
  label?: string | null
  size?: SelectSize
  showSelectedSubtitle?: boolean
}
export default ({
  id,
  append,
  caption,
  disabled = false,
  error,
  label,
  options = [],
  size = "sm",
  class: className,
  showSelectedSubtitle,
  ...props
}: SelectProps) => {
  const dropdownId = `${id}-dropdown`
  const selectedOption = options.find(o => o.selected) ?? options[0]

  return (
    <div
      class={[
        "select__wrap",
        !!append && "select__wrap--append",
        disabled && "select__wrap--disabled",
        !!error && "select__wrap--error",
      ]}
      data-options={Buffer.from(JSON.stringify(options)).toString("base64")}
    >
      {label ? (
        <label class="select__label">
          {label as "safe"}{props.required ? " *" : ""}
        </label>
      ) : null}

      <div class="select__container relative">
        <DropdownTrigger dropdownId={dropdownId}>
          <div class={[
            "select select--icon-hidden w-full",
            `select--${size}`,
            ...(Array.isArray(className) ? className : [className]),
          ]}>
            <div class="select__selected-option-container" id={`${id}-selected-option-container`}>
              <div class="select__selected-option-container__label" safe>
                {selectedOption?.label}
              </div>
              {showSelectedSubtitle && selectedOption?.subtitle ? (
                <div
                  class="select__selected-option-subtitle"
                  safe
                >
                  {selectedOption.subtitle}
                </div>
              ) : null}
            </div>
            <div class="select__icon">
              <Icon name="chevron-down" size={18} />
            </div>
          </div>
        </DropdownTrigger>

        <Dropdown
          id={dropdownId}
          open={false}
          inheritWidth
          offset={0}
          class={"select__dropdown"}
        >
          <ul class="dropdown__items">
            {options.map((option) => (
              <li
                class={[
                  "dropdown__item",
                  option.selected && "dropdown__item--selected",
                ]}
                data-value={option.value}
                onclick={`
                  const hiddenInput = document.getElementById("${id}-hidden-input")
                  hiddenInput.value = "${option.value}"
                  hiddenInput.dispatchEvent(new Event("change", { bubbles: true }))

                  const items = document.querySelectorAll("#${dropdownId} .dropdown__item")
                  items.forEach(item => item.classList.remove("dropdown__item--selected"))
                  this.classList.add("dropdown__item--selected")

                  const selectedOptionContainer = document.querySelector("#${id}-selected-option-container")

                  if (selectedOptionContainer) {
                    selectedOptionContainer.querySelector("div:first-child").textContent = \`${option.label}\`
                    const subtitleEl = selectedOptionContainer.querySelector(".select__selected-option-subtitle")
                    if (subtitleEl) {
                      subtitleEl.textContent = \`${option.subtitle ?? ""}\`
                      subtitleEl.style.display = \`${option.subtitle ? "block" : "none"}\`
                    }
                  }

                  clearInputError("#${id}")
                  closeDropdown("${dropdownId}")
                `}
              >
                <div class={classNames(
                  "dropdown__link",
                  option.subtitle ? "!flex-col !items-start" : "",
                )}>
                  <div class="truncate w-full" safe>{option.label}</div>
                  {option.subtitle ? (
                    <div class="text-xs text-gray-400 truncate" safe>
                      {option.subtitle}
                    </div>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        </Dropdown>

        <input
          id={`${id}-hidden-input`}
          type="hidden"
          name={props.name}
          value={selectedOption?.value.toString()}
        />
      </div>

      {typeof error === "string" || caption ? (
        <div
          class={classNames(
            "select__caption",
            error ? "select__caption--error" : "",
          )}
        >
          {error || caption}
        </div>
      ) : null}
    </div>
  )
}
  
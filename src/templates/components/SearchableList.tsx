import { Children } from "@kitajs/html"
import Icon, { IconName } from "./Icon"
import Dropdown from "./dropdown/Dropdown"
import classNames from "classnames"
import Input from "./Input"

type SelectSize = "sm" | "md" | "lg"
export type SelectOption = {
  label: number | string
  value: number | string
  selected?: boolean
  subtitle?: string
  icon?: IconName
  disabled?: boolean
}
export type SelectOptions = SelectOption[]
type SelectProps = {
  caption?: Children
  class?: string
  disabled?: boolean
  dropdownOpen?: boolean
  error?: boolean | JSX.Element
  form?: string
  id: string
  inputName?: string
  inputValue?: string
  label?: JSX.Element
  name?: string
  options?: SelectOptions
  placeholder?: string
  selectClass?: string
  size?: SelectSize
  value?: string
  onSelect?: `${string}({ id, label, value })`
  onBeforeRequest?: string
  onAfterRequest?: string
  onOptionSelected?: string
  swapOOB?: boolean
  required?: boolean
  readonly?: boolean
  prepend?: Children
  canBeEmpty?: boolean
  dropdownTriggerIcon?: IconName
  dropdownTriggerClasses?: string
} & Htmx.Attributes

const SearchableList = ({
  caption,
  class: className,
  disabled,
  dropdownOpen,
  error,
  form,
  id,
  inputName = "search",
  inputValue,
  label,
  name,
  options = [],
  placeholder,
  selectClass,
  size = "sm",
  value,
  onSelect,
  onOptionSelected,
  swapOOB,
  required = false,
  readonly,
  prepend,
  canBeEmpty,
  ...htmxProps
}: SelectProps) => {
  const dropdownId = `${id}-dropdown`
  const inputId = `${id}-input`
  const base64Options = btoa(JSON.stringify(options))

  return (
    <div
      class={[
        `select__wrap select__wrap--${size} select__wrap--append`,
        disabled && "select__wrap--disabled",
        readonly && "select__wrap--readonly",
        error && "select__wrap--error",
        className,
      ]}
      id={id}
      data-value={value}
      data-options={base64Options}
      {...(swapOOB ? { "hx-swap-oob": "true" } : {})}
    >
      {label ? (
        <label class="select__label">
          {label as "safe"}{required ? " *" : ""}
        </label>
      ) : null}

      <div class="select__container">
        <input
          type="hidden"
          name={name}
          value={value ?? "0"}
          disabled={disabled}
          form={form}
          required={required}
        />
        <div
          id={`inner-container-${inputId}`}
          class={"select__container__inner"}
        >
          {prepend ? (prepend as "safe") : null}
          <Input
            id={inputId}
            name={inputName}
            type="text"
            classes={classNames("select select--icon-hidden w-full", selectClass)}
            value={inputValue}
            placeholder={placeholder}
            disabled={disabled}
            {...htmxProps}
            hx-swap="none"
            onclick="event.stopPropagation()"
            onfocus={`closeDropdowns(); openDropdown('${dropdownId}');`}
            oninput={`onSelectSearchBeforeRequest(event);onSelectSearchItemClick({ id: "${id}", label: event.target.value, value: "0" });`}
            onblur={`onSelectSearchBlur(this.value, '${base64Options}', "${id}", ${canBeEmpty});`}
            autocomplete="off"
            required={required}
            readonly={readonly}
          />
        </div>

        <Dropdown
          id={dropdownId}
          open={true}
          inheritWidth
          offset={0}
          data-reference={`inner-container-${inputId}`}
          class={classNames("select__dropdown searchable-list-dropdown__dropdown")}
          data-permanently-open={"true"}
        >
          <ul class={classNames("dropdown__items w-full")}>
            {options.length ? (
              options.map((option) => (
                <li
                  class={classNames([
                    "dropdown__item",
                    option.selected && "dropdown__item--selected",
                    "searchable-list-dropdown__option",
                    option.disabled && "dropdown__item--disabled"
                  ])}
                  onclick={option.disabled ? "" : `
                    const optionValue = "${option.value}"
                    const optionLabel = "${option.label}"
                    const optionSubtitle = ${option.subtitle ? `"${option.subtitle}"` : "undefined"}
                    onSelectSearchItemClick({ id: "${id}", label: "${option.label}", value: "${option.value}" });
                    clearInputError('#${inputId}');
                    ${
                      onSelect
                        ? onSelect
                            .replace("id", `id:'${id}'`)
                            .replace("label", `label:'${option.label}'`)
                            .replace("value", `value:'${option.value}'`)
                        : ""
                    }
                    ${onOptionSelected ? onOptionSelected : ""}
                    closeDropdown("${id}-dropdown")
                    const container = document.getElementById("${id}-dropdown")
                    const dropdownOptions = Array.from(container?.querySelector(".dropdown__items")?.querySelectorAll(".dropdown__item") ?? [])
                    dropdownOptions.forEach((option) => option.style.display = "block")
                    const noResults = container?.querySelectorAll("[data-no-results]")
                    noResults?.forEach((el) => el.remove())
                  `}
                  data-value={option.value}
                  {...onOptionSelected ? {
                    "hx-on::option-selected": `
                      const optionValue = "${option.value}"
                      const optionLabel = "${option.label}"
                      const optionSubtitle = ${option.subtitle ? `"${option.subtitle}"` : "undefined"}
                      ${onOptionSelected}
                    `,
                  } : {}}
                >
                  <div
                    class={classNames(
                      "dropdown__link",
                      option.subtitle ? "flex-col !items-start" : ""
                    )}
                  >
                    <div class={"truncate flex items-center gap-x-2.5"}>
                      {option.icon ? <Icon name={option.icon} class="text-gray-500" size={16} /> : null}
                      <div>{option.label as "safe"}</div>
                    </div>
                    {option.subtitle ? (
                      <div class={"text-xs text-gray-400 truncate"} safe>
                        {option.subtitle}
                      </div>
                    ) : null}
                  </div>
                </li>
              ))
            ) : inputValue ? (
              <li class="dropdown__item">
                <div class="dropdown__link">No results found</div>
              </li>
            ) : null}
          </ul>
        </Dropdown>
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

export default SearchableList

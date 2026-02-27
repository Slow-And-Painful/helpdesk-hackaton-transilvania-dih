import { PropsWithChildren } from "@kitajs/html"
import classNames from "classnames"

import Icon from "$templates/components/Icon"
import Select from "$templates/components/Select"
import Input, { InputProps } from "./Input"

export interface SearchInputOption<AllowedValues = string>
  extends Omit<JSX.HtmlOptionTag, "label" | "value"> {
  label: string
  value: AllowedValues
}
type SearchInputSize = "sm" | "md"
export type SearchInputProps = Omit<InputProps, "autofocus"> &
  PropsWithChildren<{
    options?: SearchInputOption[]
    selectName?: string
    size?: SearchInputSize
    autofocus?: "true" | "false"
    autofocusName?: string
  }>

export default ({
  options = [],
  placeholder,
  selectName,
  size = "sm",
  type = "text",
  autofocus,
  autofocusName,
  class: className,
  ...props
}: SearchInputProps) => {
  return (
    <div class={classNames(`search-input__wrap search-input__wrap--${size}`, className)}>
      {options.length > 0 ? (
        options.length > 1 ? (
          <div class="search-input__options">
            <Select
              id="typeSelect"
              class="search-input__select !h-[unset] px-4 py-2"
              name={selectName}
              options={options.map((option) => ({
                value: option.value,
                selected: option.selected,
                label: option.label,
              }))}
            />
          </div>
        ) : (
          <div class="search-input__options px-4 py-2">
            <span class="search-input__option text-sm" safe>
              {options[0].label}
            </span>
            <input type="hidden" name={selectName} value={options[0].value} />
          </div>
        )
      ) : null}
      <div class="search-input__container">
        <Input
          {...props}
          type={type}
          placeholder={placeholder ?? undefined}
          class="search-input"
          size="sm"
          onfocus="this.selectionStart = this.value.length; this.selectionEnd = this.value.length;document.getElementById('autoFocusSearchInput').value = 'true'"
          onblur="document.getElementById('autoFocusSearchInput').value = 'false'"
          autofocus={autofocus === "true" ? true : undefined}
          oninput={`
            const resetButton = this.closest('.search-input__container').querySelector('[reset-search-input-button]');
            const searchIcon = this.closest('.search-input__container').querySelector('.search-icon');
            if (this.value.length > 0) {
              searchIcon.classList.add('!hidden');
              resetButton.classList.remove('!hidden');
            } else {
              searchIcon.classList.remove('!hidden');
              resetButton.classList.add('!hidden');
            }
          `}
          append={<>
            <Icon name="search" size={16} class={classNames("search-icon", { "!hidden": props.value && props.value.length > 0 })} />
            <button
              type="button"
              reset-search-input-button
              class={classNames("flex items-center justify-center w-full h-full", { "!hidden": !props.value || props.value.length === 0 })}
              title="Search"
              onclick={`
                const input = this.closest('.search-input__container').querySelector('.search-input').querySelector('input');
                input.value = '';
                input.focus();
                this.classList.add('!hidden');
                const searchIcon = this.closest('.search-input__container').querySelector('.search-icon');
                searchIcon.classList.remove('!hidden');
                input.dispatchEvent(new Event('reset'));
              `}
            >
              <Icon name="x" size={16} />
            </button>
          </>}
        />
        <input
          id="autoFocusSearchInput"
          type="hidden"
          name={autofocusName ?? "autoFocus"}
          value={"false"}
        />
      </div>
    </div>
  )
}

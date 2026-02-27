import { Children, PropsWithChildren } from "@kitajs/html"
import classNames from "classnames"

import Icon from "$templates/components/Icon"

type CheckboxProps = Omit<JSX.HtmlInputTag, "type"> &
  PropsWithChildren<{
    type?: "checkbox" | "radio"
    caption?: Children | null
    className?: string
    error?: boolean | JSX.Element
    label?: Children | null
    labelClass?: string
  }>

export default ({
  caption,
  class: className,
  checked = false,
  disabled = false,
  error,
  label,
  labelClass,
  type = "checkbox",
  ...props
}: CheckboxProps) => {
  return (
    <div
      class={classNames(
        "checkbox__wrap",
        disabled && "checkbox__wrap--disabled",
        error && "checkbox__wrap--error",
        className,
      )}
    >
      <label class="checkbox__container">
        <input
          type={type}
          disabled={disabled}
          checked={checked}
          class="checkbox"
          {...props}
        />

        <div class="checkbox__box shrink-0" tabindex={0}>
          <div class="checkbox__box-icon">
            <Icon name="check" size={10} />
          </div>
        </div>
        {label ? <div class={classNames("checkbox__label", labelClass)} text-ellipsis-exclude>{label as "safe"}</div> : null}
      </label>

      {typeof error === "string" || caption ? (
        <div class="checkbox__caption" safe={error !== undefined}>
          {error || caption}
        </div>
      ) : null}
    </div>
  )
}

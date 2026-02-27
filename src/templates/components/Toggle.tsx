import { Children, PropsWithChildren } from "@kitajs/html"
import classNames from "classnames"

type ToggleProps = JSX.HtmlInputTag &
  PropsWithChildren<{
    caption?: Children | null
    error?: boolean | JSX.Element
    label?: Children | null
    text?: Children | null
    textPosition?: "left" | "right"
  }>

export default ({
  caption,
  checked = false,
  class: className,
  disabled = false,
  error,
  label,
  text,
  textPosition = "right",
  ...props
}: ToggleProps) => {
  return (
    <div
      class={classNames(
        "toggle__wrap select-text",
        disabled && "toggle__wrap--disabled",
        error && "toggle__wrap--error",
        className,
      )}
    >
      {label ? <div class="toggle__label">{label as "safe"}{props.required ? " *" : ""}</div> : null}
      <label class={classNames("toggle__container", textPosition === "left" && "flex-row-reverse")}>
        <input
          type="checkbox"
          disabled={disabled}
          checked={checked}
          class="toggle"
          {...props}
        />

        <div class="toggle__box">
          <div class="toggle__box-icon" />
        </div>

        {text ? (
          <div class="toggle__text" safe>
            {text}
          </div>
        ) : null}
      </label>

      {typeof error === "string" || caption ? (
        <div class="toggle__caption" safe={error !== undefined}>
          {error || (caption as "safe")}
        </div>
      ) : null}
    </div>
  )
}

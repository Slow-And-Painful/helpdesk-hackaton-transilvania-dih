// Input.tsx
import { INTEGER_MAX_VALUE, INTEGER_MIN_VALUE } from "$constants/input"
import { Children } from "@kitajs/html"
import classNames from "classnames"

type InputSize = "sm" | "md" | "lg"
export type InputProps = Omit<JSX.HtmlInputTag, "class"> & {
  onpaste?: string
  append?: Children
  caption?: Children
  class?: string
  error?: boolean | JSX.Element
  label?: string | JSX.Element | null
  prepend?: Children
  size?: InputSize
  min?: number
  max?: number
  ignoreOnePassword?: boolean
  inputClass?: string
  omitRequiredStar?: boolean
}

export default ({
  append,
  caption,
  class: className,
  disabled = false,
  error,
  label,
  placeholder,
  prepend,
  readonly = false,
  size = "md",
  type,
  min = INTEGER_MIN_VALUE,
  max = INTEGER_MAX_VALUE,
  ignoreOnePassword = true,
  inputClass,
  omitRequiredStar,
  ...props
}: InputProps) => {
  return (
    <div
      class={[
        "input__wrap",
        !!append && "input__wrap--append",
        disabled && "input__wrap--disabled",
        !!error && "input__wrap--error",
        !!prepend && "input__wrap--prepend",
        readonly && "input__wrap--readonly",
        className,
      ]}
    >
      {label && !props.hidden ? <label class="input__label">
        {label as "safe"}{props.required && !omitRequiredStar ? " *" : ""}
      </label> : null}

      <div class="input__container">
        {prepend ? (
          <div class="input__icon input__icon--prepend">
            {prepend as "safe"}
          </div>
        ) : null}
        <input
          {...props}
          disabled={disabled}
          readonly={readonly}
          type={type}
          min={type === "number" ? min : undefined}
          max={type === "number" ? max : undefined}
          placeholder={placeholder ?? undefined}
          class={classNames(`input input--${size}`, inputClass)}
          data-1p-ignore={ignoreOnePassword}
        />
        {append ? (
          <div class="input__icon input__icon--append">{append as "safe"}</div>
        ) : null}
      </div>

      {typeof error === "string" || caption ? (
        <div
          class={classNames(
            "input__caption",
            error ? "input__caption--error" : "",
          )}
        >
          {error || caption}
        </div>
      ) : null}
    </div>
  )
}
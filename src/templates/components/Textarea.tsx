import { Children, PropsWithChildren } from "@kitajs/html"
import classNames from "classnames"

type TextareaProps = Omit<JSX.HtmlTextAreaTag, "maxlength"> &
  PropsWithChildren<{
    caption?: Children
    error?: boolean | JSX.Element
    label?: string | JSX.Element
    class?: string
    inputClass?: string
    resizable?: boolean
  } & ({
    maxLength: number
    initialLength: number
  } | {
    maxLength?: undefined
    initialLength?: undefined
  })>

export default ({
  caption,
  disabled = false,
  class: className,
  error,
  label,
  placeholder,
  readonly = false,
  inputClass,
  maxLength,
  initialLength,
  resizable = true,
  ...props
}: TextareaProps) => {
  return (
    <div
      class={classNames(
        "textarea__wrap",
        disabled && "textarea__wrap--disabled",
        error && "textarea__wrap--error",
        readonly && "textarea__wrap--readonly",
        className,
      )}
    >
      {label && !props.hidden ? (
        <label class="textarea__label">
          {label as "safe"}{props.required ? " *" : ""}
        </label>
      ) : null}

      <div class="textarea__container">
        <textarea
          {...props}
          disabled={disabled}
          readonly={readonly}
          placeholder={placeholder ?? undefined}
          class={classNames("textarea", inputClass, { "!resize-y": resizable })}
          rows="15"
          {...maxLength && { maxLength, "oninput": "textareaOnInput(this)" }}
        />

        {maxLength ?
          <div class="text-sm text-gray-500 text-right">
            <span class="textarea__char-count-container">{initialLength}</span>/<span>{maxLength}</span>
          </div>
        : null}
      </div>

      {typeof error === "string" || caption ? (
        <div class="textarea__caption">{error || caption}</div>
      ) : null}
    </div>
  )
}

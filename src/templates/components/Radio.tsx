import { Children, PropsWithChildren } from "@kitajs/html"
import classNames from "classnames"

export type RadioProps = Omit<JSX.HtmlInputTag, "type"> &
  PropsWithChildren<{
    caption?: Children | null
    className?: string
    error?: boolean | JSX.Element
    label?: Children | null
  }>

export default ({
  caption,
  class: className,
  checked = false,
  disabled = false,
  error,
  label,
  ...props
}: RadioProps) => {
  return (
    <div
      class={classNames(
        "radio__wrap",
        disabled && "radio__wrap--disabled",
        error && "radio__wrap--error",
        className,
      )}
    >
      <label class="radio__container">
        <input
          type="radio"
          disabled={disabled}
          checked={checked}
          class="radio"
          {...props}
        />

        <div class="radio__circle" tabindex={0}>
          <div class="radio__dot" />
        </div>

        {label ? <div class="radio__label">{label as "safe"}</div> : null}
      </label>

      {(typeof error === "string" || caption) && (
        <div class="radio__caption" safe={error !== undefined}>
          {error || caption}
        </div>
      )}
    </div>
  )
}

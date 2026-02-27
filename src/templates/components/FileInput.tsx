import { Children, PropsWithChildren } from "@kitajs/html"

type FileInputSize = "sm" | "md"
type FileInputProps = JSX.HtmlInputTag &
  PropsWithChildren<{
    append?: Children
    caption?: Children
    error?: boolean | JSX.Element
    id: string
    label?: JSX.Element
    size?: FileInputSize
    class?: string
  }>

export default ({
  append,
  caption,
  disabled = false,
  class: className,
  error,
  id,
  label,
  size = "sm",
  ...props
}: FileInputProps) => {
  return (
    <div
      class={[
        `file-input__wrap file-input__wrap--${size}`,
        !!append && "file-input__wrap--append",
        disabled && "file-input__wrap--disabled",
        !!error && "file-input__wrap--error",
        className,
      ]}
    >
      {label ? (
        <label class="file-input__label">{label as "safe"}</label>
      ) : null}

      <div class="file-input__container">
        <input
          {...props}
          disabled={disabled}
          id={id}
          type="file"
          class="file-input"
          onchange="onFileInputChange(event)"
        />

        <label for={id} class="file-input__el">
          <div class="file-input__el-prefix">Choose file</div>
          <div class="file-input__content">
            <span class="file-input__content-text js-file-input-text">
              No file chosen
            </span>
          </div>
        </label>

        {append ? (
          <div class="file-input__icon" safe>
            {append}
          </div>
        ) : null}
      </div>

      {typeof error === "string" || caption ? (
        <div class="file-input__caption">{error || caption}</div>
      ) : null}
    </div>
  )
}

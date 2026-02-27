import classNames from "classnames"

export type AvatarSize = "sm" | "md" | "lg"
export type AvatarTheme = "base" | "info" | "indigo"
type AvatarProps = JSX.HtmlButtonTag & {
  preview?: string
  size?: AvatarSize
  theme?: AvatarTheme
  title: string
}

export default ({
  class: className,
  preview,
  size = "md",
  title,
  theme = "base",
  ...props
}: AvatarProps) => {
  return (
    <div
      class={classNames(`avatar avatar--${theme} avatar--${size}`, className)}
      {...props}
    >
      {preview ? (
        <div class="avatar__icon" safe>
          {preview}
        </div>
      ) : null}
      <div class="avatar__content" safe>
        {title}
      </div>
    </div>
  )
}

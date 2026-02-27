import classNames from "classnames"

export type BadgeSize = "sm" | "lg"
export type BadgeThemes =
  | "base"
  | "primary"
  | "danger"
  | "indigo"
  | "active"
  | "warning"
export type BadgeProps = JSX.HtmlTag & {
  className?: string
  size?: BadgeSize
  theme?: BadgeThemes
}

export default ({
  children,
  className,
  size = "lg",
  theme = "base",
  ...props
}: BadgeProps) => {
  return (
    <div
      class={classNames(`badge badge--${theme} badge--${size}`, className)}
      {...props}
    >
      {children}
    </div>
  )
}

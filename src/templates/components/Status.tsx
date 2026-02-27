import classNames from "classnames"
import { match } from "ts-pattern"

export type StatusVariant = "BLOCKED" | "PENDING_VERIFICATION" | "DISABLED"

type StatusProps = {
  variant: StatusVariant,
  class?: string,
}

export default ({
  class: className,
  variant,
  ...props
}: StatusProps) => {
  const textContent = match(variant)
    .with("BLOCKED", () => "Blocked")
    .with("PENDING_VERIFICATION", () => "Pending")
    .with("DISABLED", () => "Disabled")
    .exhaustive()

  const content = (
    <div
      {...props}
      class={classNames(`select-text status status--${variant}`, className)}
      data-link-no-underline
      text-ellipsis-exclude
    >
      <div class="status__content" safe>{textContent}</div>
    </div>
  )

  return content
}

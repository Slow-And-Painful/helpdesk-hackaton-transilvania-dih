import { PropsWithChildren } from "@kitajs/html"
import Icon, { IconName } from "./Icon"
import classNames from "classnames"

type TooltipProps = JSX.HtmlTag &
  PropsWithChildren<{
    content: JSX.Element | string
    contentId?: string
    icon?: IconName
    text?: JSX.Element
    tooltipClass?: string
    position?: "top" | "bottom" | "left" | "right"
    small?: boolean
    iconSize?: number
    iconClass?: string
  }>

const Tooltip = ({
  content,
  contentId,
  icon,
  text,
  tooltipClass,
  class: className,
  iconClass,
  position = "top",
  small,
  iconSize = 12
}: TooltipProps) => {
  return (
    <div class={classNames("tooltip__container", className)} text-ellipsis-exclude>
      {icon ? (
        <div class={classNames("tooltip__icon", iconClass)}>
          <Icon size={iconSize} name={icon} />
        </div>
      ) : null}
      {text ? <div class="tooltip__text">{text}</div> : null}

      <div
        {...contentId && { id: contentId }}
        class={classNames(
          "tooltip",
          `tooltip--${position}`,
          tooltipClass,
          {
            "tooltip--small": small,
          }
        )}
        data-position={position}
      >{content}</div>
    </div>
  )
}

export default Tooltip

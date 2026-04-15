import { PropsWithChildren } from "@kitajs/html"
import classNames from "classnames"

export type ButtonTabsItem = JSX.HtmlAnchorTag & {
  title: string
  active?: boolean
  className?: string
  disabled?: boolean
  comingSoon?: boolean
}
type ButtonTabsProps = JSX.HtmlTag &
  PropsWithChildren<{
    items?: ButtonTabsItem[]
  }>

const ButtonTabs = ({ class: className, items = [], ...props }: ButtonTabsProps) => {
  return (
    <div class={classNames("buttonTabs", className)} {...props}>
      {items.length > 0 ? (
        <ul class="buttonTabs__items">
          {items.map(({ active, href, title, className, ...itemProps }) => {
            const child = itemProps.comingSoon ?
              <div class={"flex items-center justify-center gap-2"}>
                <div>{title as "safe"}</div>
                <div class="rounded-full bg-gray-800 flex items-center justify-center px-2 py-0.5 text-xxs text-gray-300">În curând</div>
              </div>
              :
              title as "safe"
            
            return (
              <li
                class={classNames("buttonTabs__item", {
                  "is-active": active,
                  "is-disabled": itemProps.disabled || itemProps.comingSoon,
                })}
              >
                {href ? (
                  <a
                    hx-boost="true"
                    href={href}
                    class={classNames("buttonTabs__link", className)}
                    {...itemProps}
                  >
                    {child}
                  </a>
                ) : (
                  <button
                    class={classNames("buttonTabs__link", className)}
                    {...itemProps}
                  >
                    {child}
                  </button>
                )}
              </li>
            )
          })}
        </ul>
      ) : null}
    </div>
  )
}

export default ButtonTabs
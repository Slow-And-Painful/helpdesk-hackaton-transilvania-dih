import { PropsWithChildren } from "@kitajs/html"
import classNames from "classnames"
import Tooltip from "./Tooltip"

export type TabsItem = JSX.HtmlAnchorTag & {
  title: string
  active?: boolean
  className?: string
  disabled?: boolean
  comingSoon?: boolean
  afterRequest?: string
}
type TabsProps = JSX.HtmlTag &
  PropsWithChildren<{
    items?: TabsItem[]
  }>

const Tabs = ({
  class: className,
  items = [],
  ...props
}: TabsProps) => {
  return (
    <div class={classNames("tabs", className)} {...props}>
      {items.length > 0 ? (
        <ul class={classNames("tabs__items", `tabs__items--grid-${items.length}`)}>
          {items.map(({ active, href, title, className, afterRequest, ...itemProps }) => {
            const child = itemProps.comingSoon ?
              <div class={"flex items-center justify-center gap-2"}>
                <Tooltip content="Coming soon" text={title as "safe"} />
              </div>
              :
              title as "safe"

            return (
              <li
                class={classNames("tabs__item", {
                  "is-active": active,
                  "is-disabled": itemProps.disabled || itemProps.comingSoon,
                })}
              >
                {href ? (
                  <a
                    hx-boost="true"
                    {...!itemProps.comingSoon && { href } }
                    class={classNames("tabs__link", className)}
                    {...itemProps}
                    {...{
                      "hx-on::after-request": `
                        const tabsItemsContainer = this.closest(".tabs__items");
                        const currentActiveTab = tabsItemsContainer?.querySelector(".tabs__item.is-active");
                        currentActiveTab?.classList.remove("is-active");
                        const newActiveTab = this.closest(".tabs__item");
                        newActiveTab?.classList.add("is-active");
                        ${afterRequest}
                      `
                    }}
                  >
                    {child}
                  </a>
                ) : (
                  <button
                    class={classNames("tabs__link", className)}
                    {...itemProps}
                    {...{
                      "hx-on::after-request": `
                        const tabsItemsContainer = this.closest(".tabs__items");
                        const currentActiveTab = tabsItemsContainer?.querySelector(".tabs__item.is-active");
                        currentActiveTab?.classList.remove("is-active");
                        const newActiveTab = this.closest(".tabs__item");
                        newActiveTab?.classList.add("is-active");
                        ${afterRequest}
                      `
                    }}
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

export default Tabs

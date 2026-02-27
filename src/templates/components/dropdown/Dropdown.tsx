import { PropsWithChildren } from "@kitajs/html"
import classNames from "classnames"

import Icon, { IconName } from "$templates/components/Icon"
import { DropdownPosition } from "src/client/scripts/modules/dropdown"

export type DropdownItem = Omit<JSX.HtmlAnchorTag, "title"> & {
  icon?: IconName
  id?: string
  title: JSX.Element
  type?: "primary" | "danger"
  "hx-on::after-request"?: string
  "hx-on::before-request"?: string
  disabled?: boolean
}
export type DropdownProps = Omit<JSX.HtmlTag, "id"> &
  PropsWithChildren<{
    clone?: boolean
    inheritWidth?: boolean
    id: string
    items?: DropdownItem[]
    offset?: number
    open?: boolean
    position?: DropdownPosition
    relative?: boolean | string
  }>

export default ({
  clone,
  children,
  inheritWidth,
  id,
  items = [],
  offset,
  open = false,
  position = "bottom",
  relative = false,
  ...props
}: DropdownProps) => {
  return (
    <div
      id={id}
      {...props}
      class={classNames(
        "dropdown",
        open && "dropdown--open",
        relative && "dropdown--relative",
        props.class,
      )}
      text-ellipsis-exclude
      data-clone={clone ? "" : undefined}
      data-inherit-width={inheritWidth ? "" : undefined}
      data-offset={offset}
      data-position={position}
      data-relative={
        relative ? (typeof relative === "string" ? relative : "") : undefined
      }
      onclick="event.stopPropagation()"
    >
      {items.length > 0 ? (
        <ul class="dropdown__items">
          {items.map(
            ({ href, icon, title, type = "primary", class: className, disabled = false, ...itemProps }) => (
              <li class={classNames(`dropdown__item dropdown__item--${type}`, { "dropdown__item--disabled": disabled })}>
                {href ? (
                  <a
                    hx-boost="true"
                    href={href}
                    class={classNames("dropdown__link", className)}
                    {...itemProps}
                    {...(itemProps["hx-on::after-request"]
                      ? {
                          "hx-on::after-request": `${itemProps["hx-on::after-request"]};window.loader.hide()`,
                        }
                      : {})
                    }
                    {...(itemProps["hx-on::before-request"]
                      ? {
                          "hx-on::before-request": `${itemProps["hx-on::before-request"]};window.loader.hide()`,
                        }
                      : {})
                    }
                  >
                    {icon ? (
                      <div class="dropdown__link-icon">
                        <Icon name={icon} size={16} />
                      </div>
                    ) : null}{" "}
                    <p class={"truncate"}> {title} </p>
                  </a>
                ) : (
                  <button
                    class={classNames("dropdown__link", className)}
                    {...itemProps}
                    {...(itemProps["hx-on::after-request"]
                      ? {
                          "hx-on::after-request": `${itemProps["hx-on::after-request"]};window.loader.hide()`,
                        }
                      : {})}
                  >
                    {icon ? (
                      <div class="dropdown__link-icon">
                        <Icon name={icon} size={16} />
                      </div>
                    ) : null}{" "}
                    <p class={"truncate"}> {title} </p>
                  </button>
                )}
              </li>
            ),
          )}
        </ul>
      ) : null}
      {children ? (
        <div class="dropdown__content">{children as "safe"}</div>
      ) : null}
    </div>
  )
}

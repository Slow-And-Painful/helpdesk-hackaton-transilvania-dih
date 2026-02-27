import { PropsWithChildren } from "@kitajs/html"
import Breadcrumb, { BreadcrumbItem } from "./Breadcrumb"
import classNames from "classnames"
import Dropdown, { DropdownItem } from "./dropdown/Dropdown"
import DropdownTrigger from "./dropdown/DropdownTrigger"
import Icon from "./Icon"

type Props = PropsWithChildren<{
  title: JSX.Element
  id?: string
  titleContainerId?: string
  class?: string
  dropdownConfig?: {
    dropdownId: string
    dropdownItems: DropdownItem[]
  }
  swapOOB?: Htmx.Attributes["hx-swap-oob"]
}> & ({
  withBreadCrumb: true
  breadCrumbItems: BreadcrumbItem[]
  breadcrumbId?: string
} | {
  withBreadCrumb?: false
})

const DashboardPage = ({
  title,
  children,
  class: calsses,
  id,
  swapOOB,
  ...props
}: Props) => {
  return (
    <div class={"w-full h-full pt-4 flex flex-col"} {...id && { id: id }} {...swapOOB && { "hx-swap-oob": swapOOB }}>
      {props.withBreadCrumb ? <Breadcrumb id={props.breadcrumbId} items={props.breadCrumbItems} class={"mb-4"} /> : null}
      <div
        class={classNames(
          "text-xl text-white font-roboto-light mb-4"
        )}
        { ...props.titleContainerId && { id: props.titleContainerId } }
      >
        <div class="flex w-full justify-between items-center">
          <div class={"truncate line-clamp-1"}>{title as "safe"}</div>
          {props.dropdownConfig ? 
            <div>
              <DropdownTrigger
                dropdownId={props.dropdownConfig.dropdownId}
                class="hover:cursor-pointer"
              >
                <Icon name="dots-vertical" size={18} />
              </DropdownTrigger>

              <Dropdown
                id={props.dropdownConfig.dropdownId}
                items={props.dropdownConfig.dropdownItems}
              />
            </div>
          : null}
        </div>
      </div>
      {children}
    </div>
  )
}

export default DashboardPage

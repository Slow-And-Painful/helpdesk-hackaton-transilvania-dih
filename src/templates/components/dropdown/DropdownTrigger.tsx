import { WithClass } from "$types/ui"
import { PropsWithChildren } from "@kitajs/html"

type Props = Omit<WithClass<JSX.HtmlTag>, "onclick"> &
  PropsWithChildren<{
    dropdownId: string
  }>

const DropdownTrigger = ({ children, dropdownId, ...props }: Props) => {
  return (
    <div
      data-dropdown-toggle={dropdownId}
      onclick={`event.preventDefault();event.stopPropagation();window.toggleDropdown(event, "${dropdownId}")`}
      {...props}
    >
      {children}
    </div>
  )
}

export default DropdownTrigger
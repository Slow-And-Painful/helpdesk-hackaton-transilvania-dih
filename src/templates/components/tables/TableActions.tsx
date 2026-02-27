import { DropdownPosition } from "src/client/scripts/modules/dropdown"
import Dropdown, { DropdownItem } from "$templates/components/dropdown/Dropdown"
import DropdownTrigger from "$templates/components/dropdown/DropdownTrigger"
import Icon from "$templates/components/Icon"

type Props = {
  dropdownId: string
  dropdownPosition?: DropdownPosition
  items: DropdownItem[]
}

const TableActions = ({
  dropdownId,
  dropdownPosition = "bottom-right",
  items,
  ...props
}: Props) => {
  return (
    <div class="table__menu" {...props}>
      <DropdownTrigger
        class="table__menu-toggle"
        aria-haspopup="true"
        aria-controls={dropdownId}
        dropdownId={dropdownId}
      >
        <Icon name="dots-vertical" size={18} />
      </DropdownTrigger>

      <Dropdown
        clone
        id={dropdownId}
        items={items}
        position={dropdownPosition}
      />
    </div>
  )
}

export default TableActions
import { CONTACT_EMAIL } from "$constants/index"
import { getViewPath } from "$routers/website/utils"
import { User } from "$services/UsersService"
import USER_TYPE from "$types/USER_TYPE"
import Dropdown, { DropdownItem } from "./dropdown/Dropdown"
import DropdownTrigger from "./dropdown/DropdownTrigger"
import Icon from "./Icon"
import UserAvatar from "./UserAvatar"

type Props = {
  user: User
  swapOOB?: string
}

const getUserDropdownItems = (user: User) => {
  const items: DropdownItem[] = [
    // {
    //   title: "Profile",
    //   icon: "user",
    //   href: getViewPath("users", "USER_PROFILE", { targetUserId: user.id }),
    //   ...user.type === USER_TYPE.CUSTOMER ?
    //     { "hx-on::before-request": "minifyChat()" }
    //     : {}
    // }
  ]
  if (user.type === USER_TYPE.CUSTOMER) {
    items.unshift({
      title: "Contact support",
      icon: "mail",
      href: `mailto:${CONTACT_EMAIL}`
    })
  }

  items.push({
    title: "Logout",
    icon: "logout",
    "hx-get": getViewPath("auth", "LOGOUT"),
  })
  return items
}

const SidebarUser = ({ user, swapOOB }: Props) => {
  return (
    <div id="sidebar-user-dropdown-container" {...(swapOOB ? { "hx-swap-oob": swapOOB } : {})}>
      <DropdownTrigger class={"sidebar__user-data-container"} dropdownId="sidebar-user-dropdown">
        <div class={"sidebar__user-data"}>
          <div class={"flex items-start gap-4 flex-1 truncate"}>
            <UserAvatar user={user} size={"sm"} />
            <div class={"sidebar__user-name-container"}>
              <div class={"sidebar__user-name"} safe>
                {user.firstName} {user.lastName}
              </div>
            </div>
          </div>
          <Icon class={"sidebar__user-toggle"} name={"dots-vertical"} size={20} />
        </div>
      </DropdownTrigger>
      <Dropdown
        id="sidebar-user-dropdown"
        position="right"
        items={getUserDropdownItems(user)}
        class={"!min-w-[223px]"}
      />
    </div>
  )
}

export default SidebarUser
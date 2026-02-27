import { User } from "$services/UsersService"
import classNames from "classnames"
import Icon from "./Icon"

type Props = {
  user: User
  size?: "sm" | "md"
  class?: string
}

const UserAvatar = ({
  user,
  size = "md",
  class: className
}: Props) => {
  return (
    user.emailVerified && user.firstName && user.lastName
    ? <div
      class={classNames(`user-avatar user-avatar--${size}`, className)}
      safe
      style={`background-color: ${user.color}`}
    >
      {user.firstName[0].toLocaleUpperCase()}{user.lastName[0].toLocaleUpperCase()}
    </div>
    : <div
      class={classNames(`border border-dashed border-gray-300 user-avatar user-avatar--${size}`, className)}
    >
      <Icon name="user" size={16} class="text-gray-300" />
    </div>
  )
}

export default UserAvatar

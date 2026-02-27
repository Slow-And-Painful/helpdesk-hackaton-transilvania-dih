import { User } from "$services/UsersService"
import Status, { StatusVariant } from "./Status"

type Props = {
  user: User
}

const UserStatus = ({ user }: Props) => {
  let variant: StatusVariant

  if (user.blocked) {
    variant = "BLOCKED"
  } else if (!user.emailVerified) {
    variant = "PENDING_VERIFICATION"
  } else {
    return null
  }

  return <Status variant={variant} />
}

export default UserStatus

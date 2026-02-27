import { OrganizationSchema } from "$dbSchemas/Organizations"
import USER_IN_ORGANIZATION_ROLES from "$types/USER_IN_ORGANIZATION_ROLES"
import classNames from "classnames"
import Icon from "./Icon"
import { getActionPath } from "$routers/website/utils"
import { User } from "$services/UsersService"

type Props = {
  organizations: {
    selected: boolean,
    organization: OrganizationSchema,
    role: USER_IN_ORGANIZATION_ROLES
  }[]
  user: User
  sseToken?: string
}

const SwitchOrganizationListing = ({
  organizations,
  user,
  sseToken
}: Props) => {
  return (
    <div class="switch-org__container">
      {organizations.map(organizationData => (
        <div
          class={classNames(
            "switch-org__item",
            {
              "switch-org__item--selected": organizationData.selected,
              "switch-org__item--disabled": organizationData.organization.blocked
            })
          }
          {
            ...!organizationData.selected && {
              "hx-post": getActionPath("users", "SWITCH_ORGANIZATION", { targetUserId: user.id }),
              "hx-vals": JSON.stringify({
                ...sseToken ? { sseToken } : {},
                organizationId: organizationData.organization.id,
              }),
              "hx-push-url": "true",
              "hx-on::before-request": "toggleChatSize(false)",
            }
          }
        >
          <div class={"truncate"}>{organizationData.organization.name as "safe"}</div>
          <div class="flex h-full items-center justify-center shrink-0">
            {organizationData.selected
              ?
                <div class={"flex items-center justify-center gap-2"}>
                  <div class="rounded-full bg-gray-800 flex items-center justify-center px-2 py-0.5 text-xxs text-gray-300">Current organization</div>
                </div>
              : organizationData.organization.blocked
                ? <div class={"flex items-center justify-center gap-2"}>
                  <div class="rounded-full bg-gray-800 flex items-center justify-center px-2 py-0.5 text-xxs text-gray-300">Blocked</div>
                </div>
                :
                <Icon name="chevron-right" size={16} />
            }
          </div>
        </div>
      ))}
    </div>
  )
}

export default SwitchOrganizationListing

import Modal from "./Modal"
import { User } from "$services/UsersService"
import { SelectedOrganizationData } from "$types"
import SwitchOrganizationListing from "./SwitchOrganizationListing"
// import Separator from "./Separator"
// import { getPartialPath } from "$routers/website/utils"
// import Icon from "./Icon"

export type Props = {
  user: User,
  selectedOrganization: SelectedOrganizationData | null
  sseToken?: string
  isLogin?: boolean
}

const SwitchOrganizationModal = ({
  user,
  selectedOrganization,
  isLogin = false,
  sseToken
}: Props) => {
  return (
    <Modal
      id={"switch-organization-modal"}
      title={"Switch organization"}
      className="switch-organization-modal"
      isOpen={true}
      closable={!isLogin}
    > 
      <SwitchOrganizationListing
        organizations={user.organizations.map(org => ({ ...org, selected: !isLogin && org.organization.id === selectedOrganization?.organization.id }))}
        user={user}
        sseToken={sseToken}
      />

      {/* <Separator class="bg-gray-800 my-4" /> */}

      {/* <div
        hx-get={getPartialPath("organizations", "CREATE_ORGANIZATION_MODAL")}
        hx-target="#modal"
        hx-swap="innerHTML"
        class="flex justify-between px-2 py-3 w-full rounded-lg border border-gray-800 bg-gray-900 hover:border-gray-700 hover:bg-gray-800 hover:cursor-pointer"
      >
        <div class="font-roboto-medium">Add organization</div>
        <Icon name="plus" size={16} />
      </div> */}
    </Modal>
  )
}

export default SwitchOrganizationModal

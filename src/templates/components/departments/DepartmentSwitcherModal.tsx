import Modal from "$templates/components/Modal"
import Avatar from "$templates/components/Avatar"
import Badge from "$templates/components/Badge"
import Card from "$templates/components/Card"
import Icon from "$templates/components/Icon"
import { getDepartmentInitials } from "$utils/sidebar"
import { Department } from "$services/DepartmentsService"
import { getActionPath } from "$routers/website/utils"
import classNames from "classnames"

type Props = {
  activeDepartment: Department | null
  userDepartments: Department[]
}

export const departmentSwitcherModalId = "department-switcher-modal"

export default function DepartmentSwitcherModal({ activeDepartment, userDepartments }: Props) {
  return (
    <Modal
      id={departmentSwitcherModalId}
      isOpen={true}
      size="sm"
      title={<span>Switch Department</span>}
    >
      <div class="department-switcher__grid py-2">
        {userDepartments.map((dept) => {
          const isActive = activeDepartment?.id === dept.id
          return (
            <button
              class={classNames("department-switcher__card-btn", isActive && "department-switcher__card-btn--active")}
              hx-post={getActionPath("departments", "SWITCH")}
              hx-vals={JSON.stringify({ departmentId: dept.id })}
              hx-swap="none"
              {...{ "hx-on::after-request": `if(event.detail.successful){ window.location.reload() }` }}
              disabled={isActive}
            >
              <Card class="department-switcher__card">
                <Avatar
                  preview={getDepartmentInitials(dept.name)}
                  title=""
                  size="lg"
                  theme={isActive ? "indigo" : "base"}
                  class="department-switcher__avatar"
                />
                <div class="department-switcher__card-footer">
                  <span class="department-switcher__card-name" safe>{dept.name}</span>
                  {isActive ? (
                    <Badge theme="active" size="sm">
                      <Icon name="check" size={10} />
                      Active
                    </Badge>
                  ) : null}
                </div>
              </Card>
            </button>
          )
        })}
      </div>
    </Modal>
  )
}

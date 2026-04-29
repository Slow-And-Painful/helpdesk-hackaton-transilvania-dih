import DashboardPage from "$templates/components/DashboardPage"
import { DepartmentUserWithRelations } from "$services/DepartmentUsersService"
import { User } from "$services/UsersService"
import StaffUsersTable from "$templates/components/tables/StaffUsersTable"
import StaffMembersTable from "$templates/components/tables/StaffMembersTable"
import Tabs from "$templates/components/Tabs"
import Button from "$templates/components/Button"
import { getPartialPath, getViewPath } from "$routers/website/utils"

export type StaffUsersTab = "customers" | "staff"

type Props = {
  tab: StaffUsersTab
  baseUrl: string
  items?: DepartmentUserWithRelations[]
  staffUsers?: User[]
}

const StaffUsersView = ({ tab, baseUrl, items, staffUsers }: Props) => {
  return (
    <DashboardPage
      title={
        <div class="w-full flex justify-between items-center">
          <span>Utilizatori</span>
          <Button
            preset="primary"
            size="sm"
            icon="plus"
            hx-get={getPartialPath("users", "CREATE_USER_MODAL")}
            hx-target="#modal"
            hx-swap="innerHTML"
            iconPosition="right"
          >
            Creează nou
          </Button>
        </div>
      }
    >
      <div class="flex flex-col gap-y-6">
        <Tabs
          items={[
            { title: "Clienți", href: `${baseUrl}?tab=customers`, active: tab === "customers" },
            { title: "Staff", href: `${baseUrl}?tab=staff`, active: tab === "staff" },
          ]}
        />

        {tab === "customers" ? (
          <StaffUsersTable items={items ?? []} />
        ) : (
          <StaffMembersTable items={staffUsers ?? []} />
        )}
      </div>
    </DashboardPage>
  )
}

export default StaffUsersView

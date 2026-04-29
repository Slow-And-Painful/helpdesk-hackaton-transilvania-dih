import DashboardPage from "$templates/components/DashboardPage"
import { DepartmentUserWithRelations } from "$services/DepartmentUsersService"
import StaffUsersTable from "$templates/components/tables/StaffUsersTable"
import Button from "$templates/components/Button"
import { getPartialPath } from "$routers/website/utils"

type Props = {
  items: DepartmentUserWithRelations[]
}

const StaffUsersView = ({ items }: Props) => {
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
        <StaffUsersTable items={items} />
      </div>
    </DashboardPage>
  )
}

export default StaffUsersView

import DashboardPage from "$templates/components/DashboardPage"
import { DepartmentUserWithRelations } from "$services/DepartmentUsersService"
import StaffUsersTable from "$templates/components/tables/StaffUsersTable"

type Props = {
  items: DepartmentUserWithRelations[]
}

const StaffUsersView = ({ items }: Props) => {
  return (
    <DashboardPage title={<span>Utilizatori</span>}>
      <div class="flex flex-col gap-y-6">
        <StaffUsersTable items={items} />
      </div>
    </DashboardPage>
  )
}

export default StaffUsersView

import DashboardPage from "$templates/components/DashboardPage"
import { Department } from "$services/DepartmentsService"

type Props = {
  activeDepartment: Department | null
}

const DepartmentUsersView = ({ activeDepartment }: Props) => {
  return (
    <DashboardPage
      title={
        <span>
          Users
          {activeDepartment && (
            <span class="tickets-page__dept-name" safe> — {activeDepartment.name}</span>
          )}
        </span>
      }
    >
      <div class="flex flex-col gap-y-6">
        {/* Users list will go here */}
      </div>
    </DashboardPage>
  )
}

export default DepartmentUsersView

import DashboardPage from "$templates/components/DashboardPage"
import { Department } from "$services/DepartmentsService"

type Props = {
  activeDepartment: Department | null
}

const DepartmentSettingsView = ({ activeDepartment }: Props) => {
  return (
    <DashboardPage
      title={
        <span>
          Department
          {activeDepartment && (
            <span class="tickets-page__dept-name" safe> — {activeDepartment.name}</span>
          )}
        </span>
      }
    >
      <div class="flex flex-col gap-y-6">
        {/* Department settings will go here */}
      </div>
    </DashboardPage>
  )
}

export default DepartmentSettingsView

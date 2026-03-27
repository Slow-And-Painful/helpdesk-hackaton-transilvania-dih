import DashboardPage from "$templates/components/DashboardPage"
import { Department } from "$services/DepartmentsService"

type Props = {
  activeDepartment: Department | null
}

const DepartmentDocumentsView = ({ activeDepartment }: Props) => {
  return (
    <DashboardPage
      title={
        <span>
          Documents
          {activeDepartment && (
            <span class="tickets-page__dept-name" safe> — {activeDepartment.name}</span>
          )}
        </span>
      }
    >
      <div class="flex flex-col gap-y-6">
        {/* Documents list will go here */}
      </div>
    </DashboardPage>
  )
}

export default DepartmentDocumentsView

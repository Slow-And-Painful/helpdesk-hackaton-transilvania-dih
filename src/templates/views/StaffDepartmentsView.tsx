import DashboardPage from "$templates/components/DashboardPage"
import { Department } from "$services/DepartmentsService"
import { TablePagination } from "$templates/components/tables/Table"
import DepartmentsTable, { departmentsTableId } from "$templates/components/tables/DepartmentsTable"
import TableFilters from "$templates/components/tables/TableFilters"
import Button from "$templates/components/Button"
import { getPartialPath } from "$routers/website/utils"

type Props = {
  items: Department[]
  pagination?: TablePagination
  baseUrl: string
}

const StaffDepartmentsView = ({ items, pagination, baseUrl }: Props) => {
  return (
    <DashboardPage
      title={
        <div class="w-full flex justify-between items-center">
          <span>Departments</span>
          <Button
            preset="primary"
            size="sm"
            icon="plus"
            hx-get={getPartialPath("departments", "CREATE_DEPARTMENT_MODAL")}
            hx-target="#modal"
            hx-swap="innerHTML"
            iconPosition="right"
          >
            Create new
          </Button>
        </div>
      }
    >
      <div class="flex flex-col gap-y-6">
        {pagination && (
          <TableFilters
            tableId={departmentsTableId}
            pagination={pagination}
            baseUrl={baseUrl}
            filters={[]}
          />
        )}
        <DepartmentsTable
          items={items}
          pagination={pagination}
          baseUrl={baseUrl}
        />
      </div>
    </DashboardPage>
  )
}

export default StaffDepartmentsView

import DashboardPage from "$templates/components/DashboardPage"
import { User } from "$services/UsersService"
import { TablePagination } from "$templates/components/tables/Table"
import UsersTable, { usersTableId } from "$templates/components/tables/UsersTable"
import TableFilters from "$templates/components/tables/TableFilters"
import { Department } from "$services/DepartmentsService"
import Button from "$templates/components/Button"
import { getPartialPath } from "$routers/website/utils"

type Props = {
  items: User[]
  pagination?: TablePagination
  baseUrl: string
  activeDepartment: Department
}

const UsersView = ({ items, pagination, baseUrl, activeDepartment }: Props) => {
  return (
    <DashboardPage
      title={
        <div class="w-full flex justify-between items-center">
          <div>
            <span>Users</span>
            {activeDepartment && (
              <span class="tickets-page__dept-name" safe>
                {" "} — {activeDepartment.name}
              </span>
            )}
          </div>

          <Button
            preset="primary"
            size="sm"
            icon="plus"
            hx-get={getPartialPath("users", "CREATE_USER_MODAL")}
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
            tableId={usersTableId}
            pagination={pagination}
            baseUrl={baseUrl}
            filters={[]}
          />
        )}
        <UsersTable
          items={items}
          pagination={pagination}
          baseUrl={baseUrl}
        />
      </div>
    </DashboardPage>
  )
}

export default UsersView
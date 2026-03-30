import DashboardPage from "$templates/components/DashboardPage"
import { User } from "$services/UsersService"
import { TablePagination } from "$templates/components/tables/Table"
import UsersTable, { usersTableId } from "$templates/components/tables/UsersTable"
import TableFilters from "$templates/components/tables/TableFilters"
import { Department } from "$services/DepartmentsService"

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
        <span>
          Users
          {activeDepartment && (
            <span class="tickets-page__dept-name" safe>
              {" "} — {activeDepartment.name}
            </span>
          )}
        </span>
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
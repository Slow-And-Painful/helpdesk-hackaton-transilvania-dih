import { Department } from "$services/DepartmentsService"
import { User } from "$services/UsersService"
import { DepartmentUser } from "$services/DepartmentUsersService"
import { TablePagination } from "$templates/components/tables/Table"
import UsersTable from "$templates/components/tables/UsersTable"
import TableFilters from "$templates/components/tables/TableFilters"
import { usersTableId } from "$templates/components/tables/UsersTable"

type Props = {
  department: Department
  items: User[]
  departmentUsers?: DepartmentUser[]
  pagination?: TablePagination
  baseUrl: string
}

const StaffDepartmentUsersTab = ({ items, departmentUsers = [], pagination, baseUrl }: Props) => {
  const departmentUserIdMap = new Map<number, number>(
    departmentUsers.map((du) => [du.userId, du.id])
  )

  return (
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
        departmentUserIdMap={departmentUserIdMap}
      />
    </div>
  )
}

export default StaffDepartmentUsersTab

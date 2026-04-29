import { Department } from "$services/DepartmentsService"
import { User } from "$services/UsersService"
import { DepartmentUser } from "$services/DepartmentUsersService"
import { TablePagination } from "$templates/components/tables/Table"
import UsersTable from "$templates/components/tables/UsersTable"
import TableFilters from "$templates/components/tables/TableFilters"
import { usersTableId } from "$templates/components/tables/UsersTable"
import Button from "$templates/components/Button"
import { getPartialPath } from "$routers/website/utils"

type Props = {
  department: Department
  items: User[]
  departmentUsers?: DepartmentUser[]
  pagination?: TablePagination
  baseUrl: string
}

const StaffDepartmentUsersTab = ({ department, items, departmentUsers = [], pagination, baseUrl }: Props) => {
  const departmentUserIdMap = new Map<number, number>(
    departmentUsers.map((du) => [du.userId, du.id])
  )
  const departmentUserRoleMap = new Map<number, string>(
    departmentUsers.map((du) => [du.userId, du.role])
  )

  const createButton = (
    <Button
      preset="primary"
      size="sm"
      icon="plus"
      hx-get={`${getPartialPath("users", "CREATE_USER_MODAL")}?departmentId=${department.id}`}
      hx-target="#modal"
      hx-swap="innerHTML"
      iconPosition="right"
    >
      Creează nou
    </Button>
  )

  return (
    <div class="flex flex-col gap-y-6">
      {pagination ? (
        <TableFilters
          tableId={usersTableId}
          pagination={pagination}
          baseUrl={baseUrl}
          filters={[]}
          side={createButton}
        />
      ) : (
        <div class="flex justify-end">{createButton}</div>
      )}
      <UsersTable
        items={items}
        pagination={pagination}
        baseUrl={baseUrl}
        departmentUserIdMap={departmentUserIdMap}
        departmentUserRoleMap={departmentUserRoleMap}
      />
    </div>
  )
}

export default StaffDepartmentUsersTab

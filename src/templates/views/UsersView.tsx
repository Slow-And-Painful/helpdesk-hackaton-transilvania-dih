import DashboardPage from "$templates/components/DashboardPage"
import { User } from "$services/UsersService"
import { TablePagination } from "$templates/components/tables/Table"
import UsersTable from "$templates/components/tables/UsersTable"

type Props = {
  items: User[]
  pagination?: TablePagination
  baseUrl: string
}

const UsersView = ({ items, pagination, baseUrl }: Props) => {
  return (
    <DashboardPage
      title={
        <div class="w-full flex justify-between items-center">
          <div>
            <span>Users</span>
          </div>
        </div>
      }
    >
      <div class="flex flex-col gap-y-6">
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
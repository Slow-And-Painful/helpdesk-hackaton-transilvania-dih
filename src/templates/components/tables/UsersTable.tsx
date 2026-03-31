import Table, { TableConfig, TablePagination } from "$templates/components/tables/Table"
import { User } from "$services/UsersService"

type Props = {
  items: User[]
  pagination?: TablePagination
  baseUrl: string
}

export const usersTableId = "users-table"

const UsersTable = ({ items, pagination, baseUrl }: Props) => {
  const config: TableConfig<User>[] = [
    {
      accessor: "id",
      heading: <>#</>,
      sortable: true,
      width: "80px",
      render: (row) => <span class="font-roboto-medium text-white">#{row.id}</span>,
    },
    {
      accessor: "firstName",
      heading: <>Name</>,
      sortable: true,
      render: (row) => <span safe>{row.firstName} {row.lastName}</span>,
      width: "150px",
    },
    {
      accessor: "email",
      heading: <>Email</>,
      sortable: true,
      render: (row) => <span safe>{row.email}</span>,
      width: "250px",
    },
    {
      accessor: "blocked",
      heading: <>Status</>,
      sortable: true,
      width: "120px",
      render: (row) => (
        <span class={row.blocked ? "text-red-400" : "text-green-400"}>
          {row.blocked ? "Blocked" : "Active"}
        </span>
      ),
    },
    {
      accessor: "creationTimestamp",
      heading: <>Created</>,
      sortable: true,
      width: "180px",
      render: (row) => (
        <span class="text-gray-400">
          {row.creationTimestamp
            ? new Date(row.creationTimestamp).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })
            : "-"}
        </span>
      ),
    },
  ]

  return (
    <Table
      id={usersTableId}
      config={config}
      data={items}
      pagination={pagination}
      baseUrl={baseUrl}
      noDataProps={{
        noDataMessage: "No users",
        noDataFoundMessage: "No users found",
      }}
    />
  )
}

export default UsersTable
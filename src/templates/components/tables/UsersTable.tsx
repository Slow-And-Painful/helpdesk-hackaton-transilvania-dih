import Table, { TableConfig, TablePagination } from "$templates/components/tables/Table"
import { User } from "$services/UsersService"
import USER_TYPE from "$types/USER_TYPE"

type Props = {
  items: User[]
  pagination?: TablePagination
  baseUrl: string
}

export const usersTableId = "users-table"

const getUserTypeLabel = (type: USER_TYPE) => {
  switch (type) {
    case USER_TYPE.STAFF:
      return "Staff"
    case USER_TYPE.CUSTOMER:
      return "Customer"
    default:
      return String(type)
  }
}

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
      heading: <>First name</>,
      sortable: true,
      render: (row) => <span safe>{row.firstName}</span>,
    },
    {
      accessor: "lastName",
      heading: <>Last name</>,
      sortable: true,
      render: (row) => <span safe>{row.lastName}</span>,
    },
    {
      accessor: "email",
      heading: <>Email</>,
      sortable: true,
      render: (row) => <span safe>{row.email}</span>,
    },
    {
      accessor: "type",
      heading: <>Role</>,
      sortable: true,
      width: "120px",
      render: (row) => <span safe>{getUserTypeLabel(row.type)}</span>,
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
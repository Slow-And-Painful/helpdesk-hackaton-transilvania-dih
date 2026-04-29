import Table, { TableConfig } from "$templates/components/tables/Table"
import { User } from "$services/UsersService"

type Props = {
  items: User[]
}

export const staffMembersTableId = "staff-members-table"

const StaffMembersTable = ({ items }: Props) => {
  const config: TableConfig<User>[] = [
    {
      accessor: "firstName",
      heading: <>Nume</>,
      sortable: false,
      render: (row) => <span safe>{`${row.firstName} ${row.lastName}`.trim()}</span>,
    },
    {
      accessor: "email",
      heading: <>Email</>,
      sortable: false,
      render: (row) => <span class="text-gray-400" safe>{row.email}</span>,
    },
  ]

  return (
    <Table
      id={staffMembersTableId}
      config={config}
      data={items}
      noDataProps={{
        noDataMessage: "Niciun membru staff",
        noDataFoundMessage: "Niciun membru staff găsit",
      }}
    />
  )
}

export default StaffMembersTable

import Table, { TableConfig } from "$templates/components/tables/Table"
import { DepartmentUserWithRelations } from "$services/DepartmentUsersService"
import { getPartialPath, getViewPath } from "$routers/website/utils"

type Props = {
  items: DepartmentUserWithRelations[]
}

export const staffUsersTableId = "staff-users-table"

const StaffUsersTable = ({ items }: Props) => {
  const config: TableConfig<DepartmentUserWithRelations>[] = [
    {
      accessor: "userId",
      heading: <>Nume</>,
      sortable: false,
      render: (row) => (
        <button
          type="button"
          class="text-left text-primary-500 hover:text-primary-400 transition-colors cursor-pointer"
          hx-get={getPartialPath("users", "USER_DETAIL", { departmentUserId: row.id })}
          hx-target="#drawer"
          hx-swap="innerHTML"
        >
          <span safe>{`${row.user.firstName} ${row.user.lastName}`.trim()}</span>
        </button>
      ),
    },
    {
      accessor: "departmentId",
      heading: <>Departament</>,
      sortable: false,
      render: (row) => (
        <a
          class="text-primary-500 hover:text-primary-400 transition-colors cursor-pointer"
          href={`${getViewPath("staff", "DEPARTMENT_SETTINGS").replace(":id", String(row.department.id))}?tab=users`}
          hx-boost="true"
        >
          <span safe>{row.department.name}</span>
        </a>
      ),
    },
    {
      accessor: "id",
      heading: <>Email</>,
      sortable: false,
      render: (row) => <span class="text-gray-400" safe>{row.user.email}</span>,
    },
    {
      accessor: "role",
      heading: <>Rol</>,
      sortable: false,
      render: (row) => (
        <span class={row.role === "ADMIN" ? "text-primary-400" : "text-gray-300"}>
          {row.role === "ADMIN" ? "Admin" : "Membru"}
        </span>
      ),
    },
  ]

  return (
    <Table
      id={staffUsersTableId}
      config={config}
      data={items}
      noDataProps={{
        noDataMessage: "Niciun utilizator",
        noDataFoundMessage: "Niciun utilizator găsit",
      }}
    />
  )
}

export default StaffUsersTable

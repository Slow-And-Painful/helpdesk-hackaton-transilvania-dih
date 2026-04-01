import Table, { TableConfig, TablePagination } from "$templates/components/tables/Table"
import { Department } from "$services/DepartmentsService"
import { getViewPath } from "$routers/website/utils"

type Props = {
  items: Department[]
  pagination?: TablePagination
  baseUrl: string
}

export const departmentsTableId = "departments-table"

const DepartmentsTable = ({ items, pagination, baseUrl }: Props) => {
  const config: TableConfig<Department>[] = [
    {
      accessor: "id",
      heading: <>#</>,
      sortable: true,
      width: "80px",
      render: (row) => <span class="font-roboto-medium text-white">#{row.id}</span>,
    },
    {
      accessor: "name",
      heading: <>Name</>,
      sortable: true,
      render: (row) => <span safe>{row.name}</span>,
    },
    {
      accessor: "createdAt",
      heading: <>Created</>,
      sortable: true,
      width: "180px",
      render: (row) => (
        <span class="text-gray-400">
          {row.createdAt
            ? new Date(row.createdAt).toLocaleDateString("en-US", {
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
      id={departmentsTableId}
      config={config}
      data={items}
      pagination={pagination}
      baseUrl={baseUrl}
      rowLink={(row) => getViewPath("staff", "DEPARTMENT_SETTINGS").replace(":id", String(row.id))}
      noDataProps={{
        noDataMessage: "No departments",
        noDataFoundMessage: "No departments found",
      }}
    />
  )
}

export default DepartmentsTable

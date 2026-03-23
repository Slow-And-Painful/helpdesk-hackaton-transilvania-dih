/// <reference types="@kitajs/html/htmx.d.ts" />

import Table, { TableConfig, TablePagination } from "$templates/components/tables/Table"
import { Department } from "$services/DepartmentsService"
import { Ticket } from "$services/TicketsService"
import { ticketsTableId } from "./TicketsView"

type TicketWithDepts = Ticket & {
  senderDepartment?: Department | null
  destinationDepartment?: Department | null
}

type Props = {
  items: TicketWithDepts[]
  pagination: TablePagination
  tab: "incoming" | "outgoing"
  baseUrl: string
  activeDepartment: Department | null
}

const TicketsTable = ({ items, pagination, tab, baseUrl, activeDepartment }: Props) => {
  const config: TableConfig<TicketWithDepts>[] = [
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
    },
    {
      accessor: tab === "incoming" ? "senderDepartmentId" : "destinationDepartmentId",
      heading: <>{tab === "incoming" ? "From" : "To"}</>,
      field: tab === "incoming" ? "senderDepartmentId" : "destinationDepartmentId",
      render: (row) => {
        const dept = tab === "incoming" ? row.senderDepartment : row.destinationDepartment
        return <span safe>{dept?.name ?? "Unknown"}</span>
      },
    },
    {
      accessor: "status",
      heading: <>Status</>,
      sortable: true,
      width: "120px",
      render: (row) => (
        <span class={`tickets-status-badge tickets-status-badge--${row.status}`} safe>
          {row.status}
        </span>
      ),
    },
    {
      accessor: "createdAt",
      heading: <>Created</>,
      sortable: true,
      width: "180px",
      render: (row) => (
        <span class="text-gray-400">
          {new Date(row.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </span>
      ),
    },
  ]

  return (
    <Table
      id={ticketsTableId}
      config={config}
      data={items}
      pagination={pagination}
      baseUrl={baseUrl}
      additionalQueryParams={{ tab }}
      noDataProps={{
        noDataMessage: `No ${tab} tickets`,
        noDataFoundMessage: `No ${tab} tickets found`,
      }}
    />
  )
}

export default TicketsTable

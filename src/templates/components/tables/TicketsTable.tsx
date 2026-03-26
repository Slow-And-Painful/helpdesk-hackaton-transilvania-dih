import Table, { TableConfig, TablePagination } from "$templates/components/tables/Table"
import { Department } from "$services/DepartmentsService"
import { Ticket } from "$services/TicketsService"
import TicketStatusBadge from "$templates/components/TicketStatusBadge"
import { TicketsViewTab } from "$templates/views/TicketsView"
import { getPartialPath } from "$routers/website/utils"

type Props = {
  items: Ticket[]
  pagination?: TablePagination
  tab: TicketsViewTab
  baseUrl: string
  activeDepartment: Department | null
}

export const ticketsTableId = "tickets-table"

const tabTypeToTabDisplayValueMapping: { [key in TicketsViewTab]: string  } = {
  incoming: "incoming",
  outgoing: "ongoing",
}

const TicketsTable = ({ items, pagination, tab, baseUrl }: Props) => {
  const config: TableConfig<Ticket>[] = [
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
      render: (row) => (
        <button
          type="button"
          class="text-left text-primary-500 hover:text-primary-400 transition-colors cursor-pointer"
          hx-get={getPartialPath("tickets", "TICKET_DETAIL", { ticketId: row.id })}
          hx-target="#drawer"
          hx-swap="innerHTML"
        >
          <span safe>{row.name}</span>
        </button>
      ),
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
      render: (row) => <span id={`ticket-row-status-${row.id}`}><TicketStatusBadge status={row.status} /></span>,
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
        noDataMessage: `No ${tabTypeToTabDisplayValueMapping[tab]} tickets`,
        noDataFoundMessage: `No ${tabTypeToTabDisplayValueMapping[tab]} tickets found`,
      }}
    />
  )
}

export default TicketsTable

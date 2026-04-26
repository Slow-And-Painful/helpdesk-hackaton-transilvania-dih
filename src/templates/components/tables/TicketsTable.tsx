import Table, { TableConfig, TablePagination } from "$templates/components/tables/Table"
import { DropdownItem } from "$templates/components/dropdown/Dropdown"
import { IconName } from "$templates/components/Icon"
import { Department } from "$services/DepartmentsService"
import { Ticket } from "$services/TicketsService"
import TicketStatusBadge from "$templates/components/TicketStatusBadge"
import { TicketsViewTab } from "$templates/views/TicketsView"
import { getActionPath, getPartialPath } from "$routers/website/utils"
import { TICKET_STATUS } from "$types/tickets"

type Props = {
  items: Ticket[]
  pagination?: TablePagination
  tab: TicketsViewTab
  baseUrl: string
  activeDepartment: Department | null
  isDepartmentAdmin?: boolean
}

export const ticketsTableId = "tickets-table"
export const ticketMenuCellId = (ticketId: number) => `ticket-row-actions-${ticketId}`

export function buildTicketDropdownOptions(
  ticketId: number,
  status: TICKET_STATUS,
  { isDepartmentAdmin, tab }: { isDepartmentAdmin: boolean; tab: TicketsViewTab },
): DropdownItem[] {
  return [
    {
      title: <>Detalii</>,
      icon: "eye" as IconName,
      "hx-get": getPartialPath("tickets", "TICKET_DETAIL", { ticketId }),
      "hx-target": "#drawer",
      "hx-swap": "innerHTML",
    },
    ...(isDepartmentAdmin && tab === "incoming" ? [{
      title: <>Asignează</>,
      icon: "user" as IconName,
      "hx-get": getPartialPath("tickets", "ASSIGN_MODAL", { ticketId }),
      "hx-target": "#modal",
      "hx-swap": "beforeend",
    }] as DropdownItem[] : []),
    status === TICKET_STATUS.OPEN ? {
      title: <>Închide</>,
      icon: "x" as IconName,
      type: "danger" as const,
      "hx-post": getActionPath("tickets", "CLOSE"),
      "hx-vals": JSON.stringify({ ticketId, tab }),
      "hx-swap": "none",
    } : {
      title: <>Redeschide</>,
      icon: "rotate-ccw" as IconName,
      "hx-post": getActionPath("tickets", "OPEN"),
      "hx-vals": JSON.stringify({ ticketId, tab }),
      "hx-swap": "none",
    },
  ]
}

const tabTypeToTabDisplayValueMapping: { [key in TicketsViewTab]: string  } = {
  incoming: "primit",
  outgoing: "trimis",
}

const TicketsTable = ({ items, pagination, tab, baseUrl, isDepartmentAdmin }: Props) => {
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
      heading: <>Nume</>,
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
      heading: <>{tab === "incoming" ? "De la" : "Către"}</>,
      field: tab === "incoming" ? "senderDepartmentId" : "destinationDepartmentId",
      render: (row) => {
        const dept = tab === "incoming" ? row.senderDepartment : row.destinationDepartment
        return <span safe>{dept?.name ?? "Necunoscut"}</span>
      },
    },
    {
      accessor: "assigneeId",
      heading: <>Asignat</>,
      width: "160px",
      render: (row) => {
        const assignee = row.assignee
        const name = assignee?.user
          ? `${assignee.user.firstName} ${assignee.user.lastName}`.trim() || assignee.user.email
          : null
        return (
          <span id={`ticket-row-assignee-${row.id}`} class="text-gray-400">
            {name ?? <span class="text-gray-500">—</span>}
          </span>
        )
      },
    },
    {
      accessor: "status",
      heading: <>Stare</>,
      sortable: true,
      width: "120px",
      render: (row) => <span id={`ticket-row-status-${row.id}`}><TicketStatusBadge status={row.status} /></span>,
    },
    {
      accessor: "createdAt",
      heading: <>Creat</>,
      sortable: true,
      width: "180px",
      render: (row) => (
        <span class="text-gray-400">
          {new Date(row.createdAt).toLocaleDateString("ro-RO", {
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
      menuCellId={(row) => ticketMenuCellId(row.id)}
      dropdownOptions={(row) => buildTicketDropdownOptions(row.id, row.status, { isDepartmentAdmin: !!isDepartmentAdmin, tab })}
      noDataProps={{
        noDataMessage: `Niciun tichet ${tabTypeToTabDisplayValueMapping[tab]}`,
        noDataFoundMessage: `Niciun tichet ${tabTypeToTabDisplayValueMapping[tab]} găsit`,
      }}
    />
  )
}

export default TicketsTable

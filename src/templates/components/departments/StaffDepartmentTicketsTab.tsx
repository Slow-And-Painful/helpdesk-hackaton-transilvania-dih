import { Ticket } from "$services/TicketsService"
import { TablePagination } from "$templates/components/tables/Table"
import TicketsTable, { ticketsTableId } from "$templates/components/tables/TicketsTable"
import TableFilters from "$templates/components/tables/TableFilters"
import { TicketsViewTab } from "$templates/views/TicketsView"

type Props = {
  items: Ticket[]
  pagination?: TablePagination
  baseUrl: string
  ticketTab: TicketsViewTab
}

const StaffDepartmentTicketsTab = ({ items, pagination, baseUrl, ticketTab }: Props) => {
  return (
    <div class="flex flex-col gap-y-6">
      {pagination && (
        <TableFilters
          tableId={ticketsTableId}
          pagination={pagination}
          baseUrl={baseUrl}
          additionalQueryParams={{ tab: "tickets", ticketTab }}
          filters={[]}
        />
      )}
      <TicketsTable
        items={items}
        pagination={pagination}
        tab={ticketTab}
        baseUrl={baseUrl}
        activeDepartment={null}
      />
    </div>
  )
}

export default StaffDepartmentTicketsTab

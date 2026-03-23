/// <reference types="@kitajs/html/htmx.d.ts" />

import DashboardPage from "$templates/components/DashboardPage"
import { Department } from "$services/DepartmentsService"
import { Ticket } from "$services/TicketsService"
import { TablePagination } from "$templates/components/tables/Table"
import TicketsTable from "./TicketsTable"
import classNames from "classnames"

export const ticketsTableId = "tickets-table"

type TicketWithDepts = Ticket & {
  senderDepartment?: Department | null
  destinationDepartment?: Department | null
}

type Props = {
  items: TicketWithDepts[]
  pagination: TablePagination
  activeDepartment: Department | null
  tab: "incoming" | "outgoing"
  baseUrl: string
}

const TicketsView = ({ items, pagination, activeDepartment, tab, baseUrl }: Props) => {
  return (
    <DashboardPage
      title={
        <div class="tickets-page__title">
          <span>Tickets</span>
          {activeDepartment && (
            <span class="tickets-page__dept-name" safe> — {activeDepartment.name}</span>
          )}
        </div>
      }
    >
      <div class="tickets-tabs">
        <a
          class={classNames("tickets-tabs__tab", { "tickets-tabs__tab--active": tab === "incoming" })}
          href={`${baseUrl}?tab=incoming`}
          hx-boost="true"
        >
          Incoming
        </a>
        <a
          class={classNames("tickets-tabs__tab", { "tickets-tabs__tab--active": tab === "outgoing" })}
          href={`${baseUrl}?tab=outgoing`}
          hx-boost="true"
        >
          Outgoing
        </a>
      </div>

      <TicketsTable
        items={items}
        pagination={pagination}
        tab={tab}
        baseUrl={baseUrl}
        activeDepartment={activeDepartment}
      />
    </DashboardPage>
  )
}

export default TicketsView

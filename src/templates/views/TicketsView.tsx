/// <reference types="@kitajs/html/htmx.d.ts" />

import DashboardPage from "$templates/components/DashboardPage"
import { Department } from "$services/DepartmentsService"
import { Ticket } from "$services/TicketsService"

type TicketWithDepts = Ticket & {
  senderDepartment?: Department | null
  destinationDepartment?: Department | null
}

type Props = {
  tickets: TicketWithDepts[]
  activeDepartment: Department | null
}

const TicketsView = ({ tickets: _tickets, activeDepartment }: Props) => {
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

    </DashboardPage>
  )
}

export default TicketsView

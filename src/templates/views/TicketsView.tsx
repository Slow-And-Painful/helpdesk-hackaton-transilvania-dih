/// <reference types="@kitajs/html/htmx.d.ts" />

import DashboardPage from "$templates/components/DashboardPage"
import { Department } from "$services/DepartmentsService"
import { Ticket } from "$services/TicketsService"

type TicketWithDepts = Ticket & {
  senderDepartment?: Department | null
  destinationDepartment?: Department | null
}

type Props = {
  incomingTickets: TicketWithDepts[]
  outgoingTickets: TicketWithDepts[]
  activeDepartment: Department | null
}

const TicketsView = ({ incomingTickets, outgoingTickets, activeDepartment }: Props) => {
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
      <div class="tickets-page__section">
        <h2>Incoming Tickets</h2>
        {incomingTickets.length === 0 ? (
          <p class="tickets-page__empty">No incoming tickets</p>
        ) : (
          <ul class="tickets-page__list">
            {incomingTickets.map(ticket => (
              <li class="tickets-page__item" data-status={ticket.status}>
                <span class="tickets-page__item-id">#{ticket.id}</span>
                <span class="tickets-page__item-from" safe>
                  From: {ticket.senderDepartment?.name ?? 'Unknown'}
                </span>
                <span class={`tickets-page__item-status tickets-page__item-status--${ticket.status}`} safe>
                  {ticket.status}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div class="tickets-page__section">
        <h2>Outgoing Tickets</h2>
        {outgoingTickets.length === 0 ? (
          <p class="tickets-page__empty">No outgoing tickets</p>
        ) : (
          <ul class="tickets-page__list">
            {outgoingTickets.map(ticket => (
              <li class="tickets-page__item" data-status={ticket.status}>
                <span class="tickets-page__item-id">#{ticket.id}</span>
                <span class="tickets-page__item-to" safe>
                  To: {ticket.destinationDepartment?.name ?? 'Unknown'}
                </span>
                <span class={`tickets-page__item-status tickets-page__item-status--${ticket.status}`} safe>
                  {ticket.status}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </DashboardPage>
  )
}

export default TicketsView

import { TICKET_STATUS } from "$types/tickets"

const ticketStatusLabelMap: { [key in TICKET_STATUS]: string } = {
  [TICKET_STATUS.OPEN]: "Open",
  [TICKET_STATUS.CLOSED]: "Closed",
}

type Props = {
  status: TICKET_STATUS
}

const TicketStatusBadge = ({ status }: Props) => (
  <span class={`tickets-status-badge tickets-status-badge--${status}`} safe>
    {ticketStatusLabelMap[status]}
  </span>
)

export default TicketStatusBadge

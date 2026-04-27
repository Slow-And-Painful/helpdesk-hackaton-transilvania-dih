import { TICKET_PRIORITY } from "$types/tickets"

const ticketPriorityLabelMap: { [key in TICKET_PRIORITY]: string } = {
  [TICKET_PRIORITY.URGENT]: "Urgentă",
  [TICKET_PRIORITY.MEDIE]: "Medie",
  [TICKET_PRIORITY.SCAZUTA]: "Scăzută",
}

type Props = {
  priority: TICKET_PRIORITY
}

const TicketPriorityBadge = ({ priority }: Props) => (
  <span class={`tickets-priority-badge tickets-priority-badge--${priority}`}>
    <span class="tickets-priority-badge__dot" />
    <span safe>{ticketPriorityLabelMap[priority]}</span>
  </span>
)

export default TicketPriorityBadge

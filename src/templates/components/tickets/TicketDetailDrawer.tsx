/// <reference types="@kitajs/html/htmx.d.ts" />

import { Ticket } from "$services/TicketsService"
import { TICKET_STATUS } from "$types/tickets"
import TicketStatusBadge from "$templates/components/TicketStatusBadge"
import Button from "$templates/components/Button"
import Icon from "$templates/components/Icon"
import { getActionPath } from "$routers/website/utils"

type Props = {
  ticket: Ticket
}

export const ticketDetailDrawerId = "ticket-detail-drawer"

export default function TicketDetailDrawer({ ticket }: Props) {
  const isOpen = ticket.status === TICKET_STATUS.OPEN

  return (
    <div id={ticketDetailDrawerId} class="ticket-drawer is-open">
      <div
        class="ticket-drawer__overlay"
        onclick={`document.getElementById('${ticketDetailDrawerId}').remove()`}
      />
      <div class="ticket-drawer__panel">
        <div class="ticket-drawer__header">
          <h2 class="ticket-drawer__title">Ticket Details</h2>
          <button
            type="button"
            class="ticket-drawer__close"
            onclick={`document.getElementById('${ticketDetailDrawerId}').remove()`}
          >
            <Icon name="x" size={18} />
          </button>
        </div>

        <div class="ticket-drawer__body">
          <div id="ticket-drawer-status" class="ticket-drawer__id">
            <span class="text-gray-500">#{ticket.id}</span>
            <TicketStatusBadge status={ticket.status} />
          </div>

          <h3 class="ticket-drawer__name" safe>{ticket.name}</h3>

          {ticket.summary ? (
            <div class="ticket-drawer__section">
              <div class="ticket-drawer__label">Summary</div>
              <p class="ticket-drawer__text" safe>{ticket.summary}</p>
            </div>
          ) : null}

          <div class="ticket-drawer__divider" />

          <div class="ticket-drawer__details">
            <div class="ticket-drawer__detail-row">
              <span class="ticket-drawer__label">From</span>
              <span class="ticket-drawer__value" safe>
                {ticket.senderDepartment?.name ?? "Unknown"}
              </span>
            </div>
            <div class="ticket-drawer__detail-row">
              <span class="ticket-drawer__label">To</span>
              <span class="ticket-drawer__value" safe>
                {ticket.destinationDepartment?.name ?? "Unknown"}
              </span>
            </div>
            <div class="ticket-drawer__detail-row">
              <span class="ticket-drawer__label">Created</span>
              <span class="ticket-drawer__value">
                {new Date(ticket.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </div>
        </div>

        {isOpen ? (
          <div id="ticket-drawer-footer" class="ticket-drawer__footer">
            <Button
              preset="danger"
              size="sm"
              icon="x"
              outline
              hx-post={getActionPath("tickets", "CLOSE")}
              hx-vals={JSON.stringify({ ticketId: ticket.id })}
              hx-swap="none"
            >
              Close Ticket
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  )
}

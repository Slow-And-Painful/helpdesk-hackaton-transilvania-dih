/// <reference types="@kitajs/html/htmx.d.ts" />

import { Ticket } from "$services/TicketsService"
import { TICKET_STATUS, TICKET_PRIORITY } from "$types/tickets"
import TicketStatusBadge from "$templates/components/TicketStatusBadge"
import TicketPriorityBadge from "$templates/components/TicketPriorityBadge"
import Button from "$templates/components/Button"
import Icon from "$templates/components/Icon"
import { getActionPath, getPartialPath } from "$routers/website/utils"

type Props = {
  ticket: Ticket
  isDepartmentAdmin?: boolean
  isIncoming?: boolean
  tab?: "incoming" | "outgoing"
}

export const ticketDetailDrawerId = "ticket-detail-drawer"

export default function TicketDetailDrawer({ ticket, isDepartmentAdmin, isIncoming, tab }: Props) {
  const isOpen = ticket.status === TICKET_STATUS.OPEN
  const assigneeName = ticket.assignee?.user
    ? `${ticket.assignee.user.firstName} ${ticket.assignee.user.lastName}`.trim() || ticket.assignee.user.email
    : null
  const senderUserName = ticket.senderDepartmentUser?.user
    ? `${ticket.senderDepartmentUser.user.firstName} ${ticket.senderDepartmentUser.user.lastName}`.trim() || ticket.senderDepartmentUser.user.email
    : null

  return (
    <div id={ticketDetailDrawerId} class="ticket-drawer is-open">
      <div
        class="ticket-drawer__overlay"
        onclick={`document.getElementById('${ticketDetailDrawerId}').remove()`}
      />
      <div class="ticket-drawer__panel relative" id="ticket-drawer-panel">
        <div
          class="ticket-drawer__edge-handle"
          id="ticket-drawer-edge-handle"
          onmousedown="window.ticketDrawerStartEdgeResize(event)"
        />
        <div class="ticket-drawer__header">
          <h2 class="ticket-drawer__title">Detalii Tichet</h2>
          <button
            type="button"
            class="ticket-drawer__close"
            onclick={`document.getElementById('${ticketDetailDrawerId}').remove()`}
          >
            <Icon name="x" size={18} />
          </button>
        </div>

        <div class="ticket-drawer__body" id="ticket-drawer-body">

          {/* ── Details column ── */}
          <div class="ticket-drawer__details-col" id="ticket-drawer-details-col">
            <div id="ticket-drawer-status" class="ticket-drawer__id">
              <span class="text-gray-500">#{ticket.id}</span>
              <TicketStatusBadge status={ticket.status} />
            </div>

            <h3 class="ticket-drawer__name" safe>{ticket.name}</h3>

            {ticket.summary ? (
              <div class="ticket-drawer__section">
                <div class="ticket-drawer__label">Rezumat</div>
                <p class="ticket-drawer__text" safe>{ticket.summary}</p>
              </div>
            ) : null}

            <div class="ticket-drawer__divider" />

            <div class="ticket-drawer__details">
              <div class="ticket-drawer__detail-row">
                <span class="ticket-drawer__label">De la</span>
                <span class="ticket-drawer__value">
                  <span safe>{ticket.senderDepartment?.name ?? "Unknown"}</span>
                  {senderUserName && (
                    <button
                      type="button"
                      class="text-gray-400 text-sm hover:text-primary-400 transition-colors cursor-pointer"
                      hx-get={getPartialPath("tickets", "SENDER_USER_MODAL", { ticketId: ticket.id })}
                      hx-target="#modal"
                      hx-swap="beforeend"
                      safe
                    > · {senderUserName}</button>
                  )}
                </span>
              </div>
              <div class="ticket-drawer__detail-row">
                <span class="ticket-drawer__label">Către</span>
                <span class="ticket-drawer__value" safe>
                  {ticket.destinationDepartment?.name ?? "Unknown"}
                </span>
              </div>
              <div class="ticket-drawer__detail-row">
                <span class="ticket-drawer__label">Asignat</span>
                <span id="ticket-drawer-assignee" class="ticket-drawer__value">
                  {assigneeName ?? <span class="text-gray-500">Neasignat</span>}
                </span>
              </div>
              <div class="ticket-drawer__detail-row">
                <span class="ticket-drawer__label">Prioritate</span>
                <span class="ticket-drawer__value flex items-center gap-2">
                  <span id="ticket-drawer-priority">
                    <TicketPriorityBadge priority={ticket.priority} />
                  </span>
                  {isOpen && (
                    <select
                      class="tickets-priority-select"
                      name="priority"
                      hx-post={getActionPath("tickets", "CHANGE_PRIORITY")}
                      hx-trigger="change"
                      hx-vals={`{"ticketId": ${ticket.id}}`}
                      hx-swap="none"
                      aria-label="Schimbă prioritatea"
                    >
                      <option value={TICKET_PRIORITY.URGENT} selected={ticket.priority === TICKET_PRIORITY.URGENT}>Urgentă</option>
                      <option value={TICKET_PRIORITY.MEDIE} selected={ticket.priority === TICKET_PRIORITY.MEDIE}>Medie</option>
                      <option value={TICKET_PRIORITY.SCAZUTA} selected={ticket.priority === TICKET_PRIORITY.SCAZUTA}>Scăzută</option>
                    </select>
                  )}
                </span>
              </div>
              <div class="ticket-drawer__detail-row">
                <span class="ticket-drawer__label">Creat</span>
                <span class="ticket-drawer__value">
                  {new Date(ticket.createdAt).toLocaleDateString("ro-RO", {
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

          <div
            class="ticket-drawer__col-resize-handle"
            id="ticket-drawer-col-resize-handle"
            onmousedown="window.ticketDrawerStartColResize(event)"
          />

          {/* ── Conversation column ── */}
          <div class="ticket-drawer__chat-col">
            <div class="ticket-drawer__chat-messages">
              <div class="ticket-drawer__chat-empty">
                <div class="ticket-drawer__chat-empty-icon">
                  <Icon name="message-square" size={20} />
                </div>
                <p class="ticket-drawer__chat-empty-title">Niciun mesaj încă</p>
                <p class="ticket-drawer__chat-empty-subtitle">
                  Expeditorul și membrii departamentului destinatar pot schimba mesaje aici.
                </p>
              </div>
            </div>

            <div class="ticket-drawer__chat-input-area">
              <div class="ticket-drawer__chat-input-box">
                <div class="ticket-drawer__chat-input-row">
                  <textarea
                    class="ticket-drawer__chat-input"
                    placeholder="Scrie un mesaj…"
                    rows="1"
                  />
                  <button type="button" class="ticket-drawer__chat-send">
                    <Icon name="send" size={15} />
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>

        {isOpen ? (
          <div id="ticket-drawer-footer" class="ticket-drawer__footer">
            {isDepartmentAdmin && isIncoming && (
              <Button
                preset="secondary"
                size="sm"
                icon="user"
                outline
                hx-get={getPartialPath("tickets", "ASSIGN_MODAL", { ticketId: ticket.id })}
                hx-target="#modal"
                hx-swap="beforeend"
              >
                Asignează
              </Button>
            )}
            <Button
              preset="danger"
              size="sm"
              icon="x"
              outline
              hx-post={getActionPath("tickets", "CLOSE")}
              hx-vals={JSON.stringify({ ticketId: ticket.id, ...(tab ? { tab } : {}) })}
              hx-swap="none"
            >
              Închide Tichetul
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  )
}

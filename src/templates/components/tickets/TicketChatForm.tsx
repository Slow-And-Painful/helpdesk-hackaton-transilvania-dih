/// <reference types="@kitajs/html/htmx.d.ts" />

import Icon from "$templates/components/Icon"

type Props = {
  ticketId: number
  disabled?: boolean
}

export default function TicketChatForm({ ticketId, disabled }: Props) {
  return (
    <form id="ticket-chat-form" data-ticket-id={String(ticketId)}>
      <div class="ticket-drawer__chat-input-box">
        <div class="ticket-drawer__chat-input-row">
          <textarea
            id="ticket-chat-input"
            name="text"
            class="ticket-drawer__chat-input"
            placeholder={disabled ? "Tichetul este închis" : "Scrie un mesaj…"}
            rows="1"
            disabled={disabled}
            onkeydown={disabled ? undefined : "window.ticketChatKeydown(event)"}
            {...(disabled ? {} : { oninput: "window.ticketChatResize(this)" })}
          ></textarea>
          <button id="ticket-chat-send" type="submit" class="ticket-drawer__chat-send" disabled={disabled}>
            <Icon name="send" size={15} />
          </button>
        </div>
      </div>
    </form>
  )
}

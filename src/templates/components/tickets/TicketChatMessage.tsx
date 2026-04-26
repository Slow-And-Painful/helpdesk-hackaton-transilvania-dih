/// <reference types="@kitajs/html/htmx.d.ts" />

import { TicketMessage } from "$services/TicketMessagesService"

type Props = {
  message: TicketMessage
  isOutgoing: boolean
}

function initials(firstName?: string | null, lastName?: string | null, email?: string | null): string {
  if (firstName && lastName) return (firstName[0] + lastName[0]).toUpperCase()
  if (firstName) return firstName[0].toUpperCase()
  if (email) return email[0].toUpperCase()
  return "?"
}

export default function TicketChatMessage({ message, isOutgoing }: Props) {
  const user = message.senderDepartmentUser?.user
  const authorName = user
    ? `${user.firstName} ${user.lastName}`.trim() || user.email
    : "Unknown"
  const avatarText = initials(user?.firstName, user?.lastName, user?.email)

  const sentAt = message.sentAt
    ? new Date(message.sentAt).toLocaleTimeString("ro-RO", { hour: "2-digit", minute: "2-digit" })
    : ""

  return (
    <div class={`ticket-drawer__chat-msg${isOutgoing ? " ticket-drawer__chat-msg--outgoing" : ""}`}>
      <div class="ticket-drawer__chat-avatar" safe>{avatarText}</div>
      <div class="ticket-drawer__chat-content">
        <div class="ticket-drawer__chat-meta">
          <span class="ticket-drawer__chat-author" safe>{authorName}</span>
          {sentAt && <span class="ticket-drawer__chat-time" safe>{sentAt}</span>}
        </div>
        <div class="ticket-drawer__chat-bubble" safe>{message.text ?? ""}</div>
      </div>
    </div>
  )
}

/// <reference types="@kitajs/html/htmx.d.ts" />

import Icon from "$templates/components/Icon"
import MarkdownIt from "markdown-it"

const md = new MarkdownIt({ breaks: true, linkify: true, html: true })

type DocRef = { id: number; name: string }

type TicketCta = {
  deptId: number | null
  title: string
  description: string
}

function renderDocMarkers(html: string, documents: DocRef[]): string {
  return html.replace(/\[DOC:(\d+)\]/g, (_, id) => {
    const doc = documents.find(d => String(d.id) === id)
    if (!doc) return ""
    const label = md.utils.escapeHtml(doc.name)
    const url = `/partials/departments/document-download/${id}`
    return `<a href="${url}" class="hd-chat__doc-ref" target="_blank">📄 ${label}</a>`
  })
}

/** Extract the first [CTA:CREATE_TICKET:<deptId>:<title>:<description>] marker from the reply. */
function extractTicketCta(text: string): TicketCta | null {
  const match = text.match(/\[CTA:CREATE_TICKET:(\d+)?:([^:\]]*):([^\]]*)\]/)
  if (!match) return null
  return {
    deptId: match[1] ? parseInt(match[1], 10) : null,
    title: match[2]?.trim() ?? "",
    description: match[3]?.trim() ?? "",
  }
}

/** Strip all CTA markers from the raw reply text before rendering markdown. */
function stripCtaMarkers(text: string): string {
  return text.replace(/\s*\[CTA:CREATE_TICKET:[^\]]*\]/g, "")
}

function extractError(text: string): string | null {
  const match = text.match(/\[ERROR:([^\]]*)\]/)
  return match ? match[1] : null
}

function stripErrorMarkers(text: string): string {
  return text.replace(/\s*\[ERROR:[^\]]*\]/g, "")
}

function extractTicketCreated(text: string): number | null {
  const match = text.match(/\[TICKET_CREATED:(\d+)\]/)
  return match ? parseInt(match[1], 10) : null
}

function stripTicketCreatedMarkers(text: string): string {
  return text.replace(/\s*\[TICKET_CREATED:\d+\]/g, "")
}

type Props = {
  reply: string
  documents?: DocRef[]
  messageId?: number
}

const ChatBotReply = ({ reply, documents = [], messageId }: Props) => {
  const ticketCreatedId = extractTicketCreated(reply)
  const cta = ticketCreatedId == null ? extractTicketCta(reply) : null
  const error = extractError(reply)
  const displayReply = stripTicketCreatedMarkers(stripCtaMarkers(stripErrorMarkers(reply)))

  const ticketUrl = (() => {
    const base = "/partials/tickets/create-modal"
    if (!cta) return base
    const params = new URLSearchParams()
    if (cta.deptId != null) params.set("departmentId", String(cta.deptId))
    if (cta.title) params.set("subject", cta.title)
    if (cta.description) params.set("summary", cta.description)
    params.set("fromChatbot", "1")
    if (messageId != null) params.set("chatMessageId", String(messageId))
    const qs = params.toString()
    return qs ? `${base}?${qs}` : base
  })()

  return (
    <div class="hd-chat__msg hd-chat__msg--bot">
      <div class="hd-chat__msg-avatar">
        <Icon name="zap" size={16} />
      </div>
      <div class="hd-chat__msg-content">
        <div class="hd-chat__msg-bubble hd-chat__msg-bubble--markdown">{md.render(renderDocMarkers(displayReply, documents)) as "safe"}</div>
        {ticketCreatedId != null && (
          <button
            class="hd-chat__ticket-created"
            type="button"
            hx-get={`/partials/tickets/detail/${ticketCreatedId}`}
            hx-target="#drawer"
            hx-swap="innerHTML"
          >
            Tichet creat cu succes - vezi ticket
          </button>
        )}
        {cta != null && (
          <button
            id={messageId != null ? `ticket-cta-${messageId}` : undefined}
            class="hd-chat__ticket-cta"
            type="button"
            hx-get={ticketUrl}
            hx-target="#modal"
            hx-swap="beforeend"
          >
            Deschide tichet de suport
          </button>
        )}
        {error != null && (
          <div class="hd-chat__error-box">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
            <span safe>{error}</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default ChatBotReply

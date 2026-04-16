/// <reference types="@kitajs/html/htmx.d.ts" />

import Icon from "$templates/components/Icon"
import MarkdownIt from "markdown-it"

const md = new MarkdownIt({ breaks: true, linkify: true, html: true })

type DocRef = { id: number; name: string }

type TicketCta = {
  deptId: number | null
  message: string
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

/** Extract the first [CTA:CREATE_TICKET:<deptId>:<message>] marker from the reply. */
function extractTicketCta(text: string): TicketCta | null {
  const match = text.match(/\[CTA:CREATE_TICKET:(\d+)?:([^\]]*)\]/)
  if (!match) return null
  return {
    deptId: match[1] ? parseInt(match[1], 10) : null,
    message: match[2] ?? "",
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

type Props = {
  reply: string
  documents?: DocRef[]
}

const ChatBotReply = ({ reply, documents = [] }: Props) => {
  const cta = extractTicketCta(reply)
  const error = extractError(reply)
  const displayReply = stripCtaMarkers(stripErrorMarkers(reply))

  const ticketUrl = cta?.deptId != null
    ? `/partials/tickets/create-modal?departmentId=${cta.deptId}${cta.message ? `&subject=${encodeURIComponent(cta.message)}` : ""}`
    : "/partials/tickets/create-modal"

  return (
    <div class="hd-chat__msg hd-chat__msg--bot">
      <div class="hd-chat__msg-avatar">
        <Icon name="zap" size={16} />
      </div>
      <div class="hd-chat__msg-content">
        <div class="hd-chat__msg-bubble hd-chat__msg-bubble--markdown">{md.render(renderDocMarkers(displayReply, documents)) as "safe"}</div>
        {cta != null && (
          <button
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

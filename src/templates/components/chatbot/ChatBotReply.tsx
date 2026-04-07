/// <reference types="@kitajs/html/htmx.d.ts" />

import Icon from "$templates/components/Icon"
import MarkdownIt from "markdown-it"

const md = new MarkdownIt({ breaks: true, linkify: true, html: true })

type DocRef = { id: number; name: string }

function renderDocMarkers(html: string, documents: DocRef[]): string {
  return html.replace(/\[DOC:(\d+)\]/g, (_, id) => {
    const doc = documents.find(d => String(d.id) === id)
    if (!doc) return ""
    const label = md.utils.escapeHtml(doc.name)
    const url = `/partials/departments/document-download/${id}`
    return `<a href="${url}" class="hd-chat__doc-ref" target="_blank">📄 ${label}</a>`
  })
}

type Props = {
  reply: string
  documents?: DocRef[]
}

const ChatBotReply = ({ reply, documents = [] }: Props) => (
  <div class="hd-chat__msg hd-chat__msg--bot">
    <div class="hd-chat__msg-avatar">
      <Icon name="zap" size={16} />
    </div>
    <div class="hd-chat__msg-content">
      <div class="hd-chat__msg-bubble hd-chat__msg-bubble--markdown">{md.render(renderDocMarkers(reply, documents)) as "safe"}</div>
    </div>
  </div>
)

export default ChatBotReply

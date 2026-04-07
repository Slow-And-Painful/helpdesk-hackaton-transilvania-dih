/// <reference types="@kitajs/html/htmx.d.ts" />

import Icon from "$templates/components/Icon"
import MarkdownIt from "markdown-it"

const md = new MarkdownIt({ breaks: true, linkify: true })

type Props = {
  reply: string
}

const ChatBotReply = ({ reply }: Props) => (
  <div class="hd-chat__msg hd-chat__msg--bot">
    <div class="hd-chat__msg-avatar">
      <Icon name="zap" size={16} />
    </div>
    <div class="hd-chat__msg-content">
      <div class="hd-chat__msg-bubble hd-chat__msg-bubble--markdown">{md.render(reply) as "safe"}</div>
    </div>
  </div>
)

export default ChatBotReply

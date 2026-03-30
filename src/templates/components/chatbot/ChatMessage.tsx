/// <reference types="@kitajs/html/htmx.d.ts" />

import Icon from "$templates/components/Icon"

type Props = {
  message: string
  reply: string
}

const ChatMessage = ({ message, reply }: Props) => (
  <>
    <div class="hd-chat__msg hd-chat__msg--user">
      <div class="hd-chat__msg-content">
        <div class="hd-chat__msg-bubble">{message as "safe"}</div>
      </div>
    </div>
    <div class="hd-chat__msg hd-chat__msg--bot">
      <div class="hd-chat__msg-avatar">
        <Icon name="zap" size={16} />
      </div>
      <div class="hd-chat__msg-content">
        <div class="hd-chat__msg-bubble">{reply}</div>
      </div>
    </div>
  </>
)

export default ChatMessage

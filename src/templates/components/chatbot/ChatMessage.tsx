/// <reference types="@kitajs/html/htmx.d.ts" />

import ChatBotReply from "$templates/components/chatbot/ChatBotReply"

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
    <ChatBotReply reply={reply} />
  </>
)

export default ChatMessage

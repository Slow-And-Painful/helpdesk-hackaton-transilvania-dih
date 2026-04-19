/// <reference types="@kitajs/html/htmx.d.ts" />

import ChatBotReply from "$templates/components/chatbot/ChatBotReply"

type DocRef = { id: number; name: string }

type Props = {
  message: string
  reply: string
  documents?: DocRef[]
  messageId?: number
}

const ChatMessage = ({ message, reply, documents = [], messageId }: Props) => (
  <>
    <div class="hd-chat__msg hd-chat__msg--user">
      <div class="hd-chat__msg-content">
        <div class="hd-chat__msg-bubble">{message as "safe"}</div>
      </div>
    </div>
    <ChatBotReply reply={reply} documents={documents} messageId={messageId} />
  </>
)

export default ChatMessage

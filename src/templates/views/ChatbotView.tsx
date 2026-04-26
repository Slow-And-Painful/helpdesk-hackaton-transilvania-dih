/// <reference types="@kitajs/html/htmx.d.ts" />

import Icon from "$templates/components/Icon"
import ChatSuggestion from "$templates/components/chatbot/ChatSuggestion"
import ChatbotForm from "$templates/components/chatbot/ChatbotForm"
import ChatMessage from "$templates/components/chatbot/ChatMessage"
import { ChatMessageSchema } from "$dbSchemas/ChatMessages"

type DocRef = { id: number; name: string }

type Props = {
  chatId?: string
  messages?: ChatMessageSchema[]
  ragDocuments?: DocRef[]
  departmentId?: number
}

const ChatbotView = ({ chatId, messages, ragDocuments = [], departmentId }: Props) => {
  const hasMessages = messages && messages.length > 0

  return (
    <div class="hd-chat" id="helpdesk-chat">
      {/* Empty state / welcome — hidden when resuming an existing chat */}
      <div class="hd-chat__welcome" id="hd-chat-welcome" style={hasMessages ? "display:none" : undefined}>
        <div class="hd-chat__welcome-badge">
          <span class="hd-chat__welcome-badge-dot" />
          Asistent AI pentru instituții publice
        </div>
        <div class="hd-chat__welcome-icon">
          <Icon name="agent" size={28} />
        </div>

        <h1 class="hd-chat__welcome-title">Asistent Helpdesk Administrativ</h1>

        <p class="hd-chat__welcome-subtitle">
          Te pot ajuta să găsești informații despre servicii publice, proceduri administrative și să
          navighezi interacțiunea cu instituțiile statului.
        </p>

        <div class="hd-chat__suggestions">
          <ChatSuggestion
            label="Cum depun o solicitare către primărie?"
            message="Cum pot depune o solicitare către o instituție publică?"
          />
          <ChatSuggestion
            label="Ce documente sunt necesare pentru o cerere?"
            message="Ce documente sunt necesare pentru o cerere administrativă?"
          />
          <ChatSuggestion
            label="Cum pot verifica statusul unei solicitări?"
            message="Cum pot verifica statusul unei solicitări depuse?"
          />
          <ChatSuggestion
            label="Cum contactez un departament?"
            message="Cum pot lua legătura cu un departament din cadrul instituției?"
          />
        </div>
      </div>

      {/* Messages area — pre-populated when resuming a chat */}
      <div class={`hd-chat__messages${hasMessages ? " hd-chat__messages--active" : ""}`} id="hd-chat-messages">
        {hasMessages && messages.map((msg) => (
          <ChatMessage message={msg.prompt} reply={msg.response} documents={ragDocuments} messageId={msg.id} />
        ))}
      </div>

      {hasMessages && <script>{"initChatScroll()"}</script>}

      {/* Input area — always at the bottom */}
      <div class="hd-chat__input-wrapper">
        <ChatbotForm values={{ message: "", chatId: chatId ?? "" }} departmentId={departmentId} />
        <p class="hd-chat__disclaimer">
          Asistent AI pentru orientare în servicii publice. Răspunsurile sunt informative și nu înlocuiesc comunicarea oficială cu instituția.
        </p>
      </div>
    </div>
  )
}

export default ChatbotView
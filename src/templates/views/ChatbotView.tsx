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
          Asistent AI intern
        </div>
        <div class="hd-chat__welcome-icon">
          <Icon name="agent" size={28} />
        </div>
        <h1 class="hd-chat__welcome-title">Asistent Achiziții Publice</h1>
        <p class="hd-chat__welcome-subtitle">
          Te pot ajuta să navighezi procedurile de achiziție publică, reglementările și cele mai bune practici pentru cumpărarea cu fonduri publice.
        </p>
        <div class="hd-chat__suggestions">
          <ChatSuggestion
            label="Cum încep un proces de achiziție?"
            message="Cum încep un proces de achiziție publică?"
          />
          <ChatSuggestion
            label="Care sunt pragurile pentru licitații publice?"
            message="Care sunt pragurile pentru licitații publice?"
          />
          <ChatSuggestion
            label="Ce documentație am nevoie?"
            message="Ce documentație am nevoie pentru o achiziție?"
          />
          <ChatSuggestion
            label="Explică procedura de achiziție directă"
            message="Explică procedura de achiziție directă"
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
          Asistent AI pentru orientare în achiziții publice. Răspunsurile sunt doar informative.
        </p>
      </div>
    </div>
  )
}

export default ChatbotView

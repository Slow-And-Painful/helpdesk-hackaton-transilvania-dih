/// <reference types="@kitajs/html/htmx.d.ts" />

import Form from "$templates/components/Form"
import Icon from "$templates/components/Icon"
import ChatSuggestion from "$templates/components/chatbot/ChatSuggestion"

const ChatbotView = () => {
  return (
    <div class="hd-chat" id="helpdesk-chat">
      {/* Empty state / welcome — visible when no messages yet */}
      <div class="hd-chat__welcome" id="hd-chat-welcome">
        <div class="hd-chat__welcome-icon">
          <Icon name="zap" size={28} />
        </div>
        <h1 class="hd-chat__welcome-title">Public Procurement Assistant</h1>
        <p class="hd-chat__welcome-subtitle">
          I can help you navigate public purchasing procedures, regulations, and best practices for buying with public funds.
        </p>
        <div class="hd-chat__suggestions">
          <ChatSuggestion
            label="How do I start a procurement process?"
            message="How do I start a public procurement process?"
          />
          <ChatSuggestion
            label="What are the thresholds for public tenders?"
            message="What are the thresholds for public tenders?"
          />
          <ChatSuggestion
            label="What documentation do I need?"
            message="What documentation do I need for a purchase?"
          />
          <ChatSuggestion
            label="Explain the direct acquisition procedure"
            message="Explain the direct acquisition procedure"
          />
        </div>
      </div>

      {/* Messages area — grows as conversation happens */}
      <div class="hd-chat__messages" id="hd-chat-messages"></div>

      {/* Input area — always at the bottom */}
      <div class="hd-chat__input-wrapper">
        <form
          id="hd-chat-form"
          class="hd-chat__form"
          onsubmit="return handleHelpdeskChat(event)"
        >
          <div class="hd-chat__input-container">
            <textarea
              name="message"
              id="hd-chat-input"
              class="hd-chat__input"
              placeholder="Ask about public procurement..."
              rows="1"
              onkeydown="handleChatKeydown(event)"
              {...{ oninput: "autoResizeTextarea(this)" }}
            ></textarea>
            <button type="submit" class="hd-chat__send" id="hd-chat-send">
              <Icon name="arrow-up" size={18} />
            </button>
          </div>
        </form>
        <p class="hd-chat__disclaimer">
          AI assistant for public procurement guidance. Responses are informational only.
        </p>
      </div>
    </div>
  )
}

export default ChatbotView

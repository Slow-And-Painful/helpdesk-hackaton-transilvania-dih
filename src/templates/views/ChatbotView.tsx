/// <reference types="@kitajs/html/htmx.d.ts" />

import Icon from "$templates/components/Icon"

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
          <button class="hd-chat__suggestion" onclick="submitSuggestion(this)" data-message="How do I start a public procurement process?">
            <Icon name="arrow-up-right" size={14} />
            <span>How do I start a procurement process?</span>
          </button>
          <button class="hd-chat__suggestion" onclick="submitSuggestion(this)" data-message="What are the thresholds for public tenders?">
            <Icon name="arrow-up-right" size={14} />
            <span>What are the thresholds for public tenders?</span>
          </button>
          <button class="hd-chat__suggestion" onclick="submitSuggestion(this)" data-message="What documentation do I need for a purchase?">
            <Icon name="arrow-up-right" size={14} />
            <span>What documentation do I need?</span>
          </button>
          <button class="hd-chat__suggestion" onclick="submitSuggestion(this)" data-message="Explain the direct acquisition procedure">
            <Icon name="arrow-up-right" size={14} />
            <span>Explain the direct acquisition procedure</span>
          </button>
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

      <script>{`
        function autoResizeTextarea(el) {
          el.style.height = 'auto';
          el.style.height = Math.min(el.scrollHeight, 160) + 'px';
          // Toggle send button state
          var btn = document.getElementById('hd-chat-send');
          if (el.value.trim()) {
            btn.classList.add('hd-chat__send--active');
          } else {
            btn.classList.remove('hd-chat__send--active');
          }
        }

        function handleChatKeydown(e) {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            document.getElementById('hd-chat-form').requestSubmit();
          }
        }

        function submitSuggestion(btn) {
          var msg = btn.getAttribute('data-message');
          var input = document.getElementById('hd-chat-input');
          input.value = msg;
          autoResizeTextarea(input);
          document.getElementById('hd-chat-form').requestSubmit();
        }

        function handleHelpdeskChat(e) {
          e.preventDefault();
          var input = document.getElementById('hd-chat-input');
          var messages = document.getElementById('hd-chat-messages');
          var welcome = document.getElementById('hd-chat-welcome');
          var message = input.value.trim();
          
          if (!message) return false;

          // Hide welcome screen
          if (welcome) welcome.style.display = 'none';
          messages.classList.add('hd-chat__messages--active');

          // User message
          var userHtml = '<div class="hd-chat__msg hd-chat__msg--user">' +
            '<div class="hd-chat__msg-content">' +
            '<div class="hd-chat__msg-bubble">' +
            message.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;') +
            '</div></div></div>';
          messages.insertAdjacentHTML('beforeend', userHtml);

          input.value = '';
          input.style.height = 'auto';
          document.getElementById('hd-chat-send').classList.remove('hd-chat__send--active');

          messages.scrollTop = messages.scrollHeight;

          // Bot typing
          var typingHtml = '<div class="hd-chat__msg hd-chat__msg--bot" id="typing-indicator">' +
            '<div class="hd-chat__msg-avatar"><svg width="16" height="16" viewBox="0 0 24 24"><use href="#zap" /></svg></div>' +
            '<div class="hd-chat__msg-content"><div class="hd-chat__msg-bubble hd-chat__typing">' +
            '<span></span><span></span><span></span></div></div></div>';
          messages.insertAdjacentHTML('beforeend', typingHtml);
          messages.scrollTop = messages.scrollHeight;

          setTimeout(function() {
            var typing = document.getElementById('typing-indicator');
            if (typing) typing.remove();
            
            var botHtml = '<div class="hd-chat__msg hd-chat__msg--bot">' +
              '<div class="hd-chat__msg-avatar"><svg width="16" height="16" viewBox="0 0 24 24"><use href="#zap" /></svg></div>' +
              '<div class="hd-chat__msg-content"><div class="hd-chat__msg-bubble">' +
              'Thank you for your question. This assistant will be connected to an AI service soon. ' +
              'In the meantime, you can create a ticket for your department to get help from our team.' +
              '</div></div></div>';
            messages.insertAdjacentHTML('beforeend', botHtml);
            messages.scrollTop = messages.scrollHeight;
          }, 1200);

          return false;
        }
      `}</script>
    </div>
  )
}

export default ChatbotView

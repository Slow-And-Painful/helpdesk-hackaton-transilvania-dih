/// <reference types="@kitajs/html/htmx.d.ts" />

import Icon from "$templates/components/Icon"

type Props = {
  placeholder?: string
}

const ChatPrompt = ({ placeholder = "Ask about public procurement..." }: Props) => (
  <div class="hd-chat__input-container">
    <textarea
      name="message"
      id="hd-chat-input"
      class="hd-chat__input"
      placeholder={placeholder}
      rows="1"
      onkeydown="handleChatKeydown(event)"
      {...{ oninput: "autoResizeTextarea(this)" }}
    ></textarea>
    <button type="submit" class="hd-chat__send" id="hd-chat-send">
      <Icon name="arrow-up" size={18} />
    </button>
  </div>
)

export default ChatPrompt

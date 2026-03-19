/// <reference types="@kitajs/html/htmx.d.ts" />

import Icon from "$templates/components/Icon"

type Props = {
  label: string
  message: string
}

const ChatSuggestion = ({ label, message }: Props) => (
  <button
    class="hd-chat__suggestion"
    onclick="submitSuggestion(this)"
    data-message={message}
  >
    <Icon name="arrow-up-right" size={14} />
    <span>{label}</span>
  </button>
)

export default ChatSuggestion

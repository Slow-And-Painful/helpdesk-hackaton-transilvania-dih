/// <reference types="@kitajs/html/htmx.d.ts" />

import Icon from "$templates/components/Icon"
import { getPartialPath } from "$routers/website/utils"

type Props = {
  placeholder?: string
  departmentId?: number
}

const ChatPrompt = ({ placeholder = "Întreabă despre achiziții publice...", departmentId }: Props) => (
  <div class="hd-chat__input-container">
    <div class="hd-chat__input-toolbar">
      <button
        type="button"
        class="hd-chat__dept-switcher-btn"
        hx-get={getPartialPath("departments", "DEPARTMENT_SWITCHER")}
        hx-target="#modal"
        hx-swap="innerHTML"
      >
        <Icon name="grid" size={13} />
        <span>Departament</span>
      </button>
      <button
        type="button"
        class="hd-chat__dept-switcher-btn"
        id="hd-chat-folder-filter-btn"
        data-storage-key={departmentId ? `rag-folder-filter-${departmentId}` : undefined}
        hx-get={getPartialPath("departments", "RAG_FILTER_MODAL")}
        hx-target="#modal"
        hx-swap="innerHTML"
      >
        <Icon name="folder" size={13} />
        <span id="hd-chat-folder-filter-label">Foldere</span>
      </button>
    </div>
    <div class="hd-chat__input-row">
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
  </div>
)

export default ChatPrompt

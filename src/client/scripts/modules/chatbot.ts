declare global {
  interface Window {
    autoResizeTextarea: (el: HTMLTextAreaElement) => void
    handleChatKeydown: (e: KeyboardEvent) => void
    submitSuggestion: (btn: HTMLElement) => void
  }
}

window.autoResizeTextarea = (el: HTMLTextAreaElement) => {
  el.style.height = "auto"
  el.style.height = Math.min(el.scrollHeight, 160) + "px"

  const btn = document.getElementById("hd-chat-send")
  if (!btn) return

  if (el.value.trim()) {
    btn.classList.add("hd-chat__send--active")
  } else {
    btn.classList.remove("hd-chat__send--active")
  }
}

window.handleChatKeydown = (e: KeyboardEvent) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault()
    ;(document.getElementById("hd-chat-form") as HTMLFormElement | null)?.requestSubmit()
  }
}

window.submitSuggestion = (btn: HTMLElement) => {
  const msg = btn.getAttribute("data-message")
  const input = document.getElementById("hd-chat-input") as HTMLTextAreaElement | null
  if (!input || !msg) return

  input.value = msg
  window.autoResizeTextarea(input)
  ;(document.getElementById("hd-chat-form") as HTMLFormElement | null)?.requestSubmit()
}

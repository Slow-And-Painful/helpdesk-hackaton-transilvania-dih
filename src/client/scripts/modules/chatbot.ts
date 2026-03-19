declare global {
  interface Window {
    autoResizeTextarea: (el: HTMLTextAreaElement) => void
    handleChatKeydown: (e: KeyboardEvent) => void
    submitSuggestion: (btn: HTMLElement) => void
    handleHelpdeskChat: (e: SubmitEvent) => boolean
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
    document.getElementById("hd-chat-form")?.requestSubmit()
  }
}

window.submitSuggestion = (btn: HTMLElement) => {
  const msg = btn.getAttribute("data-message")
  const input = document.getElementById("hd-chat-input") as HTMLTextAreaElement | null
  if (!input || !msg) return

  input.value = msg
  window.autoResizeTextarea(input)
  document.getElementById("hd-chat-form")?.requestSubmit()
}

window.handleHelpdeskChat = (e: SubmitEvent): boolean => {
  e.preventDefault()

  const input = document.getElementById("hd-chat-input") as HTMLTextAreaElement | null
  const messages = document.getElementById("hd-chat-messages")
  const welcome = document.getElementById("hd-chat-welcome")

  if (!input || !messages) return false

  const message = input.value.trim()
  if (!message) return false

  if (welcome) welcome.style.display = "none"
  messages.classList.add("hd-chat__messages--active")

  const escaped = message
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")

  const userHtml =
    `<div class="hd-chat__msg hd-chat__msg--user">` +
    `<div class="hd-chat__msg-content">` +
    `<div class="hd-chat__msg-bubble">${escaped}</div>` +
    `</div></div>`
  messages.insertAdjacentHTML("beforeend", userHtml)

  input.value = ""
  input.style.height = "auto"
  document.getElementById("hd-chat-send")?.classList.remove("hd-chat__send--active")
  messages.scrollTop = messages.scrollHeight

  const typingHtml =
    `<div class="hd-chat__msg hd-chat__msg--bot" id="typing-indicator">` +
    `<div class="hd-chat__msg-avatar"><svg width="16" height="16" viewBox="0 0 24 24"><use href="#zap" /></svg></div>` +
    `<div class="hd-chat__msg-content"><div class="hd-chat__msg-bubble hd-chat__typing">` +
    `<span></span><span></span><span></span></div></div></div>`
  messages.insertAdjacentHTML("beforeend", typingHtml)
  messages.scrollTop = messages.scrollHeight

  setTimeout(() => {
    document.getElementById("typing-indicator")?.remove()

    const botHtml =
      `<div class="hd-chat__msg hd-chat__msg--bot">` +
      `<div class="hd-chat__msg-avatar"><svg width="16" height="16" viewBox="0 0 24 24"><use href="#zap" /></svg></div>` +
      `<div class="hd-chat__msg-content"><div class="hd-chat__msg-bubble">` +
      `Thank you for your question. This assistant will be connected to an AI service soon. ` +
      `In the meantime, you can create a ticket for your department to get help from our team.` +
      `</div></div></div>`
    messages.insertAdjacentHTML("beforeend", botHtml)
    messages.scrollTop = messages.scrollHeight
  }, 1200)

  return false
}

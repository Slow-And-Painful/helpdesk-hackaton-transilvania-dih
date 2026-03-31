declare global {
  interface Window {
    autoResizeTextarea: (el: HTMLTextAreaElement) => void
    handleChatKeydown: (e: KeyboardEvent) => void
    submitSuggestion: (btn: HTMLElement) => void
    onChatBeforeRequest: () => void
    onChatAfterRequest: (event: Event) => void
    initChatScroll: () => void
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

window.onChatBeforeRequest = () => {
  document.getElementById("hd-chat-welcome")?.style.setProperty("display", "none")
  const msgs = document.getElementById("hd-chat-messages")
  const input = document.getElementById("hd-chat-input") as HTMLTextAreaElement | null
  if (!msgs) return
  msgs.classList.add("hd-chat__messages--active")

  if (input?.value.trim()) {
    const userMsg = document.createElement("div")
    userMsg.className = "hd-chat__msg hd-chat__msg--user"
    userMsg.innerHTML = `<div class="hd-chat__msg-content"><div class="hd-chat__msg-bubble">${input.value.trim().replace(/</g, "&lt;").replace(/>/g, "&gt;")}</div></div>`
    msgs.appendChild(userMsg)
    input.value = ""
    input.style.height = "auto"
    document.getElementById("hd-chat-send")?.classList.remove("hd-chat__send--active")
  }

  const indicator = document.createElement("div")
  indicator.id = "hd-chat-typing"
  indicator.className = "hd-chat__msg hd-chat__msg--bot"
  indicator.innerHTML =
    '<div class="hd-chat__msg-avatar"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg></div><div class="hd-chat__msg-content"><div class="hd-chat__typing"><span></span><span></span><span></span></div></div>'
  msgs.appendChild(indicator)
  msgs.scrollTop = msgs.scrollHeight
}

window.onChatAfterRequest = (event: Event) => {
  document.getElementById("hd-chat-typing")?.remove()
  const form = event.currentTarget as HTMLFormElement
  const xhr = (event as CustomEvent).detail?.xhr as XMLHttpRequest | undefined
  const pushUrl = xhr?.getResponseHeader("HX-Push-Url")
  const chatId = pushUrl
    ? new URLSearchParams(pushUrl.split("?")[1] ?? "").get("chat")
    : new URLSearchParams(window.location.search).get("chat")
  const hiddenInput = form.querySelector<HTMLInputElement>("[name=chatId]")
  if (hiddenInput && chatId) hiddenInput.value = chatId
  const msgs = document.getElementById("hd-chat-messages")
  if (msgs) msgs.scrollTop = msgs.scrollHeight
}

window.initChatScroll = () => {
  const msgs = document.getElementById("hd-chat-messages")
  if (msgs) msgs.scrollTop = msgs.scrollHeight
}

window.submitSuggestion = (btn: HTMLElement) => {
  const msg = btn.getAttribute("data-message")
  const input = document.getElementById("hd-chat-input") as HTMLTextAreaElement | null
  if (!input || !msg) return

  input.value = msg
  window.autoResizeTextarea(input)
  ;(document.getElementById("hd-chat-form") as HTMLFormElement | null)?.requestSubmit()
}

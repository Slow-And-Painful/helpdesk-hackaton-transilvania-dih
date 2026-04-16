import MarkdownIt from "markdown-it"

const md = new MarkdownIt({ breaks: true, linkify: true, html: true })

declare global {
  interface Window {
    autoResizeTextarea: (el: HTMLTextAreaElement) => void
    handleChatKeydown: (e: KeyboardEvent) => void
    submitSuggestion: (btn: HTMLElement) => void
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

function renderDocMarkers(html: string, docs: Array<{ id: number; name: string }>): string {
  return html.replace(/\[DOC:(\d+)\]/g, (_, id) => {
    const doc = docs.find(d => String(d.id) === id)
    const label = doc ? doc.name.replace(/</g, "&lt;").replace(/>/g, "&gt;") : "Document"
    const url = `/partials/departments/document-download/${id}`
    return `<a href="${url}" class="hd-chat__doc-ref" target="_blank">📄 ${label}</a>`
  })
}

type TicketCta = { deptId: number | null; message: string }

function extractTicketCta(markdown: string): TicketCta | null {
  const match = markdown.match(/\[CTA:CREATE_TICKET:(\d+)?:([^\]]*)\]/)
  if (!match) return null
  return {
    deptId: match[1] ? parseInt(match[1], 10) : null,
    message: match[2] ?? "",
  }
}

function stripCtaMarkers(markdown: string): string {
  return markdown.replace(/\s*\[CTA:CREATE_TICKET:[^\]]*\]/g, "")
}

function extractError(markdown: string): string | null {
  const match = markdown.match(/\[ERROR:([^\]]*)\]/)
  return match ? match[1] : null
}

function stripErrorMarkers(markdown: string): string {
  return markdown.replace(/\s*\[ERROR:[^\]]*\]/g, "")
}

function appendErrorBox(msgEl: HTMLElement, message: string): void {
  const existing = msgEl.querySelector(".hd-chat__error-box")
  if (existing) return

  const box = document.createElement("div")
  box.className = "hd-chat__error-box"
  box.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
    <span>${message.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</span>`

  const content = msgEl.querySelector(".hd-chat__msg-content")
  if (content) content.appendChild(box)
}

function appendCreateTicketButton(msgEl: HTMLElement, cta: TicketCta): void {
  const existing = msgEl.querySelector(".hd-chat__ticket-cta")
  if (existing) return

  const btn = document.createElement("button")
  btn.className = "hd-chat__ticket-cta"
  btn.type = "button"
  btn.textContent = "Deschide tichet de suport"

  const url = cta.deptId != null
    ? `/partials/tickets/create-modal?departmentId=${cta.deptId}${cta.message ? `&subject=${encodeURIComponent(cta.message)}` : ""}`
    : "/partials/tickets/create-modal"

  btn.setAttribute("hx-get", url)
  btn.setAttribute("hx-target", "#modal")
  btn.setAttribute("hx-swap", "beforeend")

  const content = msgEl.querySelector(".hd-chat__msg-content")
  if (content) {
    content.appendChild(btn)
    // @ts-expect-error htmx is loaded globally
    if (typeof htmx !== "undefined") htmx.process(btn)
  }
}

function addChatToSidebar(chatUuid: string): void {
  const liHtml = `<li class="sidebar-chats__item sidebar-chats__item--active" data-chat-label="Conversație nouă">
    <a class="sidebar-chats__item-link" href="/dashboard/?chat=${chatUuid}" hx-boost="true">
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
      <span class="sidebar-chats__item-label">Conversație nouă</span>
    </a>
  </li>`

  let list = document.querySelector<HTMLUListElement>(".sidebar-chats__list")

  if (!list) {
    // First chat ever — the sidebar-chats section doesn't exist yet, insert it
    const sidebar = document.getElementById("sidebar")
    if (!sidebar) return

    const section = document.createElement("div")
    section.className = "sidebar-chats"
    section.innerHTML = `<div class="sidebar-chats__header">
      <span class="sidebar-chats__label sidebar__menu-item-label">Conversații</span>
    </div>
    <ul class="sidebar-chats__list">${liHtml}</ul>`

    // Insert before the regular menu (sidebar__menu) or before footer
    const menu = sidebar.querySelector(".sidebar__menu") ?? sidebar.querySelector(".sidebar__footer")
    if (menu) sidebar.insertBefore(section, menu)
    else sidebar.appendChild(section)
    return
  }

  // Remove active class from any current active item
  list.querySelectorAll(".sidebar-chats__item--active").forEach(el => el.classList.remove("sidebar-chats__item--active"))

  const temp = document.createElement("ul")
  temp.innerHTML = liHtml
  const li = temp.firstElementChild
  if (li) list.prepend(li)
}

function appendBotMessage(): { bubble: HTMLElement; msgEl: HTMLElement } {
  const msgs = document.getElementById("hd-chat-messages")!
  const msgEl = document.createElement("div")
  msgEl.className = "hd-chat__msg hd-chat__msg--bot"
  msgEl.innerHTML =
    '<div class="hd-chat__msg-avatar"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg></div><div class="hd-chat__msg-content"><div class="hd-chat__msg-bubble hd-chat__msg-bubble--markdown hd-chat__msg-bubble--streaming"></div></div>'
  msgs.appendChild(msgEl)
  const bubble = msgEl.querySelector<HTMLElement>(".hd-chat__msg-bubble")!
  return { bubble, msgEl }
}

async function streamChat(form: HTMLFormElement) {
  const input = document.getElementById("hd-chat-input") as HTMLTextAreaElement | null
  const message = input?.value.trim()
  if (!message) return

  const hiddenInput = form.querySelector<HTMLInputElement>("[name=chatId]")
  const chatId = hiddenInput?.value ?? ""

  // Show user message + hide welcome
  document.getElementById("hd-chat-welcome")?.style.setProperty("display", "none")
  const msgs = document.getElementById("hd-chat-messages")!
  msgs.classList.add("hd-chat__messages--active")

  const userMsg = document.createElement("div")
  userMsg.className = "hd-chat__msg hd-chat__msg--user"
  userMsg.innerHTML = `<div class="hd-chat__msg-content"><div class="hd-chat__msg-bubble">${message.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</div></div>`
  msgs.appendChild(userMsg)

  if (input) {
    input.value = ""
    input.style.height = "auto"
    document.getElementById("hd-chat-send")?.classList.remove("hd-chat__send--active")
  }

  // Show typing indicator
  const indicator = document.createElement("div")
  indicator.id = "hd-chat-typing"
  indicator.className = "hd-chat__msg hd-chat__msg--bot"
  indicator.innerHTML =
    '<div class="hd-chat__msg-avatar"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg></div><div class="hd-chat__msg-content"><div class="hd-chat__typing"><span></span><span></span><span></span></div></div>'
  msgs.appendChild(indicator)
  msgs.scrollTop = msgs.scrollHeight

  try {
    const res = await fetch("/actions/chatbot/stream-message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, chatId: chatId || undefined }),
    })

    if (!res.ok || !res.body) {
      throw new Error("Stream request failed")
    }

    indicator.remove()
    const { bubble, msgEl } = appendBotMessage()

    const reader = res.body.getReader()
    const decoder = new TextDecoder()
    let rawMarkdown = ""
    let buffer = ""
    let currentEvent = "chunk"
    let docs: Array<{ id: number; name: string }> = []

    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      buffer += decoder.decode(value, { stream: true })
      const lines = buffer.split("\n")
      buffer = lines.pop() ?? ""

      for (const line of lines) {
        if (line.startsWith("event: ")) {
          currentEvent = line.slice(7).trim()
          continue
        }

        if (!line.startsWith("data: ")) continue

        const payload = line.slice(6)
        let parsed: unknown
        try {
          parsed = JSON.parse(payload)
        } catch {
          continue
        }

        if (currentEvent === "meta" && parsed && typeof parsed === "object" && "docs" in parsed) {
          const meta = parsed as { docs: Array<{ id: number; name: string }>; chatUuid?: string }
          docs = meta.docs
          if (meta.chatUuid && !chatId && hiddenInput) {
            hiddenInput.value = meta.chatUuid
            window.history.replaceState(null, "", `/dashboard/?chat=${meta.chatUuid}`)
            addChatToSidebar(meta.chatUuid)
          }
        } else if (currentEvent === "chunk" && typeof parsed === "string") {
          rawMarkdown += parsed
          const displayMarkdown = stripCtaMarkers(stripErrorMarkers(rawMarkdown))
          bubble.innerHTML = renderDocMarkers(md.render(displayMarkdown), docs)
          msgs.scrollTop = msgs.scrollHeight
        } else if (currentEvent === "done" && typeof parsed === "string" && parsed) {
          if (hiddenInput) {
            hiddenInput.value = parsed
            window.history.replaceState(null, "", `/dashboard/?chat=${parsed}`)
          }
        }
      }
    }

    bubble.classList.remove("hd-chat__msg-bubble--streaming")

    // After streaming is complete, check for CTA and ERROR markers
    const cta = extractTicketCta(rawMarkdown)
    if (cta) {
      appendCreateTicketButton(msgEl, cta)
    }

    const errorMsg = extractError(rawMarkdown)
    if (errorMsg) {
      appendErrorBox(msgEl, errorMsg)
    }

    msgs.scrollTop = msgs.scrollHeight
  } catch {
    indicator.remove()
    const msgs2 = document.getElementById("hd-chat-messages")!
    const errMsg = document.createElement("div")
    errMsg.className = "hd-chat__msg hd-chat__msg--bot"
    errMsg.innerHTML = `<div class="hd-chat__msg-content"><div class="hd-chat__msg-bubble">A apărut o eroare. Te rugăm să încerci din nou.</div></div>`
    msgs2.appendChild(errMsg)
  }
}

document.addEventListener("submit", (e) => {
  const form = (e.target as HTMLElement)?.closest?.("#hd-chat-form") as HTMLFormElement | null
  if (!form) return
  e.preventDefault()
  e.stopImmediatePropagation()
  streamChat(form)
})

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

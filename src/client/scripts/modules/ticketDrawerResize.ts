const STORAGE_KEY = "ticket-drawer-width"
const MAX_WIDTH_RATIO = 0.95

export const ticketDrawerStartEdgeResize = (e: MouseEvent) => {
  const panel = document.getElementById("ticket-drawer-panel")
  const handle = document.getElementById("ticket-drawer-edge-handle")
  if (!panel || !handle) return

  e.preventDefault()
  handle.classList.add("ticket-drawer__edge-handle--dragging")

  document.body.style.userSelect = "none"
  document.body.style.cursor = "col-resize"

  const startX = e.clientX
  const startWidth = panel.getBoundingClientRect().width

  const onMove = (moveEvent: MouseEvent) => {
    const delta = startX - moveEvent.clientX
    const minWidth = Math.round(window.innerWidth * 0.5)
    const maxWidth = Math.floor(window.innerWidth * MAX_WIDTH_RATIO)
    const newWidth = Math.min(Math.max(startWidth + delta, minWidth), maxWidth)
    panel.style.width = `${newWidth}px`
  }

  const onUp = () => {
    handle.classList.remove("ticket-drawer__edge-handle--dragging")
    document.body.style.userSelect = ""
    document.body.style.cursor = ""
    document.removeEventListener("mousemove", onMove)
    document.removeEventListener("mouseup", onUp)
    const finalWidth = panel.getBoundingClientRect().width
    try { localStorage.setItem(STORAGE_KEY, String(Math.round(finalWidth))) } catch {}
  }

  document.addEventListener("mousemove", onMove)
  document.addEventListener("mouseup", onUp)
}

export const restoreTicketDrawerWidth = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      const panel = document.getElementById("ticket-drawer-panel")
      if (panel) {
        const minWidth = Math.round(window.innerWidth * 0.5)
        const maxWidth = Math.floor(window.innerWidth * MAX_WIDTH_RATIO)
        const width = Math.min(Math.max(Number(saved), minWidth), maxWidth)
        panel.style.width = `${width}px`
      }
    }
    const savedCol = localStorage.getItem(COL_STORAGE_KEY)
    if (savedCol) {
      const col = document.getElementById("ticket-drawer-details-col")
      if (col) col.style.width = `${savedCol}px`
    }
    const msgs = document.getElementById("ticket-chat-messages")
    if (msgs) msgs.scrollTop = msgs.scrollHeight
  } catch {}
}

const COL_STORAGE_KEY = "ticket-drawer-col-width"
const COL_MIN_WIDTH = 200

export const ticketDrawerStartColResize = (e: MouseEvent) => {
  const col = document.getElementById("ticket-drawer-details-col")
  const body = document.getElementById("ticket-drawer-body")
  const handle = document.getElementById("ticket-drawer-col-resize-handle")
  if (!col || !body || !handle) return

  e.preventDefault()
  handle.classList.add("ticket-drawer__col-resize-handle--dragging")

  document.body.style.userSelect = "none"
  document.body.style.cursor = "col-resize"

  const startX = e.clientX
  const startWidth = col.getBoundingClientRect().width

  const onMove = (moveEvent: MouseEvent) => {
    const delta = moveEvent.clientX - startX
    const bodyWidth = body.getBoundingClientRect().width
    const maxWidth = Math.floor(bodyWidth * 0.7)
    const newWidth = Math.min(Math.max(startWidth + delta, COL_MIN_WIDTH), maxWidth)
    col.style.width = `${newWidth}px`
  }

  const onUp = () => {
    handle.classList.remove("ticket-drawer__col-resize-handle--dragging")
    document.body.style.userSelect = ""
    document.body.style.cursor = ""
    document.removeEventListener("mousemove", onMove)
    document.removeEventListener("mouseup", onUp)
    const finalWidth = col.getBoundingClientRect().width
    try { localStorage.setItem(COL_STORAGE_KEY, String(Math.round(finalWidth))) } catch {}
  }

  document.addEventListener("mousemove", onMove)
  document.addEventListener("mouseup", onUp)
}

window.ticketDrawerStartEdgeResize = ticketDrawerStartEdgeResize
window.ticketDrawerStartColResize = ticketDrawerStartColResize

window.ticketChatResize = (el: HTMLTextAreaElement) => {
  el.style.height = "auto"
  el.style.height = Math.min(el.scrollHeight, 120) + "px"
  const btn = document.getElementById("ticket-chat-send")
  if (!btn) return
  if (el.value.trim()) {
    btn.classList.add("ticket-drawer__chat-send--active")
  } else {
    btn.classList.remove("ticket-drawer__chat-send--active")
  }
}

window.ticketChatKeydown = (e: KeyboardEvent) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault()
    ;(document.getElementById("ticket-chat-form") as HTMLFormElement | null)?.requestSubmit()
  }
}

async function submitTicketChat(form: HTMLFormElement) {
  const input = document.getElementById("ticket-chat-input") as HTMLTextAreaElement | null
  const text = input?.value.trim()
  if (!text) return

  const ticketId = form.dataset.ticketId
  if (!ticketId) return

  // Clear input immediately
  if (input) {
    input.value = ""
    input.style.height = "auto"
  }
  document.getElementById("ticket-chat-send")?.classList.remove("ticket-drawer__chat-send--active")

  try {
    const res = await fetch("/actions/tickets/send-message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ticketId: parseInt(ticketId, 10), text }),
    })

    if (!res.ok) return

    const html = await res.text()
    const msgs = document.getElementById("ticket-chat-messages")
    if (!msgs) return

    document.getElementById("ticket-chat-empty")?.remove()

    const tmp = document.createElement("div")
    tmp.innerHTML = html
    while (tmp.firstChild) msgs.appendChild(tmp.firstChild)

    msgs.scrollTop = msgs.scrollHeight
  } catch {
    // silently fail — no disruptive error for chat
  }
}

document.addEventListener("submit", (e) => {
  const form = (e.target as HTMLElement)?.closest?.("#ticket-chat-form") as HTMLFormElement | null
  if (!form) return
  e.preventDefault()
  e.stopImmediatePropagation()
  submitTicketChat(form)
})

import { onSseMessage } from "./sse"

onSseMessage((raw) => {
  const data = raw as { type: string; ticketId: number; messageHtml: string }
  if (data?.type !== "TICKET_MESSAGE") return

  const msgs = document.getElementById("ticket-chat-messages")
  if (!msgs) return

  const form = document.getElementById("ticket-chat-form") as HTMLFormElement | null
  if (!form || form.dataset.ticketId !== String(data.ticketId)) return

  document.getElementById("ticket-chat-empty")?.remove()

  const tmp = document.createElement("div")
  tmp.innerHTML = data.messageHtml
  while (tmp.firstChild) msgs.appendChild(tmp.firstChild)

  msgs.scrollTop = msgs.scrollHeight
})

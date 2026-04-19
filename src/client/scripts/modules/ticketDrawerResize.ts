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

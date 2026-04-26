const STORAGE_KEY = "user-drawer-width"
const MAX_WIDTH_RATIO = 0.95
const MIN_WIDTH_RATIO = 0.3

export const userDrawerStartEdgeResize = (e: MouseEvent) => {
  const panel = document.getElementById("user-drawer-panel")
  const handle = document.getElementById("user-drawer-edge-handle")
  if (!panel || !handle) return

  e.preventDefault()
  handle.classList.add("ticket-drawer__edge-handle--dragging")

  document.body.style.userSelect = "none"
  document.body.style.cursor = "col-resize"

  const startX = e.clientX
  const startWidth = panel.getBoundingClientRect().width

  const onMove = (moveEvent: MouseEvent) => {
    const delta = startX - moveEvent.clientX
    const minWidth = Math.round(window.innerWidth * MIN_WIDTH_RATIO)
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

export const restoreUserDrawerWidth = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      const panel = document.getElementById("user-drawer-panel")
      if (panel) {
        const minWidth = Math.round(window.innerWidth * MIN_WIDTH_RATIO)
        const maxWidth = Math.floor(window.innerWidth * MAX_WIDTH_RATIO)
        const width = Math.min(Math.max(Number(saved), minWidth), maxWidth)
        panel.style.width = `${width}px`
      }
    }
  } catch {}
}

window.userDrawerStartEdgeResize = userDrawerStartEdgeResize

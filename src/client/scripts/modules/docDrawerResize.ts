const STORAGE_KEY = "doc-drawer-preview-width"
const DRAWER_STORAGE_KEY = "doc-drawer-width"
const MIN_WIDTH = 180
const MAX_RATIO = 0.7
const DRAWER_MIN_WIDTH = 400

export const docDrawerStartResize = (e: MouseEvent) => {
  const previewCol = document.getElementById("doc-drawer-preview-col")
  const body = document.getElementById("doc-drawer-body")
  const handle = document.getElementById("doc-drawer-resize-handle")
  if (!previewCol || !body || !handle) return

  e.preventDefault()
  handle.classList.add("doc-drawer__resize-handle--dragging")

  // Cover the PDF embed so it doesn't steal mouse events during drag
  const cover = document.createElement("div")
  cover.className = "doc-drawer__drag-cover"
  previewCol.appendChild(cover)

  // Also block pointer events on the whole body so iframes/embeds don't interfere
  document.body.style.userSelect = "none"
  document.body.style.cursor = "col-resize"

  const startX = e.clientX
  const startWidth = previewCol.getBoundingClientRect().width

  const onMove = (moveEvent: MouseEvent) => {
    const delta = moveEvent.clientX - startX
    const bodyWidth = body.getBoundingClientRect().width
    const maxWidth = Math.floor(bodyWidth * MAX_RATIO)
    const newWidth = Math.min(Math.max(startWidth + delta, MIN_WIDTH), maxWidth)
    previewCol.style.width = `${newWidth}px`
  }

  const onUp = () => {
    handle.classList.remove("doc-drawer__resize-handle--dragging")
    cover.remove()
    document.body.style.userSelect = ""
    document.body.style.cursor = ""
    document.removeEventListener("mousemove", onMove)
    document.removeEventListener("mouseup", onUp)
    const finalWidth = previewCol.getBoundingClientRect().width
    try { localStorage.setItem(STORAGE_KEY, String(Math.round(finalWidth))) } catch {}
  }

  document.addEventListener("mousemove", onMove)
  document.addEventListener("mouseup", onUp)
}

export const docDrawerStartEdgeResize = (e: MouseEvent) => {
  const panel = document.getElementById("doc-drawer-panel")
  const handle = document.getElementById("doc-drawer-edge-handle")
  const previewCol = document.getElementById("doc-drawer-preview-col")
  if (!panel || !handle) return

  e.preventDefault()
  handle.classList.add("doc-drawer__edge-handle--dragging")

  // Cover the PDF embed so it doesn't steal mouse events
  let cover: HTMLDivElement | null = null
  if (previewCol) {
    cover = document.createElement("div")
    cover.className = "doc-drawer__drag-cover"
    previewCol.appendChild(cover)
  }

  document.body.style.userSelect = "none"
  document.body.style.cursor = "col-resize"

  const startX = e.clientX
  const startWidth = panel.getBoundingClientRect().width

  const onMove = (moveEvent: MouseEvent) => {
    // Panel is anchored to the right — moving left increases width
    const delta = startX - moveEvent.clientX
    const maxWidth = window.innerWidth
    const newWidth = Math.min(Math.max(startWidth + delta, DRAWER_MIN_WIDTH), maxWidth)
    panel.style.width = `${newWidth}px`
  }

  const onUp = () => {
    handle.classList.remove("doc-drawer__edge-handle--dragging")
    cover?.remove()
    document.body.style.userSelect = ""
    document.body.style.cursor = ""
    document.removeEventListener("mousemove", onMove)
    document.removeEventListener("mouseup", onUp)
    const finalWidth = panel.getBoundingClientRect().width
    try { localStorage.setItem(DRAWER_STORAGE_KEY, String(Math.round(finalWidth))) } catch {}
  }

  document.addEventListener("mousemove", onMove)
  document.addEventListener("mouseup", onUp)
}

export const restoreDocDrawerWidth = () => {
  try {
    const savedCol = localStorage.getItem(STORAGE_KEY)
    if (savedCol) {
      const col = document.getElementById("doc-drawer-preview-col")
      if (col) col.style.width = `${savedCol}px`
    }
    const savedDrawer = localStorage.getItem(DRAWER_STORAGE_KEY)
    if (savedDrawer) {
      const panel = document.getElementById("doc-drawer-panel")
      if (panel) panel.style.width = `${savedDrawer}px`
    }
  } catch {}
}

window.docDrawerStartResize = docDrawerStartResize
window.docDrawerStartEdgeResize = docDrawerStartEdgeResize

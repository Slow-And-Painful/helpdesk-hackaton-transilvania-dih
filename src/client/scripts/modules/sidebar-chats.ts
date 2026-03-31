declare global {
  interface Window {
    filterSidebarChats: (query: string) => void
  }
}

window.filterSidebarChats = (query: string) => {
  const normalized = query.trim().toLowerCase()
  const items = document.querySelectorAll<HTMLLIElement>(".sidebar-chats__item[data-chat-label]")

  items.forEach((item) => {
    const label = (item.getAttribute("data-chat-label") ?? "").toLowerCase()
    const hidden = normalized !== "" && !label.includes(normalized)
    item.classList.toggle("sidebar-chats__item--hidden", hidden)
  })
}

// Re-apply filter after HTMX swaps (e.g. OOB sidebar update)
document.addEventListener("htmx:afterSettle", () => {
  const input = document.getElementById("sidebar-chats-search") as HTMLInputElement | null
  if (input) {
    window.filterSidebarChats(input.value)
  }
})

export {}

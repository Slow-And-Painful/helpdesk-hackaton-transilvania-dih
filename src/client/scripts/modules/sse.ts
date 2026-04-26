const SSE_ENDPOINT = "/sse"
const RECONNECT_DELAY = 5000

type SseHandler = (data: unknown) => void
const handlers: SseHandler[] = []

let es: EventSource | null = null

function connect() {
  es = new EventSource(SSE_ENDPOINT)

  es.onmessage = (event: MessageEvent) => {
    let data: unknown
    try {
      data = JSON.parse(event.data)
    } catch {
      return
    }
    handlers.forEach((h) => h(data))
  }

  es.onerror = () => {
    es?.close()
    es = null
    setTimeout(connect, RECONNECT_DELAY)
  }
}

export function onSseMessage(handler: SseHandler) {
  handlers.push(handler)
}

document.addEventListener("DOMContentLoaded", connect)

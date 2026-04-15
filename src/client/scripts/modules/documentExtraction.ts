/**
 * SSE-based real-time updates for document text extraction.
 *
 * Connects to /sse and listens for DOCUMENT_EXTRACTION_STATUS events.
 * When extraction finishes (done/failed), it reloads the document detail
 * drawer partial so the UI reflects the new extraction state without a
 * manual refresh.
 */

const SSE_ENDPOINT = "/sse"

function connectDocumentExtractionSSE() {
  const es = new EventSource(SSE_ENDPOINT)

  es.onmessage = (event: MessageEvent) => {
    try {
      const data = JSON.parse(event.data) as {
        type: string
        documentId: number
        status: "extracting" | "done" | "failed"
        extractedText?: string
      }

      if (data?.type !== "DOCUMENT_EXTRACTION_STATUS") {
        return
      }

      const { documentId, status } = data

      // "extracting" is already shown optimistically by the server response
      // when the user triggers extraction, so skip it here.
      if (status === "extracting") {
        return
      }

      // Find the open drawer for this document
      const drawerEl = document.querySelector<HTMLElement>(
        `[data-document-drawer="${documentId}"]`,
      )
      if (!drawerEl) {
        return
      }

      const partialUrl = drawerEl.dataset["partialUrl"]
      if (!partialUrl) {
        return
      }

      // Target only the form element — avoids re-rendering the whole drawer
      // which would cause the close/open animation glitch
      const formId = `update-document-form-${documentId}`
      const formEl = document.getElementById(formId)
      if (!formEl) {
        return
      }

      window.htmx.ajax("get", partialUrl, {
        target: `#${formId}`,
        swap: "outerHTML",
      })
    } catch {
      // Ignore parse errors
    }
  }

  es.onerror = () => {
    es.close()
    setTimeout(connectDocumentExtractionSSE, 5000)
  }
}

document.addEventListener("DOMContentLoaded", () => {
  connectDocumentExtractionSSE()
})

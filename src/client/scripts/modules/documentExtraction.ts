/**
 * SSE-based real-time updates for document text extraction.
 *
 * Connects to /sse and listens for DOCUMENT_EXTRACTION_STATUS events.
 * When extraction finishes (done/failed), it reloads the document detail
 * drawer partial so the UI reflects the new extraction state without a
 * manual refresh.
 */

import { onSseMessage } from "./sse"

onSseMessage((raw) => {
  const data = raw as { type: string; documentId: number; status: "extracting" | "done" | "failed" }
  if (data?.type !== "DOCUMENT_EXTRACTION_STATUS") return

  const { documentId, status } = data
  if (status === "extracting") return

  const drawerEl = document.querySelector<HTMLElement>(`[data-document-drawer="${documentId}"]`)
  if (!drawerEl) return

  const partialUrl = drawerEl.dataset["partialUrl"]
  if (!partialUrl) return

  const formId = `update-document-form-${documentId}`
  if (!document.getElementById(formId)) return

  window.htmx.ajax("get", partialUrl, {
    target: `#${formId}`,
    swap: "outerHTML",
  })
})

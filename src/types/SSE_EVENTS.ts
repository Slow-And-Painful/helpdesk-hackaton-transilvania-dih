export type SseEvents =
  | {
      type: "DOCUMENT_EXTRACTION_STATUS"
      documentId: number
      status: "extracting" | "done" | "failed"
      extractedText?: string
    }
  | {
      type: "TICKET_MESSAGE"
      ticketId: number
      messageHtml: string
    }

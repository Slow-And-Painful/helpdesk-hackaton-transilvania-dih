/// <reference types="@kitajs/html/htmx.d.ts" />

import { RAGDocument } from "$services/RAGDocumentsService"
import Icon from "$templates/components/Icon"
import UpdateDocumentForm from "./UpdateDocumentForm"

type Props = {
  document: RAGDocument
  pdfUrl: string
}

export const documentDetailDrawerId = "document-detail-drawer"

export default function DocumentDetailDrawer({ document, pdfUrl }: Props) {
  return (
    <div id={documentDetailDrawerId} class="ticket-drawer is-open">
      <div
        class="ticket-drawer__overlay"
        onclick={`document.getElementById('${documentDetailDrawerId}').remove()`}
      />
      <div class="ticket-drawer__panel doc-drawer__panel">
        <div class="ticket-drawer__header">
          <h2 class="ticket-drawer__title">Document Details</h2>
          <button
            type="button"
            class="ticket-drawer__close"
            onclick={`document.getElementById('${documentDetailDrawerId}').remove()`}
          >
            <Icon name="x" size={18} />
          </button>
        </div>

        <div class="ticket-drawer__body">
          <div class="doc-drawer__preview">
            <embed
              src={pdfUrl}
              type="application/pdf"
              class="doc-drawer__pdf"
            />
          </div>

          <div class="ticket-drawer__divider" />

          <UpdateDocumentForm
            document={document}
            values={{ name: document.name, aiDescription: document.aiDescription }}
            initialValues={{ name: document.name, aiDescription: document.aiDescription }}
            errors={{}}
          />
        </div>
      </div>
    </div>
  )
}

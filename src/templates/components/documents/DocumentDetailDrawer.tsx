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
    <div id={documentDetailDrawerId} class="ticket-drawer is-open" data-document-drawer={document.id.toString()} data-partial-url={`/partials/departments/document-form/${document.id}`}>
      <div
        class="ticket-drawer__overlay"
        onclick={`document.getElementById('${documentDetailDrawerId}').remove()`}
      />
      <div class="ticket-drawer__panel doc-drawer__panel relative" id="doc-drawer-panel">
        <div
          class="doc-drawer__edge-handle"
          id="doc-drawer-edge-handle"
          onmousedown="window.docDrawerStartEdgeResize(event)"
        />
        <div class="ticket-drawer__header">
          <h2 class="ticket-drawer__title" safe>{document.name}</h2>
          <button
            type="button"
            class="ticket-drawer__close"
            onclick={`document.getElementById('${documentDetailDrawerId}').remove()`}
          >
            <Icon name="x" size={18} />
          </button>
        </div>

        <div class="doc-drawer__body" id="doc-drawer-body">
          <div class="doc-drawer__preview-col" id="doc-drawer-preview-col">
            <div class="doc-drawer__preview">
              <embed
                src={pdfUrl}
                type="application/pdf"
                class="doc-drawer__pdf"
              />
            </div>
          </div>

          <div
            class="doc-drawer__resize-handle"
            id="doc-drawer-resize-handle"
            onmousedown="window.docDrawerStartResize(event)"
          />

          <div class="doc-drawer__form-col">
            <UpdateDocumentForm
              document={document}
              values={{ name: document.name, aiDescription: document.aiDescription, extractedText: document.extractedText }}
              initialValues={{ name: document.name, aiDescription: document.aiDescription, extractedText: document.extractedText }}
              errors={{}}
              showExtractedText
            />
          </div>
        </div>
      </div>
    </div>
  )
}

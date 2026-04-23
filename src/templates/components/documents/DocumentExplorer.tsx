/// <reference types="@kitajs/html/htmx.d.ts" />

import { RAGDocument } from "$services/RAGDocumentsService"
import { DocumentFolderSchema } from "$dbSchemas/DocumentFolders"
import { getPartialPath } from "$routers/website/utils"
import Icon from "$templates/components/Icon"

export type BreadcrumbFolder = { id: number; name: string }

type Props = {
  folders: DocumentFolderSchema[]
  documents: RAGDocument[]
  breadcrumb: BreadcrumbFolder[]
  // When true, also OOB-swap the breadcrumb element (used on navigation, not initial render)
  oobBreadcrumb?: boolean
}

export const documentExplorerId = "document-explorer"
export const documentExplorerBreadcrumbId = "document-explorer-breadcrumb"

export const ExplorerBreadcrumb = ({ breadcrumb, oob }: { breadcrumb: BreadcrumbFolder[]; oob?: boolean }) => (
  <nav
    id={documentExplorerBreadcrumbId}
    class="flex items-center gap-1 text-sm text-gray-400 min-h-[24px]"
    {...oob ? { "hx-swap-oob": "outerHTML" } : {}}
  >
    {breadcrumb.map((item, i) => {
      const isLast = i === breadcrumb.length - 1
      return (
        <>
          {isLast ? (
            <span class="text-white font-roboto-medium" safe>{item.name}</span>
          ) : (
            <button
              type="button"
              class="hover:text-white transition-colors"
              hx-get={getPartialPath("departments", "FOLDER_CONTENTS", { folderId: item.id })}
              hx-target={`#${documentExplorerId}`}
              hx-swap="outerHTML"
              safe
            >
              {item.name}
            </button>
          )}
          {!isLast && <span class="text-gray-600">/</span>}
        </>
      )
    })}
  </nav>
)

const DocumentExplorer = ({ folders, documents, breadcrumb, oobBreadcrumb }: Props) => {
  const isEmpty = folders.length === 0 && documents.length === 0
  const currentFolderId = breadcrumb[breadcrumb.length - 1]?.id

  return (
    <>
      {oobBreadcrumb && <ExplorerBreadcrumb breadcrumb={breadcrumb} oob />}

      <div
        id={documentExplorerId}
        class="document-explorer"
        data-folder-id={currentFolderId?.toString()}
      >
        {isEmpty ? (
          <div class="document-explorer__empty">
            <Icon name="folder-open" size={40} class="text-gray-500" />
            <p class="text-gray-500 text-sm mt-2">Acest dosar este gol</p>
          </div>
        ) : (
          <div class="document-explorer__grid">
            {folders.map((folder) => (
              <button
                type="button"
                class="document-explorer__item document-explorer__item--folder"
                hx-get={getPartialPath("departments", "FOLDER_CONTENTS", { folderId: folder.id })}
                hx-target={`#${documentExplorerId}`}
                hx-swap="outerHTML"
                title={folder.name}
              >
                <Icon name="folder" size={40} />
                <span class="document-explorer__label" safe>{folder.name}</span>
              </button>
            ))}

            {documents.map((doc) => (
              <button
                type="button"
                class="document-explorer__item document-explorer__item--document"
                hx-get={getPartialPath("departments", "DOCUMENT_DETAIL", { documentId: doc.id })}
                hx-target="#drawer"
                hx-swap="innerHTML"
                title={doc.name}
              >
                <Icon name="file-text" size={40} />
                <span class="document-explorer__label" safe>{doc.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default DocumentExplorer

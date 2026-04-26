import Modal from "$templates/components/Modal"
import Icon from "$templates/components/Icon"
import { getPartialPath } from "$routers/website/utils"
import type { DocumentFolder } from "$services/DocumentFoldersService"

export type RagFilterBreadcrumb = { id: number; name: string }

type ContentsProps = {
  folders: DocumentFolder[]
  breadcrumb: RagFilterBreadcrumb[]
  departmentId: number
}

type ModalProps = ContentsProps & {
  storageKey: string
}

export const ragFilterModalId = "rag-filter-modal"
export const ragFilterContentsId = "rag-filter-contents"

export const RagFolderFilterContents = ({ folders, breadcrumb }: ContentsProps) => (
  <div id={ragFilterContentsId} class="rag-filter__body">
    <nav class="rag-filter__breadcrumb">
      {breadcrumb.map((item, i) => {
        const isLast = i === breadcrumb.length - 1
        return (
          <>
            {isLast ? (
              <span class="rag-filter__breadcrumb-current" safe>{item.name}</span>
            ) : (
              <button
                type="button"
                class="rag-filter__breadcrumb-btn"
                hx-get={getPartialPath("departments", "RAG_FILTER_FOLDER_CONTENTS", { folderId: item.id })}
                hx-target={`#${ragFilterContentsId}`}
                hx-swap="outerHTML"
                safe
              >
                {item.name}
              </button>
            )}
            {!isLast && <Icon name="chevron-right" size={12} class="rag-filter__breadcrumb-sep" />}
          </>
        )
      })}
    </nav>

    <div class="rag-filter__list">
      {folders.length === 0 ? (
        <p class="rag-filter__empty">Nu există subfoldere.</p>
      ) : (
        folders.map((folder) => (
          <div class="rag-filter__row">
            <label class="rag-filter__check-label">
              <input
                type="checkbox"
                class="checkbox"
                name="ragFolderId"
                value={String(folder.id)}
              />
              <div class="checkbox__box shrink-0" tabindex={0}>
                <div class="checkbox__box-icon">
                  <Icon name="check" size={10} />
                </div>
              </div>
              <span class="rag-filter__folder-icon">
                <Icon name="folder" size={14} />
              </span>
              <span class="rag-filter__name" safe>{folder.name}</span>
            </label>
            {folder.children && folder.children.length > 0 && (
              <button
                type="button"
                class="rag-filter__drill-btn"
                hx-get={getPartialPath("departments", "RAG_FILTER_FOLDER_CONTENTS", { folderId: folder.id })}
                hx-target={`#${ragFilterContentsId}`}
                hx-swap="outerHTML"
                title="Navighează în folder"
              >
                <Icon name="chevron-right" size={14} />
              </button>
            )}
          </div>
        ))
      )}
    </div>
  </div>
)

export default function RagFolderFilterModal({ folders, breadcrumb, departmentId, storageKey }: ModalProps) {
  return (
    <Modal
      id={ragFilterModalId}
      isOpen={true}
      size="sm"
      title={<span>Filtrează după folder</span>}
      footer={
        <button
          type="button"
          class="btn btn--primary w-full"
          onclick={`applyRagFolderFilter('${ragFilterModalId}', '${storageKey}')`}
        >
          Aplică filtrele
        </button>
      }
    >
      <RagFolderFilterContents
        folders={folders}
        breadcrumb={breadcrumb}
        departmentId={departmentId}
      />
    </Modal>
  )
}

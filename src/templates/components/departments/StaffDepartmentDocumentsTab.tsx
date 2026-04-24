/// <reference types="@kitajs/html/htmx.d.ts" />

import { RAGDocument } from "$services/RAGDocumentsService"
import { DocumentFolderSchema } from "$dbSchemas/DocumentFolders"
import Button from "$templates/components/Button"
import DocumentExplorer, { ExplorerBreadcrumb, BreadcrumbFolder } from "$templates/components/documents/DocumentExplorer"

type Props = {
  folders: DocumentFolderSchema[]
  documents: RAGDocument[]
  breadcrumb: BreadcrumbFolder[]
}

const StaffDepartmentDocumentsTab = ({ folders, documents, breadcrumb }: Props) => {
  return (
    <div class="flex flex-col gap-y-4">
      <div class="flex items-center justify-between gap-3">
        <ExplorerBreadcrumb breadcrumb={breadcrumb} />
        <div class="flex items-center gap-2">
          <Button
            size="sm"
            icon="folder-plus"
            iconPosition="right"
            preset="secondary"
            spinner={false}
            onclick={`
              const folderId = document.getElementById('document-explorer')?.dataset.folderId;
              if (!folderId) return;
              htmx.ajax('GET', '/partials/departments/create-folder-modal?parentFolderId=' + folderId, { target: '#modal', swap: 'beforeend' });
            `}
          >
            Folder nou
          </Button>
          <Button
            size="sm"
            icon="upload"
            iconPosition="right"
            spinner={false}
            onclick={`
              const folderId = document.getElementById('document-explorer')?.dataset.folderId;
              htmx.ajax('GET', '/partials/departments/upload-document-modal' + (folderId ? '?folderId=' + folderId : ''), { target: '#modal', swap: 'beforeend' });
            `}
          >
            Încarcă Document
          </Button>
        </div>
      </div>

      <DocumentExplorer
        folders={folders}
        documents={documents}
        breadcrumb={breadcrumb}
      />

      <div id="modal" />
      <div id="drawer" />
    </div>
  )
}

export default StaffDepartmentDocumentsTab

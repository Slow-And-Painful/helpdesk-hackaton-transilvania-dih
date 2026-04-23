/// <reference types="@kitajs/html/htmx.d.ts" />

import DashboardPage from "$templates/components/DashboardPage"
import { Department } from "$services/DepartmentsService"
import { RAGDocument } from "$services/RAGDocumentsService"
import { DocumentFolderSchema } from "$dbSchemas/DocumentFolders"
import Button from "$templates/components/Button"
import { getPartialPath } from "$routers/website/utils"
import DocumentExplorer, { ExplorerBreadcrumb } from "$templates/components/documents/DocumentExplorer"

type Props = {
  activeDepartment: Department | null
  rootFolder: DocumentFolderSchema | null
  folders: DocumentFolderSchema[]
  documents: RAGDocument[]
  breadcrumb: { id: number; name: string }[]
}

const DepartmentDocumentsView = ({ activeDepartment, rootFolder, folders, documents, breadcrumb }: Props) => {
  return (
    <DashboardPage
      title={
        <span>
          Documente
          {activeDepartment && (
            <span class="tickets-page__dept-name" safe> — {activeDepartment.name}</span>
          )}
        </span>
      }
    >
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
      </div>

      <div id="modal" />
      <div id="drawer" />
    </DashboardPage>
  )
}

export default DepartmentDocumentsView

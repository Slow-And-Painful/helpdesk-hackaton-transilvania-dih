/// <reference types="@kitajs/html/htmx.d.ts" />

import DashboardPage from "$templates/components/DashboardPage"
import { Department } from "$services/DepartmentsService"
import { RAGDocument } from "$services/RAGDocumentsService"
import { DocumentFolderSchema } from "$dbSchemas/DocumentFolders"
import Button from "$templates/components/Button"
import Icon from "$templates/components/Icon"
import DocumentExplorer, { ExplorerBreadcrumb, BreadcrumbFolder } from "$templates/components/documents/DocumentExplorer"
import { getViewPath } from "$routers/website/utils"

type Props = {
  departments: Department[]
  department?: Department
  folders?: DocumentFolderSchema[]
  documents?: RAGDocument[]
  breadcrumb?: BreadcrumbFolder[]
}

const StaffDocumentsView = ({ departments, department, folders = [], documents = [], breadcrumb = [] }: Props) => {
  const documentsBasePath = getViewPath("staff", "DOCUMENTS")

  const title = (
    <span>
      Documente
      {department && <span class="tickets-page__dept-name" safe> — {department.name}</span>}
    </span>
  )

  return (
    <DashboardPage title={title}>
      <div class="flex flex-col gap-y-4">

        {/* Department breadcrumb root link */}
        <nav class="flex items-center gap-1 text-sm text-gray-400 min-h-[24px]">
          {department ? (
            <>
              <a
                class="hover:text-white transition-colors"
                href={documentsBasePath}
                hx-boost="true"
              >
                Toate departamentele
              </a>
              <span class="text-gray-600">/</span>
              <ExplorerBreadcrumb breadcrumb={breadcrumb} />
            </>
          ) : (
            <span class="text-white font-roboto-medium">Toate departamentele</span>
          )}
        </nav>

        {department ? (
          // Drill-down: show folder/document explorer with action buttons
          <>
            <div class="flex items-end justify-end gap-2">
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

            <DocumentExplorer
              folders={folders}
              documents={documents}
              breadcrumb={breadcrumb}
            />
          </>
        ) : (
          // Root: show all departments as folder items
          <div class="document-explorer">
            {departments.length === 0 ? (
              <div class="document-explorer__empty">
                <Icon name="folder-open" size={40} class="text-gray-500" />
                <p class="text-gray-500 text-sm mt-2">Nu există departamente</p>
              </div>
            ) : (
              <div class="document-explorer__grid">
                {departments.map((dept) => (
                  <a
                    class="document-explorer__item document-explorer__item--folder"
                    href={`${documentsBasePath}?departmentId=${dept.id}`}
                    hx-boost="true"
                    title={dept.name}
                  >
                    <Icon name="folder" size={40} />
                    <span class="document-explorer__label" safe>{dept.name}</span>
                  </a>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <div id="modal" />
      <div id="drawer" />
    </DashboardPage>
  )
}

export default StaffDocumentsView

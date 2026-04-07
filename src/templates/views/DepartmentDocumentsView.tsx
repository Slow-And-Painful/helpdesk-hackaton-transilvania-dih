/// <reference types="@kitajs/html/htmx.d.ts" />

import DashboardPage from "$templates/components/DashboardPage"
import { Department } from "$services/DepartmentsService"
import { RAGDocument } from "$services/RAGDocumentsService"
import Button from "$templates/components/Button"
import { getPartialPath } from "$routers/website/utils"
import { TablePagination } from "$templates/components/tables/Table"
import DocumentsTable from "$templates/components/tables/DocumentsTable"
import TableFilters from "$templates/components/tables/TableFilters"

type Props = {
  activeDepartment: Department | null
  items: RAGDocument[]
  pagination: TablePagination
  baseUrl: string
}

const DepartmentDocumentsView = ({ activeDepartment, items, pagination, baseUrl }: Props) => {
  return (
    <DashboardPage
      title={
        <span>
          Documents
          {activeDepartment && (
            <span class="tickets-page__dept-name" safe> — {activeDepartment.name}</span>
          )}
        </span>
      }
    >
      <div class="flex flex-col gap-y-6">
        <TableFilters
          tableId="documents-table"
          pagination={pagination}
          baseUrl={baseUrl}
          filters={[]}
          side={
            <Button
              size="sm"
              icon="upload"
              iconPosition="right"
              hx-get={getPartialPath("departments", "UPLOAD_DOCUMENT_MODAL")}
              hx-target="#modal"
              hx-swap="beforeend"
            >
              Upload Document
            </Button>
          }
        />

        <DocumentsTable items={items} pagination={pagination} baseUrl={baseUrl} />
      </div>

      <div id="modal" />
      <div id="drawer" />
    </DashboardPage>
  )
}

export default DepartmentDocumentsView

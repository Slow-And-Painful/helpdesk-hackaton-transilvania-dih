/// <reference types="@kitajs/html/htmx.d.ts" />

import Table, { TableConfig, TablePagination } from "$templates/components/tables/Table"
import { RAGDocument } from "$services/RAGDocumentsService"
import { getPartialPath } from "$routers/website/utils"

type Props = {
  items: RAGDocument[]
  pagination?: TablePagination
  baseUrl: string
  swapOOB?: Htmx.Attributes["hx-swap-oob"]
}

export const documentsTableId = "documents-table"

const DocumentsTable = ({ items, pagination, baseUrl, swapOOB }: Props) => {
  const config: TableConfig<RAGDocument>[] = [
    {
      accessor: "name",
      heading: <>Name</>,
      sortable: true,
      render: (row) => <span class="font-roboto-medium text-white" safe>{row.name}</span>,
    },
    {
      accessor: "aiDescription",
      heading: <>Description</>,
      render: (row) => (
        <span class="text-gray-400 truncate max-w-xs block" safe>
          {row.aiDescription || "—"}
        </span>
      ),
    },
    {
      accessor: "createdAt",
      heading: <>Uploaded</>,
      sortable: true,
      width: "160px",
      render: (row) => (
        <span class="text-gray-400">
          {new Date(row.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </span>
      ),
    },
  ]

  return (
    <Table
      {...swapOOB && { swapOOB }}
      id={documentsTableId}
      config={config}
      data={items}
      pagination={pagination}
      baseUrl={baseUrl}
      dropdownOptions={(row) => [
        {
          title: <>Open</>,
          icon: "eye",
          "hx-get": getPartialPath("departments", "DOCUMENT_DETAIL", { documentId: row.id }),
          "hx-target": "#drawer",
          "hx-swap": "innerHTML",
        },
      ]}
      noDataProps={{
        noDataMessage: "No documents uploaded yet",
        noDataFoundMessage: "No documents found",
      }}
    />
  )
}

export default DocumentsTable

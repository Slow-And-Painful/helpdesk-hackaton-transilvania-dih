import { createRouter, getViewPath } from "../../utils"
import { ROUTE } from "./types"
import { schemas } from "./schemas"
import DepartmentSwitcherModal from "$templates/components/departments/DepartmentSwitcherModal"
import CreateDepartmentModal from "$templates/components/departments/CreateDepartmentModal"
import UploadDepartmentDocumentModal from "$templates/components/departments/UploadDepartmentDocumentModal"
import DocumentDetailDrawer from "$templates/components/documents/DocumentDetailDrawer"
import UpdateDocumentForm from "$templates/components/documents/UpdateDocumentForm"
import DocumentExplorer from "$templates/components/documents/DocumentExplorer"
import CreateFolderModal from "$templates/components/documents/CreateFolderModal"
import USER_ROLE from "$types/USER_ROLES"
import { container } from "tsyringe"
import RAGDocumentsBucketComponent from "$components/RAGDocumentsBucketComponent"
import RAGDocumentsService from "$services/RAGDocumentsService"
import DocumentFoldersService from "$services/DocumentFoldersService"
import { and, eq, isNull } from "drizzle-orm"
import { ragDocumentsTable } from "$dbSchemas/ragDocuments"
import { documentFoldersTable } from "$dbSchemas/DocumentFolders"

const ragDocumentsBucketComponent = container.resolve<RAGDocumentsBucketComponent>(RAGDocumentsBucketComponent.token)
const ragDocumentsService = container.resolve<RAGDocumentsService>(RAGDocumentsService.token)
const documentFoldersService = container.resolve<DocumentFoldersService>(DocumentFoldersService.token)

export const routerPrefix = "/departments"

export const router = createRouter("departments", (server) => {
  server.route({
    method: "GET",
    url: ROUTE.DEPARTMENT_SWITCHER,
    schema: schemas[ROUTE.DEPARTMENT_SWITCHER],
    config: { authenticated: true },
    handler: (req, res) => {
      return res
        .headers({
          "HX-Retarget": "#modal",
          "HX-Reswap": "beforeend",
        })
        .view(
          <DepartmentSwitcherModal
            activeDepartment={req.activeDepartment}
            userDepartments={req.userDepartments}
          />
        )
    },
  })

  server.route({
    method: "GET",
    url: ROUTE.CREATE_DEPARTMENT_MODAL,
    schema: schemas[ROUTE.CREATE_DEPARTMENT_MODAL],
    config: {
      authenticated: true,
      security: {
        session: `${USER_ROLE.STAFF_ACCOUNT}`,
      },
    },
    handler: async (_req, res) => {
      return res
        .headers({
          "HX-Retarget": "#modal",
          "HX-Reswap": "beforeend",
        })
        .view(<CreateDepartmentModal />)
    },
  })

  server.route({
    method: "GET",
    url: ROUTE.UPLOAD_DOCUMENT_MODAL,
    schema: schemas[ROUTE.UPLOAD_DOCUMENT_MODAL],
    config: { authenticated: true },
    handler: async (req, res) => {
      const { folderId } = req.query as { folderId?: number }
      return res
        .headers({
          "HX-Retarget": "#modal",
          "HX-Reswap": "beforeend",
        })
        .view(<UploadDepartmentDocumentModal folderId={folderId} />)
    },
  })

  server.route({
    method: "GET",
    url: ROUTE.DOCUMENT_DETAIL,
    schema: schemas[ROUTE.DOCUMENT_DETAIL],
    config: { authenticated: true },
    handler: async (req, res) => {
      const { documentId } = req.params as { documentId: number }

      const [document] = await ragDocumentsService.list({
        where: eq(ragDocumentsTable.id, documentId),
      })

      if (!document) {
        return res.status(404).send("Document not found")
      }

      const pdfUrl = await ragDocumentsBucketComponent.getDocumentSignedUrl({ key: document.s3Key })

      return res
        .headers({
          "HX-Retarget": "#drawer",
          "HX-Reswap": "innerHTML",
        })
        .view(<DocumentDetailDrawer document={document} pdfUrl={pdfUrl} />)
    },
  })

  server.route({
    method: "GET",
    url: ROUTE.DOCUMENT_FORM,
    schema: schemas[ROUTE.DOCUMENT_FORM],
    config: { authenticated: true },
    handler: async (req, res) => {
      const { documentId } = req.params as { documentId: number }

      const [document] = await ragDocumentsService.list({
        where: eq(ragDocumentsTable.id, documentId),
      })

      if (!document) {
        return res.status(404).send("Document not found")
      }

      return res.view(
        <UpdateDocumentForm
          document={document}
          values={{ name: document.name, aiDescription: document.aiDescription, extractedText: document.extractedText }}
          initialValues={{ name: document.name, aiDescription: document.aiDescription, extractedText: document.extractedText }}
          errors={{}}
          showExtractedText
        />
      )
    },
  })

  server.route({
    method: "GET",
    url: ROUTE.DOCUMENT_DOWNLOAD,
    schema: schemas[ROUTE.DOCUMENT_DOWNLOAD],
    config: { authenticated: true },
    handler: async (req, res) => {
      const { documentId } = req.params as { documentId: number }

      const [document] = await ragDocumentsService.list({
        where: eq(ragDocumentsTable.id, documentId),
      })

      if (!document) {
        return res.status(404).send("Document not found")
      }

      const url = await ragDocumentsBucketComponent.getDocumentSignedUrl({ key: document.s3Key })

      return res.redirect(url)
    },
  })

  server.route({
    method: "GET",
    url: ROUTE.CREATE_FOLDER_MODAL,
    schema: schemas[ROUTE.CREATE_FOLDER_MODAL],
    config: { authenticated: true },
    handler: async (req, res) => {
      const { parentFolderId } = req.query as { parentFolderId: number }

      return res
        .headers({
          "HX-Retarget": "#modal",
          "HX-Reswap": "beforeend",
        })
        .view(<CreateFolderModal parentFolderId={parentFolderId} />)
    },
  })

  server.route({
    method: "GET",
    url: ROUTE.FOLDER_CONTENTS,
    schema: schemas[ROUTE.FOLDER_CONTENTS],
    config: { authenticated: true },
    handler: async (req, res) => {
      const { folderId } = req.params as { folderId: number }

      const folder = await documentFoldersService.get(folderId)
      if (!folder) {
        return res.status(404).send("Folder not found")
      }

      const [childFolders, documents] = await Promise.all([
        documentFoldersService.list({
          where: eq(documentFoldersTable.parentId, folderId),
        }),
        ragDocumentsService.list({
          where: eq(ragDocumentsTable.folderId, folderId),
        }),
      ])

      // Build breadcrumb by walking up the folder tree
      const breadcrumb: { id: number; name: string }[] = []
      let current: typeof folder | null = folder
      while (current) {
        breadcrumb.unshift({ id: current.id, name: current.name })
        if (current.parentId) {
          current = await documentFoldersService.get(current.parentId)
        } else {
          break
        }
      }

      const replaceUrl = req.activeDepartment
        ? `${getViewPath("dashboard", "DOCUMENTS")}?folderId=${folderId}`
        : `${getViewPath("staff", "DOCUMENTS")}?departmentId=${folder.departmentId}&folderId=${folderId}`

      return res
        .headers({ "HX-Replace-Url": replaceUrl })
        .view(
          <DocumentExplorer
            folders={childFolders}
            documents={documents}
            breadcrumb={breadcrumb}
            oobBreadcrumb
          />
        )
    },
  })

  server.route({
    method: "POST",
    url: ROUTE.GET_UPLOAD_DOCUMENT_PRESIGNED_URL,
    schema: schemas[ROUTE.GET_UPLOAD_DOCUMENT_PRESIGNED_URL],
    config: { authenticated: true },
    handler: async (req, res) => {
      const { key } = req.body as { key: string }
      const url = await ragDocumentsBucketComponent.putDocumentSignedUrl({ key })
      return res.send({ url })
    },
  })
})

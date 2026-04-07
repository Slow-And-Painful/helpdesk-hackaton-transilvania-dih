import { createRouter } from "../../utils"
import { ROUTE } from "./types"
import { schemas } from "./schemas"
import DepartmentSwitcherModal from "$templates/components/departments/DepartmentSwitcherModal"
import CreateDepartmentModal from "$templates/components/departments/CreateDepartmentModal"
import UploadDepartmentDocumentModal from "$templates/components/departments/UploadDepartmentDocumentModal"
import DocumentDetailDrawer from "$templates/components/documents/DocumentDetailDrawer"
import USER_ROLE from "$types/USER_ROLES"
import { container } from "tsyringe"
import RAGDocumentsBucketComponent from "$components/RAGDocumentsBucketComponent"
import RAGDocumentsService from "$services/RAGDocumentsService"
import { eq } from "drizzle-orm"
import { ragDocumentsTable } from "$dbSchemas/ragDocuments"

const ragDocumentsBucketComponent = container.resolve<RAGDocumentsBucketComponent>(RAGDocumentsBucketComponent.token)
const ragDocumentsService = container.resolve<RAGDocumentsService>(RAGDocumentsService.token)

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
    handler: async (_req, res) => {
      return res
        .headers({
          "HX-Retarget": "#modal",
          "HX-Reswap": "beforeend",
        })
        .view(<UploadDepartmentDocumentModal />)
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

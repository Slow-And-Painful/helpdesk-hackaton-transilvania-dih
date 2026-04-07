import { createRouter } from "../../utils"
import { ROUTE } from "./types"
import { schemas } from "./schemas"
import { container } from "tsyringe"
import DepartmentsService from "$services/DepartmentsService"
import RAGDocumentsService from "$services/RAGDocumentsService"
import USER_ROLE from "$types/USER_ROLES"
import DepartmentAiPromptForm, { getDepartmentAiPromptFormId } from "$templates/components/departments/DepartmentAiPromptForm"
import DepartmentGeneralForm, { getDepartmentGeneralFormId } from "$templates/components/departments/DepartmentGeneralForm"
import { departmentSettingsTitleId } from "$templates/views/DepartmentSettingsView"
import { getDepartmentInitials } from "$utils/sidebar"
import DepartmentsTable, { departmentsTableId } from "$templates/components/tables/DepartmentsTable"
import CreateDepartmentForm, { createDepartmentFormId } from "$templates/components/departments/CreateDepartmentForm"
import { createDepartmentModalId } from "$templates/components/departments/CreateDepartmentModal"
import UpdateDocumentForm, { getUpdateDocumentFormId } from "$templates/components/documents/UpdateDocumentForm"
import DocumentsTable, { documentsTableId } from "$templates/components/tables/DocumentsTable"
import { eq } from "drizzle-orm"
import { ragDocumentsTable } from "$dbSchemas/ragDocuments"
import { getViewPath } from "../../utils"

export const routerPrefix = "/departments"

const departmentsService = container.resolve<DepartmentsService>(DepartmentsService.token)
const ragDocumentsService = container.resolve<RAGDocumentsService>(RAGDocumentsService.token)

export const router = createRouter("departments", (server) => {
  server.route({
    method: "POST",
    url: ROUTE.SWITCH,
    schema: schemas[ROUTE.SWITCH],
    config: { authenticated: true },
    handler: async (req, res) => {
      const { departmentId } = req.body as { departmentId: number }

      const isUserDept = req.userDepartments.some((d) => d.id === departmentId)
      if (!isUserDept) {
        return res.status(403).send("Department not accessible")
      }

      req.session.data = {
        ...req.session.data,
        activeDepartmentId: departmentId,
      }
      await req.session.save()

      return res.status(204).send()
    },
  })

  server.route({
    method: "POST",
    url: ROUTE.UPDATE_PROMPT,
    schema: schemas[ROUTE.UPDATE_PROMPT],
    config: {
      authenticated: true,
      security: { session: `${USER_ROLE.DEPARTMENT_ADMIN}` },
    },
    handler: async (req, res) => {
      const { departmentId, systemPrompt } = req.body as { departmentId: number; systemPrompt: string }

      if (req.activeDepartment?.id !== departmentId) {
        return res.status(403).send("Department not accessible")
      }

      await departmentsService.update(departmentId, { systemPrompt })

      const formId = getDepartmentAiPromptFormId(departmentId)
      return res
        .headers({
          "HX-Retarget": `#${formId}`,
          "HX-Reswap": "outerHTML",
          "HX-Push-Url": "false",
          "HX-Trigger-After-Settle": JSON.stringify({
            showSuccessToast: "AI prompt updated successfully",
          })
        })
        .view(
          <DepartmentAiPromptForm
            department={{ ...req.activeDepartment, systemPrompt }}
            values={{ systemPrompt }}
            initialValues={{ systemPrompt }}
            errors={{}}
          />
        )
    },
  })

  server.route({
    method: "POST",
    url: ROUTE.CREATE,
    schema: schemas[ROUTE.CREATE],
    config: {
      authenticated: true,
      security: { session: `${USER_ROLE.STAFF_ACCOUNT}` },
    },
    handler: async (req, res) => {
      const { name } = req.body as { name: string }

      const existing = await departmentsService.list({ where: undefined })
      const duplicate = existing.find((d) => d.name.toLowerCase() === name.toLowerCase())
      if (duplicate) {
        return res
          .headers({
            "HX-Retarget": `#${createDepartmentFormId}`,
            "HX-Reswap": "outerHTML",
          })
          .view(
            <CreateDepartmentForm
              values={{ name }}
              initialValues={{ name }}
              errors={{ name: <>A department with this name already exists</> }}
            />
          )
      }

      await departmentsService.sInsert({ name, systemPrompt: "" })

      const baseUrl = getViewPath("staff", "DEPARTMENTS")
      const { items, pagination } = await departmentsService.getTableItems(
        req.query as Record<string, string>,
      )

      return res
        .headers({
          "HX-Reswap": "outerHTML",
          "HX-Retarget": `#${departmentsTableId}`,
          "HX-Trigger-After-Settle": JSON.stringify({
            closeModal: createDepartmentModalId,
            showSuccessToast: "Department created successfully",
          }),
        })
        .view(<DepartmentsTable items={items} pagination={pagination} baseUrl={baseUrl} />)
    },
  })

  server.route({
    method: "POST",
    url: ROUTE.UPDATE_GENERAL,
    schema: schemas[ROUTE.UPDATE_GENERAL],
    config: {
      authenticated: true,
      security: { session: `${USER_ROLE.DEPARTMENT_ADMIN}` },
    },
    handler: async (req, res) => {
      const { departmentId, name } = req.body as { departmentId: number; name: string }

      if (req.activeDepartment?.id !== departmentId) {
        return res.status(403).send("Department not accessible")
      }

      await departmentsService.update(departmentId, { name })

      const updatedDepartment = { ...req.activeDepartment, name }

      const formId = getDepartmentGeneralFormId(departmentId)
      return res
        .headers({
          "HX-Retarget": `#${formId}`,
          "HX-Reswap": "outerHTML",
          "HX-Push-Url": "false",
          "HX-Trigger-After-Settle": JSON.stringify({
            showSuccessToast: "Department updated successfully",
          }),
        })
        .view(
          <>
            <DepartmentGeneralForm
              department={updatedDepartment}
              values={{ name }}
              initialValues={{ name }}
              errors={{}}
            />

            <div id={departmentSettingsTitleId} hx-swap-oob="innerHTML">
              <div class="flex w-full justify-between items-center">
                <div class="truncate line-clamp-1 flex-1">
                  <span>
                    Department
                    <span class="tickets-page__dept-name" safe> — {name}</span>
                  </span>
                </div>
              </div>
            </div>

            <span id="sidebar-dept-initials" hx-swap-oob="innerHTML" safe>{getDepartmentInitials(name)}</span>
            <div id="sidebar-dept-tooltip" hx-swap-oob="innerHTML" safe>{name}</div>
          </>
        )
    },
  })

  server.route({
    method: "POST",
    url: ROUTE.UPDATE_DOCUMENT,
    schema: schemas[ROUTE.UPDATE_DOCUMENT],
    config: { authenticated: true },
    handler: async (req, res) => {
      const { documentId, name, aiDescription } = req.body as { documentId: number; name: string; aiDescription?: string }

      const [document] = await ragDocumentsService.list({
        where: eq(ragDocumentsTable.id, documentId),
      })

      if (!document) {
        return res.status(404).send("Document not found")
      }

      const formId = getUpdateDocumentFormId(documentId)
      const values = { name, aiDescription: aiDescription ?? "" }

      await ragDocumentsService.update(documentId, values)

      const baseUrl = getViewPath("dashboard", "DOCUMENTS")
      const { items, pagination } = await ragDocumentsService.getTableItems(
        {},
        req.activeDepartment
          ? eq(ragDocumentsTable.departmentId, req.activeDepartment.id)
          : undefined,
      )

      return res
        .headers({
          "HX-Retarget": `#${formId},#${documentsTableId}`,
          "HX-Reswap": "none",
          "HX-Push-Url": "false",
          "HX-Trigger-After-Settle": JSON.stringify({
            showSuccessToast: "Document updated successfully",
          }),
        })
        .view(
          <>
            <UpdateDocumentForm
              document={{ ...document, ...values }}
              values={values}
              initialValues={values}
              errors={{}}
              swapOOB={"outerHTML"}
            />
            <DocumentsTable
              items={items}
              pagination={pagination}
              baseUrl={baseUrl}
              swapOOB={"outerHTML"}
            />
          </>
        )
    },
  })

  server.route({
    method: "POST",
    url: ROUTE.UPLOAD_DOCUMENT,
    schema: schemas[ROUTE.UPLOAD_DOCUMENT],
    config: { authenticated: true },
    handler: async (req, res) => {
      const { documentKey, name, aiDescription } = req.body as { documentKey: string; documentType: string; name: string; aiDescription?: string }

      if (!req.activeDepartment) {
        return res.status(403).send("No active department")
      }

      await ragDocumentsService.sInsert({
        s3Key: documentKey,
        name,
        aiDescription: aiDescription ?? "",
        departmentId: req.activeDepartment.id,
      })

      const { items, pagination } = await ragDocumentsService.getTableItems(req.query as Record<string, string>, eq(ragDocumentsTable.departmentId, req.activeDepartment.id))
      const baseUrl = getViewPath("dashboard", "DOCUMENTS")

      return res
        .headers({
          "HX-Trigger-After-Settle": JSON.stringify({
            showSuccessToast: "Document uploaded successfully",
            closeModal: "upload-department-document-modal",
          }),
          "HX-Reswap": "outerHTML",
          "HX-Retarget": `#${documentsTableId}`,
          "HX-Push-Url": `${baseUrl}${pagination.baseUrl ? `?${pagination.baseUrl}&page=${pagination.page}` : `?page=${pagination.page}`}`,
        })
        .view(
          <DocumentsTable
            items={items}
            pagination={pagination}
            baseUrl={baseUrl}
          />,
        )
    },
  })
})

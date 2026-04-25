import { createRouter, getViewPath } from "../../utils"
import { ROUTE } from "./types"
import { schemas } from "./schemas"
import USER_ROLE from "$types/USER_ROLES"
import { DashboardLayout } from "$templates/layouts/DashboardLayout"
import StaffDepartmentsView from "$templates/views/StaffDepartmentsView"
import StaffDepartmentSettingsView, { StaffDepartmentSettingsTab } from "$templates/views/StaffDepartmentSettingsView"
import StaffUsersView from "$templates/views/StaffUsersView"
import StaffAiSettingsView from "$templates/views/StaffAiSettingsView"
import DepartmentsTable, { departmentsTableId } from "$templates/components/tables/DepartmentsTable"
import UsersTable, { usersTableId } from "$templates/components/tables/UsersTable"
import TicketsTable, { ticketsTableId } from "$templates/components/tables/TicketsTable"
import { container } from "tsyringe"
import DepartmentsService from "$services/DepartmentsService"
import UsersService from "$services/UsersService"
import DepartmentUserService from "$services/DepartmentUsersService"
import TicketsService from "$services/TicketsService"
import { eq, inArray } from "drizzle-orm"
import { departmentUsersTable } from "$dbSchemas/DepartmentUsers"
import { usersTable } from "$dbSchemas/Users"
import { ticketsTable } from "$dbSchemas/Tickets"
import { documentFoldersTable } from "$dbSchemas/DocumentFolders"
import { ragDocumentsTable } from "$dbSchemas/ragDocuments"
import DocumentFoldersService from "$services/DocumentFoldersService"
import RAGDocumentsService from "$services/RAGDocumentsService"
import GlobalSettingsComponent from "$components/GlobalSettingsComponent"
import StaffInsightsView from "$templates/views/StaffInsightsView"
import StaffDocumentsView from "$templates/views/StaffDocumentsView"

export const routerPrefix = "/staff"

const departmentsService = container.resolve<DepartmentsService>(DepartmentsService.token)
const usersService = container.resolve<UsersService>(UsersService.token)
const departmentUsersService = container.resolve<DepartmentUserService>(DepartmentUserService.token)
const ticketsService = container.resolve<TicketsService>(TicketsService.token)
const globalSettingsComponent = container.resolve<GlobalSettingsComponent>(GlobalSettingsComponent.token)
const documentFoldersService = container.resolve<DocumentFoldersService>(DocumentFoldersService.token)
const ragDocumentsService = container.resolve<RAGDocumentsService>(RAGDocumentsService.token)

export const router = createRouter("staff", (server) => {
  server.route({
    url: ROUTE.DEPARTMENTS,
    method: "GET",
    schema: schemas[ROUTE.DEPARTMENTS],
    config: {
      security: {
        session: `${USER_ROLE.STAFF_ACCOUNT}`,
      },
      authenticated: true,
    },
    handler: async (req, res) => {
      const query = req.query as Record<string, string>
      const baseUrl = getViewPath("staff", "DEPARTMENTS")

      const { items, pagination } = await departmentsService.getTableItems(query)

      const tableOnly = req.headers["hx-template"] === "table"

      if (tableOnly) {
        return res
          .headers({
            "HX-Reswap": "outerHTML",
            "HX-Retarget": `#${departmentsTableId}`,
            "HX-Push-Url": `${baseUrl}${pagination.baseUrl ? `?${pagination.baseUrl}&page=${pagination.page}` : `?page=${pagination.page}`}`,
          })
          .view(
            <DepartmentsTable
              items={items}
              pagination={pagination}
              baseUrl={baseUrl}
            />
          )
      }

      return res.view(
        <StaffDepartmentsView
          items={items}
          pagination={pagination}
          baseUrl={baseUrl}
        />,
        DashboardLayout,
      )
    },
  })

  server.route({
    url: ROUTE.DEPARTMENT_SETTINGS,
    method: "GET",
    schema: schemas[ROUTE.DEPARTMENT_SETTINGS],
    config: {
      security: {
        session: `${USER_ROLE.STAFF_ACCOUNT}`,
      },
      authenticated: true,
    },
    handler: async (req, res) => {
      const { id } = req.params as { id: string }
      const { tab: tabParam, ticketTab: ticketTabParam, ...query } = req.query as Record<string, string>
      const departmentId = parseInt(id, 10)

      const validTabs: StaffDepartmentSettingsTab[] = ["users", "ai-settings", "documents", "tickets"]
      const tab: StaffDepartmentSettingsTab = validTabs.includes(tabParam as StaffDepartmentSettingsTab)
        ? (tabParam as StaffDepartmentSettingsTab)
        : "users"

      const department = await departmentsService.get(departmentId)
      if (!department) {
        return res.status(404).send()
      }

      const baseUrl = getViewPath("staff", "DEPARTMENT_SETTINGS").replace(":id", id)

      const tableOnly = req.headers["hx-template"] === "table"
      const tabBaseUrl = `${baseUrl}?tab=${tab}`

      if (tab === "users") {
        const departmentUsers = await departmentUsersService.list({
          where: eq(departmentUsersTable.departmentId, departmentId),
        })
        const userIds = departmentUsers.map((du) => du.userId)
        const { items: users, pagination: usersPagination } = await usersService.getTableItems(
          query,
          userIds.length ? inArray(usersTable.id, userIds) : eq(usersTable.id, -1),
        )

        if (tableOnly) {
          return res
            .headers({
              "HX-Reswap": "outerHTML",
              "HX-Retarget": `#${usersTableId}`,
              "HX-Push-Url": `${tabBaseUrl}${usersPagination.baseUrl ? `&${usersPagination.baseUrl}&page=${usersPagination.page}` : `&page=${usersPagination.page}`}`,
            })
            .view(<UsersTable items={users} pagination={usersPagination} baseUrl={tabBaseUrl} departmentUserIdMap={new Map(departmentUsers.map((du) => [du.userId, du.id]))} />)
        }

        return res.view(
          <StaffDepartmentSettingsView
            department={department}
            tab={tab}
            baseUrl={baseUrl}
            users={users}
            departmentUsers={departmentUsers}
            usersPagination={usersPagination}
            usersBaseUrl={tabBaseUrl}
          />,
          DashboardLayout,
        )
      }

      if (tab === "tickets") {
        const ticketTab = ticketTabParam === "outgoing" ? "outgoing" : "incoming"
        const ticketFilter = ticketTab === "incoming"
          ? eq(ticketsTable.destinationDepartmentId, departmentId)
          : eq(ticketsTable.senderDepartmentId, departmentId)
        const { items: tickets, pagination: ticketsPagination } = await ticketsService.getTableItems(
          query,
          ticketFilter,
        )

        if (tableOnly) {
          return res
            .headers({
              "HX-Reswap": "outerHTML",
              "HX-Retarget": `#${ticketsTableId}`,
              "HX-Push-Url": `${tabBaseUrl}&ticketTab=${ticketTab}${ticketsPagination.baseUrl ? `&${ticketsPagination.baseUrl}&page=${ticketsPagination.page}` : `&page=${ticketsPagination.page}`}`,
            })
            .view(
              <TicketsTable
                items={tickets}
                pagination={ticketsPagination}
                tab={ticketTab}
                baseUrl={tabBaseUrl}
                activeDepartment={null}
              />
            )
        }

        return res.view(
          <StaffDepartmentSettingsView
            department={department}
            tab={tab}
            baseUrl={baseUrl}
            tickets={tickets}
            ticketsPagination={ticketsPagination}
            ticketsBaseUrl={tabBaseUrl}
            ticketTab={ticketTab}
          />,
          DashboardLayout,
        )
      }

      if (tab === "documents") {
        const { folderId: folderIdParam } = req.query as { folderId?: string }

        const allFolders = await documentFoldersService.list({
          where: eq(documentFoldersTable.departmentId, departmentId),
        })

        let rootFolder = allFolders.find((f) => !f.deletable && f.parentId === null) ?? null

        if (!rootFolder) {
          rootFolder = await documentFoldersService.sInsert({
            name: department.name,
            departmentId,
            parentId: null,
            deletable: false,
          })
        }

        let currentFolder = rootFolder
        if (folderIdParam) {
          const requestedId = parseInt(folderIdParam, 10)
          const found = await documentFoldersService.get(requestedId)
          if (found && found.departmentId === departmentId) {
            currentFolder = found
          }
        }

        const [currentFolders, currentDocuments] = await Promise.all([
          documentFoldersService.list({ where: eq(documentFoldersTable.parentId, currentFolder.id) }),
          ragDocumentsService.list({ where: eq(ragDocumentsTable.folderId, currentFolder.id) }),
        ])

        const breadcrumb: { id: number; name: string }[] = []
        let node: typeof currentFolder | null = currentFolder
        while (node) {
          breadcrumb.unshift({ id: node.id, name: node.name })
          node = node.parentId ? (allFolders.find((f) => f.id === node!.parentId) ?? null) : null
        }

        return res.view(
          <StaffDepartmentSettingsView
            department={department}
            tab={tab}
            baseUrl={baseUrl}
            folders={currentFolders}
            documents={currentDocuments}
            breadcrumb={breadcrumb}
          />,
          DashboardLayout,
        )
      }

      return res.view(
        <StaffDepartmentSettingsView department={department} tab={tab} baseUrl={baseUrl} />,
        DashboardLayout,
      )
    },
  })

  server.route({
    url: ROUTE.USERS,
    method: "GET",
    schema: schemas[ROUTE.USERS],
    config: {
      security: {
        session: `${USER_ROLE.STAFF_ACCOUNT}`,
      },
      authenticated: true,
    },
    handler: async (_req, res) => {
      const items = await departmentUsersService.listWithRelations()
      return res.view(<StaffUsersView items={items} />, DashboardLayout)
    },
  })

  server.route({
    url: ROUTE.AI_SETTINGS,
    method: "GET",
    schema: schemas[ROUTE.AI_SETTINGS],
    config: {
      security: {
        session: `${USER_ROLE.STAFF_ACCOUNT}`,
      },
      authenticated: true,
    },
    handler: async(_, res) => {
      const globalSettings = await globalSettingsComponent.getGlobalSettings()

      return res.view(<StaffAiSettingsView globalSettings={globalSettings}/>, DashboardLayout)
    },
  })

  server.route({
    url: ROUTE.INSIGHTS,
    method: "GET",
    schema: schemas[ROUTE.INSIGHTS],
    config: {
      security: {
        session: `${USER_ROLE.STAFF_ACCOUNT}`,
      },
      authenticated: true,
    },
    handler: async(_, res) => {
      return res.view(<StaffInsightsView/>, DashboardLayout)
    },
  })

  server.route({
    url: ROUTE.DOCUMENTS,
    method: "GET",
    schema: schemas[ROUTE.DOCUMENTS],
    config: {
      security: {
        session: `${USER_ROLE.STAFF_ACCOUNT}`,
      },
      authenticated: true,
    },
    handler: async (req, res) => {
      const { departmentId: departmentIdParam, folderId: folderIdParam } = req.query as {
        departmentId?: string
        folderId?: string
      }

      const departments = await departmentsService.list()

      // No department selected — show all departments as root folders
      if (!departmentIdParam) {
        return res.view(
          <StaffDocumentsView departments={departments} />,
          DashboardLayout,
        )
      }

      const departmentId = parseInt(departmentIdParam, 10)
      const department = await departmentsService.get(departmentId)
      if (!department) {
        return res.status(404).send()
      }

      const allFolders = await documentFoldersService.list({
        where: eq(documentFoldersTable.departmentId, departmentId),
      })

      let rootFolder = allFolders.find((f) => !f.deletable && f.parentId === null) ?? null

      if (!rootFolder) {
        rootFolder = await documentFoldersService.sInsert({
          name: department.name,
          departmentId,
          parentId: null,
          deletable: false,
        })
      }

      let currentFolder = rootFolder
      if (folderIdParam) {
        const requestedId = parseInt(folderIdParam, 10)
        const found = await documentFoldersService.get(requestedId)
        if (found && found.departmentId === departmentId) {
          currentFolder = found
        }
      }

      const [currentFolders, currentDocuments] = await Promise.all([
        documentFoldersService.list({ where: eq(documentFoldersTable.parentId, currentFolder.id) }),
        ragDocumentsService.list({ where: eq(ragDocumentsTable.folderId, currentFolder.id) }),
      ])

      const breadcrumb: { id: number; name: string }[] = []
      let node: typeof currentFolder | null = currentFolder
      while (node) {
        breadcrumb.unshift({ id: node.id, name: node.name })
        node = node.parentId ? (allFolders.find((f) => f.id === node!.parentId) ?? null) : null
      }

      return res.view(
        <StaffDocumentsView
          departments={departments}
          department={department}
          folders={currentFolders}
          documents={currentDocuments}
          breadcrumb={breadcrumb}
        />,
        DashboardLayout,
      )
    },
  })
})

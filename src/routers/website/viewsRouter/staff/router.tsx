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
import GlobalSettingsComponent from "$components/GlobalSettingsComponent"
import StaffInsightsView from "$templates/views/StaffInsightsView"

export const routerPrefix = "/staff"

const departmentsService = container.resolve<DepartmentsService>(DepartmentsService.token)
const usersService = container.resolve<UsersService>(UsersService.token)
const departmentUsersService = container.resolve<DepartmentUserService>(DepartmentUserService.token)
const ticketsService = container.resolve<TicketsService>(TicketsService.token)
const globalSettingsComponent = container.resolve<GlobalSettingsComponent>(GlobalSettingsComponent.token)

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
            .view(<UsersTable items={users} pagination={usersPagination} baseUrl={tabBaseUrl} />)
        }

        return res.view(
          <StaffDepartmentSettingsView
            department={department}
            tab={tab}
            baseUrl={baseUrl}
            users={users}
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
    handler: (_req, res) => {
      return res.view(<StaffUsersView />, DashboardLayout)
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
})

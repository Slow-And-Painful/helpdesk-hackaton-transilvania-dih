import { createRouter } from "../../utils"
import { ROUTE } from "./types"
import { schemas } from "./schemas"
import USER_ROLE from "$types/USER_ROLES"
import CreateUserModal from "$templates/components/users/CreateUserModal"
import UserDetailDrawer from "$templates/components/users/UserDetailDrawer"
import { container } from "tsyringe"
import DepartmentUserService from "$services/DepartmentUsersService"
import { chatsTable } from "$dbSchemas/Chats"
import { chatMessagesTable } from "$dbSchemas/ChatMessages"
import { ticketsTable } from "$dbSchemas/Tickets"
import { departmentUsersTable } from "$dbSchemas/DepartmentUsers"
import { eq, and, sum, count } from "drizzle-orm"
import DrizzleDB from "$components/DrizzleDB"

// ==================== ROUTES ==================== //

export const routerPrefix = "/users"

const departmentUserService = container.resolve<DepartmentUserService>(DepartmentUserService.token)
const drizzleDB = container.resolve<DrizzleDB>(DrizzleDB.token)

export const router = createRouter("users", (server) => {
  server.route({
    method: "GET",
    url: ROUTE.CREATE_USER_MODAL,
    schema: schemas[ROUTE.CREATE_USER_MODAL],
    config: {
      authenticated: true,
      security: {
        session: `${USER_ROLE.DEPARTMENT_ADMIN} || ${USER_ROLE.STAFF_ACCOUNT}`,
      },
    },
    handler: async (req, res) => {
      const { departmentId: departmentIdParam } = req.query as { departmentId?: string }
      const departmentId = departmentIdParam ? parseInt(departmentIdParam, 10) : undefined

      return res
        .headers({
          "HX-Retarget": "#modal",
          "HX-Reswap": "beforeend",
        })
        .view(<CreateUserModal departmentId={departmentId} />)
    },
  })

  server.route({
    method: "GET",
    url: ROUTE.USER_DETAIL,
    schema: schemas[ROUTE.USER_DETAIL],
    config: {
      authenticated: true,
      security: {
        session: `${USER_ROLE.STAFF_ACCOUNT}`,
      },
    },
    handler: async (req, res) => {
      const { departmentUserId } = req.params as { departmentUserId: number }
      const db = drizzleDB.drizzle

      // Fetch the clicked department-user with its user + department
      const departmentUser = await departmentUserService.list({
        limit: 1,
        mainQuery: async ({ db: d, ...opts }) =>
          d.query.departmentUsersTable.findMany({
            ...opts,
            with: { user: { columns: { password: false, salt: false } }, department: true },
          }),
        where: eq(departmentUsersTable.id, departmentUserId),
      })

      if (!departmentUser[0]) {
        return res.status(404).send("User not found")
      }

      const du = departmentUser[0] as Awaited<ReturnType<typeof departmentUserService.listWithRelations>>[number]

      // Fetch all department memberships for this user (to show stats per dept)
      const allMemberships = await departmentUserService.listWithRelations()
      const userMemberships = allMemberships.filter((m) => m.userId === du.userId)

      // Build per-department stats
      const allDeptStats = await Promise.all(
        userMemberships.map(async (m) => {
          // chats count
          const chatsResult = await db
            .select({ count: count() })
            .from(chatsTable)
            .where(eq(chatsTable.departmentUserId, m.id))
          const chatCount = Number(chatsResult[0]?.count ?? 0)

          // token totals via chat messages
          const tokenResult = await db
            .select({
              totalInput: sum(chatMessagesTable.inputTokens),
              totalOutput: sum(chatMessagesTable.outputTokens),
            })
            .from(chatMessagesTable)
            .innerJoin(chatsTable, eq(chatMessagesTable.chatId, chatsTable.id))
            .where(eq(chatsTable.departmentUserId, m.id))
          const totalInputTokens = Number(tokenResult[0]?.totalInput ?? 0)
          const totalOutputTokens = Number(tokenResult[0]?.totalOutput ?? 0)

          // tickets sent by this department user
          const ticketsSentResult = await db
            .select({ count: count() })
            .from(ticketsTable)
            .where(eq(ticketsTable.senderDepartmentUserId, m.id))
          const ticketsSent = Number(ticketsSentResult[0]?.count ?? 0)

          // tickets assigned to this department user
          const ticketsAssignedResult = await db
            .select({ count: count() })
            .from(ticketsTable)
            .where(eq(ticketsTable.assigneeId, m.id))
          const ticketsAssigned = Number(ticketsAssignedResult[0]?.count ?? 0)

          return {
            departmentUserId: m.id,
            departmentName: m.department.name,
            role: m.role,
            chatCount,
            totalInputTokens,
            totalOutputTokens,
            ticketsSent,
            ticketsAssigned,
          }
        })
      )

      return res
        .headers({
          "HX-Retarget": "#drawer",
          "HX-Reswap": "innerHTML",
        })
        .view(<UserDetailDrawer departmentUser={du} allDeptStats={allDeptStats} />)
    },
  })
})

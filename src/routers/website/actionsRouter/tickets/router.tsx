import { createRouter, getViewPath } from "../../utils"
import { ROUTE } from "./types"
import { schemas } from "./schemas"
import USER_ROLE from "$types/USER_ROLES"
import { container } from "tsyringe"
import TicketsService from "$services/TicketsService"

export const routerPrefix = "/tickets"

const ticketsService = container.resolve<TicketsService>(TicketsService.token)

export const router = createRouter("tickets", (server) => {
  server.route({
    method: "POST",
    url: ROUTE.CREATE,
    schema: schemas[ROUTE.CREATE],
    config: {
      authenticated: true,
      security: {
        session: `${USER_ROLE.CUSTOMER_ACCOUNT}`,
      },
    },
    handler: async (req, res) => {
      const { name, destinationDepartmentId, summary } = req.body

      const activeDepartment = req.activeDepartment
      if (!activeDepartment) {
        return res.status(400).send("No active department selected")
      }

      await ticketsService.sInsert({
        name,
        summary,
        senderDepartmentId: activeDepartment.id,
        destinationDepartmentId,
      })

      return res
        .header("HX-Trigger", "closeModal")
        .header("HX-Redirect", `${getViewPath("dashboard", "TICKETS")}?tab=outgoing`)
        .status(204)
        .send()
    },
  })
})

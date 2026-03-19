import { createRouter } from "../../utils"
import { ROUTE } from "./types"
import { schemas } from "./schemas"

export const routerPrefix = "/departments"

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
})

import { createRouter } from "../../utils"
import { ROUTE } from "./types"
import { schemas } from "./schemas"
import Toast from "$templates/components/Toast"

export const routerPrefix = "/common"

export const router = createRouter("common", (server) => {
  server.route({
    method: "POST",
    url: ROUTE.TOAST,
    schema: schemas[ROUTE.TOAST],
    handler: (req, res) => {
      return res
        .headers({
          "HX-Retarget": `#toast`,
          "HX-Reswap": "beforeend",
        })
        .view(<Toast {...req.body} />)
    }
  })
})

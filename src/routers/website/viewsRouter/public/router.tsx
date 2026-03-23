import { createRouter } from "../../utils"
import { ROUTE } from "./types"
import { schemas } from "./schemas"
import Homepage from "$templates/views/Homepage"
import { BaseLayout } from "$templates/layouts"
import { getLanguage } from "$utils/i18n"

export const router = createRouter("public", (server) => {
  server.route({
    url: ROUTE.HOME,
    method: "GET",
    schema: schemas[ROUTE.HOME],
    handler: (req, res) => {
      const callerUser = req.callerUser

      return res.view(
        <Homepage
        callerUser={callerUser}
        lang={getLanguage((req.query as { lang?: string }).lang)}
      />,
        BaseLayout
      )
    }
  })
})

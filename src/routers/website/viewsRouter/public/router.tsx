import { createRouter } from "../../utils"
import { ROUTE } from "./types"
import { schemas } from "./schemas"
import Homepage from "$templates/views/Homepage"
import ContactView from "$templates/views/ContactView"
import { BaseLayout } from "$templates/layouts"
import { contactActionsRouterPrefix } from "$routers/website/actionsRouter/contact"
import { ROUTE as CONTACT_ACTIONS_ROUTE } from "$routers/website/actionsRouter/contact/types"

const CONTACT_COOKIE_NAME = "contact_submitted"
const contactActionPath = `/actions${contactActionsRouterPrefix}${CONTACT_ACTIONS_ROUTE.SUBMIT}`

export const router = createRouter("public", (server) => {
  server.route({
    url: ROUTE.HOME,
    method: "GET",
    schema: schemas[ROUTE.HOME],
    handler: (req, res) => {
      const callerUser = req.callerUser

      return res.view(
        <Homepage callerUser={callerUser} />,
        BaseLayout
      )
    }
  })

  server.route({
    url: ROUTE.CONTACT,
    method: "GET",
    schema: schemas[ROUTE.CONTACT],
    handler: (req, res) => {
      const submittedEmail = req.cookies?.[CONTACT_COOKIE_NAME]

      return res.view(
        <ContactView
          actionPath={contactActionPath}
          submittedEmail={submittedEmail}
        />,
        BaseLayout
      )
    }
  })
})

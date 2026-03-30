import { createRouter } from "../../utils"
import { ROUTE } from "./types"
import { schemas } from "./schemas"
import ChatMessage from "$templates/components/chatbot/ChatMessage"

export const routerPrefix = "/chatbot"

export const router = createRouter("chatbot", (server) => {
  server.route({
    method: "POST",
    url: ROUTE.SEND_MESSAGE,
    schema: schemas[ROUTE.SEND_MESSAGE],
    handler: async (req, res) => {
      const { message } = req.body as { message: string }

      // TODO: integrate with AI service
      const reply = `Thank you for your question. This assistant will be connected to an AI service soon. In the meantime, you can create a ticket for your department to get help from our team.`

      // Appended into #hd-chat-messages via hx-target + hx-swap="beforeend" on the form
      return res.view(<ChatMessage message={message} reply={reply} />)
    },
  })
})

import { createRouter } from "../../utils"
import { ROUTE } from "./types"
import { schemas } from "./schemas"
import ChatMessage from "$templates/components/chatbot/ChatMessage"
import { container } from "tsyringe"
import ChatsService from "$services/ChatsService"
import ChatMessagesService from "$services/ChatsMessagesService"
import { chatsTable } from "$dbSchemas/Chats"
import { departmentUsersTable } from "$dbSchemas/DepartmentUsers"
import { and, eq } from "drizzle-orm"

export const routerPrefix = "/chatbot"

const chatsService = container.resolve<ChatsService>(ChatsService.token)
const chatMessagesService = container.resolve<ChatMessagesService>(ChatMessagesService.token)

export const router = createRouter("chatbot", (server) => {
  server.route({
    method: "POST",
    url: ROUTE.SEND_MESSAGE,
    schema: schemas[ROUTE.SEND_MESSAGE],
    handler: async (req, res) => {
      const { message, chatId } = req.body as { message: string; chatId?: string }

      // TODO: integrate with AI service
      const reply = `Thank you for your question. This assistant will be connected to an AI service soon. In the meantime, you can create a ticket for your department to get help from our team.`

      // Resolve the departmentUser for the current user + active department
      const activeDepartment = req.activeDepartment
      if (!activeDepartment) {
        return res.status(400).send("No active department selected")
      }

      const departmentUsers = await req.services.departmentUsersService.list({
        limit: 1,
        where: and(
          eq(departmentUsersTable.userId, req.callerUser!.id),
          eq(departmentUsersTable.departmentId, activeDepartment.id)
        ),
      })

      const departmentUser = departmentUsers[0]

      if (!departmentUser) {
        return res.status(400).send("User not in department")
      }

      let chatUuid: string

      if (!chatId) {
        // New conversation — create a chat row and insert the first message
        const newChat = await chatsService.sInsert({ departmentUserId: departmentUser.id })
        await chatMessagesService.sInsert({ chatId: newChat.id, prompt: message, response: reply })
        chatUuid = newChat.uuid
      } else {
        // Existing conversation — find the chat and append a message
        const existingChats = await chatsService.list({
          limit: 1,
          where: eq(chatsTable.uuid, chatId),
        })

        const existingChat = existingChats[0]

        if (!existingChat) {
          return res.status(404).send("Chat not found")
        }

        await chatMessagesService.sInsert({ chatId: existingChat.id, prompt: message, response: reply })

        chatUuid = existingChat.uuid
      }

      // Appended into #hd-chat-messages via hx-target + hx-swap="beforeend" on the form.
      // HX-Push-Url updates the browser URL; after-request JS reads the uuid from the URL
      // and syncs it into the hidden chatId field so subsequent messages go to the same chat.
      return res
        .header("HX-Push-Url", `/dashboard/?chat=${chatUuid}`)
        .view(<ChatMessage message={message} reply={reply} />)
    },
  })
})

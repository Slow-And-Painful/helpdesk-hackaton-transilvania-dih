import { createRouter } from "../../utils"
import { ROUTE } from "./types"
import { schemas } from "./schemas"
import ChatBotReply from "$templates/components/chatbot/ChatBotReply"
import { container } from "tsyringe"
import ChatsService from "$services/ChatsService"
import ChatMessagesService from "$services/ChatsMessagesService"
import GeminiComponent from "$components/GeminiComponent"
import RAGDocumentsService from "$services/RAGDocumentsService"
import { chatsTable } from "$dbSchemas/Chats"
import { chatMessagesTable } from "$dbSchemas/ChatMessages"
import { departmentUsersTable } from "$dbSchemas/DepartmentUsers"
import { ragDocumentsTable } from "$dbSchemas/ragDocuments"
import { and, eq } from "drizzle-orm"
import type { Content } from "@google/genai"
import Sidebar from "$templates/components/Sidebar"

export const routerPrefix = "/chatbot"

const chatsService = container.resolve<ChatsService>(ChatsService.token)
const chatMessagesService = container.resolve<ChatMessagesService>(ChatMessagesService.token)
const geminiComponent = container.resolve<GeminiComponent>(GeminiComponent.token)
const ragDocumentsService = container.resolve<RAGDocumentsService>(RAGDocumentsService.token)

export const router = createRouter("chatbot", (server) => {
  server.route({
    method: "POST",
    url: ROUTE.SEND_MESSAGE,
    schema: schemas[ROUTE.SEND_MESSAGE],
    handler: async (req, res) => {
      const { message, chatId } = req.body as { message: string; chatId?: string }

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

      const ragDocuments = await ragDocumentsService.list({
        where: eq(ragDocumentsTable.departmentId, activeDepartment.id),
      })

      let chatUuid: string
      const history: Content[] = []

      if (!chatId) {
        const newChat = await chatsService.sInsert({ departmentUserId: departmentUser.id })
        chatUuid = newChat.uuid

        const reply = await geminiComponent.sendMessage({
          prompt: message,
          history: [],
          systemPrompts: {
            department: activeDepartment.systemPrompt,
            documents: ragDocuments,
          },
        }) ?? ""

        await chatMessagesService.sInsert({ chatId: newChat.id, prompt: message, response: reply })

        const updatedChats = [newChat, ...req.userChats]

        return res
          .header("HX-Push-Url", `/dashboard/?chat=${chatUuid}`)
          .view(
            <>
              <ChatBotReply reply={reply} documents={ragDocuments} />
              <Sidebar
                swapOOB="true"
                routerName="/dashboard/"
                user={req.callerUser}
                authenticatedUser={req.authenticatedUser}
                activeDepartment={req.activeDepartment!}
                userDepartments={req.userDepartments}
                activeDepartmentUserRole={req.activeDepartmentUserRole}
                userChats={updatedChats}
                activeChatUuid={chatUuid}
              />
            </>
          )
      } else {
        // Existing conversation — find the chat and build history
        const existingChats = await chatsService.list({
          limit: 1,
          where: eq(chatsTable.uuid, chatId),
        })

        const existingChat = existingChats[0]

        if (!existingChat) {
          return res.status(404).send("Chat not found")
        }

        // Load previous messages to build Gemini conversation history
        const previousMessages = await chatMessagesService.list({
          where: eq(chatMessagesTable.chatId, existingChat.id),
        })

        for (const msg of previousMessages) {
          history.push({ role: "user", parts: [{ text: msg.prompt }] })
          history.push({ role: "model", parts: [{ text: msg.response }] })
        }

        // Send message to Gemini with conversation history
        const reply = await geminiComponent.sendMessage({
          prompt: message,
          history,
          systemPrompts: {
            department: activeDepartment.systemPrompt,
            documents: ragDocuments,
          },
        }) ?? ""

        await chatMessagesService.sInsert({ chatId: existingChat.id, prompt: message, response: reply })

        chatUuid = existingChat.uuid

        return res
          .header("HX-Push-Url", `/dashboard/?chat=${chatUuid}`)
          .view(<ChatBotReply reply={reply} documents={ragDocuments} />)
      }
    },
  })
})

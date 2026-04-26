import ChatPrompt from "$templates/components/chatbot/ChatPrompt"

type Props = {
  values: { message: string; chatId: string }
  departmentId?: number
}

const ChatbotForm = ({ values, departmentId }: Props) => (
  <form id="hd-chat-form" class="hd-chat__form">
    <input type="hidden" name="chatId" value={values.chatId} />
    <ChatPrompt departmentId={departmentId} />
  </form>
)

export default ChatbotForm

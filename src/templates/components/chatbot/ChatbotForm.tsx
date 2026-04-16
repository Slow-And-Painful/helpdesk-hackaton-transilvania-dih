import ChatPrompt from "$templates/components/chatbot/ChatPrompt"

type Props = {
  values: { message: string; chatId: string }
}

const ChatbotForm = ({ values }: Props) => (
  <form id="hd-chat-form" class="hd-chat__form">
    <input type="hidden" name="chatId" value={values.chatId} />
    <ChatPrompt />
  </form>
)

export default ChatbotForm

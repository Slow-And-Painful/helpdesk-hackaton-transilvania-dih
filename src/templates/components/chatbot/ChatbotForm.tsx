import ChatPrompt from "$templates/components/chatbot/ChatPrompt"
import { getActionPath } from "$routers/website/utils"
import Form from "../Form"
import { FormCommonProps } from "$types/ui"

type FormData = {
  message: string
  chatId: string
}

type Props = FormCommonProps<FormData>

const ChatbotForm = (props: Props) => (
  <Form
    id="hd-chat-form"
    values={props.values}
    initialValues={props.initialValues}
    class="hd-chat__form"
    hx-post={getActionPath("chatbot", "SEND_MESSAGE")}
    hx-target="#hd-chat-messages"
    hx-swap="beforeend"
    {...{
      ["hx-on::before-request"]: "onChatBeforeRequest()",
      ["hx-on::after-request"]: "onChatAfterRequest(event)",
    }}
  
    render={() => {
      return (
        <>
          <input type="hidden" name="chatId" value={props.values.chatId} />
          <ChatPrompt />
        </>
      )
    }}
  />
)

export default ChatbotForm

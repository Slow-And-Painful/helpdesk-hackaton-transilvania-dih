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
      ["hx-on::before-request"]:
        "document.getElementById('hd-chat-welcome')?.style.setProperty('display','none'); document.getElementById('hd-chat-messages')?.classList.add('hd-chat__messages--active');",
      ["hx-on::after-request"]:
        "this.reset(); var pushUrl=event.detail.xhr&&event.detail.xhr.getResponseHeader('HX-Push-Url'); var chatId=pushUrl?new URLSearchParams(pushUrl.split('?')[1]||'').get('chat'):new URLSearchParams(window.location.search).get('chat'); var h=this.querySelector('[name=chatId]'); if(h&&chatId)h.value=chatId; var i=document.getElementById('hd-chat-input'); if(i){i.style.height='auto';} document.getElementById('hd-chat-send')?.classList.remove('hd-chat__send--active'); document.getElementById('hd-chat-messages').scrollTop=document.getElementById('hd-chat-messages').scrollHeight;",
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

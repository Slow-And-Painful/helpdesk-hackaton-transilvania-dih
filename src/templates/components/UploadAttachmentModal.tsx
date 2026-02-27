import { AGENT_MAX_ATTACHMENT_FILES, ATTACHMENTS_MAX_FILE_SIZE, CHAT_MAX_ATTACHMENT_FILES } from "$constants/attachments"
import { getActionPath, getPartialPath, getViewPath } from "$routers/website/utils"
import { match } from "ts-pattern"
import UploadDocumentsModal from "$templates/components/documents/UploadDocumentsModal"
import { Attachment } from "$services/AttachmentsService"
import { AttachmentSchema } from "$dbSchemas/Attachments"

export type Props = JSX.HtmlTag & {
  inputName: string
  accept?: JSX.HtmlInputTag["accept"]
  timeZone?: string
} & ({
  type: "agent"
  agentId: number
} | {
  type: "chat"
  chatId: number
  initialData?: (Attachment | AttachmentSchema)[]
})

export const modalId = "attachment-modal"
const formId = "attachment-form"

const UploadAttachmentModal = ({
  timeZone,
  ...props
}: Props) => {  
  const updateUrl = match(props.type)
      .with("agent", () => getActionPath("agents", "UPLOAD_ATTACHMENT", { targetAgentId: (props as { agentId: number }).agentId }))
      .with("chat", () => getActionPath("chats", "UPLOAD_ATTACHMENT", { targetChatId: (props as { chatId: number }).chatId }))
      .exhaustive()
  
  const uploadUrl = match(props.type)
    .with("agent", () => getPartialPath("agents", "UPLOAD_ATTACHMENT_URL", { targetAgentId: (props as { agentId: number }).agentId }))
    .with("chat", () => getPartialPath("chats", "UPLOAD_ATTACHMENT_URL", { targetChatId: (props as { chatId: number }).chatId }))
    .exhaustive()

  const description = match(props.type)
    .with("agent", () => (
      <div>
        The AI can read and understand the attachments content to provide more accurate, personalized, and context-aware answers and better assist with tasks based on the attachments' content. The AI will always be aware of the content of your uploaded files.
        <br />
        <br />
        You can upload a maximum of {AGENT_MAX_ATTACHMENT_FILES} documents at a time
      </div>
    ))
    .with("chat", () => (
      <div>
        Upload documents to enhance AI responses of your chat. The AI will use these files as a reference, accessible only within your chat. Learn more in our <a href={getViewPath("public", "TERMS_AND_CONDITIONS")} target="_blank" class="underline font-roboto-medium">Terms and Conditions</a>.
      </div>
    ))
    .exhaustive()

  const maxFiles = match(props.type)
    .with("agent", () => AGENT_MAX_ATTACHMENT_FILES)
    .with("chat", () => CHAT_MAX_ATTACHMENT_FILES)
    .exhaustive()

  return (
    <UploadDocumentsModal
      inputName={props.inputName}
      accept={props.accept}
      maxFiles={maxFiles}
      isOpen={true}
      uploadUrl={uploadUrl}
      updateUrl={updateUrl}
      updateUrlBody={{
        targetFormId: formId
      }}
      maxFileSize={ATTACHMENTS_MAX_FILE_SIZE}
      formId={formId}
      modalId={modalId}
      title={"Upload attachments"}
      description={description}
      onChange={`
        const file = this.files[0];
        const dropzone = this.closest('.dropzone');
        window.attachmentUploader?.onInputChange(this, dropzone, ${ATTACHMENTS_MAX_FILE_SIZE});  
      `}
      onConfirm={`window.attachmentUploader?.confirmUpload()`}
      {...props.type === "chat" ? {
        withDate: true,
        timeZone,
        removeUrl: getActionPath("chats", "REMOVE_ATTACHMENT", { targetChatId: props.chatId }),
        initialData: props.initialData?.map(attachment => ({
          id: attachment.id,
          name: attachment.name,
          creationTimestamp: attachment.creationTimestamp,
          status: attachment.enabled ? "SUCCESS" : "ERROR",
        }))
      } : {}}
    />
  )
}

export default UploadAttachmentModal

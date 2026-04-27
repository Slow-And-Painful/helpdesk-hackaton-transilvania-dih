import Modal from "$templates/components/Modal"
import ModalFooter from "$templates/components/ModalFooter"
import Form from "$templates/components/Form"
import FormControl from "$templates/components/FormControl"
import Input from "$templates/components/Input"
import Select, { SelectOptions } from "$templates/components/Select"
import Textarea from "$templates/components/Textarea"
import { Department } from "$services/DepartmentsService"
import { getActionPath } from "$routers/website/utils"
import { TICKET_PRIORITY } from "$types/tickets"

type Props = {
  departments: Department[]
  activeDepartmentId: number | null
  preselectedDepartmentId?: number | null
  prefillName?: string
  prefillSummary?: string
  prefillPriority?: TICKET_PRIORITY
  fromChatbot?: boolean
  chatMessageId?: number
}

export const createTicketModalId = "create-ticket-modal"
const formId = "create-ticket-form"

export default function CreateTicketModal({ departments, activeDepartmentId, preselectedDepartmentId, prefillName = "", prefillSummary = "", prefillPriority = TICKET_PRIORITY.MEDIE, fromChatbot = false, chatMessageId }: Props) {
  const filteredDepts = departments.filter((d) => d.id !== activeDepartmentId)

  const resolvedPreselectedId = preselectedDepartmentId != null && filteredDepts.some(d => d.id === preselectedDepartmentId)
    ? preselectedDepartmentId
    : filteredDepts[0]?.id ?? null

  const departmentOptions: SelectOptions = filteredDepts.map((d) => ({
    label: d.name,
    value: d.id,
    selected: d.id === resolvedPreselectedId,
  }))

  return (
    <Modal
      id={createTicketModalId}
      isOpen={true}
      size="md"
      title={<span>Creează Tichet</span>}
      footer={
        <ModalFooter
          modalId={createTicketModalId}
          submitCta="Creează"
          submitCtaIcon="plus"
          type="submit"
          form={formId}
        />
      }
    >
      <Form
        id={formId}
        action={getActionPath("tickets", "CREATE")}
        method="post"
        hx-boost="true"
        hx-push-url="false"
        {...{
          ["hx-on::after-request"]: "onFormAfterRequest(this);",
          ["hx-on::before-request"]: "onFormBeforeRequest(event.target)",
        }}
        hx-target-error={`#${formId}`}
        values={{ name: prefillName, summary: prefillSummary, priority: prefillPriority, destinationDepartmentId: resolvedPreselectedId?.toString() ?? "", fromChatbot: fromChatbot ? "1" : "", chatMessageId: chatMessageId?.toString() ?? "" }}
        initialValues={{ name: "", summary: "", priority: TICKET_PRIORITY.MEDIE, destinationDepartmentId: "", fromChatbot: "", chatMessageId: "" }}
        render={({ errors, values, formId }) => (
          <div class="flex flex-col gap-y-4">
            <input type="hidden" name="fromChatbot" value={values?.fromChatbot} />
            <input type="hidden" name="chatMessageId" value={values?.chatMessageId} />
            <FormControl name="name" formId={formId} showChanged={false}>
              <Input
                id={`${formId}-name`}
                label="Numele Tichetului"
                name="name"
                required
                type="text"
                error={errors?.name}
                value={values?.name}
                placeholder="Introdu numele tichetului"
                size={"sm"}
              />
            </FormControl>

            <FormControl name="summary" formId={formId} showChanged={false}>
              <Textarea
                id={`${formId}-summary`}
                label="Rezumat"
                name="summary"
                placeholder="Introdu rezumatul tichetului"
                error={errors?.summary}
                maxLength={1000}
                initialLength={values?.summary?.length ?? 0}
              >{values?.summary}</Textarea>
            </FormControl>

            <FormControl name="destinationDepartmentId" formId={formId} showChanged={false}>
              <Select
                id={`${formId}-destinationDepartmentId`}
                label="Departament Destinatar"
                name="destinationDepartmentId"
                required
                options={departmentOptions}
                error={errors?.destinationDepartmentId}
              />
            </FormControl>

            <FormControl name="priority" formId={formId} showChanged={false}>
              <Select
                id={`${formId}-priority`}
                label="Prioritate"
                name="priority"
                required
                options={[
                  { label: "Urgentă", value: TICKET_PRIORITY.URGENT, selected: (values?.priority ?? TICKET_PRIORITY.MEDIE) === TICKET_PRIORITY.URGENT },
                  { label: "Medie", value: TICKET_PRIORITY.MEDIE, selected: (values?.priority ?? TICKET_PRIORITY.MEDIE) === TICKET_PRIORITY.MEDIE },
                  { label: "Scăzută", value: TICKET_PRIORITY.SCAZUTA, selected: (values?.priority ?? TICKET_PRIORITY.MEDIE) === TICKET_PRIORITY.SCAZUTA },
                ]}
                error={errors?.priority}
              />
            </FormControl>
          </div>
        )}
      />
    </Modal>
  )
}

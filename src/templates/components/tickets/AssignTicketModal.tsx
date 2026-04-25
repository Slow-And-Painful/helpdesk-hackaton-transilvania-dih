/// <reference types="@kitajs/html/htmx.d.ts" />

import Modal from "$templates/components/Modal"
import ModalFooter from "$templates/components/ModalFooter"
import Form from "$templates/components/Form"
import FormControl from "$templates/components/FormControl"
import Select, { SelectOptions } from "$templates/components/Select"
import { getActionPath } from "$routers/website/utils"
import { DepartmentUserSchema } from "$dbSchemas/DepartmentUsers"
import { User } from "$services/UsersService"

type DepartmentUserWithUser = DepartmentUserSchema & { user?: User }

type Props = {
  ticketId: number
  currentAssigneeId?: number | null
  departmentUsers: DepartmentUserWithUser[]
}

export const assignTicketModalId = "assign-ticket-modal"
const formId = "assign-ticket-form"

export default function AssignTicketModal({ ticketId, currentAssigneeId, departmentUsers }: Props) {
  const options: SelectOptions = [
    { label: "— Unassigned —", value: "", selected: currentAssigneeId == null },
    ...departmentUsers.map((du) => ({
      label: du.user
        ? `${du.user.firstName} ${du.user.lastName}`.trim() || du.user.email
        : `User #${du.userId}`,
      value: du.id,
      selected: du.id === currentAssigneeId,
    })),
  ]

  return (
    <Modal
      id={assignTicketModalId}
      isOpen={true}
      size="sm"
      title={<span>Asignează Tichet</span>}
      footer={
        <ModalFooter
          modalId={assignTicketModalId}
          submitCta="Asignează"
          submitCtaIcon="user"
          type="submit"
          form={formId}
        />
      }
    >
        <Form
          id={formId}
          action={getActionPath("tickets", "ASSIGN")}
          method="post"
          hx-post={getActionPath("tickets", "ASSIGN")}
          hx-swap="none"
          hx-target-error={`#${formId}`}
          values={{ ticketId: ticketId.toString(), assigneeId: currentAssigneeId?.toString() ?? "" }}
          initialValues={{ ticketId: "", assigneeId: "" }}
          render={({ values, formId }) => (
            <div class="flex flex-col gap-y-4">
              <input type="hidden" name="ticketId" value={values?.ticketId} />
              <FormControl name="assigneeId" formId={formId} showChanged={false}>
                <Select
                  id={`${formId}-assigneeId`}
                  label="Asignează către"
                  name="assigneeId"
                  options={options}
                />
              </FormControl>
            </div>
          )}
        />
    </Modal>
  )
}

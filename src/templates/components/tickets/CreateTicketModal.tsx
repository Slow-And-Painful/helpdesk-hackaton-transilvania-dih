import Modal from "$templates/components/Modal"
import ModalFooter from "$templates/components/ModalFooter"
import Form from "$templates/components/Form"
import FormControl from "$templates/components/FormControl"
import Input from "$templates/components/Input"
import Select, { SelectOptions } from "$templates/components/Select"
import Textarea from "$templates/components/Textarea"
import { Department } from "$services/DepartmentsService"
import { getActionPath } from "$routers/website/utils"

type Props = {
  departments: Department[]
  activeDepartmentId: number | null
}

export const createTicketModalId = "create-ticket-modal"
const formId = "create-ticket-form"

export default function CreateTicketModal({ departments, activeDepartmentId }: Props) {
  const departmentOptions: SelectOptions = departments
    .filter((d) => d.id !== activeDepartmentId)
    .map((d) => ({
      label: d.name,
      value: d.id,
    }))

  return (
    <Modal
      id={createTicketModalId}
      isOpen={true}
      size="md"
      title={<span>Create Ticket</span>}
      footer={
        <ModalFooter
          modalId={createTicketModalId}
          submitCta="Create"
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
        values={{ name: "", summary: "", destinationDepartmentId: departmentOptions[0]?.value?.toString() ?? "" }}
        initialValues={{ name: "", summary: "", destinationDepartmentId: departmentOptions[0]?.value?.toString() ?? "" }}
        render={({ errors, values, formId }) => (
          <div class="flex flex-col gap-y-4">
            <FormControl name="name" formId={formId} showChanged={false}>
              <Input
                id={`${formId}-name`}
                label="Ticket Name"
                name="name"
                required
                type="text"
                error={errors?.name}
                value={values?.name}
                placeholder="Enter ticket name"
                size={"sm"}
              />
            </FormControl>

            <FormControl name="summary" formId={formId} showChanged={false}>
              <Textarea
                id={`${formId}-summary`}
                label="Summary"
                name="summary"
                placeholder="Enter ticket summary"
                error={errors?.summary}
                maxLength={1000}
                initialLength={values?.summary?.length ?? 0}
              >{values?.summary}</Textarea>
            </FormControl>

            <FormControl name="destinationDepartmentId" formId={formId} showChanged={false}>
              <Select
                id={`${formId}-destinationDepartmentId`}
                label="Destination Department"
                name="destinationDepartmentId"
                required
                options={departmentOptions}
                error={errors?.destinationDepartmentId}
              />
            </FormControl>
          </div>
        )}
      />
    </Modal>
  )
}

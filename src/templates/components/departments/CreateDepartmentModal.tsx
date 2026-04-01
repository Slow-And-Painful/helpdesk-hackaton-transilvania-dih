import Modal from "$templates/components/Modal"
import ModalFooter from "$templates/components/ModalFooter"
import CreateDepartmentForm, { createDepartmentFormId } from "$templates/components/departments/CreateDepartmentForm"

export const createDepartmentModalId = "create-department-modal"

export default function CreateDepartmentModal() {
  return (
    <Modal
      id={createDepartmentModalId}
      isOpen={true}
      size="md"
      title={<span>Create Department</span>}
      footer={
        <ModalFooter
          modalId={createDepartmentModalId}
          submitCta="Create"
          submitCtaIcon="plus"
          type="submit"
          form={createDepartmentFormId}
        />
      }
    >
      <CreateDepartmentForm
        values={{ name: "" }}
        initialValues={{ name: "" }}
      />
    </Modal>
  )
}

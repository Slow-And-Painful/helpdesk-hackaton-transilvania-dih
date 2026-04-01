import Modal from "$templates/components/Modal"
import ModalFooter from "$templates/components/ModalFooter"
import CreateUserForm, { createUserFormId } from "$templates/components/users/CreateUserForm"

export const createUserModalId = "create-user-modal"

export default function CreateUserModal() {
  return (
    <Modal
      id={createUserModalId}
      isOpen={true}
      size="md"
      title={<span>Create User</span>}
      footer={
        <ModalFooter
          modalId={createUserModalId}
          submitCta="Create"
          submitCtaIcon="plus"
          type="submit"
          form={createUserFormId}
        />
      }
    >
      <CreateUserForm
        values={{ firstName: "", lastName: "", email: "" }}
        initialValues={{ firstName: "", lastName: "", email: "" }}
      />
    </Modal>
  )
}

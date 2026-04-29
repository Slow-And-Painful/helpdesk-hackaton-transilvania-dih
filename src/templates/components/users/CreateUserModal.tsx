import Modal from "$templates/components/Modal"
import ModalFooter from "$templates/components/ModalFooter"
import CreateUserForm, { createUserFormId } from "$templates/components/users/CreateUserForm"
import { DEPARTMENT_USER_ROLE } from "$types/departments"

export const createUserModalId = "create-user-modal"

type Props = {
  departmentId?: number
}

export default function CreateUserModal({ departmentId }: Props) {
  return (
    <Modal
      id={createUserModalId}
      isOpen={true}
      size="md"
      title={<span>Creează Utilizator</span>}
      footer={
        <ModalFooter
          modalId={createUserModalId}
          submitCta="Creează"
          submitCtaIcon="plus"
          type="submit"
          form={createUserFormId}
        />
      }
    >
      <CreateUserForm
        values={{ firstName: "", lastName: "", email: "", role: DEPARTMENT_USER_ROLE.MEMBER }}
        initialValues={{ firstName: "", lastName: "", email: "", role: DEPARTMENT_USER_ROLE.MEMBER }}
        departmentId={departmentId}
      />
    </Modal>
  )
}

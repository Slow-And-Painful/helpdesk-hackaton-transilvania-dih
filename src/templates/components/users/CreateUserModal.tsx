import Modal from "$templates/components/Modal"
import ModalFooter from "$templates/components/ModalFooter"
import CreateUserForm, { createUserFormId } from "$templates/components/users/CreateUserForm"
import { Department } from "$services/DepartmentsService"

export const createUserModalId = "create-user-modal"

type Props = {
  departmentId?: number
  departments?: Department[]
}

export default function CreateUserModal({ departmentId, departments }: Props) {
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
        values={{ firstName: "", lastName: "", email: "", departmentId: departmentId ? String(departmentId) : undefined }}
        initialValues={{ firstName: "", lastName: "", email: "", departmentId: departmentId ? String(departmentId) : undefined }}
        departmentId={departmentId}
        departments={departments}
      />
    </Modal>
  )
}

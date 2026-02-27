import Modal from "$templates/components/Modal"
import CreateProjectForm from "./CreateProjectForm"

export const createProjectModalId = "create-project-modal"

const CreateProjectModal = () => {
  const values = {
    name: "",
    description: ""
  }

  const initialValues = { ...values }

  return <Modal
    id={createProjectModalId}
    title={"Create project"}
    isOpen={true}
    size="sm"
    closable={true}
  >
    <CreateProjectForm
      values={values}
      initialValues={initialValues}
    />
  </Modal>
}

export default CreateProjectModal

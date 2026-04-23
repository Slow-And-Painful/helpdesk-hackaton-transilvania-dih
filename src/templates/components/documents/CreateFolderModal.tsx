/// <reference types="@kitajs/html/htmx.d.ts" />

import Modal from "$templates/components/Modal"
import ModalFooter from "$templates/components/ModalFooter"
import CreateFolderForm, { createFolderFormId } from "./CreateFolderForm"

type Props = {
  parentFolderId: number
}

export const createFolderModalId = "create-folder-modal"

export default function CreateFolderModal({ parentFolderId }: Props) {
  return (
    <Modal
      id={createFolderModalId}
      isOpen={true}
      size="sm"
      title={<span>Folder nou</span>}
      footer={
        <ModalFooter
          modalId={createFolderModalId}
          submitCta="Creează"
          submitCtaIcon="folder-plus"
          type="submit"
          form={createFolderFormId}
        />
      }
    >
      <CreateFolderForm
        parentFolderId={parentFolderId}
        values={{ name: "", parentFolderId }}
        initialValues={{ name: "", parentFolderId }}
      />
    </Modal>
  )
}

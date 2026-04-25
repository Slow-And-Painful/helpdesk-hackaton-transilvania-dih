/// <reference types="@kitajs/html/htmx.d.ts" />

import Modal from "$templates/components/Modal"
import { DepartmentUserSchema } from "$dbSchemas/DepartmentUsers"
import { User } from "$services/UsersService"

type DepartmentUserWithUser = DepartmentUserSchema & { user?: User }

type Props = {
  senderDepartmentUser: DepartmentUserWithUser
  departmentName?: string
  ticketId: number
  ticketName: string
}

export const senderUserModalId = "sender-user-modal"

export default function SenderUserModal({ senderDepartmentUser, departmentName, ticketId, ticketName }: Props) {
  const user = senderDepartmentUser.user
  const fullName = user
    ? `${user.firstName} ${user.lastName}`.trim() || user.email
    : null
  const mailtoSubject = encodeURIComponent(`Ticket #${ticketId} — Re: ${ticketName}`)
  const mailtoHref = user?.email ? `https://mail.google.com/mail/?view=cm&to=${encodeURIComponent(user.email)}&su=${mailtoSubject}` : null

  return (
    <Modal
      id={senderUserModalId}
      isOpen={true}
      size="sm"
      title={<span>Informații expeditor</span>}
    >
      <div class="flex flex-col gap-y-3">
        <div class="flex flex-col gap-y-1">
          <span class="text-gray-400 text-sm">Nume</span>
          <span class="text-white font-roboto-medium" safe>{fullName ?? "—"}</span>
        </div>
        {user?.email && (
          <div class="flex flex-col gap-y-1">
            <span class="text-gray-400 text-sm">Email</span>
            {mailtoHref
              ? <a href={mailtoHref} target="_blank" rel="noopener noreferrer" class="text-primary-500 hover:text-primary-400 transition-colors" safe>{user.email}</a>
              : <span class="text-white" safe>{user.email}</span>
            }
          </div>
        )}
        <div class="flex flex-col gap-y-1">
          <span class="text-gray-400 text-sm">Departament</span>
          <span class="text-white" safe>{departmentName ?? "—"}</span>
        </div>
      </div>
    </Modal>
  )
}

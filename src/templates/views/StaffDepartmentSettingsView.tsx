import DashboardPage from "$templates/components/DashboardPage"
import { Department } from "$services/DepartmentsService"
import { User } from "$services/UsersService"
import { Ticket } from "$services/TicketsService"
import { TablePagination } from "$templates/components/tables/Table"
import Tabs from "$templates/components/Tabs"
import StaffDepartmentUsersTab from "$templates/components/departments/StaffDepartmentUsersTab"
import StaffDepartmentAiSettingsTab from "$templates/components/departments/StaffDepartmentAiSettingsTab"
import StaffDepartmentDocumentsTab from "$templates/components/departments/StaffDepartmentDocumentsTab"
import StaffDepartmentTicketsTab from "$templates/components/departments/StaffDepartmentTicketsTab"
import { TicketsViewTab } from "$templates/views/TicketsView"
import { RAGDocument } from "$services/RAGDocumentsService"
import { DocumentFolderSchema } from "$dbSchemas/DocumentFolders"
import { BreadcrumbFolder } from "$templates/components/documents/DocumentExplorer"
import { DepartmentUser } from "$services/DepartmentUsersService"

export type StaffDepartmentSettingsTab = "users" | "ai-settings" | "documents" | "tickets"

type Props = {
  department: Department
  tab: StaffDepartmentSettingsTab
  baseUrl: string
  users?: User[]
  departmentUsers?: DepartmentUser[]
  usersPagination?: TablePagination
  usersBaseUrl?: string
  tickets?: Ticket[]
  ticketsPagination?: TablePagination
  ticketsBaseUrl?: string
  ticketTab?: TicketsViewTab
  folders?: DocumentFolderSchema[]
  documents?: RAGDocument[]
  breadcrumb?: BreadcrumbFolder[]
}

const StaffDepartmentSettingsView = ({
  department,
  tab,
  baseUrl,
  users = [],
  departmentUsers = [],
  usersPagination,
  usersBaseUrl = "",
  tickets = [],
  ticketsPagination,
  ticketsBaseUrl = "",
  ticketTab = "incoming",
  folders = [],
  documents = [],
  breadcrumb = [],
}: Props) => {
  return (
    <DashboardPage
      title={
        <span>
          Departament
          <span class="tickets-page__dept-name" safe> — {department.name}</span>
        </span>
      }
    >
      <div class="flex flex-col gap-y-6">
        <Tabs
          items={[
            { title: "Utilizatori", href: `${baseUrl}?tab=users`, active: tab === "users" },
            { title: "Setări AI", href: `${baseUrl}?tab=ai-settings`, active: tab === "ai-settings" },
            { title: "Documente", href: `${baseUrl}?tab=documents`, active: tab === "documents" },
            { title: "Tichete", href: `${baseUrl}?tab=tickets`, active: tab === "tickets" },
          ]}
        />

        {tab === "users" && (
          <StaffDepartmentUsersTab
            department={department}
            items={users}
            departmentUsers={departmentUsers}
            pagination={usersPagination}
            baseUrl={usersBaseUrl}
          />
        )}

        {tab === "ai-settings" && (
          <StaffDepartmentAiSettingsTab department={department} />
        )}

        {tab === "documents" && (
          <StaffDepartmentDocumentsTab folders={folders} documents={documents} breadcrumb={breadcrumb} />
        )}

        {tab === "tickets" && (
          <StaffDepartmentTicketsTab
            items={tickets}
            pagination={ticketsPagination}
            baseUrl={ticketsBaseUrl}
            ticketTab={ticketTab}
          />
        )}
      </div>
    </DashboardPage>
  )
}

export default StaffDepartmentSettingsView

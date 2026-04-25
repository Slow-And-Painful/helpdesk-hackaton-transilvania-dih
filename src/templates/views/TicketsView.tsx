import DashboardPage from "$templates/components/DashboardPage"
import { Department } from "$services/DepartmentsService"
import { Ticket } from "$services/TicketsService"
import { TablePagination } from "$templates/components/tables/Table"
import TicketsTable from "$templates/components/tables/TicketsTable"
import Tabs from "$templates/components/Tabs"
import Button from "$templates/components/Button"
import { getPartialPath } from "$routers/website/utils"

export type TicketsViewTab = "incoming" | "outgoing"

type Props = {
  items: Ticket[]
  pagination?: TablePagination
  activeDepartment: Department | null
  tab: TicketsViewTab
  baseUrl: string
  openTicketId?: number
  isDepartmentAdmin?: boolean
}

const TicketsView = ({ items, pagination, activeDepartment, tab, baseUrl, openTicketId, isDepartmentAdmin }: Props) => {
  return (
    <DashboardPage
      title={
        <div class="w-full flex justify-between items-center">
          <div>
            <span>Tichete</span>
            {activeDepartment && (
              <span class="tickets-page__dept-name" safe> — {activeDepartment.name}</span>
            )}
          </div>

          <Button
            preset="primary"
            size="sm"
            icon="plus"
            hx-get={getPartialPath("tickets", "CREATE_TICKET_MODAL")}
            hx-target="#modal"
            hx-swap="innerHTML"
            iconPosition="right"
          >
            Creează nou
          </Button>
        </div>
      }
    >
      <div class={"flex flex-col gap-y-6"}>
        <Tabs
          items={[
            { title: "Primite", href: `${baseUrl}?tab=incoming`, active: tab === "incoming" },
            { title: "Trimise", href: `${baseUrl}?tab=outgoing`, active: tab === "outgoing" },
          ]}
        />

        <TicketsTable
          items={items}
          pagination={pagination}
          tab={tab}
          baseUrl={baseUrl}
          activeDepartment={activeDepartment}
          isDepartmentAdmin={isDepartmentAdmin}
        />
      </div>
      {openTicketId && (
        <script>{`document.addEventListener('DOMContentLoaded', function() { htmx.ajax('GET', '/partials/tickets/detail/${openTicketId}', { target: '#drawer', swap: 'innerHTML' }) })`}</script>
      )}
    </DashboardPage>
  )
}

export default TicketsView

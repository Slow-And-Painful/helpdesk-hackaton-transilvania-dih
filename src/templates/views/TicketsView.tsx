import DashboardPage from "$templates/components/DashboardPage"
import { Department } from "$services/DepartmentsService"
import { Ticket } from "$services/TicketsService"
import { TablePagination } from "$templates/components/tables/Table"
import TicketsTable from "$templates/components/tables/TicketsTable"
import Tabs from "$templates/components/Tabs"

export type TicketsViewTab = "incoming" | "outgoing"

type Props = {
  items: Ticket[]
  pagination?: TablePagination
  activeDepartment: Department | null
  tab: TicketsViewTab
  baseUrl: string
}

const TicketsView = ({ items, pagination, activeDepartment, tab, baseUrl }: Props) => {
  return (
    <DashboardPage
      title={
        <div class="tickets-page__title">
          <span>Tickets</span>
          {activeDepartment && (
            <span class="tickets-page__dept-name" safe> — {activeDepartment.name}</span>
          )}
        </div>
      }
    >
      <div class={"flex flex-col gap-y-6"}>
        <Tabs
          items={[
            { title: "Incoming", href: `${baseUrl}?tab=incoming`, active: tab === "incoming" },
            { title: "Outgoing", href: `${baseUrl}?tab=outgoing`, active: tab === "outgoing" },
          ]}
        />

        <TicketsTable
          items={items}
          pagination={pagination}
          tab={tab}
          baseUrl={baseUrl}
          activeDepartment={activeDepartment}
        />
      </div>
    </DashboardPage>
  )
}

export default TicketsView

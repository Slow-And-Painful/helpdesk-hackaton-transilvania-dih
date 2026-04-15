import USER_TYPE from "$types/USER_TYPE"
import { User } from "$services/UsersService"
import Table, { TableConfig, TablePagination } from "$templates/components/tables/Table"
import DashboardPage from "$templates/components/DashboardPage"

export const getTableId = (userType: USER_TYPE) => `utility-login-users-table-${userType}`

type Props = {
  customers: User[]
  customersPagination: TablePagination
  staff: User[]
  staffPagination: TablePagination
}

const userTableConfig: TableConfig<User>[] = [
  {
    accessor: "id",
    heading: <>#</>,
    sortable: true,
    width: "80px",
    render: (row) => <span class="font-roboto-medium text-white">#{row.id}</span>,
  },
  {
    accessor: "firstName",
    heading: <>Prenume</>,
    sortable: true,
  },
  {
    accessor: "lastName",
    heading: <>Nume</>,
    sortable: true,
  },
  {
    accessor: "email",
    heading: <>Email</>,
    sortable: true,
  },
  {
    accessor: "blocked",
    heading: <>Blocat</>,
    render: (row) => <span>{row.blocked ? "Da" : "Nu"}</span>,
  },
  {
    accessor: "id",
    heading: <></>,
    width: "120px",
    render: (row) => (
      <a
        href={`/internal/utility-login-as?userId=${row.id}`}
        class="text-primary-500 hover:underline"
      >
        Autentifică-te ca
      </a>
    ),
  },
]

const UtilityLoginView = ({ customers, customersPagination, staff, staffPagination }: Props) => {
  return (
    <DashboardPage title={<div class="px-24">Autentificare Utilitar</div>}>
      <div class="flex flex-col gap-y-8 p-24">
        <div class="flex flex-col gap-y-2">
          <h2 class="text-lg text-white font-roboto-medium">Clienți</h2>
          <Table
            id={getTableId(USER_TYPE.CUSTOMER)}
            config={userTableConfig}
            data={customers}
            pagination={customersPagination}
            noDataProps={{ noDataMessage: "Niciun client", noDataFoundMessage: "Niciun client găsit" }}
          />
        </div>

        <div class="flex flex-col gap-y-2">
          <h2 class="text-lg text-white font-roboto-medium">Personal</h2>
          <Table
            id={getTableId(USER_TYPE.STAFF)}
            config={userTableConfig}
            data={staff}
            pagination={staffPagination}
            noDataProps={{ noDataMessage: "Niciun personal", noDataFoundMessage: "Niciun personal găsit" }}
          />
        </div>
      </div>
    </DashboardPage>
  )
}

export default UtilityLoginView
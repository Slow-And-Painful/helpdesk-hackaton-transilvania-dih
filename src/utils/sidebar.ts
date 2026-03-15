import { Department } from "$services/DepartmentsService"
import { Ticket } from "$services/TicketsService"
import { User } from "$services/UsersService"
import { IconName } from "$templates/components/Icon"
import USER_TYPE from "$types/USER_TYPE"
import { match } from "ts-pattern"

enum SIDEBAR_LINKS_GROUPS {
  BASE_CUSTOMER = "BASE_CUSTOMER",
  BASE_STAFF = "BASE_STAFF"
}

export enum SIDEBAR_LINKS_TYPES {
  SIMPLE = "SIMPLE",
  DROPDOWN = "DROPDOWN",
}

export type SidebarProps = {
  routerName: `/${string}`
  swapOOB?: string
  user: User | null
  authenticatedUser: User | null
  activeDepartment: Department
  userDepartments: Department[]
  userTickets: Ticket[]
}

type SidebarSimpleLink = {
  icon: IconName
  url: string
  label: string
  isActive?: boolean
  type: SIDEBAR_LINKS_TYPES.SIMPLE
}

type SidebarDropdownLink = {
  icon: IconName
  url: string
  label: string
  links: SidebarSimpleLink[]
  isActive?: boolean
  dropdownId: string
  type: SIDEBAR_LINKS_TYPES.DROPDOWN
}

type SidebarLink = SidebarSimpleLink | SidebarDropdownLink

// ==================== UTILS ==================== //

const getBaseCustomerSidebarItems = (_user: User, _routerName: SidebarProps["routerName"]): SidebarLink[] => {  
  const items: SidebarLink[] = [

  ]

  return items
}

export const getSidebarItems = (options: SidebarProps): SidebarLink[] => {
  const { user } = options
  const routerName = options.routerName.split("?")[0] as SidebarProps["routerName"]

  if (!user) {
    return []
  }

  const isCustomer = user.type === USER_TYPE.CUSTOMER

  const group = match({ isCustomer })
    .with({ isCustomer: true }, () => SIDEBAR_LINKS_GROUPS.BASE_CUSTOMER)
    .otherwise(() => {
      throw new Error("Unknown user type for sidebar group");
    })

  const items = match(group)
    .with(SIDEBAR_LINKS_GROUPS.BASE_CUSTOMER, () => getBaseCustomerSidebarItems(user, routerName))
    .with(SIDEBAR_LINKS_GROUPS.BASE_STAFF, () => [])
    .exhaustive()

  return items
}

export function getDepartmentInitials(name: string): string {
  return name
    .split(/\s+/)
    .map(word => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

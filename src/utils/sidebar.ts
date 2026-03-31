import { Department } from "$services/DepartmentsService"
import { User } from "$services/UsersService"
import { IconName } from "$templates/components/Icon"
import USER_TYPE from "$types/USER_TYPE"
import { DEPARTMENT_USER_ROLE } from "$types/departments"
import { match } from "ts-pattern"
import { getViewPath } from "$routers/website/utils"
import { ChatsSchema } from "$dbSchemas/Chats"

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
  activeDepartmentUserRole?: DEPARTMENT_USER_ROLE | null
  userChats?: ChatsSchema[]
  activeChatUuid?: string
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

const getBaseCustomerSidebarItems = (_user: User, routerName: SidebarProps["routerName"], isDepartmentAdmin: boolean): SidebarLink[] => {
  const homePath = getViewPath("dashboard", "HOME")
  const ticketsPath = getViewPath("dashboard", "TICKETS")
  const usersPath = getViewPath("dashboard", "USERS")
  const departmentPath = getViewPath("dashboard", "DEPARTMENT")
  const documentsPath = getViewPath("dashboard", "DOCUMENTS")

  const normalize = (p: string) => p.replace(/\/$/, "")
  const current = normalize(routerName as string)

  const items: SidebarLink[] = [
    {
      type: SIDEBAR_LINKS_TYPES.SIMPLE,
      icon: "new-chat",
      label: "Home",
      url: homePath,
      isActive: current === normalize(homePath),
    },
    {
      type: SIDEBAR_LINKS_TYPES.SIMPLE,
      icon: "inbox",
      label: "Tickets",
      url: ticketsPath,
      isActive: current === normalize(ticketsPath),
    },
  ]

  if (isDepartmentAdmin) {
    items.push({
      type: SIDEBAR_LINKS_TYPES.SIMPLE,
      icon: "users",
      label: "Users",
      url: usersPath,
      isActive: current === normalize(usersPath),
    }, {
      type: SIDEBAR_LINKS_TYPES.SIMPLE,
      icon: "settings",
      label: "Department",
      url: departmentPath,
      isActive: current === normalize(departmentPath),
    }, {
      type: SIDEBAR_LINKS_TYPES.SIMPLE,
      icon: "document",
      label: "Documents",
      url: documentsPath,
      isActive: current === normalize(documentsPath),
    })
  }

  return items
}

export const getSidebarItems = (options: SidebarProps): SidebarLink[] => {
  const { user } = options
  const routerName = options.routerName.split("?")[0] as SidebarProps["routerName"]

  if (!user) {
    return []
  }

  const isCustomer = user.type === USER_TYPE.CUSTOMER

  const isDepartmentAdmin = options.activeDepartmentUserRole === DEPARTMENT_USER_ROLE.ADMIN

  const group = match({ isCustomer })
    .with({ isCustomer: true }, () => SIDEBAR_LINKS_GROUPS.BASE_CUSTOMER)
    .otherwise(() => {
      throw new Error("Unknown user type for sidebar group");
    })

  const items = match(group)
    .with(SIDEBAR_LINKS_GROUPS.BASE_CUSTOMER, () => getBaseCustomerSidebarItems(user, routerName, isDepartmentAdmin))
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

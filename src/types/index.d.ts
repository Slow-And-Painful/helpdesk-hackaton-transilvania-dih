import type { JsonSchemaToTsProvider } from "@fastify/type-provider-json-schema-to-ts"
import type {
  RawServerDefault,
  RawRequestDefaultExpression,
  RawReplyDefaultExpression,
  FastifyBaseLogger,
  FastifyInstance,
} from "fastify"
import type { User } from "$services/UsersService"
import { ToolInstance } from "$services/ToolsInstancesService"
import { Organization } from "$services/OrganizationsService"
import USER_IN_ORGANIZATION_ROLES from "./USER_IN_ORGANIZATION_ROLES"
import { Department } from "$services/DepartmentsService"
import { DEPARTMENT_USER_ROLE } from "./departments"

export type JsonSchemaFastifyInstance = FastifyInstance<
  RawServerDefault,
  RawRequestDefaultExpression<RawServerDefault>,
  RawReplyDefaultExpression<RawServerDefault>,
  FastifyBaseLogger,
  JsonSchemaToTsProvider
>

export type RegisterRoutes = (server: JsonSchemaFastifyInstance) => void

export type SelectedOrganizationData = {
  role: USER_IN_ORGANIZATION_ROLES
  organization: Omit<Organization, "users">
  draftProjectId: number
}

export type LayoutAdditionalProps = {
  pageClass?: string
  toasts?: ToastProps[]
  routerName?: `/${string}`
  tools?: ToolInstance[]
  withPadding?: boolean
  alertData?: UsageAlertData | null
  swapChat?: boolean
}
export type LayoutProps = {
  children: JSX.Element
  globalResources: GlobalResources
  isHtmxRequest: boolean
  routerName: `/${string}`
  user: CallerUserWithSelectedOrganization | null
  authenticatedUser: User | null
  withSidebar?: boolean
  timeZone?: string
  devMode: boolean
  activeDepartment : Department
  userDepartments: Department[]
  activeDepartmentUserRole?: DEPARTMENT_USER_ROLE | null
} & LayoutAdditionalProps
export type LayoutFn = (props: LayoutProps) => JSX.Element

export type QuerystringBoolean = "true" | "false"

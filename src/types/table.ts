import { TablePagination } from "$templates/components/tables/Table"
import { FormCommonProps } from "$types/ui"
import { QuerystringBoolean } from "$types/index"
import { RouteGenericInterface } from "fastify"
import { CommonQueryString } from "$utils/listing"
import { SearchInputOption } from "$templates/components/SearchInput"

// Common table structure props and values
// Do not edit unless you know what you're doing. All tables rely on these types

// Common
export type ObbSwappable = {
  swapOOB?: JSX.HtmlTag["hx-swap-oob"]
}

export type TableId = {
  tableId: string
}

export type Locale = {
  locale: string
}

export type DefaultTableId = {
  tableId?: string
}

export type TableProps = JSX.HtmlTag & {
  pagination: TablePagination
}

export type TableFiltersProps<T> = FormCommonProps<T> & ObbSwappable & {
  baseUrlFilterAction: string,
  sorter?: string
  filters: {
    key: string,
    type: "boolean" | "date" | "number" | "string" | "enum",
    label: string,
    values?: {
      key: string
      label: string
    }[]
  }[]
}

export type TableFilterValues<T> = {
  search?: string
  searchField?: T
  autoFocus?: QuerystringBoolean
}

export type TableFilterType = {
  key: string,
  type: "boolean" | "date" | "number" | "string" | "enum" | "bool_enum",
  label: JSX.Element,
  values?: {
    key: string
    label: JSX.Element,
    outputQuery?: Record<string, string>
  }[]
}

export type TableFiltersDropdownProps = {
  class?: string
  pagination: TablePagination
  baseUrl: string
  swapOOB?: JSX.HtmlTag["hx-swap-oob"]
  filters: TableFilterType[]
  getSearchFieldOptions?: (searchField?: string) => SearchInputOption<string>[]
  side?: JSX.Element
  additionalQueryParams?: Record<string, string>
}

export type TableFiltersListProps<T> = Pick<FormCommonProps<T>, "values"> & ObbSwappable

export interface ViewSchema extends RouteGenericInterface {
  Querystring: CommonQueryString
}

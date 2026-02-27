import { FormCommonProps } from "$types/ui"
import { QuerystringBoolean } from "$types/index"
import { RouteGenericInterface } from "fastify"
import { CommonQueryString } from "$utils/listing"
import { SearchInputOption } from "$templates/components/SearchInput"
import { CardListPagination } from "$templates/components/card-lists/CardList"

// Common card list structure props and values
// Do not edit unless you know what you're doing. All card lists rely on these types

// Common
export type ObbSwappable = {
  swapOOB?: JSX.HtmlTag["hx-swap-oob"]
}

export type CardListId = {
  cardListId: string
}

export type Locale = {
  locale: string
}

export type DefaultCardListId = {
  cardListId?: string
}

export type CardListFiltersProps<T> = FormCommonProps<T> & ObbSwappable & {
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

export type CardListFilterValues<T> = {
  search?: string
  searchField?: T
  autoFocus?: QuerystringBoolean
}

export type CardListFilterType = {
  key: string,
  type: "boolean" | "date" | "number" | "string" | "enum" | "bool_enum",
  label: JSX.Element,
  values?: {
    key: string
    label: JSX.Element,
    outputQuery?: Record<string, string>
  }[]
}

export type CardListFiltersDropdownProps = {
  pagination: CardListPagination
  class?: string
  baseUrl: string
  swapOOB?: JSX.HtmlTag["hx-swap-oob"]
  filters: CardListFilterType[]
  getSearchFieldOptions?: (searchField?: string) => SearchInputOption<string>[]
  side?: JSX.Element
  additionalQueryParams?: Record<string, string>
  search?: {
    value: string
    autofocus: QuerystringBoolean
  }
  pollingProps?: {
    "hx-trigger": string
    "hx-swap"?: string
    "hx-target"?: string
    "hx-headers"?: string
    "hx-include"?: string
  } & ({ "hx-post": string } | { "hx-get": string })
}

export type CardListFiltersListProps<T> = Pick<FormCommonProps<T>, "values"> & ObbSwappable

export interface ViewSchema extends RouteGenericInterface {
  Querystring: CommonQueryString
}

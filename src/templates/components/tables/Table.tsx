import Icon, { IconName } from "$templates/components/Icon"
import classNames from "classnames"
import Pagination from "$templates/components/Pagination"
import Dropdown, { DropdownItem } from "$templates/components/dropdown/Dropdown"
import DropdownTrigger from "$templates/components/dropdown/DropdownTrigger"
import { buildQuerystringFromFiltersAndSorter } from "$utils/buildQueryString"
import { Children } from "@kitajs/html"
import { hash } from "crypto"
import { LISTING_ITEMS_PER_PAGE } from "$utils/listing"

export type TableConfig<Row> = {
  accessor: keyof Row | ((row: Row) => string | number | boolean)
  field?: string
  heading?: JSX.Element
  render?: (data: Row) => JSX.Element
  href?: (data: Row) => string
  sortable?: boolean
  width?: string
  minWidth?: string
  copyable?: boolean
}

export type TablePagination = Htmx.Attributes & {
  page: number
  totalPages: number
  totalItems: number
  itemsPerPage: number
  baseUrl?: string
  sorter?: string
  search?: string
  searchField?: string
  autoFocus?: string
  filters: Record<string, string | string[] | undefined>
  prepend?: string
}

type NoDataProps = {
  noDataMessage?: string
  noDataFoundMessage?: string
  noDataComponent?: JSX.Element
  noDataFoundComponent?: JSX.Element
  noDataIcon?: IconName
  noDataFoundIcon?: IconName
  customShowNoDataFound?: (pagination?: TablePagination) => boolean
}

export type TableProps<Row> = JSX.HtmlTag & {
  config: TableConfig<Row>[]
  entityData?: (data: Row) => JSX.Element
  entityDataAccessor?: keyof Row
  data: Row[]
  pagination?: TablePagination
  hasInputs?: boolean
  baseUrl?: string
  dropdownOptions?: DropdownItem[] | ((row: Row) => DropdownItem[])
  rowLink?: (row: Row) => string
  children?: Children
  additionalQueryParams?: Record<string, string>
  noDataProps?: NoDataProps
  fullPage?: boolean
  swapOOB?: Htmx.Attributes["hx-swap-oob"]
  rowHeight?: number
  rowId?: (row: Row) => string
  menuCellId?: (row: Row) => string
  implicitFilters?: string[]
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getSorterHref = (accessor: string | ((row: any) => any), baseUrl: string, field?: string, additionalQueryParams?: Record<string, string>): string | undefined => {
  const accessorKey = typeof accessor === "function"
    ? field as string
    : accessor
  const searchParams = new URLSearchParams(baseUrl)
  const currentSorter = searchParams.get("sorter")

  if (currentSorter?.includes(accessorKey)) {
    if (currentSorter.startsWith("-")) {
      searchParams.delete("sorter")
    } else {
      searchParams.set("sorter", currentSorter.replace(accessorKey, `-${accessorKey}`))
    }
  } else if (currentSorter && !currentSorter.includes(accessorKey)) {
    searchParams.set("sorter", accessorKey)
  } else {
    searchParams.set("sorter", accessorKey)
  }
  const urlWithSearchParams = `?${searchParams.toString()}`
  if (additionalQueryParams) {
    const additionalQueryParamsString = new URLSearchParams(additionalQueryParams).toString()
    return `${urlWithSearchParams}${additionalQueryParamsString ? `&${additionalQueryParamsString}` : ""}`
  }
  return urlWithSearchParams
}

const setSorterIconClass = (accessor: string, baseUrl: string): string => {
  const currentSorter = new URLSearchParams(baseUrl).get("sorter")
  if (currentSorter?.includes(accessor)) {
    return currentSorter.startsWith("-") ? "table__sort-icon--down" : "table__sort-icon--up"
  }
  return ""
}

export const getRowItem = <Row,>(
  config: TableConfig<Row>[],
  row: Row,
  options?: {
    rowLink?: (row: Row) => string,
    dropdownOptions?: DropdownItem[] | ((row: Row) => DropdownItem[]),
    rowHeight?: number,
    rowId?: (row: Row) => string,
    menuCellId?: (row: Row) => string,
    entityData?: (data: Row) => JSX.Element,
    entityDataAccessor?: keyof Row,
    props?: Htmx.Attributes
  }
): JSX.Element => {
  const rowIdValue = (row as Record<"id", number>).id ?? hash("sha256", (row as Record<"name", string>).name)
  const dropdownId = `table-options-${rowIdValue}`
  const { rowLink, dropdownOptions, rowHeight, rowId, menuCellId, entityData, entityDataAccessor, props } = options || {}
  const menuOptions = typeof dropdownOptions === "function" ? dropdownOptions(row) : dropdownOptions
  const rowItem = <>
    {config.map(({ accessor, render, width, minWidth, copyable, href }) => {
      const style: {
        width?: string
        minWidth?: string
        height?: string
      } | undefined = {}
      if (width) {
        style["width"] = `${width}`
      } else {
        style["width"] = `${100 / (config.length + (dropdownOptions ? 1 : 0))}%`
      }
      if (minWidth) {
        style["minWidth"] = `${minWidth}`
      }
      if (rowHeight) {
        style["height"] = `${rowHeight}px !important`
      }
      const colContents = <>
        {(entityData && entityDataAccessor === accessor)
          ? <span class="inline-flex items-center justify-between gap-2">
            {entityData(row)}
            {render
              ? render(row)
              // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
              : <span safe> {`${row[accessor]}`} </span>}
          </span>
          : (
            render
              ? render(row)
              : <span safe>
                {typeof accessor === "function"
                  ? accessor(row)
                  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                  : `${row[accessor]}`}
              </span>
          )}
        {copyable &&
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          <Icon name="copy" class="cursor-pointer" onclick={`copyToClipboard(event, "${typeof accessor === "function" ? accessor(row) : row[accessor]}", () => toggleCopyIcon(event.target))`} />}
      </>
      return <td class={classNames("table__data")} style={style}>
        {rowLink ? <a  data-link-no-underline class="flex flex-grow justify-between items-center h-full px-4" href={href ? href(row) : rowLink(row)} hx-boost="true">
          {colContents}
        </a> : <div class="flex justify-between items-center">
          {colContents}
        </div>}
      </td>
    })}
    {menuOptions ? <td class="table__data table__menu w-[5%] min-w-fit text-center" {...menuOptions.length === 0 ? { "data-no-options": "true" } : {}}>
      <div {...menuCellId ? { id: menuCellId(row) } : {}}>
        <DropdownTrigger dropdownId={dropdownId}>
          <div class="flex justify-center items-center cursor-pointer">
            <Icon name={"dots-vertical"} size={20} class={"text-grey-100"} />
          </div>
        </DropdownTrigger>
        <Dropdown
          id={dropdownId}
          items={menuOptions}
        />
      </div>
    </td> : null}
  </>

  return <tr class={classNames("table__row")} {...rowId ? { id: rowId(row) } : {}} {...props}>
    {rowItem}
  </tr>
}

export default function Table<Row>({
  class: className,
  config,
  data,
  pagination,
  hasInputs,
  baseUrl,
  rowLink,
  children,
  additionalQueryParams,
  noDataProps = {
    noDataMessage: "No data available",
    noDataFoundMessage: "No data found",
  },
  fullPage = false,
  swapOOB,
  dropdownOptions,
  rowHeight,
  rowId,
  menuCellId,
  ...props
}: TableProps<Row>): JSX.Element {
  const sorterEnabled = !!data.length
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const url = `${buildQuerystringFromFiltersAndSorter(pagination as any)}`

  const missingItems = LISTING_ITEMS_PER_PAGE - data.length
  const emptyMessageHeight = ((rowHeight ?? 32) + 8) * LISTING_ITEMS_PER_PAGE

  const {
    noDataMessage,
    noDataFoundMessage,
    noDataComponent,
    noDataFoundComponent,
    noDataIcon,
    noDataFoundIcon,
    customShowNoDataFound
  } = noDataProps

  const implicitFilters = props.implicitFilters || []
  const showNoDataFound = typeof customShowNoDataFound === "function" ? customShowNoDataFound(pagination) : pagination?.search || Object.keys(pagination?.filters || {}).filter((key) => !implicitFilters.includes(key)).map((key) => pagination?.filters[key]).some(filter => filter)
  
  return (
    <div class={["flex-1 flex flex-col overflow-y-auto min-w-[600px]", className as string]} {...swapOOB ? { "hx-swap-oob": swapOOB } : {}} {...props}>
      <div class={classNames("overflow-x-auto rounded-t-lg", { "flex-1": fullPage })} onscroll="closeDropdowns(event.target)">
        <table class={["table", !!pagination && "table--paginated", !!hasInputs && "table--with-input"]}>
          <thead class="text-left">
            <tr>
              {config.map(({ heading, sortable, accessor, width, minWidth, field }) => {
                const style: {
                  width?: string
                  minWidth?: string
                } | undefined = {}
                if (width) {
                  style["width"] = `${width}`
                } else {
                  style["width"] = `${100 / (config.length + (dropdownOptions ? 1 : 0))}%`
                }
                if (minWidth) {
                  style["minWidth"] = `${minWidth}`
                }
                return (
                  <th class={classNames("table__head !p-0")} style={style}>
                    {sortable ?
                      <a
                        class={classNames("w-fit h-full cursor-pointer", { "pointer-events-none": !sorterEnabled })}
                        href={getSorterHref(typeof accessor === "function" ? accessor : accessor.toString(), url, field, additionalQueryParams)}
                        hx-boost="true"
                        hx-headers={JSON.stringify({ "HX-Template": "table", "HX-Disable-Loader": "true" })}
                        hx-target={props.id ? `#${props.id}` : undefined}
                        hx-swap="outerHTML"
                        data-link-no-underline
                      >
                        <div class={"flex items-center gap-2 py-2 px-4"}>
                          <p class={"truncate"} safe>{heading}</p>
                          <div class="flex flex-col items-center">
                            <div
                              class={classNames("table__sort-icon", { "opacity-50": !sorterEnabled }, setSorterIconClass(accessor.toString(), url))}
                            >
                              <Icon name={"chevron-up"} class="text-primary-700" size={8} />
                              <Icon name={"chevron-down"} class="text-primary-700" size={8} />
                            </div>
                          </div>
                        </div>
                      </a>
                      :
                      <div class={"flex justify-between items-center gap-2 py-2 px-4"}>
                        <p class={"truncate"} safe>{heading}</p>
                      </div>
                    }
                  </th>
                )
              })}
              {dropdownOptions ? <th class="table__head !p-0 w-[5%] min-w-fit">
                <div class={"flex justify-between items-center gap-2 py-2 px-4"}>
                  &nbsp;
                </div>
              </th> : null}
            </tr>
          </thead>
          {data.length ?
            <tbody>
              {(data || []).map((row) => {
                return getRowItem<Row>(
                  config,
                  row,
                  {
                    rowLink,
                    dropdownOptions,
                    rowHeight,
                    rowId,
                    menuCellId,
                    entityData: props.entityData,
                    entityDataAccessor: props.entityDataAccessor
                  }
                )
              })}
              {
                Array.from({ length: missingItems }).map(_ => {
                  const style: {
                    height?: string
                  } | undefined = {}
                  if (rowHeight) {
                    style["height"] = `${rowHeight}px !important`
                  }
                  return <tr class={classNames("table__row", "!pointer-events-none")}>
                      <td class={classNames("table__data")} style={style} colspan={config.length + (dropdownOptions ? 1 : 0)}></td>
                    </tr>
                  }) 
              }
            </tbody>
            :
            <tbody>
              <tr>
                <td colspan={config.length + (dropdownOptions ? 1 : 0)} class="table__data text-center text-gray-500" style={{ height: `${emptyMessageHeight}px !important` }}>
                  {showNoDataFound ? 
                    noDataFoundComponent ? 
                      noDataFoundComponent :
                      <>
                        <Icon name={noDataFoundIcon ?? "info-circle"} class="text-grey-400" size={100} />
                        <p safe>{noDataFoundMessage}</p>
                      </> :
                    noDataComponent ?
                      noDataComponent :
                      <>
                        <Icon name={noDataIcon ?? "info-circle"} class="text-grey-400" size={100} />
                        <p safe>{noDataMessage}</p>
                      </>
                  }
                </td>
              </tr>
            </tbody>
          }
        </table>
        {children && (
          <div class="w-full min-w-[900px] h-full">
            {children as "safe"}
          </div>
        )}
      </div>

      {
        pagination
          ? (() => {
            const { page, totalPages, totalItems, itemsPerPage, autoFocus, filters, ...htmxProps } = { ...pagination }
            return (
              <div class={classNames("table__footer", { "!px-0 !pb-1 !min-h-[52px]": fullPage })}>
                <div class={"flex items-center min-h-8 text-gray-600"}>
                  <div class="text-sm"><span class="font-semibold">{Math.min(page * itemsPerPage, totalItems)}</span> of <span class="font-semibold">{totalItems}</span></div>
                </div>

                {totalPages > 1
                  ?
                  <Pagination
                    pagination={pagination}
                    hx-target={props.id ? `#${props.id}` : undefined}
                    hx-headers={JSON.stringify({ "hx-template": "table" })}
                    {...htmxProps}
                    baseUrl={baseUrl ?? ""}
                  />
                  : null
                }
              </div>
            )
          })()
          : null
      }
    </div>
  )
}
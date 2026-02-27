import classNames from "classnames"
import Dropdown, { DropdownItem } from "$templates/components/dropdown/Dropdown"
import { Children } from "@kitajs/html"
import Card from "../Card"
import Icon, { IconName } from "../Icon"
import DropdownTrigger from "../dropdown/DropdownTrigger"

export type CardListPagination = Htmx.Attributes & {
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
}

type NoDataProps = {
  noDataMessage?: string
  noDataFoundMessage?: string
  noDataComponent?: JSX.Element
  noDataFoundComponent?: JSX.Element
  noDataIcon?: IconName
  noDataFoundIcon?: IconName
}

export type CardListProps<Item> = JSX.HtmlTag & {
  data: Item[]
  pagination?: CardListPagination
  baseUrl?: string
  dropdownOptions?: DropdownItem[] | ((data: Item) => DropdownItem[])
  rowLink?: (row: Item) => string
  children?: Children
  additionalQueryParams?: Record<string, string>
  noDataProps?: NoDataProps
  fullPage?: boolean
  swapOOB?: Htmx.Attributes["hx-swap-oob"]
  render?: (data: Item) => JSX.Element
  renderContent?: (data: Item) => JSX.Element
  renderCover?: (data: Item) => JSX.Element
  href?: (data: Item) => string
  itemClass?: (data: Item) => string,
  gridColsClass?: string
}

export default function CardList<Item>({
  class: className,
  data,
  pagination,
  href,
  baseUrl,
  rowLink,
  children,
  additionalQueryParams,
  noDataProps = {
    noDataMessage: "No data available",
    noDataFoundMessage: "No data found",
  },
  swapOOB,
  gridColsClass = "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  render,
  renderContent,
  renderCover,
  dropdownOptions,
  itemClass,
  ...props
}: CardListProps<Item>): JSX.Element {
  if (!render && !renderContent) {
    throw new Error("CardList requires either 'render' or 'renderContent' prop to render items.")
  }
  
  const {
    noDataMessage,
    noDataFoundMessage,
    noDataComponent,
    noDataFoundComponent,
    noDataIcon,
    noDataFoundIcon,
  } = noDataProps

  const showNoDataFound = pagination?.search || Object.values(pagination?.filters ?? {}).some(filter => filter)

  return (
    <div class={["w-full h-full flex flex-col justify-between", className as string]} {...swapOOB ? { "hx-swap-oob": swapOOB } : {}} {...props}>
      <div class={classNames("w-full gap-4 grid py-4", gridColsClass)} onscroll="closeDropdowns(event.target)">
        {data.length > 0 
          ? data.map((item) => {
            if (render) {
              return render(item)
            }
            
            const itemClassNames = itemClass ? itemClass(item) : ""
            return <Card
                class={classNames("p-2.5 flex flex-col gap-y-4 card-list__item", itemClassNames)}
                {...href && { href: href(item) }}
              >
                {renderCover
                  ? <div class="w-full">{renderCover(item)}</div>
                  : null
                }

                <div class="w-full relative">
                  {renderContent?.(item) as "safe"}

                  {dropdownOptions
                    ? <div class="w-[5%] min-w-fit text-center absolute top-0 right-0 card-list__data card-list__menu">
                        <DropdownTrigger dropdownId={`card-list-options-${(item as Record<"id", number>).id}`}>
                          <div class="flex justify-end items-center cursor-pointer">
                            <Icon name={"dots-vertical"} size={20} class={"text-grey-100"} />
                          </div>
                        </DropdownTrigger>
                        <Dropdown
                            id={`card-list-options-${(item as Record<"id", number>).id}`}
                            items={
                              typeof dropdownOptions === "function"
                                ? dropdownOptions(item)
                                : dropdownOptions
                            }
                          />
                      </div>
                    : null
                  }
                </div>

              </Card>
            })
          : <div class={"col-span-full flex flex-col gap-4 items-center justify-center min-h-[200px]"}>
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
            </div>
        }

        {children && (
          <div class="w-full min-w-[900px] h-full">
            {children as "safe"}
          </div>
        )}
      </div>

      {/* {
        pagination
          ? (() => {
            const { page, totalPages, totalItems, itemsPerPage, autoFocus, filters, ...htmxProps } = { ...pagination }
            return (
              <div class={classNames("table__footer", { "!px-0 !pb-1 !min-h-[52px]": fullPage })}>
                <div class={"flex items-center min-h-8 text-gray-400"}>
                  <div class="text-sm"><span class="text-grey-300 font-semibold">{Math.min(page * itemsPerPage, totalItems)}</span> results out of <span class="text-grey-300 font-semibold">{totalItems}</span></div>
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
      } */}
    </div>
  )
}
 
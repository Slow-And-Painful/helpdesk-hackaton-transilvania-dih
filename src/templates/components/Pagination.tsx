import { TablePagination } from "$templates/components/tables/Table"
import Icon from "$templates/components/Icon"

type PreparePaginationProps = {
  boundaryCount?: number
  count?: number
  page: number
  siblingCount?: number
}

export type PaginationItemType = "page" | "previous" | "next" | "ellipsis"

type PaginationItem = {
  type: PaginationItemType
  page: number | null
  current: boolean
}

const preparePagination = (props: PreparePaginationProps): PaginationItem[] => {
  const {
    boundaryCount = 1,
    count = 1,
    page,
    siblingCount = 1
  } = props

  const range = (start: number, end: number): number[] => {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i)
  }

  const startPages = range(1, Math.min(boundaryCount, count))
  const endPages = range(Math.max(count - boundaryCount + 1, boundaryCount + 1), count)

  const siblingsStart = Math.max(
    Math.min(
      // Natural start
      page - siblingCount,
      // Lower boundary when page is high
      count - boundaryCount - siblingCount * 2 - 1
    ),
    // Greater than startPages
    boundaryCount + 2
  )

  const siblingsEnd = Math.min(
    Math.max(
      // Natural end
      page + siblingCount,
      // Upper boundary when page is low
      boundaryCount + siblingCount * 2 + 2
    ),
    // Less than endPages
    endPages.length > 0 ? endPages[0] - 2 : count - 1
  )

  const itemList = [
    "previous",
    ...startPages,

    // Start ellipsis
    ...(siblingsStart > boundaryCount + 2
      ? ["ellipsis"]
      : boundaryCount + 1 < count - boundaryCount
        ? [boundaryCount + 1]
        : []),

    // Sibling pages
    ...range(siblingsStart, siblingsEnd),

    // End ellipsis
    ...(siblingsEnd < count - boundaryCount - 1
      ? ["ellipsis"]
      : count - boundaryCount > boundaryCount
        ? [count - boundaryCount]
        : []),

    ...endPages,
    "next"
  ] as Array<PaginationItemType | number>

  const items = itemList.map((item: PaginationItemType | number) => {
    return typeof item === "number"
      ? {
        type: "page",
        page: item,
        current: item === page,
      }
      : {
        type: item,
        page: null,
        current: false,
      }
  }) as PaginationItem[]

  const currentPage = items.find(e => e.current)?.page ?? 1
  items[0].page = Math.max(currentPage - 1, 1)
  items[items.length - 1].page = Math.min(currentPage + 1, count)

  return items
}

const getItemHref = (options: { item: PaginationItem, page: number, baseUrl?: string, prepend?: string }): string | undefined => {
  const { item, page, baseUrl, prepend } = options
  if (item.page && item.page !== page) {
    if (!baseUrl) {
      return `?${prepend ? prepend + "__" : ""}page=${item.page}`
    }
    return `${baseUrl}${baseUrl.includes("?") ? baseUrl.endsWith("&") ? "" : "&" : "?"}${prepend ? prepend + "__" : ""}page=${item.page}`
  }
}

type PaginationProps = Htmx.Attributes & {
  baseUrl: string
  pagination: TablePagination
  prepend?: string
}

export default ({
  baseUrl,
  pagination,
  prepend,
  ...htmxProps
}: PaginationProps) => {
  const { page, totalPages } = pagination ?? { page: 1, totalPages: 1 }
  const items = preparePagination({ count: totalPages, page })

  const completeBaseUrl = `${baseUrl}${baseUrl.includes("?") ? "&" : "?"}${pagination.baseUrl?.startsWith("?") || pagination.baseUrl?.startsWith("&") ? pagination.baseUrl.slice(1) : pagination.baseUrl ?? ""}`

  return (
    <div class="pagination">
      <ul class="pagination__items">
        {items.map(item => {
          const href = getItemHref({ item, page, baseUrl: completeBaseUrl, prepend })
          return (
            <li class="pagination__item">
              <a
                class={[
                  "pagination__link",
                  item.current && "pagination__link--current",
                  !item.current && !href && "pagination__link--disabled",
                  item.type === "ellipsis" && "pagination__link--ellipsis",
                ]}
                href={href}
                {...(href ? {
                  "hx-boost": "true",
                  ...htmxProps
                } : {})}
              >
                {item.type === "page" ? item.page : null}
                {item.type === "ellipsis" ? "..." : null}
                {item.type === "previous"
                  ? <>
                    <Icon name="pagination-chevron-left" size={12} />
                  </>
                  : null
                }
                {item.type === "next"
                  ? <>
                    <Icon name="pagination-chevron-right" size={12} />
                  </>
                  : null
                }
              </a>
            </li>
          )
        }
        )}
      </ul>
    </div>
  )
}

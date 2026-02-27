export function buildQuerystringFromFiltersAndSorter(options?: {
  filters?: Record<string, string | string[] | undefined>
  sorter?: string | undefined
  search?: string | undefined
  searchField?: string | undefined
  autoFocus?: string | undefined
}): string {
  const searchParams = new URLSearchParams()
  const { filters, sorter, search, searchField, autoFocus } = options ?? {}
  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        if (Array.isArray(value)) {
          value.forEach((value) => searchParams.append(key, value))
        } else {
          searchParams.append(key, value)
        }
      }
    })
  }

  const keys = Array.from(searchParams.keys())
  for (const key of keys) {
    const values = searchParams.getAll(key)
    if (values.includes("true") && values.includes("false")) {
      searchParams.delete(key, "true")
      searchParams.delete(key, "false")
    }
  }

  if (sorter) {
    searchParams.append("sorter", sorter)
  }
  if (search) {
    searchParams.append("search", search)
  }
  if (searchField) {
    searchParams.append("searchField", searchField)
  }
  if (autoFocus) {
    searchParams.append("autoFocus", autoFocus === "true" ? "true" : "false")
  }
  const queryString = searchParams.toString()
  return queryString ?? ""
}

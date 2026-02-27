import { QuerystringBoolean } from "$types/index"
import { and, eq, ilike, isNull, or, sql, SQL } from "drizzle-orm"
import { PgTable } from "drizzle-orm/pg-core"

export type AllowedValuesType = Record<string, "boolean" | "string">

export const LISTING_ITEMS_PER_PAGE = 10

export type CommonQueryString = {
  blocked?: string | string[]
  search?: string
  searchField?: string
  userType?: string | string[]
  page?: string
  sorter?: string
  autoFocus?: QuerystringBoolean
}

export function filterQuerystringValues<Value extends AllowedValuesType[0]>(
  allowedValues: Value[],
  query?: string | string[],
): Value[] {
  if (!query) {
    return []
  }

  if (typeof query === "string") {
    return allowedValues.includes(query as Value) ? [query as Value] : []
  }

  return query.filter((v) => allowedValues.includes(v as Value)) as Value[]
}

export function generateWhereFromQuerystring<TABLE extends PgTable>(
  query: CommonQueryString,
  allowedValues: AllowedValuesType,
  allowedSearchField: string[],
  table: TABLE,
) {
  const finalWhere: SQL[] = []

  const { search, searchField } = query

  if (search) {
    if (
      Object.keys(allowedSearchField).includes(
        searchField as keyof AllowedValuesType,
      )
    ) {
      finalWhere.push(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ilike(table[searchField as unknown as keyof TABLE] as any, `%${search.trim()}%`),
      )
    } else {
      if (allowedSearchField.includes("firstName") && allowedSearchField.includes("lastName")) {
        allowedSearchField = allowedSearchField.filter((field) => field !== "firstName" && field !== "lastName")
        allowedSearchField.push(...["firstName", "lastName", "firstName"])
      }
      const concatenatedFields = allowedSearchField.map(field => `"${field}"`).join(", ' ', ")
      const searchValue = `%${search.trim()}%`

      finalWhere.push(
        ilike(sql.raw(`CONCAT(${concatenatedFields})`), searchValue),
      )
    }
  }

  for (const [key, value] of Object.entries(query).filter(([key, _]) =>
    Object.keys(allowedValues).includes(key),
  )) {
    const typed_key = key as unknown as keyof TABLE
    if (!table[typed_key]) {
      continue
    }
    if (allowedValues[key] === "string") {
      if (typeof value === "string") {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        finalWhere.push(eq(table[typed_key] as any, value))
      } else if (value === null) {
        finalWhere.push(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          isNull(table[typed_key] as any,),
        )
      } else {
        if (value === null) {
          finalWhere.push(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            isNull(table[typed_key] as any,),
          )
        } else {
          finalWhere.push(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            or(...value.map((v) => eq(table[typed_key] as any, v))) as SQL,
          )
        }
      }
    } else if (allowedValues[key] === "boolean") {
      if (!Array.isArray(value)) {
        finalWhere.push(
          sql`${table[typed_key]} = ${value.toLowerCase() === "true"}`,
        )
      }
    }
  }

  return and(...finalWhere)
}

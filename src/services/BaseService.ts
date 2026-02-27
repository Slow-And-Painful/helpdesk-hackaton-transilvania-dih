/* eslint-disable @typescript-eslint/no-explicit-any */
import DrizzleDB, { DrizzleWithSchemas } from "$components/DrizzleDB"
import { PgColumn, PgTable, PgTransaction } from "drizzle-orm/pg-core"
import { and, asc, desc, eq, or, SelectedFields, sql, SQL } from "drizzle-orm"
import { PostgresJsQueryResultHKT } from "drizzle-orm/postgres-js"
import Postgres from "postgres"
import { withTransaction } from "$utils/drizzle"
import { buildQuerystringFromFiltersAndSorter } from "$utils/buildQueryString"
import { generateWhereFromQuerystring, LISTING_ITEMS_PER_PAGE } from "$utils/listing"

// export type CommonTransaction = PgTransaction<PostgresJsQueryResultHKT, any, any>
// export type CommonPgDatabase = PgDatabase<PostgresJsQueryResultHKT, any, any>

export type CommonPgDatabase = DrizzleWithSchemas
export type CommonTransaction = PgTransaction<
  PostgresJsQueryResultHKT,
  any,
  any
>

export type MainQuery<MAIN_QUERY_RESULT> = (options: {
  db: CommonPgDatabase // | CommonTransaction,
  where?: SQL
  limit?: number
  offset?: number
  orderBy?: (PgColumn | SQL)[]
}) => Promise<MAIN_QUERY_RESULT[]>

export type CommonOptions<MAIN_QUERY_RESULT> = {
  select?: SelectedFields<PgColumn, PgTable>
  transaction?: CommonTransaction
  where?: SQL
  skipBaseWhere?: boolean
  mainQuery?: MainQuery<MAIN_QUERY_RESULT>,
  forUpdate?: boolean
  skipLocked?: boolean
}

export type BaseQueryOptions<MAIN_QUERY_RESULT> =
  CommonOptions<MAIN_QUERY_RESULT> & {
    limit?: number
    offset?: number
    orderBy?: (PgColumn | SQL)[]
  }

export type BaseQuery<MAIN_QUERY_RESULT = any, OUT = any> = (
  options?: BaseQueryOptions<MAIN_QUERY_RESULT>,
) => Promise<OUT[]>
export type ServiceListingFn<MAIN_QUERY_RESULT, POST_PROCESS_RESULT> = (
  options?: CommonOptions<MAIN_QUERY_RESULT> & {
    limit?: number
    offset?: number
    orderBy?: (PgColumn | SQL)[]
  },
) => Promise<POST_PROCESS_RESULT[]>

export default abstract class BaseServiceNew<
  TABLE extends PgTable,
  PK_TYPE extends number | string | Record<string, number | string>,
  MAIN_QUERY_RESULT,
  POST_PROCESS_RESULT,
  PRE_INSERT_DATA = TABLE["$inferInsert"],
> {
  drizzle: DrizzleWithSchemas
  _postgreSQL: Postgres.Sql
  sql: typeof sql

  abstract mainTable: TABLE
  abstract pk: PgColumn | Record<string, PgColumn>

  constructor(drizzleDB: DrizzleDB) {
    this.drizzle = drizzleDB.drizzle
    this._postgreSQL = drizzleDB._postgresSql
    this.sql = drizzleDB.sql
  }

  baseWhere?: SQL | (() => SQL) = undefined
  baseSelect?: SelectedFields<PgColumn, TABLE> = undefined
  baseOrderBy?: (PgColumn | SQL)[] = undefined

  allowedFilters: Record<string, "boolean" | "string"> = {}
  allowedSearchField: string[] = []

  preprocessQueryParams?: (
    query: Record<string, string>,
  ) => Record<string, string> = undefined

  mainQuery: MainQuery<MAIN_QUERY_RESULT> = async (options: {
    db: CommonPgDatabase | CommonTransaction
    where?: SQL
    limit?: number
    offset?: number
    orderBy?: (PgColumn | SQL)[]
  }): Promise<MAIN_QUERY_RESULT[]> => {
    const { where, limit, offset, orderBy, db } = options

    const select = this.baseSelect

    let query
    if (select) {
      query = db
        .select(select)
        .from(this.mainTable as PgTable)
        .$dynamic()
    } else {
      query = db
        .select()
        .from(this.mainTable as PgTable)
        .$dynamic()
    }

    if (orderBy) {
      query = query.orderBy(...orderBy, ...this.orderBy)
    }

    if (where) {
      query = query.where(where)
    }

    if (limit) {
      query = query.limit(limit)
    }

    if (offset) {
      query = query.offset(offset)
    }

    const results = await query
    return results as unknown as MAIN_QUERY_RESULT[]
  }

  get _baseWhere() {
    return typeof this.baseWhere === "function"
      ? this.baseWhere()
      : this.baseWhere
  }

  get orderBy() {
    return this.baseOrderBy || [...this.pkColumns.map(e => asc(e))]
  }

  private get pkReturningClause() {
    if (this.pk instanceof PgColumn) {
      return { [this.pk.name]: this.pk }
    } else {
      return Object
        .values(this.pk)
        .reduce((acc, partialPk) => {
            acc[partialPk.name] = partialPk
            return acc
        }, {} as Record<string, PgColumn>)
    }
  }

  _composeWhere = (...where: (SQL | undefined)[]): SQL | undefined => {
    const whereArray = where.filter((e) => e !== undefined)
    if (whereArray.length === 0) {
      return undefined
    }

    if (whereArray.length === 1) {
      return whereArray[0]
    } else {
      return and(...whereArray)
    }
  }

  postProcess?: (
    results: MAIN_QUERY_RESULT[],
    options?: CommonOptions<MAIN_QUERY_RESULT>,
  ) => Promise<POST_PROCESS_RESULT[]> = undefined
  preInsertProcess?: (
    data: PRE_INSERT_DATA[],
    options?: CommonOptions<MAIN_QUERY_RESULT>,
  ) => Promise<TABLE["$inferInsert"][]> = undefined
  postInsertProcess?: (
    inputData: PRE_INSERT_DATA[],
    pkValues: PK_TYPE[],
    options?: CommonOptions<MAIN_QUERY_RESULT>,
  ) => Promise<void> = undefined

  private get pkColumns() {
    if (this.pk instanceof PgColumn) {
      return [this.pk]
    } else {
      return Object.values(this.pk)
    }
  }

  protected _getPkWhere = (pk: PK_TYPE): SQL => {
    return and(
      ...this.pkColumns.map(pkColumn =>
        eq(
            pkColumn,
            this.pk instanceof PgColumn ? pk : pk[pkColumn.name as keyof PK_TYPE]
        )
      )
    ) as SQL
  }

  private _arePksEquals = (pk1: PK_TYPE, pk2: PK_TYPE): boolean => {
    if (this.pk instanceof PgColumn) {
      return pk1 === pk2
    } else {
      return Object
        .values(this.pk)
        .every(pkColumn => {
            const key = pkColumn.name as keyof PK_TYPE
            return pk1[key] === pk2[key]
        })
    }
  }

  // baseQuery = async (
  //   options?:
  //     CommonOptions<MAIN_QUERY_RESULT> & {
  //       limit?: number,
  //       offset?: number,
  //       orderBy?: (PgColumn | SQL)[],
  //     }
  // ): Promise<POST_PROCESS_RESULT[]> => {

  private getPkValue = (entity: any): PK_TYPE => {
    if (this.pk instanceof PgColumn) {
        return entity[this.pk.name]
    } else {
        return Object
            .values(this.pk)
            .reduce((acc, partialPk) => {
                acc[partialPk.name] = entity[partialPk.name] as string | number
                return acc
            }, {} as Record<string, number | string>) as PK_TYPE
    }
  }

  baseQuery = async <OUT extends POST_PROCESS_RESULT = POST_PROCESS_RESULT>(
    options?: CommonOptions<MAIN_QUERY_RESULT> & {
      limit?: number
      offset?: number
      orderBy?: (PgColumn | SQL)[]
    },
  ): Promise<OUT[]> => {
    let { limit, offset } = options || {}

    const {
      transaction,
      where: optionsWhere,
      skipBaseWhere = false,
      mainQuery: optionsMainQuery,
      orderBy: optionsOrderBy = [],
      forUpdate,
      skipLocked,
    } = options || {}

    const whereConstraints: SQL[] = []

    if (!skipBaseWhere && this._baseWhere) {
      whereConstraints.push(this._baseWhere)
    }

    if (optionsWhere) {
      whereConstraints.push(optionsWhere)
    }

    const db = transaction || this.drizzle
    let where = this._composeWhere(...whereConstraints)
    const orderBy = [...optionsOrderBy, ...this.orderBy]
    const mainQuery = optionsMainQuery || this.mainQuery
       
    if (forUpdate) {
      let query = db
        .select(
          this.pkReturningClause
        )
        .from(this.mainTable as PgTable)
        .where(where)
        .for(
          "update",
          skipLocked
            ? {
                skipLocked: true,
              }
            : undefined,
        )
        .$dynamic()
        
        if (limit) {
          query = query.limit(limit)
          limit = undefined // reset limit to avoid double limiting in 
        }

        if (offset) {
          query = query.offset(offset)
          offset = undefined // reset offset to avoid double offsetting
        }

        if (orderBy.length) {
          query = query.orderBy(...orderBy)
        }

        const pks = await query

        // No value locked. Return empty array
        if (pks.length === 0) {
          return []
        }

        // Retrieve only the values locked by the query
        where = this._composeWhere(
          or(
            ...pks.map((pk) => this._getPkWhere(this.getPkValue(pk))),
          )
        )
    }

    const raw = await mainQuery({
      db: db as DrizzleWithSchemas,
      where,
      orderBy,
      limit,
      offset,
    })

    const out = await this._postProcess(raw, options)
    return out as OUT[]
  }

  _postInsertProcess = async (
    inputData: PRE_INSERT_DATA[],
    pkValues: PK_TYPE[],
    options?: CommonOptions<MAIN_QUERY_RESULT>,
  ): Promise<void> => {
    if (this.postInsertProcess) {
      if (pkValues.length) {
        return this.postInsertProcess(inputData, pkValues, options)
      }
    }
  }

  _preInsertProcess = async (
    rawData: PRE_INSERT_DATA[],
    options?: CommonOptions<MAIN_QUERY_RESULT>,
  ): Promise<TABLE["$inferInsert"][]> => {
    if (this.preInsertProcess) {
      if (rawData.length) {
        return this.preInsertProcess(rawData, options)
      }
    }

    return rawData as unknown as TABLE["$inferInsert"][]
  }

  _postProcess = async <E extends MAIN_QUERY_RESULT>(
    rawResults: E[],
    options?: CommonOptions<MAIN_QUERY_RESULT>,
  ): Promise<POST_PROCESS_RESULT[]> => {
    if (this.postProcess) {
      if (rawResults.length) {
        return this.postProcess(rawResults, options)
      }
    }

    return rawResults as unknown as POST_PROCESS_RESULT[]
  }

  get = async <OUT extends POST_PROCESS_RESULT = POST_PROCESS_RESULT>(
    pk: PK_TYPE,
    options?: CommonOptions<MAIN_QUERY_RESULT>,
  ): Promise<OUT | null> => {
    const [result] = await this.baseQuery<OUT>({
      ...options,
      where: this._composeWhere(
        this._getPkWhere(pk),
        options?.where
      ),
      limit: 1,
      offset: 0,
    })

    if (!result) {
      return null
    }

    return result
  }

  getOrFail = async <OUT extends POST_PROCESS_RESULT = POST_PROCESS_RESULT>(
    pk: PK_TYPE,
    options?: CommonOptions<MAIN_QUERY_RESULT>,
  ): Promise<OUT> => {
    const result = await this.get<OUT>(pk, options)

    if (!result) {
      throw new Error(
        `No record found with pk ${JSON.stringify(pk)}`,
      )
    }

    return result
  }

  mGet = async <OUT extends POST_PROCESS_RESULT = POST_PROCESS_RESULT>(
    pks: PK_TYPE[],
    options?: CommonOptions<MAIN_QUERY_RESULT>,
  ): Promise<(OUT | null)[]> => {
    if (pks.length === 0) {
      return []
    }

    const results = await this.baseQuery<OUT>({
      ...options,
      where: this._composeWhere(
        or(
            ...pks.map(pk => this._getPkWhere(pk))
        ),
        options?.where
      ),
    })

        return pks
            .map(pk => (
                results.find(
                    result => (
                        this._arePksEquals(pk, this.getPkValue(result))
                    )
                )
            ) || null)
  }

  mGetOrFail = async <OUT extends POST_PROCESS_RESULT = POST_PROCESS_RESULT>(
    pks: PK_TYPE[],
    options?: CommonOptions<MAIN_QUERY_RESULT>,
  ): Promise<OUT[]> => {
    const rawOut = await this.mGet<OUT>(pks, options)
    const out = []

    for (const e of rawOut) {
      if (!e) {
        throw new Error(
          `No ${this.mainTable._.name} found with ${JSON.stringify(this.pk)} ${JSON.stringify(pks)}`,
        )
      }

      out.push(e)
    }

    return out
  }

  // mGetPartial = async <T = Partial<MAIN_QUERY_RESULT>>(
  //   pks: PK_TYPE[],
  //   options?: CommonOptions<MAIN_QUERY_RESULT>,
  // ): Promise<T[]> => {
  //   if (pks.length === 0) {
  //     return []
  //   }

  //   const rawResults = await this.baseQuery({
  //     ...options,
  //     where: this._composeWhere(inArray(this.pk, pks), options?.where),
  //   })

  //   return pks
  //     .map(
  //       (pk) =>
  //         rawResults.find((result) => {
  //           return result[this.pk.name as keyof typeof result] === pk
  //         }) as T,
  //     )
  //     .filter((e) => e !== undefined)
  // }

  list = async <OUT extends POST_PROCESS_RESULT = POST_PROCESS_RESULT>(
    options?: CommonOptions<MAIN_QUERY_RESULT> & {
      limit?: number
      offset?: number
      orderBy?: (PgColumn | SQL)[]
    },
  ): Promise<OUT[]> => {
    const out = await this.baseQuery<OUT>(options)
    return out
  }

  listWithQuery = async <OUT extends POST_PROCESS_RESULT = POST_PROCESS_RESULT>(queryParams: Record<string, string> & { limit?: number | null, skipBaseWhere?: boolean }, getCount = false, additionalWhere?: SQL): Promise<{
    sorter?: string,
    items: OUT[],
    page: number,
    search?: string,
    searchField?: string,
    autoFocus?: string,
    filters: Record<string, any | null>,
    totalItems: number,
    totalPages: number
  }> => {
    const { page: queryParamsPage, sorter, search, searchField, autoFocus, skipBaseWhere, ...restQueryParams } = queryParams

    let limit: number | null = null
    if (queryParams.limit) {
      limit = queryParams.limit
    } else if (queryParams.limit === undefined) {
      limit = LISTING_ITEMS_PER_PAGE
    }
    
    let page = queryParamsPage
    let calculatedPage = Math.max(parseInt(page) || 1, 1)
    let offset = (calculatedPage - 1) * (limit ? limit : 1)

    let sorterField: PgColumn | undefined

    let sorterDirection = desc
    if (sorter) {
      if (sorter.startsWith("-")) {
        sorterDirection = desc
      } else {
        sorterDirection = asc
      }
      const col = sorter.replace("-", "")
      if (col in this.mainTable) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        sorterField = this.mainTable[col]
      }
    }
    const recalculatedQParams = this.preprocessQueryParams
      ? this.preprocessQueryParams(restQueryParams)
      : restQueryParams

    const where = generateWhereFromQuerystring<TABLE>(
      { search, searchField, ...recalculatedQParams },
      this.allowedFilters,
      this.allowedSearchField,
      this.mainTable
    )

    const filters = Object.keys(this.allowedFilters).reduce((acc, key) => {
      acc[key] = Object.keys(recalculatedQParams).includes(key)
        ? recalculatedQParams[key]
        : null
      return acc
    }, {} as Record<string, string | null>)

    let totalItems = 0
    if (getCount) {
      totalItems = await this.count({ where: additionalWhere ? and(where, additionalWhere) : where })
    }

    const totalPages = Math.ceil(totalItems / (limit ? limit : 1))

    // if page is greater than total pages, set it to total pages
    if ((parseInt(page) || 1) > totalPages) {
      page = totalPages.toString()
      calculatedPage = Math.max(totalPages - 1, 0)
      offset = calculatedPage * (limit ? limit : 1)
    }

    const out = await this.baseQuery<OUT>({
      where: additionalWhere ? and(where, additionalWhere) : where,
      ...limit !== null ? { limit } : {},
      offset,
      orderBy: sorterField ? [sorterDirection(sorterField)] : undefined,
      skipBaseWhere,
    })

    return {
      sorter,
      filters,
      items: out,
      page: Math.min(parseInt(page) || 1, totalPages),
      search,
      searchField,
      autoFocus,
      totalItems,
      totalPages
    }
  }

  getTableItems = async (query: { 
    limit?: number | null; 
    skipBaseWhere?: boolean;
    [key: string]: string | number | boolean | null | undefined;
  }, additionalWhere?: SQL): Promise<{
    items: POST_PROCESS_RESULT[]
    pagination: {
      itemsPerPage: number
      page: number
      totalItems: number
      totalPages: number
      sorter?: string
      filters: Record<string, string | string[] | undefined>
      search?: string
      searchField?: string
      autoFocus?: string
      baseUrl: string
    }
  }> => {
    const {
      items,
      totalItems,
      totalPages,
      page,
      sorter,
      search,
      searchField,
      autoFocus,
      filters,
    } = await this.listWithQuery(
      query as Omit<Record<string, string>, "userId" | "section">,
      true,
      additionalWhere
    )

    return {
      items,
      pagination: {
        itemsPerPage: 10,
        page,
        totalItems,
        sorter,
        filters,
        search,
        searchField,
        autoFocus,
        totalPages,
        baseUrl: buildQuerystringFromFiltersAndSorter({
          filters,
          sorter,
          search,
          searchField,
          autoFocus,
        }),
      },
    }
  }

  count = async (
    options?: CommonOptions<MAIN_QUERY_RESULT>,
  ): Promise<number> => {
    const count = (await this.baseQuery(options)).length
    return count
  }

  sInsert = async (
    data: PRE_INSERT_DATA,
    options?: CommonOptions<MAIN_QUERY_RESULT>,
  ): Promise<POST_PROCESS_RESULT> => {
    return this.insert(data, options) as Promise<POST_PROCESS_RESULT>
  }

  insert = async <
    P extends PRE_INSERT_DATA | PRE_INSERT_DATA[],
    S extends { skipRetrieval?: boolean },
  >(
    data: P,
    options?: CommonOptions<MAIN_QUERY_RESULT> & S,
  ): Promise<
    S["skipRetrieval"] extends true
      ? void
      : P extends PRE_INSERT_DATA
        ? POST_PROCESS_RESULT
        : POST_PROCESS_RESULT[]
  > => {
    const { transaction, skipRetrieval = false } = options || {}

    // Normalize the data to an array
    const dataValues = Array.isArray(data) ? data : [data]

    // Insert the data: if a transaction is provided, use it, otherwise create a new one
    const returnData = await withTransaction({
      db: this.drizzle,
      transaction,
      fn: async (transaction: CommonTransaction) => {
        const internalOptions = {
          ...options,
          transaction,
        }

        if (!dataValues.length) {
          if (skipRetrieval) {
            return
          }

          if (Array.isArray(data)) {
            return [] as POST_PROCESS_RESULT[]
          }
        }

        const insertData = await this._preInsertProcess(
          dataValues as PRE_INSERT_DATA[],
          internalOptions,
        )

        const results = await transaction
            .insert(this.mainTable)
            .values(insertData)
            .returning(this.pkReturningClause)

        const pkValues = results.map((r) => this.getPkValue(r))

        await this._postInsertProcess(
          dataValues as PRE_INSERT_DATA[],
          pkValues,
          internalOptions,
        )

        if (skipRetrieval) {
          return
        }

        const returnData: POST_PROCESS_RESULT[] = await this.mGetOrFail(
          pkValues,
          internalOptions,
        )

        // Return the data in the same format as the input

        if (Array.isArray(data)) {
          return returnData
        }

        return returnData[0]
      },
    })

    return returnData as S["skipRetrieval"] extends true
      ? void
      : P extends PRE_INSERT_DATA
        ? POST_PROCESS_RESULT
        : POST_PROCESS_RESULT[]
  }

  mInsert = async (
    data: PRE_INSERT_DATA[],
    options?: CommonOptions<MAIN_QUERY_RESULT>,
  ): Promise<POST_PROCESS_RESULT[]> => {
    if (data.length === 0) {
      return []
    }

    return this.insert(data, options) as Promise<POST_PROCESS_RESULT[]>
  }

  update = async (
    pk: PK_TYPE,
    data: Partial<TABLE["$inferInsert"]>,
    options?: CommonOptions<MAIN_QUERY_RESULT>,
  ): Promise<void> => {
    const { transaction } = options || {}

    const db = transaction || this.drizzle

    await db.update(this.mainTable).set(data).where(this._getPkWhere(pk))
  }

  delete = async (
    pk: PK_TYPE,
    options?: Pick<CommonOptions<MAIN_QUERY_RESULT>, "transaction">,
  ): Promise<void> => {
    const { transaction } = options || {}

    const db = transaction || this.drizzle

    await db.delete(this.mainTable).where(this._getPkWhere(pk))
  }

  mUpdate = async (
    options: CommonOptions<MAIN_QUERY_RESULT> & {
      setData: Partial<TABLE["$inferInsert"]>
    },
  ): Promise<POST_PROCESS_RESULT[]> => {
    const { setData, where, ...restOptions } = options || {}

    const db = restOptions.transaction || this.drizzle

    const results = await db
      .update(this.mainTable)
      .set(setData)
      .where(where)
      .returning(this.pkReturningClause)

    const pkValues = results.map((r) => this.getPkValue(r))

    return this.mGetOrFail(pkValues, restOptions)
  }

  multiUpdate = async (
    options: Omit<
      CommonOptions<MAIN_QUERY_RESULT>,
      "where" | "mainQuery" | "skipBaseWhere"
    > & {
      set: {
        values: Partial<TABLE["$inferInsert"]>
        pk: PK_TYPE
      }[]
    },
  ): Promise<void> => {
    const { set: setInput, transaction } = options || {}

    const db = transaction || this.drizzle

    const keys = Array.from(
      new Set(setInput.map(({ values }) => Object.keys(values)).flat()),
    ) as (keyof TABLE["$inferInsert"])[]

    const pks = setInput.map(({ pk }) => pk)
    const where = or(
      ...pks.map(pk => this._getPkWhere(pk))
    )

    const set: Partial<Record<keyof TABLE["$inferInsert"], SQL>> = {}

    // Update many with different values for each row in single query
    // https://orm.drizzle.team/learn/guides/update-many-with-different-value
    for (const key of keys) {
      const sqlChunks: SQL[] = [this.sql`(CASE`]

      const inputWithKey = setInput.filter(({ values }) => key in values)
      for (const { pk, values } of inputWithKey) {
        const rawValue = values[key]
        const column = this.mainTable[key] as PgColumn
        const value = this.sql.param(rawValue, column)
        sqlChunks.push(this.sql`WHEN ${this.pk} = ${pk} THEN ${value}`)
      }

      sqlChunks.push(this.sql`ELSE ${this.mainTable[key]} END)`)
      const finalSql: SQL = this.sql.join(sqlChunks, this.sql.raw(" "))

      set[key] = finalSql
    }

    await db.update(this.mainTable).set(set).where(where)
  }
}

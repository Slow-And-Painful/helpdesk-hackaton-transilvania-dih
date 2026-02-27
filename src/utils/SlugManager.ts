/* eslint-disable @typescript-eslint/no-explicit-any */
import { InferInsertModel, eq, like, or } from "drizzle-orm"
import { PgColumn, PgTable } from "drizzle-orm/pg-core"
import BaseSchemaService, { CommonOptions } from "$services/BaseService"
import slugify from "slugify"

type PgTableWithSlugColumn = PgTable & {
  slug: PgColumn
}

type HasSlug = {
  slug: string
}

export default class SlugManager<
  S extends BaseSchemaService<T, any, any, E>,
  T extends PgTableWithSlugColumn,
  E extends HasSlug,
  P extends Partial<E> = E,
  I extends Partial<InferInsertModel<T>> = Partial<InferInsertModel<T>>,
> {
  service
  slugifyParams = { lower: true, strict: true }

  constructor(service: S) {
    if (!("slug" in service.mainTable)) {
      throw new Error(
        "Can't be assigned to a service of a table without a slug column",
      )
    }

    this.service = service
  }

  async _slug(
    name: string,
    options?: CommonOptions<S>,
    separator: string = "-",
  ): Promise<string> {
    const mainTable = this.service.mainTable
    const list = this.service.list

    let slug = slugify(name, this.slugifyParams)
    let dbEntities = await list({
      ...options,
      where: or(eq(mainTable.slug, slug), like(mainTable.slug, `${slug}-%`)),
      limit: 1,
    })

    if (dbEntities.length > 0) {
      while (dbEntities.length > 0) {
        const splitSlug = dbEntities[0].slug.split(separator)
        let slugId = parseInt(splitSlug[splitSlug.length - 1])

        if (isNaN(slugId)) {
          slugId = 1
          splitSlug.push(slugId.toLocaleString())
        } else {
          splitSlug[splitSlug.length - 1] = `${slugId + 1}`
        }

        slug = splitSlug.join(separator)

        dbEntities = await list({ ...options, where: eq(mainTable.slug, slug) })
      }
    }

    return slug
  }

  async createUniqueSlug(
    data: I,
    keys: [keyof I, ...(keyof I)[]],
    options?: CommonOptions<S>,
    separator: string = "-",
  ): Promise<string> {
    let fullStringToSlugify: string = ""
    for (const key of keys) {
      fullStringToSlugify += String(data[key]) + " "
    }

    fullStringToSlugify = fullStringToSlugify.toLocaleLowerCase()
    return this._slug(fullStringToSlugify, options, separator)
  }

  async getBySlug(slug: string, options?: CommonOptions<S>): Promise<E | null> {
    const mainTable = this.service.mainTable
    const list = this.service.list

    const [result] = await list({
      ...options,
      limit: 1,
      offset: 0,
      where: eq(mainTable.slug, slug),
    })

    return result || null
  }

  async getBySlugOrFail(slug: string, options?: CommonOptions<S>): Promise<E> {
    const result = await this.getBySlug(slug, options)

    if (!result) {
      throw new Error("No entity found")
    }

    return result
  }

  getBaseEntityBySlug = async (slug: string, options?: CommonOptions<S>) => {
    const result = await this.getBySlugPartial<P>(slug, options)

    return result
  }

  getBySlugPartial = async <T = Partial<E>>(
    slug: string,
    options?: CommonOptions<S>,
  ): Promise<T> => {
    const service = this.service

    const [rawResult] = await service.baseQuery({
      ...options,
      where: this.service._composeWhere(
        eq(service.mainTable.slug, slug),
        options?.where,
      ),
    })

    return rawResult as unknown as T
  }

  async getSlugPreview(
    name: string,
    options?: CommonOptions<S>,
    separator: string = "-",
  ): Promise<string> {
    return this._slug(name, options, separator)
  }
}

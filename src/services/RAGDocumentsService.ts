import BaseService, { MainQuery } from "$services/BaseService"
import DrizzleDB from "$components/DrizzleDB"
import { container, inject, injectable } from "tsyringe"
import { NewRAGDocumentSchema, RAGDocumentSchema, ragDocumentsTable } from "$dbSchemas/ragDocuments"

export type RAGDocument = RAGDocumentSchema

type TABLE = typeof ragDocumentsTable
type PK_TYPE = number
type MAIN_QUERY_RESULT = RAGDocument
type POST_PROCESS_RESULT = RAGDocument
export type PRE_INSERT_DATA = NewRAGDocumentSchema

@injectable()
export default class RAGDocumentsService extends BaseService<
  TABLE,
  PK_TYPE,
  MAIN_QUERY_RESULT,
  POST_PROCESS_RESULT,
  PRE_INSERT_DATA
> {
  mainTable = ragDocumentsTable
  pk = ragDocumentsTable.id
  allowedSearchField = ["name"]
  allowedFilters = { id: "string" } as Record<string, "string" | "boolean">

  constructor(
    @inject(DrizzleDB.token)
    drizzleDB: DrizzleDB
  ) {
    super(drizzleDB)
  }

  mainQuery: MainQuery<MAIN_QUERY_RESULT> = async ({ db, ...options }) => {
    return db.query.ragDocumentsTable.findMany({
      ...options,
      with: {
        department: true,
      },
    })
  }

  static token = Symbol("RAGDocumentsService")
}

container.register(RAGDocumentsService.token, RAGDocumentsService)

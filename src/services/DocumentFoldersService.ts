import BaseService, { MainQuery } from "$services/BaseService"
import DrizzleDB from "$components/DrizzleDB"
import { container, inject, injectable } from "tsyringe"
import { DocumentFolderSchema, NewDocumentFolderSchema, documentFoldersTable } from "$dbSchemas/DocumentFolders"

export type DocumentFolder = DocumentFolderSchema & {
  children: DocumentFolderSchema[]
}

type TABLE = typeof documentFoldersTable
type PK_TYPE = number
type MAIN_QUERY_RESULT = DocumentFolder
type POST_PROCESS_RESULT = DocumentFolder
export type PRE_INSERT_DATA = NewDocumentFolderSchema

@injectable()
export default class DocumentFoldersService extends BaseService<
  TABLE,
  PK_TYPE,
  MAIN_QUERY_RESULT,
  POST_PROCESS_RESULT,
  PRE_INSERT_DATA
> {
  mainTable = documentFoldersTable
  pk = documentFoldersTable.id
  allowedSearchField = ["name"]
  allowedFilters = { departmentId: "string", parentId: "string" } as Record<string, "string" | "boolean">

  constructor(
    @inject(DrizzleDB.token)
    drizzleDB: DrizzleDB
  ) {
    super(drizzleDB)
  }

  mainQuery: MainQuery<MAIN_QUERY_RESULT> = async ({ db, ...options }) => {
    return db.query.documentFoldersTable.findMany({
      ...options,
      with: {
        children: true,
      },
    })
  }

  static token = Symbol("DocumentFoldersService")
}

container.register(DocumentFoldersService.token, DocumentFoldersService)

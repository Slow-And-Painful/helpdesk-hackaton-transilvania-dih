import BaseService, { MainQuery } from "$services/BaseService"
import DrizzleDB from "$components/DrizzleDB"
import { container, inject, injectable } from "tsyringe"
import { ChatMessageReferencedDocumentSchema, chatMessageReferencedDocumentsTable, NewChatMessageReferencedDocumentSchema } from "$dbSchemas/ChatMessageReferencedDocuments"

type ChatMessageReferencedDocuments = ChatMessageReferencedDocumentSchema

type TABLE = typeof chatMessageReferencedDocumentsTable
type PK_TYPE = number
type MAIN_QUERY__RESULT = ChatMessageReferencedDocuments
type POST_PROCESS_RESULT = ChatMessageReferencedDocuments
export type PRE_INSERT_DATA = NewChatMessageReferencedDocumentSchema

@injectable()
export default class ChatMessageReferencedDocumentsService extends BaseService<
    TABLE,
    PK_TYPE,
    MAIN_QUERY__RESULT,
    POST_PROCESS_RESULT,
    PRE_INSERT_DATA
> {
    mainTable = chatMessageReferencedDocumentsTable
    pk = chatMessageReferencedDocumentsTable.id

    constructor(
        @inject(DrizzleDB.token)
        drizzleDB: DrizzleDB
    ) {
        super(drizzleDB)
    }

    mainQuery: MainQuery<MAIN_QUERY__RESULT> = async ({ db, ...options }) => {
        return db.query.chatMessageReferencedDocumentsTable.findMany({
            ...options,
            with: {
                chatMessage: true,
            }
        })
    }

    static token = Symbol("ChatMessageReferencedDocumentsService")
}

container.register(ChatMessageReferencedDocumentsService.token, ChatMessageReferencedDocumentsService)
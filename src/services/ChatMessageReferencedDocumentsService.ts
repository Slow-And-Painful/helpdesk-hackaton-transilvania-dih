import BaseService, { MainQuery } from "$service/BaseService"
import DrizzleDB from "$components/DrizzleDB"
import { container, inject, injectable } from "tsyringe"
import { ChatMessageReferencedDocumentsSchema, chatMessageReferencedDocumentsTable, NewChatMessageReferencedDocumentsSchema } from "$dbSchemas/ChatMessageReferencedDocuments"

type ChatMessageReferencedDocuments = ChatMessageReferencedDocumentsSchema

type TABLE = typeof chatMessageReferencedDocumentsTable
type PK_TYPE = number
type MAIN_QUERY__RESULT = ChatMessageReferencedDocuments
type POST_PROCESS_RESULT = ChatMessageReferencedDocuments
export type PRE_INSERT_DATA = NewChatMessageReferencedDocumentsSchema

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

    mainQuery: MainQuery<MAIN_QUERY__RESULT> = async ({db, ...options}) => {
        return db.query.chatMessageReferencedDocumentsTable.findMany({
            ...options,
        })
    }

    static token = Symbol("ChatMessageReferencedDocumentsService")
}

container.register(ChatMessageReferencedDocumentsService.token, ChatMessageReferencedDocumentsService)
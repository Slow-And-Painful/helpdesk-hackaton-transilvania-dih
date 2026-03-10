import BaseService, { MainQuery } from "$services/BaseService"
import DrizzleDB from "$components/DrizzleDB"
import { container, inject, injectable } from "tsyringe"
import { ChatMessageSchema, chatMessagesTable, NewChatMessageSchema } from "$dbSchemas/ChatMessages"

type ChatMessages = ChatMessageSchema

type TABLE = typeof chatMessagesTable
type PK_TYPE = number
type MAIN_QUERY__RESULT = ChatMessages
type POST_PROCESS_RESULT = ChatMessages
export type PRE_INSERT_DATA = NewChatMessageSchema

@injectable()
export default class ChatMessagesService extends BaseService<
    TABLE,
    PK_TYPE,
    MAIN_QUERY__RESULT,
    POST_PROCESS_RESULT,
    PRE_INSERT_DATA
> {
    mainTable = chatMessagesTable
    pk = chatMessagesTable.id

    constructor(
        @inject(DrizzleDB.token)
        drizzleDB: DrizzleDB
    ) {
        super(drizzleDB)
    }

    mainQuery: MainQuery<MAIN_QUERY__RESULT> = async ({ db, ...options }) => {
        return db.query.chatMessagesTable.findMany({
            ...options,
        })
    }

    static token = Symbol("ChatMessagesTable")
}

container.register(ChatMessagesService.token, ChatMessagesService)

import BaseService, { MainQuery } from "$services/BaseService"
import DrizzleDB from "$components/DrizzleDB"
import { container, inject, injectable } from "tsyringe"
import { ChatsSchema, chatsTable, NewChatsSchema } from "$dbSchemas/Chats"
import { desc } from "drizzle-orm"

type Chat = ChatsSchema

type TABLE = typeof chatsTable
type PK_TYPE = number
type MAIN_QUERY__RESULT = Chat
type POST_PROCESS_RESULT = Chat
export type PRE_INSERT_DATA = NewChatsSchema

@injectable()
export default class ChatsService extends BaseService<
    TABLE,
    PK_TYPE,
    MAIN_QUERY__RESULT,
    POST_PROCESS_RESULT,
    PRE_INSERT_DATA
> {
    mainTable = chatsTable
    pk = chatsTable.id

    constructor(
        @inject(DrizzleDB.token)
        drizzleDB: DrizzleDB
    ) {
        super(drizzleDB)
    }

    mainQuery: MainQuery<MAIN_QUERY__RESULT> = async ({ db, ...options }) => {
        return db.query.chatsTable.findMany({
            ...options,
            orderBy: desc(chatsTable.id)
        })
    }

    static token = Symbol("ChatsTable")
}

container.register(ChatsService.token, ChatsService)

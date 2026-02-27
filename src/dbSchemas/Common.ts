import LANGUAGES from "$types/LANGUAGES"
import { getEnumStrings } from "$utils/dataElaboration"
import { pgEnum, customType } from "drizzle-orm/pg-core"

export const language = pgEnum("Language", getEnumStrings(LANGUAGES))

export const embedding = customType<{
    data: number[]
    driverData: string
    config: { dimension: number }
}>({
    dataType(config) {
        return `vector(${config ? config.dimension : 1536})`
    },

    fromDriver(data) {
        return JSON.parse(data)
    },

    toDriver(data) {
        return JSON.stringify(data)
    },
})

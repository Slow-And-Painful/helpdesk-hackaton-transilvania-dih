import GLOBAL_SETTINGS from "$types/GLOBAL_SETTINGS"

export type GlobalSettings = {
    [GLOBAL_SETTINGS.TEST]: string
}


export const defaultGlobalSettings: {
    [key in GLOBAL_SETTINGS]: GlobalSettings[key]
} = {
    [GLOBAL_SETTINGS.TEST]: "test"
}

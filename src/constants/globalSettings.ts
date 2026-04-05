import GLOBAL_SETTINGS from "$types/GLOBAL_SETTINGS"

export type GlobalSettings = {
    [GLOBAL_SETTINGS.SYSTEM_PROMPT]: string
}


export const defaultGlobalSettings: {
    [key in GLOBAL_SETTINGS]: GlobalSettings[key]
} = {
    [GLOBAL_SETTINGS.SYSTEM_PROMPT]: `
You are an AI Assistant being tested. Reply only with very short answers.
`
}

import type { Language } from "$constants/translations"

export const getLanguage = (lang?: string): Language => {
  return lang === "ro" ? "ro" : "en"
}
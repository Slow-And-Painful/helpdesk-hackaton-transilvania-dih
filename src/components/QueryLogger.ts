import { Logger } from "drizzle-orm"

type OnQueryFn = (query: string, params: unknown[]) => void

// function replacePlaceholders(template: string, values: string[]): string {
//   return template.replace(/\$(\d+)/g, (_, index) => {
//     const i = parseInt(index, 10) - 1
//     return values[i] !== undefined ? values[i] : `$${index}`
//   })
// }

const defaultQueryFn: OnQueryFn = (_query, _params) => {}

export default class CustomLogger implements Logger {
  onQuery: OnQueryFn

  constructor(options?: { onQuery?: OnQueryFn }) {
    this.onQuery = options?.onQuery || defaultQueryFn
  }

  logQuery(query: string, params: unknown[]): void {
    this.onQuery(query, params)
  }
}

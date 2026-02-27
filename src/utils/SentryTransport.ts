import Transport from "winston-transport"
import * as Sentry from "@sentry/node"

type Info = {
  scope?: string
  version?: string
  message: string
  level: string
  skipSentry?: boolean
  [metadataKey: string]: string | number | boolean | undefined | null
}

type Next = () => void

export default class SentryTransport extends Transport {
  log(info: Info, next: Next) {
    if (["warn", "error"].includes(info.level) && !info.skipSentry) {
      Sentry.captureMessage(`[${info.level}] ${info.message}`, {
        extra: JSON.parse(JSON.stringify(info)),
        level: info.level === "error" ? "error" : "warning",
      })
    }

    next()
  }
}

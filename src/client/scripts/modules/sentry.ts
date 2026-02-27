import * as Sentry from "@sentry/browser"

const init = () => {
  Sentry.onLoad(() => {
    if (
      window.SENTRY_DSN &&
      window.ENVIRONMENT?.length &&
      window.ENVIRONMENT !== "local"
    ) {
      Sentry.init({
        dsn: window.SENTRY_DSN,
        environment: window.ENVIRONMENT,
        release: window.SENTRY_VERSION || undefined,
        integrations: [Sentry.browserTracingIntegration()],
        tracesSampleRate: 0.1,
        profilesSampleRate: 0.1,
      })
    }
  })
}

export default {
  init,
}

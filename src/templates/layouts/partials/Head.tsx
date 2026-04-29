import { GlobalResources } from "$types/assets"

type Props = {
  globalResources: GlobalResources
}

export function Head({ globalResources }: Props) {
  return (
    <head>
      <title>Transilvania Digital Innovation Hub</title>
      <meta charset="utf-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, viewport-fit=cover"
      />
      {globalResources.STYLES.map((styleHref) => (
        <link rel="stylesheet" type="text/css" href={styleHref} />
      ))}

      {/**
       * Make sure that the corresponding files are inside `src/client/favicon`.
       * The hashed version is served from `src/routers/website/faviconRouter`.
       */}
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/apple-touch-icon.png"
      />
      <link rel="manifest" href="/site.webmanifest" />

      <script src={globalResources.SCRIPTS.main} />
      {/*
        This script is used to set the sidebar state based on the user's preference
        before the sidebar is rendered.

        ref: src/client/scripts/sidebar.ts
      */}

      {/* <script>{`initSidebar()`}</script> */}

      {/*
        This script is used to render the sidebar dropdowns according to user's preferences.
        On first load all sidebar dropdowns are displayed open.

        ref: src/client/scripts/sidebar.ts
      */}
      {/* <script>{`initSidebarDropdowns()`}</script> */}

      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,100..900&display=swap"
        rel="stylesheet"
      />

      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
      />

      <script
        src={`https://www.google.com/recaptcha/api.js?render=${globalResources.RECAPTCHA.V3_SITE_KEY}`}
      ></script>

      <script>
        {`
          window.RECAPTCHA_ACTIVE = ${globalResources.RECAPTCHA.RECAPTCHA_ACTIVE}
          window.RECAPTCHA_V2_SITE_KEY = "${globalResources.RECAPTCHA.V2_SITE_KEY}"
          window.RECAPTCHA_V3_SITE_KEY = "${globalResources.RECAPTCHA.V3_SITE_KEY}"
          window.SENTRY_DSN = "${globalResources.SENTRY.SENTRY_DSN}"
          window.ENVIRONMENT = "${globalResources.SENTRY.ENVIRONMENT}"
          window.SENTRY_VERSION = "${globalResources.SENTRY.SENTRY_VERSION}"
          window.APP_BASE_URL = "${globalResources.APP_BASE_URL}"
          window.MAX_FILE_SIZE = "${globalResources.MAX_FILE_SIZE}"
        `}
      </script>
      {/* <script src="https://unpkg.com/htmx-ext-response-targets@2.0.0/response-targets.js"></script> */}
    </head>
  )
}

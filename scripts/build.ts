import esbuild, { BuildOptions, Loader, Platform, Plugin } from "esbuild"
import { sentryEsbuildPlugin } from "@sentry/esbuild-plugin"
import { writeFileSync } from "fs"
import { join } from "path"
import { ESBUILD_CLIENT_OUTDIR } from "../src/utils/assets"
import tailwindPostcss from "@tailwindcss/postcss"
import postcss from "postcss"
import fs from "fs/promises"

/**
 * mjml-core has html-minifier as dependency.
 * html-minifier has uglify-js as dependency.
 * The bundle generated had issues on uglify-js dependency (no module found).
 * This is a workaround that returns an empty module for uglify-js node file.
 *
 * To solve this problem, we took inspiration from
 * - https://github.com/mjmlio/mjml/issues/2132#issuecomment-1004713444
 * - https://github.com/pagopa/developer-portal/pull/400
 */
const emptyUglifyPlugin: Plugin = {
  name: "empty mjml uglify plugin",
  setup(build) {
    build.onLoad({ filter: /uglify-js\/tools\/node.js$/ }, () => ({
      contents: "{}",
      loader: "js",
    }))
  },
}

const serverConfigs: BuildOptions = {
  entryPoints: ["src/index.ts"],
  bundle: true,
  platform: "node" as Platform,
  outdir: "dist",
  sourcemap: true,
  loader: {
    ".node": "copy" as Loader,
  },
  plugins: [emptyUglifyPlugin] as Plugin[],
  /**
   * "module-from-string" has esbuild as dependency, we need this to avoid this warning:
   * "'esbuild' should be marked as external for use with 'require.resolve' [require-resolve-not-external]""
   */
  external: ["esbuild", "uglify-js"],
}

const clientConfigs: BuildOptions = {
  entryPoints: [
    "src/client/scripts/index.ts",
    "src/client/styles/index.css",
    "src/client/favicon/*",
    "src/client/fonts/*",
    "src/client/images/*",
  ],
  entryNames: "[dir]/[name]-[hash]",
  bundle: true,
  minify: true,
  sourcemap: false,
  metafile: true,
  target: ["chrome58", "firefox57", "safari11", "edge18"],
  outdir: ESBUILD_CLIENT_OUTDIR,
  loader: {
    // Favicon
    ".ico": "copy",
    ".webmanifest": "copy",

    // Fonts
    ".otf": "copy",
    ".ttf": "copy",
    ".woff": "copy",
    ".woff2": "copy",

    // Images
    ".gif": "copy",
    ".jpg": "copy",
    ".jpeg": "copy",
    ".png": "copy",
    ".svg": "copy",
    ".webp": "copy",
  },
  plugins: [
    {
      name: "tailwindcss",
      setup: (build) => {
        build.onLoad({ filter: /\.css$/ }, async (args) => {
          const source = await fs.readFile(args.path, "utf8")
          const { css } = await postcss([tailwindPostcss]).process(source, {
            from: args.path,
          })
          return { contents: css, loader: "css" }
        })
      },
    },
  ],
}

const { ENVIRONMENT, SENTRY_AUTH_TOKEN, SENTRY_VERSION, SENTRY_PROJECT_ID } =
  process.env

if (
  ENVIRONMENT &&
  ["production", "dev", "qua"].includes(ENVIRONMENT) &&
  SENTRY_AUTH_TOKEN &&
  SENTRY_VERSION
) {
  const serverSentryPlugin = sentryEsbuildPlugin({
    org: "soluzioni-futura",
    project: SENTRY_PROJECT_ID,
    authToken: SENTRY_AUTH_TOKEN,
    telemetry: false,
    release: {
      name: SENTRY_VERSION + "-server",
      setCommits: {
        auto: true,
        ignoreMissing: true,
      },
      finalize: true,
    },
  })

  const clientSentryPlugin = sentryEsbuildPlugin({
    org: "soluzioni-futura",
    project: SENTRY_PROJECT_ID,
    authToken: SENTRY_AUTH_TOKEN,
    telemetry: false,
    release: {
      name: SENTRY_VERSION + "-client",
      setCommits: {
        auto: true,
        ignoreMissing: true,
      },
      finalize: true,
    },
  })

  serverConfigs.plugins?.push(serverSentryPlugin)
  clientConfigs.plugins?.push(clientSentryPlugin)
}

void (async () => {
  process.stdout.write("Building client...")
  const clientResult = await esbuild.build(clientConfigs)
  console.log("OK")

  const srcDir = __dirname.split("/").slice(0, -1).join("/")

  writeFileSync(
    join(srcDir, "src/meta.json"),
    JSON.stringify(clientResult.metafile),
  )

  process.stdout.write("Building server...")
  await esbuild.build(serverConfigs)
  console.log("OK")
})()

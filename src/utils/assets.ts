import {
  GlobalResources,
  GlobalResourcesFavicon,
  GlobalResourcesFonts,
  GlobalResourcesImages,
} from "$types/assets"
import { Metafile } from "esbuild"

// ==================== CONSTANTS ==================== //

export const ESBUILD_CLIENT_OUTDIR = "dist/public"

// ==================== HELPERS ==================== //

export function camelize(str: string[]) {
  return str
    .map((part, i) => {
      if (i > 0) {
        return part[0].toUpperCase() + part.slice(1)
      }

      return part
    })
    .join("")
}

// ==================== GLOBAL RESOURCES ==================== //

/**
 * Generate the `FAVICON` object for the global resources.
 *
 * Filepath format: `${ESBUILD_CLIENT_OUTDIR}/favicon/${name}-${hash}.${ext}`
 *
 * Output format: `"name-without-hash.${ext}": /${filepath}`
 *
 * This format comes handier since we request favicon files with the original name
 * but we serve the hashed files from `faviconRouter`.
 */
function generateGlobalResourcesFavicon(
  metafile: Metafile,
): GlobalResourcesFavicon {
  return Object.keys(metafile.outputs)
    .filter((filepath) => filepath.includes("/favicon/"))
    .reduce((acc, filepath) => {
      const filename = filepath.split("/").at(-1)! // ${name}-${hash}.${ext}

      const [nameWithoutExtension, extension] = filename.split(".") // ${name}-${hash}
      const parts = nameWithoutExtension.split("-")
      parts.pop() // remove hash
      const name = (parts.join("-") +
        `.${extension}`) as keyof GlobalResourcesFavicon

      const basepath = ESBUILD_CLIENT_OUTDIR.split("/")[0] // keep only the first part

      acc[name] = "/" + filepath.split(`${basepath}/`)[1]
      return acc
    }, {} as GlobalResourcesFavicon)
}

/**
 * Generate the `FONTS` object for the global resources.
 *
 * Filepath format: `${ESBUILD_CLIENT_OUTDIR}/fonts/${name}-${hash}.${ext}`
 *
 * Output format: `"name-without-hash.${ext}": /${filepath}`
 */
function generateGlobalResourcesFonts(
  metafile: Metafile,
): GlobalResourcesFonts {
  return Object.keys(metafile.outputs)
    .filter((filepath) => filepath.includes("/favicon/"))
    .reduce((acc, filepath) => {
      const filename = filepath.split("/").at(-1)! // ${name}-${hash}.${ext}

      const [nameWithoutExtension, extension] = filename.split(".") // ${name}-${hash}
      const parts = nameWithoutExtension.split("-")
      parts.pop() // remove hash

      const name = (parts.join("-") +
        `.${extension}`) as keyof GlobalResourcesFonts

      const basepath = ESBUILD_CLIENT_OUTDIR.split("/")[0] // keep only the first part

      acc[name] = "/" + filepath.split(`${basepath}/`)[1]
      return acc
    }, {} as GlobalResourcesFonts)
}

/**
 * Generate the `IMAGES` object for the global resources.
 *
 * Filepath format: `${ESBUILD_CLIENT_OUTDIR}/images/${name}-${hash}.${ext}`
 *
 * Output format: `camelCaseName: /${filepath}`
 *
 * This format allows us to have readable names for images, that
 * we can use in templates simply by calling `globalResources.IMAGES.name`.
 */
function generateGlobalResourcesImages(
  metafile: Metafile,
): GlobalResourcesImages {
  return Object.keys(metafile.outputs)
    .filter((filepath) => /\.(gif|jpe?g|png|svg|webp)$/.test(filepath))
    .reduce((acc, filepath) => {
      const filename = filepath.split("/").at(-1)! // ${name}-${hash}.${ext}

      const nameWithoutExtension = filename.split(".")[0] // ${name}-${hash}
      const parts = nameWithoutExtension.split("-")
      parts.pop() // remove hash

      const name = camelize(parts) as keyof GlobalResourcesImages

      const basepath = ESBUILD_CLIENT_OUTDIR.split("/")[0] // keep only the first part

      acc[name] = "/" + filepath.split(`${basepath}/`)[1]
      return acc
    }, {} as GlobalResourcesImages)
}

export function generateMetafileGlobalResources(
  metafile: Metafile,
): Omit<GlobalResources, "RECAPTCHA" | "SENTRY" | "user" | "APP_BASE_URL" | "MAX_FILE_SIZE" | "DESCRIPTION_CHARACTERS_LIMIT" | "EXPERIMENTAL"> {
  return {
    FAVICON: generateGlobalResourcesFavicon(metafile),
    FONTS: generateGlobalResourcesFonts(metafile),
    IMAGES: generateGlobalResourcesImages(metafile),
    SCRIPTS: {
      main:
        "/" +
        Object.keys(metafile.outputs)
          .find((filename) => filename.endsWith(".js"))!
          .split("/")
          .slice(1)
          .join("/"),
    },
    STYLES: Object.keys(metafile.outputs)
      .filter((filename) => filename.endsWith(".css"))
      .map((e) => e.split("/").slice(1).join("/"))
      .map((e) => "/" + e)
  }
}

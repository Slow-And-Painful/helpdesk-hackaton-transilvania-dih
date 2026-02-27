import { createReadStream, statSync } from "fs"
import { createRouter, CreateRouterAssetsWrapper } from "../utils"
import { join } from "path"
import { GlobalResourcesFavicon } from "$types/assets"

const router: CreateRouterAssetsWrapper = function (globalResources) {
  return createRouter("favicon", (server) => {
    const keys = Object.keys(globalResources.FAVICON) as Array<
      keyof GlobalResourcesFavicon
    >

    keys.forEach((key) => {
      const ext = key.split(".").pop()!

      if (ext === "ico") {
        server.get(`/${key}`, async (req, res) => {
          const absolutePath = join(__dirname, req.globalResources.FAVICON[key])
          const stream = createReadStream(absolutePath)

          return res.header("Content-Type", mimeTypes.ico).send(stream)
        })
        return
      }

      if (ext === "png" || ext === "webmanifest") {
        server.get(`/${key}`, (req, res) => {
          const absolutePath = join(__dirname, req.globalResources.FAVICON[key])
          const stat = statSync(absolutePath)

          res.headers({
            "Content-Type": mimeTypes[ext],
            "Content-Length": stat.size,
          })

          createReadStream(absolutePath).pipe(res.raw)
        })
        return
      }
    })
  })
}

const mimeTypes = {
  ico: "image/x-icon",
  png: "image/png",
  webmanifest: "application/manifest+json",
}

export { router as createFaviconRouter }

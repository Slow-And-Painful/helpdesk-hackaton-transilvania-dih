import { LayoutAdditionalProps, LayoutFn } from "$types"
import { FastifyInstance } from "fastify"
import { getFullRouterPath } from "./router"
// import { container } from "tsyringe"
// import Configs from "$components/Configs"

export const registerViewFunction = (server: FastifyInstance) => {
  // const { env } = container.resolve<Configs>(Configs.token)

  server.decorateReply(
    "view",
    function (
      jsx: JSX.Element | string,
      layout?: LayoutFn,
      layoutAdditionalProps: LayoutAdditionalProps = {},
    ) {
      let out
      const url = this.hasHeader("hx-replace-url")
        ? (this.getHeader("hx-replace-url") as string)
        : this.hasHeader("hx-push-url") ?
          (this.getHeader("hx-push-url") as string) :
          this.request.url

      if (layout) {
        out = layout({
          children: jsx,
          globalResources: this.request.globalResources,
          isHtmxRequest: this.request.headers["hx-request"] === "true",
          routerName: getFullRouterPath(url),
          user: this.request.callerUser,
          authenticatedUser: this.request.authenticatedUser,
          userChats: this.request.userChats || [],
          ...layoutAdditionalProps,
          activeDepartment: this.request.activeDepartment!,
          userDepartments: this.request.userDepartments || [],
          activeDepartmentUserRole: this.request.activeDepartmentUserRole,
          devMode: false,
        })
      } else {
        out = jsx
      }

      void this.type("text/html")
      return this.send(out)
    },
  )
}
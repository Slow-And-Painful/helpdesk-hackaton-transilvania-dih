import { getPartialPath } from "$routers/website/utils"
import Toast, { ToastProps } from "$templates/components/Toast"
import { Children } from "@kitajs/html"

type Props = {
  children: Children
  toasts?: ToastProps[]
}

export function Page({ children, toasts }: Props) {
  return (
    <div id="page" hx-history-elt>
      <div
        class="pointer-events-none"
        style="position:fixed;inset:0;z-index:0;overflow:hidden;"
      >
        <div style="position:absolute;top:-10rem;left:-10rem;width:650px;height:650px;border-radius:9999px;background:radial-gradient(circle,rgba(37,99,235,0.22) 0%,transparent 65%);filter:blur(90px);" />
        <div style="position:absolute;bottom:-6rem;right:-6rem;width:560px;height:560px;border-radius:9999px;background:radial-gradient(circle,rgba(147,51,234,0.18) 0%,transparent 65%);filter:blur(90px);" />
      </div>
      {children}

      <div id="toast" data-endpoint={getPartialPath("common", "TOAST")}>
        {(toasts || []).map((toast) => (
          <Toast {...toast} />
        ))}
      </div>
      <div id="tooltip" />
      <div id="modal" />
      <div id="drawer" />
    </div>
  )
}

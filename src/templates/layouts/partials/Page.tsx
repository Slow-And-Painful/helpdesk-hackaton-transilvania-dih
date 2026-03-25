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

import Icon, { IconName } from "$templates/components/Icon"
import classNames from "classnames"

export interface ToastProps extends JSX.HtmlTag {
  type: "info" | "success" | "warning" | "error"
  message: string
  icon?: IconName
  iconSize?: number
  timeout?: number
  swapOOB?: string
  title?: string
}

const Toast = ({
  type,
  class: className,
  message,
  iconSize = 20,
  timeout,
  swapOOB,
  title,
  ...props
}: ToastProps) => {
  let icon = props.icon

  if (!icon) {
    icon =
      type === "info" ? "info" : type === "success" ? "check-circle" : "alert-triangle"
  }

  return (
    <div
      class={classNames("toast", {
        [`toast--${type}`]: true,
        [className as string]: !!className,
      })}
      data-toast
      data-timeout={timeout}
      {...(swapOOB
        ? {
            "hx-swap-oob": swapOOB,
          }
        : {})}
    >
      <div class="toast__content">

        <div class="flex justify-between items-center">
          <div class="flex items-center gap-x-2">
            <div class="toast__icon">
              <Icon name={icon} size={iconSize} />
            </div>

            {title ? 
              <div class="toast__title">{title as "safe"}</div>
              : <div class="toast__message" safe>
                {message}
              </div>
            }
          </div>

          <button type="button" class="toast__close" data-close>
            <Icon name="x" size={20} />
          </button>
        </div>
        
        {!!title && 
          <div class="toast__message" safe>
            {message}
          </div>
        }
      </div>
      <script type="text/javascript">window.initToast();</script>
    </div>
  )
}

export default Toast

import classNames from "classnames"
import Icon, { IconName } from "$templates/components/Icon"

export type AlertTheme = "danger" | "info" | "success" | "warning"

interface AlertProps extends JSX.HtmlTag {
  icon?: IconName | null
  iconSize?: number
  theme?: AlertTheme
  title?: string
}

const getThemeClasses = (theme: AlertTheme) => {
  switch (theme) {
    case "danger":
      return {
        container: "bg-red-950/30 border-red-900/50",
        icon: "text-red-400",
        title: "text-red-300",
        text: "text-red-200/90"
      }
    case "warning":
      return {
        container: "bg-yellow-950/30 border-yellow-900/50",
        icon: "text-yellow-400",
        title: "text-yellow-300",
        text: "text-yellow-200/90"
      }
    case "success":
      return {
        container: "bg-green-950/30 border-green-900/50",
        icon: "text-green-400",
        title: "text-green-300",
        text: "text-green-200/90"
      }
    case "info":
      return {
        container: "bg-blue-950/30 border-blue-900/50",
        icon: "text-blue-400",
        title: "text-blue-300",
        text: "text-blue-200/90"
      }
  }
}

const Alert = ({
  children,
  class: className,
  icon,
  iconSize = 20,
  title,
  theme = "info",
  ...props
}: AlertProps) => {
  let iconName: IconName

  if (icon && icon !== null) {
    iconName = icon
  } else {
    switch (theme) {
      case "info":
        iconName = "info"
        break
      case "danger":
        iconName = "alert-triangle"
        break
      case "warning":
        iconName = "alert-circle"
        break
      case "success":
        iconName = "check-circle"
        break
    }
  }

  const themeClasses = getThemeClasses(theme)

  return (
    <div
      {...props}
      class={classNames(
        "border rounded-lg p-4 flex gap-x-3",
        themeClasses.container,
        className
      )}
    >
      <div class="flex-shrink-0">
        <Icon name={iconName} size={iconSize} class={themeClasses.icon} />
      </div>
      
      {title || children ? (
        <div class="flex flex-col gap-y-1 w-full">
          {title ? (
            <h3 class={classNames("text-sm font-roboto-bold", themeClasses.title)} safe>
              {title}
            </h3>
          ) : null}
          {children ? (
            <div class={classNames("text-sm", themeClasses.text)}>
              {children as "safe"}
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}

export default Alert
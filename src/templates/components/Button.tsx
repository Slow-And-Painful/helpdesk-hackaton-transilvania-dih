import classNames from "classnames"
import Spinner from "./Spinner"
import Icon, { IconName } from "$templates/components/Icon"
import { v4 } from "uuid"

export type ButtonPreset =
  | "primary"
  | "secondary"
  | "tertiary"
  | "transparent"
  | "danger"
  | "outline"

export type ButtonSize = "lg" | "md" | "sm"

export interface ButtonProps extends JSX.HtmlButtonTag {
  fullWidth?: boolean
  icon?: IconName
  iconClass?: string
  iconPosition?: "left" | "right"
  iconSize?: number
  preset?: ButtonPreset
  size?: ButtonSize
  spinner?: boolean
  square?: boolean
  outline?: boolean
  onload?: string
}

const Button = ({
  children,
  class: className,
  fullWidth,
  icon,
  iconClass,
  iconPosition = "left",
  iconSize,
  preset = "primary",
  size = "md",
  spinner = true,
  square,
  type = "button",
  outline,
  onload,
  ...props
}: ButtonProps) => {
  const leftIcon =
    icon && iconPosition === "left" ? (
      <Icon
        class={classNames(iconClasses[preset], iconClass)}
        name={icon}
        size={iconSize ?? 16}
      />
    ) : null

  const rightIcon =
    icon && iconPosition === "right" ? (
      <Icon
        class={classNames(iconClasses[preset], iconClass)}
        name={icon}
        size={iconSize ?? 16}
      />
    ) : null

  let spinnerIconName: IconName = "spinner"

  if (spinner) {
    if (
      (preset === "danger" && outline) ||
      (preset === "secondary" && outline)
    ) {
      spinnerIconName = "spinner-red"
    }
  }

  const uniqueId = v4()

  return (
    <button
      class={classNames(
        `btn btn--${preset} btn--${size}`,
        fullWidth && "btn--full",
        square && "btn--square",
        outline && "btn--outline",
        props.disabled && "btn--disabled",
        className,
      )}
      type={type}
      {...type === "submit" && { disabled: true } }
      {...props}
      {...spinner ? {
        "hx-on::before-request": `
          window["${uniqueId}"] = setTimeout(() => {
            this.classList.add('btn--loading')
          }, 200)
        `,
        "hx-on::after-request": `
          clearTimeout(window["${uniqueId}"])
          delete window["${uniqueId}"]
          this.classList.remove('btn--loading')
        `
      } : {}}
    >
      {spinner ? (
        <>
          <div class="btn__spinner">
            <Spinner iconName={spinnerIconName} />
          </div>

          <div class="btn__content">
            {leftIcon as "safe"}
            {children}
            {rightIcon as "safe"}
          </div>
        </>
      ) : (
        <>
          {leftIcon as "safe"}
          {children}
          {rightIcon as "safe"}
        </>
      )}
    </button>
  )
}

export default Button

const iconClasses: Partial<Record<ButtonPreset, string>> = {
  primary: "opacity-80",
}
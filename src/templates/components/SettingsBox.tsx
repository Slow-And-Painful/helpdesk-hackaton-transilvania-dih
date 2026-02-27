import classNames from "classnames";

type Theme = "default" | "danger"

type Props = Omit<JSX.HtmlTag, "class"> & {
  class?: string
  theme?: Theme
  title: JSX.Element
  text: JSX.Element
  button: JSX.Element
}

const SettingsBox = ({
  class: className,
  theme = "default",
  title,
  text,
  button,
  ...props
}: Props) => {
  return (
    <div
      class={classNames(
        "settings-box",
        `settings-box--${theme}`,
        className
      )}
      {...props}
    >
      <div class="settings-box__title">{title as "safe"}</div>
      <div class="settings-box__content">
        <div class="settings-box__text">{text as "safe"}</div>
        {button as "safe"}
      </div>
    </div>
  )
}

export default SettingsBox

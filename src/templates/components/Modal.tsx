import { PropsWithChildren } from "@kitajs/html"
import classNames from "classnames"

import Icon from "$templates/components/Icon"

type ModalSize = "sm" | "md" | "lg" | "xl"
type ModalPreset = "danger" | "regular"

export type ModalProps = Omit<JSX.HtmlTag, "title"> &
  PropsWithChildren<{
    ariaLabelledby?: string
    centered?: boolean
    className?: string
    footer?: JSX.Element
    isOpen?: boolean
    size?: ModalSize
    title: JSX.Element
    removeOnClose?: boolean
    closable?: boolean
    preset?: ModalPreset
    titleClass?: string
  }>

export default ({
  ariaLabelledby,
  centered,
  children,
  className,
  footer,
  isOpen = false,
  size = "md",
  title,
  removeOnClose = true,
  closable = true,
  preset = "regular",
  titleClass,
  ...props
}: ModalProps) => {
  return (
    <div
      class={classNames(
        `modal__wrap modal__wrap--${size}`,
        `modal--${preset}`,
        isOpen && "is-open",
        centered && "is-centered",
        className,
      )}
      tabindex="-1"
      role="dialog"
      aria-labelledby={ariaLabelledby}
      {...props}
    >
      <div
        class="modal__overlay"
        aria-hidden="true"
        {...(closable
          ? { onclick: `closeModal(event, ${removeOnClose})` }
          : {})}
      ></div>

      <div
        class="modal"
        role="document"
        onscroll="closeDropdowns(event.target);"
      >
        <div class={"flex justify-between items-center gap-4"}>
          <div class={classNames("modal__title", titleClass)} id={ariaLabelledby}>
            {title}
          </div>

          {closable ? (
            <button
              type="button"
              class="modal__close"
              aria-label="close"
              onclick={`closeModal(event, ${removeOnClose})`}
            >
              <Icon name="x" size={16} />
            </button>
          ) : null}
        </div>

        <div class="modal__content">{children as "safe"}</div>

        {footer ? (
          <div class="modal__footer">{footer ? footer : null}</div>
        ) : null}
      </div>
    </div>
  )
}

import { PropsWithChildren } from "@kitajs/html"
import classNames from "classnames"

import Icon from "$templates/components/Icon"

type AccordionProps = Pick<JSX.HtmlTag, "class"> &
  PropsWithChildren<{
    isOpen?: boolean
    title: string
  }>

export default ({
  children,
  class: className,
  isOpen = false,
  title,
}: AccordionProps) => {
  return (
    <div
      class={classNames("accordion", isOpen && "accordion--open", className)}
    >
      <div class="accordion__head" onclick="toggleAccordion(event)">
        <p class="accordion__title" safe>
          {title}
        </p>
        <div class="accordion__icon">
          <Icon name="chevron-down" size={12} />
        </div>
      </div>

      <div class="accordion__content">{children}</div>
    </div>
  )
}

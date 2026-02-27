import Icon from "$templates/components/Icon"
import classNames from "classnames"

export type BreadcrumbItem = {
  href?: string
  label: JSX.Element
}

export type BreadcrumbProps = {
  class?: string
  items: BreadcrumbItem[]
  id?: string
  swapOOB?: string
}

const Breadcrumb = ({ class: className, items, id, swapOOB }: BreadcrumbProps) => {  
  return (
    <nav { ...swapOOB && { "hx-swap-oob": swapOOB } } class={classNames("breadcrumb max-w-[90%]", className)} { ...id && { id } } text-ellipsis-exclude>
      <ol class="breadcrumb__list truncate">
        {items.map((item, index) => {
          const safeItemLabel = item.label

          const isLast = index === items.length - 1
          return (
            <li class="breadcrumb__item truncate">
              {isLast ? (
                <>
                  <span class={"cursor-default truncate"}>
                    {safeItemLabel}
                  </span>
                </>
              ) : item.href ? (
                <>
                  <a class={"truncate"} href={item.href} hx-boost="true">
                    {safeItemLabel}
                  </a>
                  <Icon name="chevron-right" size={16} />
                </>
              ) : (
                <>
                  <span class={"cursor-default truncate"}>
                    {safeItemLabel}
                  </span>
                  <Icon name="chevron-right" size={16} />
                </>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export default Breadcrumb

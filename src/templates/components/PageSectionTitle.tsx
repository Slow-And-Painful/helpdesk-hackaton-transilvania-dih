import classNames from "classnames"

type Props = {
  title: JSX.Element
  class?: string
  titlePosition?: "top" | "middle" | "bottom"
  withDivider?: boolean
  titleClass?: string
}

const PageSectionTitle = ({
  title,
  class: className,
  titlePosition = "bottom",
  withDivider = true,
  titleClass
}: Props) => {
  const safeTitleElement = <div class={classNames("text-sm", titleClass)}>
    {title as "safe"}
  </div>

  return (
    <div class={classNames("text-gray-500 flex flex-col gap-y-4", className)}>
      {titlePosition === "top" ? safeTitleElement : null}

      {withDivider || titlePosition === "middle" ?
        <div class={classNames("flex items-center gap-2.5")}>

          {titlePosition === "middle" ?  safeTitleElement : null}

          {withDivider ?
            <div class={"flex-1 h-px bg-gray-700"} />
            : null
          }
        </div> : null
      }

      {titlePosition === "bottom" ? safeTitleElement : null}
    </div>
  )
}

export default PageSectionTitle

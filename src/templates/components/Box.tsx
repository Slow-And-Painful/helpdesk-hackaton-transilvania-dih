import { PropsWithChildren } from "@kitajs/html"
import classNames from "classnames"

type BoxProps = JSX.HtmlTag &
  PropsWithChildren<{
    title?: string
    isSmall?: boolean
  }>

export default ({
  children,
  class: className,
  title,
  isSmall = false,
  ...props
}: BoxProps) => {
  return (
    <div
      class={classNames(
        `w-full bg-black border border-gray-200 rounded-lg ${isSmall ? "" : "min-w-[600px]"}`,
        className,
      )}
      {...props}
    >
      {title ? (
        <div class="p-4 border-b border-gray-200 mb-7">
          <p class="text-lg font-semibold text-white" safe>
            {title}
          </p>
        </div>
      ) : null}
      {title ? (
        <div class={classNames({ "px-4 pb-7 text-white": title })}>
          {children}
        </div>
      ) : (
        children
      )}
    </div>
  )
}

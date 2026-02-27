import classNames from "classnames"

const Separator = ({ class: className, ...rest }: JSX.HtmlTag) => {
  return <div class={classNames("h-px bg-grey-700 w-full", className)} {...rest} />
}

export default Separator

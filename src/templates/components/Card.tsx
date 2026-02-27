import { HtmlTagProps } from "$types/client"
import classNames from "classnames"

export interface CardProps extends HtmlTagProps {
  type?: "default" | "error"
  blur?: boolean
  href?: string
}

const Card = ({ class: className, type, href, ...props }: CardProps) => {
  return (
    <div
      {...href && { "hx-get": href, "hx-push-url": true }}
      class={classNames("card", {
        "card--error": type === "error",
        // "card--bg-blur": blur, DA INDAGARE: Se viene aggiunta qusta classe il dropdown nella card esplode
        "card--clickable": typeof href !== "undefined"
      }, className)}
      {...props}
    />
  )
}

export default Card

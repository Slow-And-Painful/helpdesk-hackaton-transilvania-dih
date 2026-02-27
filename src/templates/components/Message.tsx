import classNames from "classnames"
import Card from "./Card"
import Icon from "./Icon"
import { HtmlTagProps } from "$types/client"
import { getViewPath } from "$routers/website/utils"
import Button from "./Button"

type Props = HtmlTagProps & {
  title: string
  message: string
  homeButton?: boolean
  type: "success" | "error" | "warning"
}

const Message = ({ title, message, type, homeButton, ...props }: Props) => {
  return (
    <Card class={"text-center p-4"} {...props}>
      <div
        class={classNames("flex items-center justify-center rounded-full w-[82px] h-[82px] mx-auto", {
          "text-green-200 bg-green-900": type === "success",
          "text-red-200 bg-green-900": type === "error",
          "text-yellow-200 bg-green-900": type === "warning",
        })}
      >
        <Icon
          name={type === "success" ? "check-circle" : "alert-triangle"}
          size={56}
        />
      </div>

      <div class={"mt-4"}>
        <h2 class={"text-2xl font-roboto-medium"} safe>
          {title}
        </h2>
        <div class={"mt-2 text-lg"} safe>
          {message}
        </div>
        {homeButton ?
          <div class="w-full flex justify-center mt-4">
            <Button
              hx-get={getViewPath("public", "HOME")}
              hx-swap="outerHTML"
              hx-target="#page"
              hx-push-url="true"
              
            >Homepage</Button>
          </div>
          : null
        }
      </div>
    </Card>
  )
}

export default Message

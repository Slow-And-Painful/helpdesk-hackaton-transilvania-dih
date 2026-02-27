import Button from "$templates/components/Button"
import { User } from "$services/UsersService"
import { handleErrorPageCta } from "$handlers/utils"

type Props = {
  user: User | null
}

const UnexpectedErrorPage = ({ user }: Props) => {
  const cta = handleErrorPageCta(user)

  return (
    <>
      <div class={"w-full h-full flex flex-col items-center justify-center"}>
        <div class={"w-fit mx-auto flex flex-col items-center justify-center"}>
          <h1 class={"text-[120px] font-bold -mt-10"}>500</h1>
          <h1 class={"mt-4 mb-6 text-lg"}>An unexpected error occurred. Please try again later.</h1>
          <Button
            hx-push-url="true"
            preset="secondary"
            size="sm"
            class={"mt-3 !w-[250px]"}
            hx-headers={JSON.stringify({ "hx-swap-chat": true })}
          >
            CTA
          </Button>
        </div>
      </div>
    </>
  )
}

export default UnexpectedErrorPage
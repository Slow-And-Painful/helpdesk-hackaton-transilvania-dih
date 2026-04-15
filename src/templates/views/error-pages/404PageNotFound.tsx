import Button from "$templates/components/Button"
import { User } from "$services/UsersService"

type Props = {
  user: User | null
}

const PageNotFound = ({ user }: Props) => {
  return (
    <>
      <div class={"w-full h-full flex flex-col items-center justify-center"}>
        <div class={"w-fit mx-auto flex flex-col items-center justify-center"}>
          <h1 class={"text-[120px] font-bold -mt-10"}>404</h1>
          <h1 class={"mt-4 mb-6 text-lg"}>Pagina pe care o cauți nu există sau a fost mutată.</h1>
          <Button
            hx-get={""}
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

export default PageNotFound
import { User } from "$services/UsersService"
import { getViewPath } from "$routers/website/utils"
import Icon from "$templates/components/Icon"
import Alert from "$templates/components/Alert"

type Props = {
  user: User
}

const LoginLinkSent = (props: Props) => {
  return (
    <div class="container h-full flex items-center justify-center">
      <div class="flex flex-col gap-y-6 justify-center w-full max-w-[400px]">
        <div class="flex gap-x-2 items-center">
          <div class="flex items-center justify-center w-12 h-12 rounded-full bg-blue-950/30 border border-blue-900/50">
            <Icon name="mail" size={24} class="text-blue-400" />
          </div>
          <h1 class="text-2xl font-roboto-bold text-white">Check your email</h1>
        </div>

        <Alert theme="info" title="Login link sent">
          We have sent a secure login link to <span class="font-roboto-semibold">{props.user.email}</span>. 
          Click the link in your email to sign in to your account.
        </Alert>

        <div class="flex flex-col gap-y-3">
          <p class="text-sm text-gray-400 text-center">
            Didn't receive the email? Check your spam folder or try requesting a new link.
          </p>
          <a
            href={getViewPath("public", "HOME")}
            hx-boost="true"
            class="w-full text-center text-sm text-gray-400 hover:text-gray-300 transition-colors"
          >
            Go to Home
          </a>
        </div>
      </div>
    </div>
  )
}

export default LoginLinkSent
import { User } from "$services/UsersService"
import { getViewPath } from "$routers/website/utils"
import Icon from "$templates/components/Icon"
import Alert from "$templates/components/Alert"

type Props = {
  user: User
}

const SignupCompleted = (props: Props) => {
  return (
    <div class="container h-full flex items-center justify-center">
      <div class="flex flex-col gap-y-6 justify-center w-full max-w-[400px]">
        <div class="flex gap-x-2 items-center">
          <div class="flex items-center justify-center w-12 h-12 rounded-full bg-green-950/30 border border-green-900/50 mb-2">
            <Icon name="mail" size={24} class="text-green-400" />
          </div>
          <h1 class="text-2xl font-roboto-bold text-white">Check your email</h1>
        </div>

        <Alert theme="success" title="Email sent successfully">
          We have sent a verification link to <span class="font-roboto-semibold">{props.user.email}</span>. 
          Please check your inbox and click the link to complete your signup.
        </Alert>

        <div class="flex flex-col gap-y-3">
          <p class="text-sm text-gray-400 text-center">
            Didn't receive the email? Check your spam folder or contact support.
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

export default SignupCompleted
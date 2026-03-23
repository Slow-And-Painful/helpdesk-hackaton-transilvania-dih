import { getViewPath } from "$routers/website/utils"
import Icon from "$templates/components/Icon"
import Alert from "$templates/components/Alert"

const WaitingRoomView = () => {
  return (
    <div class="container h-full flex items-center justify-center">
      <div class="flex flex-col gap-y-6 justify-center w-full max-w-[400px]">
        <div class="flex gap-x-2 items-center">
          <div class="flex items-center justify-center w-12 h-12 rounded-full bg-gray-800/30 border border-gray-700/50 mb-2">
            <Icon name="organizations" size={24} />
          </div>
          <h1 class="text-2xl font-roboto-bold text-white">No department assigned</h1>
        </div>

        <Alert theme="warning" title="No department assigned">
          Your account is not part of any department yet. Please ask an administrator to invite you to a department before using the platform.
        </Alert>

        <div class="flex flex-col gap-y-3">
          <p class="text-sm text-gray-400 text-center">
            Need help? Contact your organization administrator.
          </p>
          <a
            href={getViewPath("auth", "LOGOUT")}
            hx-boost="true"
            class="w-full text-center text-sm text-gray-400 hover:text-gray-300 transition-colors"
          >
            Logout
          </a>
        </div>
      </div>
    </div>
  )
}

export default WaitingRoomView

import { getViewPath } from "$routers/website/utils"
import LoginForm from "$templates/components/auth/LoginForm"
import Icon from "$templates/components/Icon"

export const loginViewContainerId = "login-view-container"

const LoginView = () => {
  const values = { email: "" }
  const initialValues = { ...values }

  return (
    <div class="container h-full flex items-center justify-center">
      <div class="flex flex-col gap-y-6 justify-center w-full max-w-[420px] px-4" id={loginViewContainerId}>
        {/* Header */}
        <div class="flex flex-col gap-y-4">
          <a
            href={getViewPath("public", "HOME")}
            hx-boost="true"
            class="flex items-center gap-x-2 text-gray-400 hover:text-gray-300 transition-colors w-fit"
          >
            <Icon name="chevron-left" size={18} />
            <span class="text-sm">Înapoi</span>
          </a>
          
          <div class="flex flex-col gap-y-2">
            <h1 class="text-3xl font-roboto-bold text-white">Bine ai revenit</h1>
            <p class="text-sm text-gray-400">
              Conectează-te la contul tău pentru a continua
            </p>
          </div>
        </div>

        {/* Form */}
        <LoginForm
          values={values}
          initialValues={initialValues}
        />
      </div>
    </div>
  )
}

export default LoginView
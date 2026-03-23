import { getViewPath } from "$routers/website/utils"
import { translations, type Language } from "$constants/translations"
import LoginForm from "$templates/components/auth/LoginForm"
import Icon from "$templates/components/Icon"

export const loginViewContainerId = "login-view-container"

type LoginViewProps = {
  lang?: Language
}

const LoginView = ({ lang = "en" }: LoginViewProps) => {
  const values = { email: "" }
  const initialValues = { ...values }
  const t = translations[lang]
  const otherLang = lang === "ro" ? "en" : "ro"

  return (
    <div class="container h-full flex items-center justify-center">
      <div class="flex flex-col gap-y-6 justify-center w-full max-w-[420px] px-4" id={loginViewContainerId}>
        <div class="flex justify-end">
          <a
            href={`${getViewPath("auth", "LOGIN", {})}?lang=${otherLang}`}
            hx-boost="true"
            class="text-sm text-gray-400 hover:text-gray-300 transition-colors"
          >
            {lang === "ro" ? "English" : "Română"}
          </a>
        </div>

        <div class="flex flex-col gap-y-4">
          <a
            href={getViewPath("public", "HOME")}
            hx-boost="true"
            class="flex items-center gap-x-2 text-gray-400 hover:text-gray-300 transition-colors w-fit"
          >
            <Icon name="chevron-left" size={18} />
            <span class="text-sm">{t.back}</span>
          </a>

          <div class="flex flex-col gap-y-2">
            <h1 class="text-3xl font-roboto-bold text-white">{t.welcomeBack}</h1>
            <p class="text-sm text-gray-400">
              {t.signInToContinue}
            </p>
          </div>
        </div>

        <LoginForm
          values={values}
          initialValues={initialValues}
        />
      </div>
    </div>
  )
}

export default LoginView
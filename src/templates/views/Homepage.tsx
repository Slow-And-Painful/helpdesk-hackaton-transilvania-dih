import { getViewPath } from "$routers/website/utils"
import { translations, type Language } from "$constants/translations"
import { User } from "$services/UsersService"
import Button from "$templates/components/Button"
import Icon from "$templates/components/Icon"

type Props = {
  callerUser: User | null
  lang?: Language
}

const Homepage = ({ callerUser, lang = "en" }: Props) => {
  const t = translations[lang]
  const otherLang = lang === "ro" ? "en" : "ro"

  return (
    <div class="container h-full">
      <div class="min-h-full flex flex-col items-center justify-center px-4">
        <div class="w-full flex justify-end pt-6">
          <a
            href={`${getViewPath("public", "HOME")}?lang=${otherLang}`}
            hx-boost="true"
            class="text-sm text-gray-400 hover:text-gray-300 transition-colors"
          >
            {lang === "ro" ? "English" : "Română"}
          </a>
        </div>

        {/* Hero Section */}
        <div class="flex flex-col items-center gap-y-8 max-w-4xl text-center">
          {/* Icon/Logo */}
          <div class="flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30">
            <Icon name="activity" size={40} class="text-blue-400" />
          </div>

          {/* Headline */}
          <div class="flex flex-col gap-y-4">
            <h1 class="text-6xl md:text-7xl font-roboto-bold text-white leading-tight">
              {t.homeTitle}
            </h1>
            <p class="text-xl text-gray-400 max-w-2xl">
              {t.homeSubtitle}
            </p>
          </div>

          {/* CTA Buttons */}
          <div class="flex items-center justify-center gap-x-3 mt-4">
            {callerUser !== null
              ? <a
                  href={`${getViewPath("dashboard", "HOME")}?lang=${lang}`}
                  hx-boost="true"
                >
                  <Button
                    preset="primary"
                    class="px-8 py-3 text-base"
                  >
                    {t.goToDashboard}
                  </Button>
                </a>
              : <>
                <a
                  href={`${getViewPath("auth", "SIGNUP", undefined)}?lang=${lang}`}
                  hx-boost="true"
                >
                  <Button
                    preset="primary"
                    class="px-8 py-3 text-base"
                  >
                    {t.getStarted}
                  </Button>
                </a>

                <a
                  href={`${getViewPath("auth", "LOGIN", undefined)}?lang=${lang}`}
                  hx-boost="true"
                >
                  <Button
                    preset="secondary"
                    outline
                    class="px-8 py-3 text-base"
                  >
                    {t.signIn}
                  </Button>
                </a>
              </>
            }
          </div>
        </div>

        {/* Features Grid */}
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24 max-w-5xl w-full">
          <div class="flex flex-col gap-y-3 p-6 rounded-xl bg-gray-900/30 border border-gray-800/50 hover:border-gray-700/50 transition-colors">
            <div class="flex items-center justify-center w-12 h-12 rounded-lg bg-blue-950/30 border border-blue-900/50">
              <Icon name="zap" size={24} class="text-blue-400" />
            </div>
            <h3 class="text-lg font-roboto-semibold text-white">{t.lightningFast}</h3>
            <p class="text-sm text-gray-400">
              {t.lightningFastDescription}
            </p>
          </div>

          <div class="flex flex-col gap-y-3 p-6 rounded-xl bg-gray-900/30 border border-gray-800/50 hover:border-gray-700/50 transition-colors">
            <div class="flex items-center justify-center w-12 h-12 rounded-lg bg-purple-950/30 border border-purple-900/50">
              <Icon name="shield" size={24} class="text-purple-400" />
            </div>
            <h3 class="text-lg font-roboto-semibold text-white">{t.securePrivate}</h3>
            <p class="text-sm text-gray-400">
              {t.securePrivateDescription}
            </p>
          </div>

          <div class="flex flex-col gap-y-3 p-6 rounded-xl bg-gray-900/30 border border-gray-800/50 hover:border-gray-700/50 transition-colors">
            <div class="flex items-center justify-center w-12 h-12 rounded-lg bg-green-950/30 border border-green-900/50">
              <Icon name="trending-up" size={24} class="text-green-400" />
            </div>
            <h3 class="text-lg font-roboto-semibold text-white">{t.alwaysLearning}</h3>
            <p class="text-sm text-gray-400">
              {t.alwaysLearningDescription}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Homepage
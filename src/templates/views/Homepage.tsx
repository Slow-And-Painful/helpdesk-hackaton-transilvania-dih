import { getViewPath } from "$routers/website/utils"
import { User } from "$services/UsersService"
import Button from "$templates/components/Button"
import Icon from "$templates/components/Icon"

type Props = {
  callerUser: User | null
}

const Homepage = (props: Props) => {
  return (
    <div class="container h-full">
      <div class="min-h-full flex flex-col items-center justify-center px-4">
        {/* Hero Section */}
        <div class="flex flex-col items-center gap-y-8 max-w-4xl text-center">
          {/* Icon/Logo */}
          <div class="flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30">
            <Icon name="activity" size={40} class="text-blue-400" />
          </div>

          {/* Headline */}
          <div class="flex flex-col gap-y-4">
            <h1 class="text-6xl md:text-7xl font-roboto-bold text-white leading-tight">
              Hub de Inovație Digitală Transilvania
            </h1>
            <p class="text-xl text-gray-400 max-w-2xl">
              Descoperă puterea asistenței inteligente. Obține răspunsuri, automatizează sarcini și sporește-ți productivitatea.
            </p>
          </div>

          {/* CTA Buttons */}
          <div class="flex items-center justify-center gap-x-3 mt-4">
            {props.callerUser !== null
              ? <a
                  href={getViewPath("dashboard", "HOME")}
                  hx-boost="true"
                >
                  <Button
                    preset="primary"
                    class="px-8 py-3 text-base"
                  >
                    Mergi la tabloul de bord
                  </Button>
                </a>
              : <>
                <a
                  href={getViewPath("auth", "SIGNUP")}
                  hx-boost="true"
                >
                  <Button
                    preset="primary"
                    class="px-8 py-3 text-base"
                  >
                    Începe acum
                  </Button>
                </a>

                <a
                  href={getViewPath("auth", "LOGIN", undefined)}
                  hx-boost="true"
                >
                  <Button
                    preset="secondary"
                    outline
                    class="px-8 py-3 text-base"
                  >
                    Conectează-te
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
            <h3 class="text-lg font-roboto-semibold text-white">Extrem de Rapid</h3>
            <p class="text-sm text-gray-400">
              Obține răspunsuri instantanee cu tehnologie AI de ultimă generație
            </p>
          </div>

          <div class="flex flex-col gap-y-3 p-6 rounded-xl bg-gray-900/30 border border-gray-800/50 hover:border-gray-700/50 transition-colors">
            <div class="flex items-center justify-center w-12 h-12 rounded-lg bg-purple-950/30 border border-purple-900/50">
              <Icon name="shield" size={24} class="text-purple-400" />
            </div>
            <h3 class="text-lg font-roboto-semibold text-white">Sigur și Privat</h3>
            <p class="text-sm text-gray-400">
              Datele tale sunt protejate cu securitate de nivel enterprise
            </p>
          </div>

          <div class="flex flex-col gap-y-3 p-6 rounded-xl bg-gray-900/30 border border-gray-800/50 hover:border-gray-700/50 transition-colors">
            <div class="flex items-center justify-center w-12 h-12 rounded-lg bg-green-950/30 border border-green-900/50">
              <Icon name="trending-up" size={24} class="text-green-400" />
            </div>
            <h3 class="text-lg font-roboto-semibold text-white">Mereu în Evoluție</h3>
            <p class="text-sm text-gray-400">
              Se îmbunătățește continuu pentru a te servi mai bine în fiecare zi
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Homepage
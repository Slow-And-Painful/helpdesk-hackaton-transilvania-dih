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
          <h1 class="text-2xl font-roboto-bold text-white">Niciun departament atribuit</h1>
        </div>

        <Alert theme="warning" title="Niciun departament atribuit">
          Contul tău nu face parte din niciun departament. Te rugăm să soliciți unui administrator să te invite într-un departament înainte de a folosi platforma.
        </Alert>

        <div class="flex flex-col gap-y-3">
          <p class="text-sm text-gray-400 text-center">
            Ai nevoie de ajutor? Contactează administratorul organizației tale.
          </p>
          <a
            href={getViewPath("auth", "LOGOUT")}
            hx-boost="true"
            class="w-full text-center text-sm text-gray-400 hover:text-gray-300 transition-colors"
          >
            Deconectare
          </a>
        </div>
      </div>
    </div>
  )
}

export default WaitingRoomView

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
          <h1 class="text-2xl font-roboto-bold text-white">Verifică-ți emailul</h1>
        </div>

        <Alert theme="info" title="Link de autentificare trimis">
          Am trimis un link securizat de autentificare la <span class="font-roboto-semibold">{props.user.email}</span>.
          Apasă pe link-ul din email pentru a te conecta la contul tău.
        </Alert>

        <div class="flex flex-col gap-y-3">
          <p class="text-sm text-gray-400 text-center">
            Nu ai primit emailul? Verifică dosarul de spam sau solicită un nou link.
          </p>
          <a
            href={getViewPath("public", "HOME")}
            hx-boost="true"
            class="w-full text-center text-sm text-gray-400 hover:text-gray-300 transition-colors"
          >
            Mergi la pagina principală
          </a>
        </div>
      </div>
    </div>
  )
}

export default LoginLinkSent
import { getViewPath } from "$routers/website/utils"
import Icon from "$templates/components/Icon"
import Alert from "$templates/components/Alert"

export enum VERIFY_EMAIL_CODE_ERROR {
  CODE_NOT_FOUND = "CODE_NOT_FOUND",
  CODE_EXPIRED = "CODE_EXPIRED",
  CODE_ALREADY_USED = "CODE_ALREADY_USED"
}

type Props = {
  error: VERIFY_EMAIL_CODE_ERROR
}

const getErrorMessage = (error: VERIFY_EMAIL_CODE_ERROR): { title: string; description: string } => {
  switch (error) {
    case VERIFY_EMAIL_CODE_ERROR.CODE_NOT_FOUND:
      return {
        title: "Cod Invalid",
        description: "Codul de verificare introdus nu a fost găsit. Te rugăm să verifici link-ul din email și să încerci din nou."
      }
    case VERIFY_EMAIL_CODE_ERROR.CODE_EXPIRED:
      return {
        title: "Cod Expirat",
        description: "Acest cod de verificare a expirat. Te rugăm să soliciți un nou link de autentificare."
      }
    case VERIFY_EMAIL_CODE_ERROR.CODE_ALREADY_USED:
      return {
        title: "Cod Deja Folosit",
        description: "Acest cod de verificare a fost deja utilizat."
      }
  }
}

export const verifyEmailCodeViewContainerId = "verify-email-code-view-container"

const VerifyEmailCodeView = (props: Props) => {
  const { title, description } = getErrorMessage(props.error)

  return (
    <div class="container h-full flex items-center justify-center">
      <div class="flex flex-col gap-y-4 justify-center w-full max-w-[400px]" id={verifyEmailCodeViewContainerId}>
        <div class="flex items-center gap-x-2">
          <a
            href={getViewPath("auth", "LOGIN", {})}
            hx-boost="true"
            class="flex items-center justify-center"
          >
            <Icon name="chevron-left" size={20} />
          </a>
          <h1 class="text-2xl font-roboto-bold">Verificare Eșuată</h1>
        </div>

        <div class="flex flex-col gap-y-6">
          <Alert theme="danger" title={title}>
            {description}
          </Alert>

          <div class="flex flex-col gap-y-3">
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
    </div>
  )
}

export default VerifyEmailCodeView
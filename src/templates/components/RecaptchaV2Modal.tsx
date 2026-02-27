import Modal from "./Modal"
import Spinner from "./Spinner"

type Props = {
  formData: string
  method: string
  action: string
}

const RecaptchaV2Modal = ({ formData, method, action }: Props) => {
  return (
    <Modal id="recaptcha-v2-modal" isOpen size="sm" title={""} closable={false}>
      <div class="flex flex-col gap-y-4 min-h-[120px] items-center justify-center">
        <div class="text-center">
          Please complete the reCAPTCHA to continue.
        </div>

        <div
          id="recaptcha-v2-container"
          class="flex justify-center"
          data-values={formData}
          data-method={method}
          data-action={action}
        >
          <Spinner size={40} />
        </div>
      </div>
      <script
        src="https://www.google.com/recaptcha/api.js?onload=onLoadCallback&render=explicit"
        async
        defer
      ></script>
    </Modal>
  )
}

export default RecaptchaV2Modal

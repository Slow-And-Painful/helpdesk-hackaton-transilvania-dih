import { contactFormId } from "./ContactForm"
import Icon from "$templates/components/Icon"
import Alert from "$templates/components/Alert"

type Props = {
  email: string
}

const ContactSubmitted = ({ email }: Props) => {
  return (
    <div id={contactFormId} class="flex flex-col gap-y-6 justify-center w-full">
      <div class="flex gap-x-2 items-center">
        <div class="flex items-center justify-center w-12 h-12 rounded-full bg-green-950/30 border border-green-900/50 mb-2">
          <Icon name="check" size={24} class="text-green-400" />
        </div>
        <h1 class="text-2xl font-roboto-bold text-white">Răspuns înregistrat</h1>
      </div>

      <Alert theme="success" title="Formular trimis cu succes">
        Am înregistrat răspunsul cu adresa <span class="font-roboto-semibold">{email as "safe"}</span>.
        Vă vom contacta în cel mai scurt timp.
      </Alert>

    </div>
  )
}

export default ContactSubmitted

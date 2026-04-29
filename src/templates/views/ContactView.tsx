import ContactForm, { ContactFormValues, contactFormId } from "$templates/components/contact/ContactForm"
import ContactSubmitted from "$templates/components/contact/ContactSubmitted"

export const contactViewContainerId = "contact-view"

const emptyValues: ContactFormValues = {
  firstName: "",
  lastName: "",
  numeInstitutie: "",
  email: "",
}

type Props = {
  actionPath: string
  submittedEmail?: string
}

const ContactView = ({ actionPath, submittedEmail }: Props) => {
  return (
    <div
      id={contactViewContainerId}
      data-visible-on-mobile
      class="h-full flex items-center justify-center px-4"
    >
      {/* Background glow */}
      <div class="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div class="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-[120px]" />
        <div class="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-purple-600/10 blur-[100px]" />
      </div>

      <div class="w-full max-w-md">
        {/* Header */}
        <div class="mb-8 text-center">
          <div class="inline-flex items-center gap-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/25 text-blue-400 text-xs font-roboto-semibold uppercase tracking-widest mb-4">
            <span class="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse inline-block" />
            Contact
          </div>
          <h1 class="text-2xl font-roboto-bold text-white mb-2">
            SAP Team
          </h1>
          <p class="text-sm text-gray-400 leading-relaxed">
            Completați formularul de mai jos și vă vom contacta în cel mai scurt timp.
          </p>
        </div>

        {/* Card */}
        <div class="bg-gray-900/50 border border-gray-800/60 rounded-2xl p-6 sm:p-8">
          {submittedEmail ? (
            <ContactSubmitted email={submittedEmail} />
          ) : (
            <ContactForm
              values={emptyValues}
              initialValues={emptyValues}
              actionPath={actionPath}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default ContactView

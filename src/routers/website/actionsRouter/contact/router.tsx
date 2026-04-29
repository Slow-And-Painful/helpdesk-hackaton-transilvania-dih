import { container } from "tsyringe"
import { createRouter } from "../../utils"
import { ROUTE } from "./types"
import { schemas } from "./schemas"
import ContactFormSubmissionsService from "$services/ContactFormSubmissionsService"
import DrizzleDB from "$components/DrizzleDB"
import MailerComponent from "$components/MailerComponent"
import ContactForm, { ContactFormValues, contactFormId } from "$templates/components/contact/ContactForm"
import ContactSubmitted from "$templates/components/contact/ContactSubmitted"
import { FormErrors } from "$types/ui"
import { validateEmail } from "$utils/validation"
import EMAIL_TEMPLATES from "$types/EMAIL_TEMPLATES"
import LANGUAGES from "$types/LANGUAGES"

export const routerPrefix = "/contact"

const COOKIE_NAME = "contact_submitted"
const COOKIE_MAX_AGE = 60 * 60 * 24

const NOTIFY_EMAIL = "davideantipa@gmail.com"

const drizzleDB = container.resolve<DrizzleDB>(DrizzleDB.token)
const contactService = new ContactFormSubmissionsService(drizzleDB)
const mailerComponent = container.resolve<MailerComponent>(MailerComponent.token)

export const router = createRouter("contact", (server) => {
  server.route({
    method: "POST",
    url: ROUTE.SUBMIT,
    schema: schemas[ROUTE.SUBMIT],
    handler: async (req, res) => {
      const { firstName, lastName, numeInstitutie, email } = req.body

      const errors: FormErrors<ContactFormValues> = {}

      if (!firstName?.trim()) errors.firstName = "Prenumele este obligatoriu"
      if (!lastName?.trim()) errors.lastName = "Numele este obligatoriu"
      if (!numeInstitutie?.trim()) errors.numeInstitutie = "Numele instituției este obligatoriu"
      if (!validateEmail(email)) errors.email = "Adresă de email invalidă"

      const actionPath = `/actions${routerPrefix}${ROUTE.SUBMIT}`

      if (Object.keys(errors).length > 0) {
        return res
          .headers({
            "HX-Retarget": `#${contactFormId}`,
            "HX-Reswap": "outerHTML",
          })
          .view(
            <ContactForm
              values={{ firstName, lastName, numeInstitutie, email }}
              initialValues={{ firstName, lastName, numeInstitutie, email }}
              errors={errors}
              actionPath={actionPath}
            />
          )
      }

      await contactService.insert({ firstName, lastName, numeInstitutie, email })

      mailerComponent.sendTemplateEmail({
        templateKey: EMAIL_TEMPLATES.CONTACT_FORM_SUBMISSION,
        language: LANGUAGES.EN,
        to: NOTIFY_EMAIL,
        payload: { firstName, lastName, numeInstitutie, email },
      }).catch((err) => {
        console.error("Failed to send contact form notification email", err)
      })

      res.setCookie(COOKIE_NAME, email, {
        path: "/",
        maxAge: COOKIE_MAX_AGE,
        httpOnly: false,
        sameSite: "lax",
        secure: "auto" as unknown as boolean,
      })

      return res
        .headers({
          "HX-Retarget": `#${contactFormId}`,
          "HX-Reswap": "outerHTML",
        })
        .view(<ContactSubmitted email={email} />)
    },
  })
})

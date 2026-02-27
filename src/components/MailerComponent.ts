import { container, inject, singleton } from "tsyringe"
import MailerConnectorComponent from "./MailerConnectorComponent"
import EmailTemplatesService from "$services/EmailTemplatesService"
import LANGUAGES from "$types/LANGUAGES"
import Handlebars from "handlebars"
import EMAIL_TEMPLATES from "$types/EMAIL_TEMPLATES"

@singleton()
export default class MailerComponent {
  constructor(
    @inject(MailerConnectorComponent.token)
    private mailerConnectorComponent: MailerConnectorComponent,
    @inject(EmailTemplatesService.token)
    private emailTemplatesService: EmailTemplatesService,
  ) {}

  sendTemplateEmail = async (options: {
    templateKey: EMAIL_TEMPLATES
    language?: LANGUAGES
    to: string | string[]
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    payload: any
  }): Promise<void> => {
    const { language = LANGUAGES.EN, payload, templateKey, to } = options
    const toArray = (Array.isArray(to)
      ? Array.from((new Set(to))) // Remove duplicates
      : [to]
    )

    const pk = templateKey

    if (!pk) {
      throw new Error(
        `Email template not found for key ${templateKey as string} and language ${language}`,
      )
    }

    const template = await this.emailTemplatesService.getOrFail(pk)

    const body = Handlebars.compile(template.body)(payload)
    const subject = Handlebars.compile(template.subject)(payload)

    await Promise.all(
      toArray.map((to) =>
        this.mailerConnectorComponent.sendMjmlMail({
          mjmlBody: body,
          subject,
          to,
        }),
      ),
    )
  }

  static token = Symbol("MailerComponent")
}

container.registerSingleton(MailerComponent.token, MailerComponent)
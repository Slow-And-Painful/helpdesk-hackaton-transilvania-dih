import mjml2html from "mjml"
import { convert } from "html-to-text"

export type SendMailOptions = {
  to: string
  subject: string
  html: string
  text?: string
}

export type SendMjmlMailOptions = {
  to: string
  subject: string
  mjmlBody: string
}

abstract class MailerConnectorComponent {
  constructor(protected from: string) {}

  abstract sendMail(options: SendMailOptions): Promise<void>

  sendMjmlMail = async (options: SendMjmlMailOptions): Promise<void> => {
    const { html, text } = this.processMjml(options.mjmlBody)
    await this.sendMail({
      to: options.to,
      subject: options.subject,
      html,
      text,
    })
  }

  protected processMjml = (
    mjml: string,
  ): {
    html: string
    text: string
  } => {
    const html = mjml2html(mjml).html
    const text = convert(html)

    return {
      html,
      text,
    }
  }

  static token = Symbol("MailerConnectorComponent")
}

export default MailerConnectorComponent

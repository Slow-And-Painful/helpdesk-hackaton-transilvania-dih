import { inject, injectable } from "tsyringe"
import MailerConnectorComponent, {
  SendMailOptions,
} from "./MailerConnectorComponents"
import { createTransport, Transporter } from "nodemailer"
import Configs from "$components/Configs"

@injectable()
export default class BaseMailerConnector extends MailerConnectorComponent {
  private transporter: Transporter

  constructor(
    @inject(Configs.token)
    private configs: Configs,
  ) {
    super(configs.env.EMAIL_FROM)

    this.transporter = createTransport({
      port: configs.env.LOCAL_MAILHOG_SMTP_PORT,
      host: configs.env.LOCAL_MAILHOG_HOST,
    })
  }

  sendMail = async (options: SendMailOptions): Promise<void> => {
    const { html, text, subject, to } = options

    await this.transporter.sendMail({
      from: this.from,
      to,
      subject,
      text,
      html,
    })
  }
}

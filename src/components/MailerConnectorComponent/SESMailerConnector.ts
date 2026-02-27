import { inject, injectable } from "tsyringe"
import MailerConnectorComponent, {
  SendMailOptions,
} from "./MailerConnectorComponents"
import Configs from "$components/Configs"
import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2"
import WinstonComponent from "$components/WinstonComponent"
import { Logger } from "winston"

@injectable()
export default class SESMailerConnector extends MailerConnectorComponent {
  #ses: SESv2Client
  #logger: Logger

  constructor(
    @inject(Configs.token)
    private configs: Configs,
    @inject(WinstonComponent.token)
    private winstonComponent: WinstonComponent,
  ) {
    super(configs.env.EMAIL_FROM)

    this.#ses = new SESv2Client({
      region: configs.env.AWS_REGION,
    })

    this.#logger = winstonComponent.winston.child({
      scope: "SESMailerConnector",
    })
  }

  sendMail = async (options: SendMailOptions): Promise<void> => {
    const { html, text, subject, to } = options

    this.#logger.info(`Sending email to ${to} with subject "${subject}"`,)

    const command = new SendEmailCommand({
      Content: {
        Simple: {
          Body: {
            Html: {
              Data: html,
              Charset: "UTF-8",
            },
            Text: {
              Data: text,
              Charset: "UTF-8",
            },
          },
          Subject: {
            Data: subject,
            Charset: "UTF-8",
          },
        },
      },
      FromEmailAddress: this.from,
      Destination: {
        ToAddresses: [to],
      },
    })

    await this.#ses.send(command)
  }
}

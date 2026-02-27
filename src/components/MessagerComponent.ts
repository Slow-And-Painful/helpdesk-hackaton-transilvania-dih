import { CommonTransaction } from "$services/BaseService"
import EMAIL_TEMPLATES from "$types/EMAIL_TEMPLATES"
import LANGUAGES from "$types/LANGUAGES"
import { container, inject, injectable } from "tsyringe"
import MailerComponent from "./MailerComponent"
import UsersService from "$services/UsersService"
import WinstonComponent from "./WinstonComponent"
import { Logger } from "winston"

type SendEmailOptions = {
  transaction?: CommonTransaction
  language?: LANGUAGES
}

@injectable()
export default class MessagerComponent {
  logger: Logger

  constructor(
    @inject(MailerComponent.token)
    private mailerComponent: MailerComponent,

    @inject(UsersService.token)
    private usersService: UsersService,

    @inject(WinstonComponent.token)
    private winstonComponent: WinstonComponent,
  ) {
    this.logger = this.winstonComponent.winston.child({
      scope: "MessagerComponent",
    })
  }

  sendConfirmationEmail = async (
    resources: {
      targetUserId: number
      activationLink: string
    },
    options?: SendEmailOptions,
  ): Promise<void> => {
    const { targetUserId, activationLink } = resources
    const { transaction, language } = options || {}

    const targetUser = await this.usersService.get(targetUserId, {
      transaction,
    })

    if (!targetUser) {
      this.logger.error(`No user found with id ${targetUserId}`)
      return
    }

    await this.mailerComponent.sendTemplateEmail({
      templateKey: EMAIL_TEMPLATES.EMAIL_CONFIRMATION,
      language,
      to: targetUser.email,
      payload: {
        targetUser,
        activationLink,
      },
    })
  }

  sendLoginEmail = async (
    resources: {
      targetUserId: number
      activationLink: string
    },
    options?: SendEmailOptions,
  ): Promise<void> => {
    const { targetUserId, activationLink } = resources
    const { transaction, language } = options || {}

    const targetUser = await this.usersService.get(targetUserId, {
      transaction,
    })

    if (!targetUser) {
      this.logger.error(`No user found with id ${targetUserId}`)
      return
    }

    await this.mailerComponent.sendTemplateEmail({
      templateKey: EMAIL_TEMPLATES.LOGIN,
      language,
      to: targetUser.email,
      payload: {
        targetUser,
        activationLink,
      },
    })
  }

  static token = Symbol("MessagerComponent")
}

container.registerSingleton(MessagerComponent.token, MessagerComponent)

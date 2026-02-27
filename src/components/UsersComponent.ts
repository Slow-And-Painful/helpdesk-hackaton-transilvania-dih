import UsersService, { User } from "$services/UsersService"
import { container, delay, inject, injectable } from "tsyringe"
import Configs from "./Configs"
import DrizzleDB from "./DrizzleDB"
import CodesComponent from "./CodesComponents"
import CodesService, { MAIN_QUERY_RESULT as CODES_MAIN_QUERY_RESULT } from "$services/CodesService"
import MessagerComponent from "./MessagerComponent"
import { CommonOptions } from "$services/BaseService"
import USER_TYPE from "$types/USER_TYPE"
import { and, eq } from "drizzle-orm"
import { CODE_TYPE } from "$dbSchemas/Codes"

@injectable()
export default class UsersComponent {
  constructor(
    @inject(DrizzleDB.token)
    private drizzleDB: DrizzleDB,

    @inject(Configs.token)
    private configs: Configs,

    @inject(delay(() => UsersService))
    private usersService: UsersService,

    @inject(CodesComponent.token)
    private codesComponent: CodesComponent,

    @inject(CodesService.token)
    private codesService: CodesService,

    @inject(MessagerComponent.token)
    private messagerComponent: MessagerComponent
  ) {}

  _createUser = async (data: {
    email: string,
    userType: USER_TYPE,
  }, options?: CommonOptions<User>): Promise<User> => {
    const { email, userType } = data

    const transaction = options?.transaction

    const user = await this.usersService.insert({
      email,
      emailVerified: false,
      type: userType,
      termsConditionsAcceptance: false,
      privacyPolicyAcceptance: false
    }, { transaction })

    return user
  }

  confirmEmail = async ({
    userId,
    codeId,
    options
  }: {
    userId: number
    codeId: number
    options?: CommonOptions<CODES_MAIN_QUERY_RESULT>
  }) => {
    // use the passed code
    await this.codesComponent.useCode({ resources: { codeId } })

    // disable all other CONFIRM_EMAIL codes for that user (if any)
    const toDisable = await this.codesService.list({
      where: and(
        eq(this.codesService.mainTable.type, CODE_TYPE.CONFIRM_EMAIL),
        eq(this.codesService.mainTable.targetUserId, userId),
      ),
      transaction: options?.transaction,
    })

    if (toDisable.length > 0) {
      const toDisableIds = toDisable.map((code) => code.id)
      await this.codesService.disableCodes({
        options,
        codeIds: toDisableIds,
      })
    }

    await this.usersService.update(userId, {
      emailVerified: true,
    }, { transaction: options?.transaction })
  }

  static token = Symbol("UsersComponent")
}

container.register(UsersComponent.token, UsersComponent)

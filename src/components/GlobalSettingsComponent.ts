import { defaultGlobalSettings, GlobalSettings } from "$constants/globalSettings"
import { GlobalSettingsSchema } from "$dbSchemas/GlobalSettings"
import GlobalSettingsService from "$services/GlobalSettingsService"
import { container, inject, singleton } from "tsyringe"


@singleton()
export default class GlobalSettingsComponent {
    constructor(
        @inject(GlobalSettingsService.token)
        private globalSettingsService: GlobalSettingsService,
    ) {}

    private parseGlobalSettings = (data: GlobalSettingsSchema[]): GlobalSettings => (
        {
            ...defaultGlobalSettings,
            ...Object.fromEntries(
                data.map(({ key, value }) => [key, value])
            )
        }
    )

    getGlobalSettings = async (): Promise<GlobalSettings> => {
        const globalSettingsList = await this.globalSettingsService.list()
        return this.parseGlobalSettings(globalSettingsList)
    }

    updateGlobalSetting = async <T extends keyof GlobalSettings>(key: T, value: GlobalSettings[T]): Promise<void> => {
        const exists = await this.globalSettingsService.get(key)

        if (!exists) {
            await this.globalSettingsService.insert({
                key,
                value
            })
        } else {
            await this.globalSettingsService.update(key, {
                value
            })
        }
    }

    static token = Symbol("GlobalSettingsComponent")
}

container.registerSingleton(GlobalSettingsComponent.token, GlobalSettingsComponent)

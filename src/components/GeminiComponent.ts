import { container, inject, injectable } from "tsyringe"
import { GoogleGenAI, type Content } from "@google/genai"
import Configs from "$components/Configs"
import GlobalSettingsComponent from "./GlobalSettingsComponent"
import GLOBAL_SETTINGS from "$types/GLOBAL_SETTINGS"

@injectable()
export default class GeminiComponent {
  client: GoogleGenAI
  model: string

  constructor(
    @inject(Configs.token)
    private configs: Configs,

    @inject(GlobalSettingsComponent.token)
    private globalSettingsComponent: GlobalSettingsComponent,
  ) {
    this.client = new GoogleGenAI({ apiKey: configs.env.GEMINI_API_KEY })
    this.model = "gemini-2.5-flash-lite"
  }

  sendMessage = async(options: {
    prompt: string,
    history: Content[],
    systemPrompts: {
      department: string
    }
  }) => {
    const {
      prompt,
      history,
      systemPrompts,
    } = options

    const globalSettings = await this.globalSettingsComponent.getGlobalSettings()
    const globalSystemPrompt = globalSettings[GLOBAL_SETTINGS.SYSTEM_PROMPT]

    const chat = this.client.chats.create({
      model: this.model,
      history: [
        {
          parts: [
            {
              text: globalSystemPrompt,
            }
          ],
          role: "user",
        },
        {
          parts: [
            {
              text: systemPrompts.department,
            }
          ],
          role: "user",
        },
        ...history,
      ],
    })

    const response = await chat.sendMessage({ message: prompt })

    return response.text
  }

  static token = Symbol("GeminiComponent")
}

container.register(GeminiComponent.token, GeminiComponent)

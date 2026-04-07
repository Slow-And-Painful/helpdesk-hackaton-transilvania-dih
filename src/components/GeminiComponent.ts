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
      documents?: Array<{ id: number; name: string; aiDescription: string }>
    }
  }) => {
    const {
      prompt,
      history,
      systemPrompts,
    } = options

    const globalSettings = await this.globalSettingsComponent.getGlobalSettings()
    const globalSystemPrompt = globalSettings[GLOBAL_SETTINGS.SYSTEM_PROMPT]

    const systemHistory: Content[] = [
      {
        parts: [{ text: globalSystemPrompt }],
        role: "user",
      },
      {
        parts: [{ text: systemPrompts.department }],
        role: "user",
      },
    ]

    if (systemPrompts.documents && systemPrompts.documents.length > 0) {
      const docLines = systemPrompts.documents
        .map(d => `[DOC:${d.id}] ${d.name}: ${d.aiDescription}`)
        .join("\n")

      systemHistory.push({
        parts: [{
          text: `The following documents are available in this department's knowledge base. When recommending a document to the user, reference it using the exact marker [DOC:<id>] so it can be rendered as a link.\n\n${docLines}`,
        }],
        role: "user",
      })
    }

    const chat = this.client.chats.create({
      model: this.model,
      history: [
        ...systemHistory,
        ...history,
      ],
    })

    const response = await chat.sendMessage({ message: prompt })

    return response.text
  }

  static token = Symbol("GeminiComponent")
}

container.register(GeminiComponent.token, GeminiComponent)

import { container, inject, injectable } from "tsyringe"
import { GoogleGenAI, type Content } from "@google/genai"
import Configs from "$components/Configs"

@injectable()
export default class GeminiComponent {
  client: GoogleGenAI
  model: string

  constructor(
    @inject(Configs.token)
      configs: Configs
  ) {
    this.client = new GoogleGenAI({
      apiKey: configs.env.GEMINI_API_KEY
    })
    this.model = "gemini-2.5-flash-lite"
  }

  async sendMessage(prompt: string, history?: Content[]) {
    const chat = this.client.chats.create({
      model: this.model,
      history,
    })
    const response = await chat.sendMessage({ message: prompt })
    return response.text
  }

  static token = Symbol("GeminiComponent")
}

container.register(GeminiComponent.token, GeminiComponent)

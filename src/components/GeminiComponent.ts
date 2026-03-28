import { inject } from "tsyringe"
import { GoogleGenAI, CreateChatParameters, SendMessageParameters} from "@google/genai"
import Configs from "$components/Configs"

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

  async createChat() {
    const chat = this.client.chats.create({ model: this.model });
    return chat;
  } 

  async generateContent(prompt: string) {
    const chat = await this.createChat();
    const response = await chat.sendMessage({ message: prompt });
    return response.text;
  }
}

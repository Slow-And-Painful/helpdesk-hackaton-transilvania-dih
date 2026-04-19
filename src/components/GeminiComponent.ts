import { container, inject, injectable } from "tsyringe"
import { GoogleGenAI, type Content, type GenerateContentResponse } from "@google/genai"
import Configs from "$components/Configs"
import GlobalSettingsComponent from "./GlobalSettingsComponent"
import GLOBAL_SETTINGS from "$types/GLOBAL_SETTINGS"

type MessageOptions = {
  prompt: string
  history: Content[]
  systemPrompts: {
    department: string
    documents?: Array<{ id: number; name: string; aiDescription: string; extractedText?: string }>
    allDepartments?: Array<{ id: number; name: string; aiDescription: string }>
  }
}

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

  private buildSystemHistory = async(systemPrompts: MessageOptions["systemPrompts"]): Promise<Content[]> => {
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

    if (systemPrompts.allDepartments && systemPrompts.allDepartments.length > 0) {
      const deptLines = systemPrompts.allDepartments
        .filter(d => d.aiDescription.trim().length > 0)
        .map(d => `ID:${d.id} — ${d.name}: ${d.aiDescription}`)
        .join("\n")

      if (deptLines) {
        systemHistory.push({
          parts: [{
            text: `Platforma are mai multe departamente. Mai jos găsești ID-ul și descrierea fiecăruia. Folosește ID-ul numeric al departamentului cel mai potrivit atunci când generezi un marcaj [CTA:CREATE_TICKET:...].\n\n${deptLines}`,
          }],
          role: "user",
        })
      }
    }

    if (systemPrompts.documents && systemPrompts.documents.length > 0) {
      // Build document index with references
      const docLines = systemPrompts.documents
        .map(d => `[DOC:${d.id}] ${d.name}${d.aiDescription ? `: ${d.aiDescription}` : ""}`)
        .join("\n")

      systemHistory.push({
        parts: [{
          text: `Următoarele documente sunt disponibile în baza de cunoștințe a departamentului. Când recomanzi un document utilizatorului, referențiază-l folosind exact marcajul [DOC:<id>] pentru ca acesta să fie afișat ca link descărcabil.\n\n${docLines}`,
        }],
        role: "user",
      })

      // Inject full extracted text for documents that have it
      const docsWithText = systemPrompts.documents.filter(d => d.extractedText && d.extractedText.trim().length > 0)
      if (docsWithText.length > 0) {
        const contentBlocks = docsWithText
          .map(d => `=== [DOC:${d.id}] ${d.name} ===\n${d.extractedText}`)
          .join("\n\n")

        systemHistory.push({
          parts: [{
            text: `Mai jos se află textul integral extras din documentele departamentului. Folosește aceste informații pentru a răspunde cu acuratețe la întrebările utilizatorului și citează documentul relevant folosind marcajele [DOC:<id>].\n\nDacă, după consultarea tuturor documentelor disponibile, nu poți oferi un răspuns satisfăcător sau problema necesită intervenție umană, adaugă la finalul răspunsului un marcaj [CTA:CREATE_TICKET:<departmentId>:<subiect>] conform instrucțiunilor din prompt-ul general.\n\n${contentBlocks}`,
          }],
          role: "user",
        })
      }
    }

    return systemHistory
  }

  sendMessage = async(options: MessageOptions) => {
    const { prompt, history, systemPrompts } = options

    const systemHistory = await this.buildSystemHistory(systemPrompts)

    const chat = this.client.chats.create({
      model: this.model,
      history: [...systemHistory, ...history],
    })

    const response = await chat.sendMessage({ message: prompt })

    return {
      text: response.text ?? "",
      inputTokens: response.usageMetadata?.promptTokenCount ?? 0,
      outputTokens: response.usageMetadata?.candidatesTokenCount ?? 0,
    }
  }

  streamMessage = async(options: MessageOptions): Promise<{ stream: AsyncGenerator<GenerateContentResponse>; getUsage: () => { inputTokens: number; outputTokens: number } }> => {
    const { prompt, history, systemPrompts } = options

    const systemHistory = await this.buildSystemHistory(systemPrompts)

    const chat = this.client.chats.create({
      model: this.model,
      history: [...systemHistory, ...history],
    })

    const stream = chat.sendMessageStream({ message: prompt })
    let inputTokens = 0
    let outputTokens = 0

    const wrappedStream = async function* () {
      for await (const chunk of await stream) {
        if (chunk.usageMetadata) {
          inputTokens = chunk.usageMetadata.promptTokenCount ?? 0
          outputTokens = chunk.usageMetadata.candidatesTokenCount ?? 0
        }
        yield chunk
      }
    }

    return {
      stream: wrappedStream(),
      getUsage: () => ({ inputTokens, outputTokens }),
    }
  }

  static token = Symbol("GeminiComponent")
}

container.register(GeminiComponent.token, GeminiComponent)

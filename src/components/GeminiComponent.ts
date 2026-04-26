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
    ticketSummaries?: Array<{ ticketId: number; summary: string }>
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

  private buildSystemInstruction = async(systemPrompts: MessageOptions["systemPrompts"]): Promise<string> => {
    const globalSettings = await this.globalSettingsComponent.getGlobalSettings()
    const globalSystemPrompt = globalSettings[GLOBAL_SETTINGS.SYSTEM_PROMPT]

    const parts: string[] = [globalSystemPrompt, systemPrompts.department]

    if (systemPrompts.allDepartments && systemPrompts.allDepartments.length > 0) {
      const deptLines = systemPrompts.allDepartments
        .filter(d => d.aiDescription.trim().length > 0)
        .map(d => `${d.id} — ${d.name}: ${d.aiDescription}`)
        .join("\n")

      if (deptLines) {
        parts.push(`Platforma are mai multe departamente. Mai jos găsești ID-ul numeric și descrierea fiecăruia. Folosește ID-ul numeric al departamentului cel mai potrivit atunci când generezi un marcaj [CTA:CREATE_TICKET:...]. Nu menționa niciodată ID-urile numerice ale departamentelor în răspunsurile tale — acestea sunt doar pentru uz intern.\n\n${deptLines}`)
      }
    }

    if (systemPrompts.documents && systemPrompts.documents.length > 0) {
      const docLines = systemPrompts.documents
        .map(d => `[DOC:${d.id}] ${d.name}${d.aiDescription ? `: ${d.aiDescription}` : ""}`)
        .join("\n")

      parts.push(`Următoarele documente sunt disponibile în baza de cunoștințe a departamentului. Când recomanzi un document utilizatorului, referențiază-l folosind exact marcajul [DOC:<id>] pentru ca acesta să fie afișat ca link descărcabil.\n\n${docLines}`)

      const docsWithText = systemPrompts.documents.filter(d => d.extractedText && d.extractedText.trim().length > 0)
      if (docsWithText.length > 0) {
        const contentBlocks = docsWithText
          .map(d => `=== [DOC:${d.id}] ${d.name} ===\n${d.extractedText}`)
          .join("\n\n")

        parts.push(`Mai jos se află textul integral extras din documentele departamentului. Folosește aceste informații pentru a răspunde cu acuratețe la întrebările utilizatorului și citează documentul relevant folosind marcajele [DOC:<id>].\n\n${contentBlocks}`)
      }
    }

    if (systemPrompts.ticketSummaries && systemPrompts.ticketSummaries.length > 0) {
      const summaryLines = systemPrompts.ticketSummaries
        .map(s => `- Ticket #${s.ticketId}: ${s.summary}`)
        .join("\n")

      parts.push(`Mai jos sunt rezumatele unor tichete anterioare rezolvate de acest departament. Folosește aceste informații pentru a răspunde direct la întrebări similare, fără a sugera deschiderea unui nou tichet dacă problema a mai fost rezolvată.\n\n${summaryLines}`)
    }

    return parts.join("\n\n---\n\n")
  }

  summarizeTicket = async (options: {
    ticketName: string
    ticketSummary: string | null
    messages: Array<{ senderName: string; text: string }>
  }): Promise<{ summary: string; inputTokens: number; outputTokens: number }> => {
    const { ticketName, ticketSummary, messages } = options

    const conversation = messages
      .map(m => `${m.senderName}: ${m.text}`)
      .join("\n")

    const prompt = [
      `Rezumă următorul tichet de suport într-un paragraf concis (maxim 3 propoziții).`,
      `Descrie problema raportată și soluția sau răspunsul oferit, astfel încât rezumatul să poată fi folosit ca referință pentru probleme similare în viitor.`,
      ``,
      `Titlu tichet: ${ticketName}`,
      ticketSummary ? `Descriere tichet: ${ticketSummary}` : null,
      conversation ? `\nConversație:\n${conversation}` : null,
    ].filter(Boolean).join("\n")

    const response = await this.client.models.generateContent({
      model: this.model,
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    })

    return {
      summary: response.text ?? "",
      inputTokens: response.usageMetadata?.promptTokenCount ?? 0,
      outputTokens: response.usageMetadata?.candidatesTokenCount ?? 0,
    }
  }

  sendMessage = async(options: MessageOptions) => {
    const { prompt, history, systemPrompts } = options

    const systemInstruction = await this.buildSystemInstruction(systemPrompts)

    const chat = this.client.chats.create({
      model: this.model,
      config: { systemInstruction },
      history,
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

    const systemInstruction = await this.buildSystemInstruction(systemPrompts)

    const chat = this.client.chats.create({
      model: this.model,
      config: { systemInstruction },
      history,
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

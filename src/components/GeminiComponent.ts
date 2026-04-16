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
        .map(d => `[DEPT:${d.id}] ${d.name}: ${d.aiDescription}`)
        .join("\n")

      if (deptLines) {
        systemHistory.push({
          parts: [{
            text: `Platforma are mai multe departamente. Mai jos găsești o scurtă descriere a fiecăruia, împreună cu identificatorul lor [DEPT:<id>].\n\nDacă solicitarea utilizatorului nu aparține departamentului curent sau dacă recomanzi deschiderea unui tichet de suport, specifică departamentul cel mai potrivit folosind marcajul [DEPT:<id>] (de exemplu: [DEPT:3]) — acesta va fi utilizat automat pentru a pre-selecta departamentul destinatar la crearea tichetului.\n\n${deptLines}`,
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
            text: `Mai jos se află textul integral extras din documentele departamentului. Folosește aceste informații pentru a răspunde cu acuratețe la întrebările utilizatorului și citează documentul relevant folosind marcajele [DOC:<id>].\n\nDacă, după consultarea tuturor documentelor disponibile, nu poți oferi un răspuns satisfăcător sau problema necesită intervenție umană, informează utilizatorul că poate deschide un tichet de suport. Identifică departamentul cel mai potrivit din lista de departamente disponibile și include marcajul [DEPT:<id>] al acestuia. Încheie răspunsul cu exact această propoziție pe un rând nou (înlocuind [DEPT:<id>] cu marcajul real al departamentului recomandat): „Nu am găsit o procedură care să acopere această situație. Te invit să deschizi un tichet de suport [DEPT:<id>] — echipa responsabilă îl va prelua și îți va oferi asistență personalizată." — aceasta va activa automat un buton de creare tichet în interfață.\n\n${contentBlocks}`,
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

    return response.text
  }

  streamMessage = async(options: MessageOptions): Promise<AsyncGenerator<GenerateContentResponse>> => {
    const { prompt, history, systemPrompts } = options

    const systemHistory = await this.buildSystemHistory(systemPrompts)

    const chat = this.client.chats.create({
      model: this.model,
      history: [...systemHistory, ...history],
    })

    return chat.sendMessageStream({ message: prompt })
  }

  static token = Symbol("GeminiComponent")
}

container.register(GeminiComponent.token, GeminiComponent)

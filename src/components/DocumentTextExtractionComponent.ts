import { container, inject, singleton } from "tsyringe"
import { GoogleGenAI } from "@google/genai"
import Configs from "$components/Configs"
import RAGDocumentsBucketComponent from "./RAGDocumentsBucketComponent"
import RAGDocumentsService from "$services/RAGDocumentsService"
import SSEManagerComponent from "$components/SSEManagerComponent"
import { RAGDocumentSchema } from "$dbSchemas/ragDocuments"

@singleton()
export default class DocumentTextExtractionComponent {
  private client: GoogleGenAI
  private model: string

  constructor(
    @inject(Configs.token)
    private configs: Configs,

    @inject(RAGDocumentsBucketComponent.token)
    private ragDocumentsBucketComponent: RAGDocumentsBucketComponent,

    @inject(RAGDocumentsService.token)
    private ragDocumentsService: RAGDocumentsService,

    @inject(SSEManagerComponent.token)
    private sseManagerComponent: SSEManagerComponent,
  ) {
    this.client = new GoogleGenAI({ apiKey: configs.env.GEMINI_API_KEY })
    this.model = "gemini-2.5-flash-lite"
  }

  extractText = async (document: RAGDocumentSchema): Promise<string> => {
    // Download the document bytes from S3
    const s3Object = await this.ragDocumentsBucketComponent.bucket.getObject(document.s3Key)

    if (!s3Object.Body) {
      throw new Error("Document has no body in S3")
    }

    const bodyBytes = await s3Object.Body.transformToByteArray()
    const base64Data = Buffer.from(bodyBytes).toString("base64")

    // Only PDFs are accepted — key has no extension, so hardcode the MIME type
    const mimeType = "application/pdf"

    const response = await this.client.models.generateContent({
      model: this.model,
      contents: [
        {
          parts: [
            {
              inlineData: {
                mimeType,
                data: base64Data,
              },
            },
            {
              text: "Please extract all the text content from this document. Return only the raw extracted text, preserving the structure (headings, paragraphs, lists) as plain text. Do not add any commentary or explanation — just the document content.",
            },
          ],
        },
      ],
    })

    return response.text ?? ""
  }

  extractAndSave = async (document: RAGDocumentSchema, userId?: number): Promise<void> => {
    const roomId = userId
      ? SSEManagerComponent.getUserRoomId(userId)
      : SSEManagerComponent.getGlobalRoomId()

    // Mark as extracting
    await this.ragDocumentsService.update(document.id, {
      extractionStatus: "extracting",
    })

    void this.sseManagerComponent.send(roomId, {
      type: "DOCUMENT_EXTRACTION_STATUS",
      documentId: document.id,
      status: "extracting",
    })

    try {
      const extractedText = await this.extractText(document)

      await this.ragDocumentsService.update(document.id, {
        extractedText,
        extractionStatus: "done",
      })

      void this.sseManagerComponent.send(roomId, {
        type: "DOCUMENT_EXTRACTION_STATUS",
        documentId: document.id,
        status: "done",
        extractedText,
      })
    } catch (error) {
      await this.ragDocumentsService.update(document.id, {
        extractionStatus: "failed",
      })

      void this.sseManagerComponent.send(roomId, {
        type: "DOCUMENT_EXTRACTION_STATUS",
        documentId: document.id,
        status: "failed",
      })

      throw error
    }
  }

  static token = Symbol("DocumentTextExtractionComponent")
}

container.registerSingleton(DocumentTextExtractionComponent.token, DocumentTextExtractionComponent)

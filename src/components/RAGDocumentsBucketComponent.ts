import { container, inject, singleton, InjectionToken } from "tsyringe"
import Configs from "$components/Configs"
import S3BucketComponent from "./S3BucketComponent"
import S3ClientComponent from "./S3ClientComponent"

type RAGDocumentOptions = {
  key: string
}

@singleton()
export default class RAGDocumentsBucketComponent {
  readonly bucket: S3BucketComponent

  constructor(
    @inject(Configs.token)
    configs: Configs,
    @inject(S3ClientComponent.token)
    s3ClientComponent: S3ClientComponent,
  ) {
    this.bucket = new S3BucketComponent({
      s3Client: s3ClientComponent.client,
      bucketName: configs.env.AI_KNOWLEDGE_BUCKET_NAME || "rag-documents",
      dataPrefix: "department-documents",
    })

    if (configs.env.ENVIRONMENT === "local" && configs.env.S3_ENDPOINT) {
      void this.bucket.tryBucketCreation()
    }
  }

  _partialKey = (options: RAGDocumentOptions) => options.key

  key = (options: RAGDocumentOptions) => this.bucket._key(this._partialKey(options))

  putDocumentSignedUrl = async (options: RAGDocumentOptions) => {
    const partialKey = this._partialKey(options)
    const { url } = await this.bucket.putObjectSignedUrl(partialKey)
    return url
  }

  getDocumentSignedUrl = async (options: RAGDocumentOptions) => {
    const partialKey = this._partialKey(options)
    const { url } = await this.bucket.getObjectSignedUrl(partialKey)
    return url
  }

  deleteDocument = async (options: RAGDocumentOptions) => {
    const partialKey = this._partialKey(options)
    await this.bucket.deleteObject(partialKey)
  }

  static token: InjectionToken<RAGDocumentsBucketComponent> = Symbol("RAGDocumentsBucketComponent")
}

container.registerSingleton(RAGDocumentsBucketComponent.token, RAGDocumentsBucketComponent)

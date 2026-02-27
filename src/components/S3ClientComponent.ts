import { container, inject, singleton } from "tsyringe"
import Configs from "$components/Configs"
import { S3Client } from "@aws-sdk/client-s3"

@singleton()
export default class S3ClientComponent {
  client: S3Client

  constructor(
    @inject(Configs.token)
      configs: Configs
  ) {
    this.client = new S3Client({
      ...(configs.env.ENVIRONMENT === "local" && configs.env.S3_ENDPOINT ? {
        region: configs.env.AWS_REGION,
        forcePathStyle: true,
        endpoint: configs.env.S3_ENDPOINT,
        credentials: {
          accessKeyId: "admin",
          secretAccessKey: "password"
        }
      } : {})
    })
  }

  static token = Symbol("S3ClientComponent")
}

container.registerSingleton(S3ClientComponent.token, S3ClientComponent)

import {
  S3Client,
  HeadBucketCommand,
  HeadObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  DeleteObjectCommand,
  CreateBucketCommand,
  CopyObjectCommand
} from "@aws-sdk/client-s3"
import { join } from "path"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"

import { Upload } from "@aws-sdk/lib-storage"
import { createReadStream, createWriteStream, existsSync } from "fs"
import { Readable } from "stream"
import { pipeline } from "stream/promises"

export default class S3BucketComponent {
  bucketName: string
  dataPrefix: string
  s3Client: S3Client

  constructor(
    options: {
      bucketName: string
      dataPrefix?: string
      s3Client: S3Client
    }
  ) {
    this.bucketName = options.bucketName
    this.dataPrefix = options.dataPrefix || ""
    this.s3Client = options.s3Client
  }

  _key = (partialKey: string) => join(this.dataPrefix, partialKey).replace(/\\/g, "/")

  getObject = async (partialKey: string) => {
    const command = new GetObjectCommand({
      Bucket: this.bucketName,
      Key: this._key(partialKey)
    })

    return this.s3Client.send(command)
  }

  tryBucketCreation = async () => {
    try {
      const command = new CreateBucketCommand({
        Bucket: this.bucketName
      })

      await this.s3Client.send(command)
      return true
    } catch (_) {
      return false
    }
  }

  checkBucketExists = async () => {
    try {
      const command = new HeadBucketCommand({
        Bucket: this.bucketName
      })

      await this.s3Client.send(command)
      return true
    } catch (_) {
      return false
    }
  }

  // Size in Bytes
  headObject = async (partialKey: string): Promise<({
    exists: true,
    size: number
  } | {
    exists: false,
    size: null
  })> => {
    try {
      const command = new HeadObjectCommand({
        Bucket: this.bucketName,
        Key: this._key(partialKey)
      })

      const response = await this.s3Client.send(command)
      return {
        exists: true,
        size: response.ContentLength!
      }
    } catch (_error) {
      return {
        exists: false,
        size: null
      }
    }
  }

  checkObjectExists = async (partialKey: string) => {
    const { exists } = await this.headObject(partialKey)
    return exists
  }

  getObjectSignedUrl = async (partialKey: string, expiresIn: number = 60 * 60) => {
    const command = new GetObjectCommand({
      Bucket: this.bucketName,
      Key: this._key(partialKey)
    })

    return {
      url: await getSignedUrl(this.s3Client, command, { expiresIn }),
      partialKey
    }
  }

  putObjectSignedUrl = async (partialKey: string, options?: {
    command?: Partial<PutObjectCommand["input"]>,
    expiresIn?: number
  }) => {
    const {
      command: commandOptions = {},
      expiresIn = 60 * 60
    } = options || {}
    
    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: this._key(partialKey),
      ...commandOptions
    })

    return {
      url: await getSignedUrl(this.s3Client, command, { expiresIn }),
      partialKey
    }
  }

  deleteObject = async (partialKey: string) => {
    const command = new DeleteObjectCommand({
      Bucket: this.bucketName,
      Key: this._key(partialKey)
    })

    return this.s3Client.send(command)
  }

  getContent = async (partialKey: string) => {
    const command = new GetObjectCommand({
      Bucket: this.bucketName,
      Key: this._key(partialKey)
    })

    const { Body } = await this.s3Client.send(command)
    return Body?.transformToString("utf-8") || ""
  }

  uploadLargeFile = async (partialKey: string, filePath: string) => {
    const fileExists = existsSync(filePath)

    if (!fileExists) {
      throw new Error(`File does not exist: ${filePath}`)
    }

    const fileStream = createReadStream(filePath)

    const parallelUpload = new Upload({
      client: this.s3Client,
      params: {
        Bucket: this.bucketName,
        Key: this._key(partialKey),
        Body: fileStream,
      },
      queueSize: 1,
      partSize: 5 * 1024 * 1024 // 5MB (minimum)
    })

    return parallelUpload.done()
  }

  downloadLargeFile = async (partialKey: string, filePath: string) => {
    const command = new GetObjectCommand({
      Bucket: this.bucketName,
      Key: this._key(partialKey)
    })

    const { Body } = await this.s3Client.send(command)

    if (Body instanceof Readable) {
      const writeStream = createWriteStream(filePath)
      await pipeline(Body, writeStream)
    }
  }

  copyObject = async (
    source: {
      bucket: string
      key: string
    },
    destination: {
      bucket: string
      key: string
    }
  ) => {
    const command = new CopyObjectCommand({
      Bucket: destination.bucket,
      Key: destination.key,
      CopySource: encodeURIComponent(`${source.bucket}/${source.key}`),
    })

    return this.s3Client.send(command)
  }
}

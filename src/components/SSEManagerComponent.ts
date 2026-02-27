import { container, inject, singleton } from "tsyringe"
import {
  createSSEManager,
  SSEManager,
  FastifyHttpAdapter,
  PostgresEventsAdapter
} from "@soluzioni-futura/sse-manager"
import PostgresDB from "./PostgresDB"
import { SseEvents } from "$types/SSE_EVENTS"

@singleton()
export default class SSEManagerComponent {
  _init: Promise<void>
  _SSEManager?: SSEManager

  constructor(
    @inject(PostgresDB.token)
    postgresDB: PostgresDB
  ) {
    this._init = new Promise((resolve, reject) => {
      if (this._SSEManager) {
        resolve()
        return
      }

      createSSEManager({
        eventsAdapter: new PostgresEventsAdapter(postgresDB.sql),
        httpAdapter: new FastifyHttpAdapter()
      })
        .then(data => {
          this._SSEManager = data
          resolve()
        })
        .catch(reject)
    })
  }

  get SSEManager(): SSEManager {
    if (!this._SSEManager) {
      throw new Error("SSEManager not initialized yet")
    }

    return this._SSEManager
  }

  init = () => {
    return this._init
  }

  send = async(
    roomId: string,
    event: SseEvents
  ) => {
    await this.SSEManager.broadcast(roomId, {
      data: JSON.stringify(event)
    })
  }

  static getUserRoomId = (userId: number | string): string => `U-${userId}`
  static getGlobalRoomId = (): string => "ALL"


  static token = Symbol("SSEManagerComponent")
}

container.registerSingleton(SSEManagerComponent.token, SSEManagerComponent)

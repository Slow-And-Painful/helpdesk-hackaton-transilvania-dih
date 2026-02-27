import WinstonComponent from "$components/WinstonComponent"
import PeriodicTask from "$utils/PeriodicTask"

import { singleton, container, inject } from "tsyringe"
import Winston from "winston"
import DynamicQueue from "./DynamicQueue"
import DrizzleDB from "./DrizzleDB"

const _ms = (options: {
  seconds?: number
  minutes?: number
  hours?: number
  days?: number
}) => {
  const { seconds, minutes, hours, days } = options

  return (
    (seconds ?? 0) * 1000 +
    (minutes ?? 0) * 1000 * 60 +
    (hours ?? 0) * 1000 * 60 * 60 +
    (days ?? 0) * 1000 * 60 * 60 * 24
  )
}

@singleton()
export default class PeriodicTasksManager {
  tasks: PeriodicTask[] = []
  queues: DynamicQueue[] = []

  logger: Winston.Logger

  constructor(
    @inject(WinstonComponent.token)
    winstonComponent: WinstonComponent,

    @inject(DrizzleDB.token)
    private drizzleDB: DrizzleDB
  ) {
    this.logger = winstonComponent.winston.child({
      scope: "PeriodicTasksManager",
    })
  }

  initPeriodicTickCheck = () => {
    setInterval(() => {
      this.tasks.forEach((task) => {
        task.periodicTick()
      })
    }, 500)
  }

  init = () => {
    if (this.tasks.length) {
      throw new Error("PERIODIC_TASKS_MANAGER_ALREADY_STARTED")
    }

    this.tasks = [

    ]

    this.queues = []

    this.initPeriodicTickCheck()
  }

  stop = () => {
    this.tasks.forEach((task) => task.pause())
  }

  static token = Symbol("PeriodicTasksManager")
}

container.registerSingleton(PeriodicTasksManager.token, PeriodicTasksManager)

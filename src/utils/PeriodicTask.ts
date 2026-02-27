import { FromSchema } from "json-schema-to-ts"
import Winston from "winston"
import { JSONSchema7 } from "json-schema"

export enum TaskState {
  STARTED = "STARTED",
  PAUSED = "PAUSED",
}

export enum ExecutionState {
  RUNNING = "RUNNING",
  FAILED = "FAILED",
  SUCCEEDED = "SUCCEEDED",
  TIMED_OUT = "TIMED_OUT",
}

export const periodicTaskSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    name: { type: "string" },
    intervalMs: { type: "number" },
    lastExecution: {
      anyOf: [
        {
          type: "null",
        },
        {
          type: "object",
          properties: {
            state: { type: "string", enum: Object.values(ExecutionState) },
            startDate: { type: "string", format: "date-time" },
            completionDate: { type: ["string", "null"], format: "date-time" },
            error: { type: ["object", "null"] },
            data: { type: ["object", "null"] },
          },
          required: ["completionDate", "startDate", "error", "data", "state"],
        },
      ],
    },
    nextEstimatedExecutionDate: {
      anyOf: [{ type: "string", format: "date-time" }, { type: "null" }],
    },
    state: {
      type: "string",
      enum: Object.values(TaskState),
    },
  },
  required: [
    "name",
    "intervalMs",
    "lastExecution",
    "nextEstimatedExecutionDate",
    "state",
  ],
} as const satisfies JSONSchema7


export type FormattedTask = FromSchema<typeof periodicTaskSchema> & {
  executions: FromSchema<typeof periodicTaskSchema>["lastExecution"][]
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Any = any

export type FailData = Any
export type SuccessData = Any

export type OnFailHandler<T = FailData> = (data: T) => Promise<void>
export type OnSuccessHandler<T = SuccessData> = (data: T) => Promise<void>

const EMPTY = Symbol("EMPTY")
type EMPTY = typeof EMPTY

const tryCatch = async <SUCCESS_DATA = SuccessData, FAIL_DATA = FailData>(
  fn: () => Promise<SUCCESS_DATA>,
): Promise<[SUCCESS_DATA | EMPTY, FAIL_DATA | EMPTY]> => {
  try {
    const out = await fn()
    return [out, EMPTY]
  } catch (error) {
    return [EMPTY, error as FAIL_DATA]
  }
}

export class TaskExecution<SUCCESS_DATA, FAIL_DATA> {
  executionPromise: Promise<void> | null = null

  startDate: Date = new Date()
  handlerCompletionDate: Date | null = null
  completionDate: Date | null = null

  logger?: Winston.Logger
  periodicTaskName: string
  timeoutMs?: number
  id: string

  error: FailData = EMPTY
  data: SuccessData = EMPTY

  constructor(options: {
    handler: MainHandler<SUCCESS_DATA>
    onFail?: OnFailHandler<FAIL_DATA>
    onSuccess?: OnSuccessHandler<SUCCESS_DATA>
    logger?: Winston.Logger
    periodicTaskName: string
    timeoutMs?: number
    id: string
  }) {
    const { handler, onFail, onSuccess, logger, periodicTaskName } = options

    this.logger = logger
    this.periodicTaskName = periodicTaskName
    this.timeoutMs = options.timeoutMs
    this.id = options.id

    this.executionPromise = (async () => {
      this.logger?.info(`Starting execution of Task Execution ${options.id}`)
      const [handlerData, handlerError] = await tryCatch<
        SUCCESS_DATA,
        FAIL_DATA
      >(() => handler())
      this.handlerCompletionDate = new Date()

      if (handlerData !== EMPTY) {
        this.logger?.info(`Task Execution ${options.id} succeeded`)
        this.data = handlerData

        if (onSuccess) {
          const [, onSuccessError] = await tryCatch(() =>
            onSuccess(handlerData),
          )

          if (onSuccessError) {
            logger?.error(
              `Error in onSuccess of Task Execution ${options.id}: ${onSuccessError}`,
              onSuccessError,
            )
          }
        }
      }

      if (handlerError !== EMPTY) {
        this.logger?.error(`Task Execution ${options.id} failed`, {
          error: handlerError,
        })
        this.error = handlerError

        if (onFail) {
          const [, onFailError] = await tryCatch(() => onFail(handlerError))

          if (onFailError) {
            logger?.error(
              `Error in onFail of Task Execution ${options.id}: ${onFailError}`,
              onFailError,
            )
          }
        }
      }

      this.completionDate = new Date()
    })().catch((error) => {
      logger?.error(
        `Error in Task Execution ${this.id} main handler: ${error}`,
        error,
      )
      this.error = error as FAIL_DATA
      this.completionDate = new Date()
    })
  }

  get state(): ExecutionState {
    if (this.error !== EMPTY) {
      return ExecutionState.FAILED
    }

    if (this.data !== EMPTY) {
      return ExecutionState.SUCCEEDED
    }

    if (this.completionDate) {
      this.logger?.error(
        `Task Execution ${this.periodicTaskName} has completion date but no data or error. Fallback to FAILED state`,
      )
      this.error = {
        message: "Execution has completion date but no data or error",
      }

      return ExecutionState.FAILED
    }

    const delay = new Date().getTime() - this.startDate.getTime()
    const isTimedOut = this.timeoutMs && delay > this.timeoutMs
    if (isTimedOut) {
      return ExecutionState.TIMED_OUT
    }

    return ExecutionState.RUNNING
  }

  get finished() {
    return this.state !== ExecutionState.RUNNING
  }
}

export type MainHandler<SUCCESS_DATA = SuccessData> =
  () => Promise<SUCCESS_DATA>

const idx: Record<string, number> = {}

export default class PeriodicTask<
  SUCCESS_DATA = SuccessData,
  FAIL_DATA = FailData,
> {
  state: TaskState
  name: string
  logger?: Winston.Logger

  _MAX_SAVED_EXECUTIONS = 10
  public executions: TaskExecution<SUCCESS_DATA, FAIL_DATA>[] = []

  constructor(
    public readonly options: {
      handler: MainHandler<SUCCESS_DATA>
      onFail?: OnFailHandler<FAIL_DATA>
      onSuccess?: OnSuccessHandler<SUCCESS_DATA>
      intervalMs: number
      name: string
      logger?: Winston.Logger
      enabled?: boolean
      timeoutMs?: number,
      autoTickInterval?: number,
    },
  ) {
    const { enabled = true, autoTickInterval } = options

    this.name = options.name
    this.logger = options.logger
    this.executions = []

    if (enabled) {
      this.state = TaskState.STARTED
    } else {
      this.state = TaskState.PAUSED
    }

    if (autoTickInterval && autoTickInterval > 0) {
      setInterval(() => {
        this.periodicTick()
      }, autoTickInterval)
    }
  }

  periodicTick = () => {
    if (this.state === TaskState.STARTED) {
      this.tick({
        ignoreDelay: false,
        force: false,
      })
    }
  }

  get lastExecution(): TaskExecution<SUCCESS_DATA, FAIL_DATA> | null {
    const [lastExecution] = this.executions
    return lastExecution || null
  }

  _needToTick = (
    options: {
      force?: boolean
      ignoreDelay?: boolean
    } = {},
  ): boolean => {
    const { force = false, ignoreDelay = false } = options
    const lastExecution = this.lastExecution

    // If a tick is forced, ignore state
    if (force) {
      return true
    }

    // Never started. Tick
    if (!lastExecution) {
      return true
    }

    // If running, don't tick. Tick with running state is allowed only if forced
    if (lastExecution.state === ExecutionState.RUNNING) {
      return false
    }

    if (lastExecution.state === ExecutionState.TIMED_OUT) {
      this.logger?.error(
        `Periodic Task ${this.name} (last execution ${lastExecution.id}) has a timed out execution. Forcing tick`,
        {
          task: this.format(),
        },
      )

      return true
    }

    if (ignoreDelay) {
      return true
    }

    // A not running and not timed-out execution must have a completion date
    if (!lastExecution.completionDate) {
      this.logger?.error(
        `Periodic Task ${this.name} (last execution ${lastExecution.id}) has no completion date. Forcing tick`,
        {
          task: this.format(),
        },
      )

      return true
    }

    // Last execution is completed. Check delay
    const delay = new Date().getTime() - lastExecution.completionDate.getTime()

    if (delay >= this.options.intervalMs) {
      return true
    } else {
      return false
    }
  }

  tick = (options?: { force?: boolean; ignoreDelay?: boolean }) => {
    // Check if we need to tick
    const needToTick = this._needToTick(options)

    if (!needToTick) {
      return
    }

    if (!idx[this.name]) {
      idx[this.name] = 0
    }

    const newExecutionId = `${this.name}-${++idx[this.name]}`

    const newExecution = new TaskExecution({
      ...this.options,
      periodicTaskName: this.name,
      id: newExecutionId,
    })

    this.executions.unshift(newExecution)

    if (this.executions.length > this._MAX_SAVED_EXECUTIONS) {
      this.executions.pop()
    }
  }

  pause = () => {
    this.state = TaskState.PAUSED
  }

  start = () => {
    this.state = TaskState.STARTED
  }

  nextExecutionDate = () => {
    if (this.state === TaskState.PAUSED) {
      return null
    }

    const lastExecution = this.lastExecution
    if (!lastExecution || lastExecution.state === ExecutionState.RUNNING) {
      return new Date()
    }

    // last execution exists and is not running. Must have a completion date
    if (!lastExecution.completionDate) {
      throw new Error(
        `Last execution in state ${lastExecution.state} has no completion date`,
      )
    }

    return new Date(
      lastExecution.completionDate.getTime() + this.options.intervalMs,
    )
  }

  nextExecutionInMs = () => {
    const nextExecutionDate = this.nextExecutionDate()
    if (!nextExecutionDate) {
      return null
    }

    return nextExecutionDate.getTime() - new Date().getTime()
  }

  format = (): FormattedTask => ({
    name: this.options.name,
    state: this.state,
    lastExecution: this.lastExecution
      ? {
          completionDate:
            this.lastExecution.completionDate?.toISOString() || null,
          startDate: this.lastExecution.startDate.toISOString(),
          data:
            this.lastExecution.data !== EMPTY ? this.lastExecution.data : null,
          error:
            this.lastExecution.error !== EMPTY
              ? this.lastExecution.error
              : null,
          state: this.lastExecution.state,
          id: this.lastExecution.id,
        }
      : null,
    nextEstimatedExecutionDate: this.nextExecutionDate()?.toISOString() || null,
    intervalMs: this.options.intervalMs,
    executions: this.executions.map((e) => ({
      completionDate: e.completionDate?.toISOString() || null,
      startDate: e.startDate.toISOString(),
      data: e.data !== EMPTY ? e.data : null,
      error: e.error !== EMPTY ? e.error : null,
      state: e.state,
      id: e.id,
    })),
  })
}

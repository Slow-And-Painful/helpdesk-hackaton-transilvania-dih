/* eslint-disable @typescript-eslint/no-explicit-any */

import PeriodicTask from "$utils/PeriodicTask"
import { Logger } from "winston"

export type Task<DATA = any> = () => Promise<DATA>

export type EnqueueParams<DATA = any, ERROR = unknown> = {
    task: Task<DATA>, 
    timeout?: number,
    onError?: (error: ERROR) => void,
    onSuccess?: (data: DATA) => void,
    onTimeout?: () => void,
}

export type AutoEnqueueFn<DATA = any, ERROR = unknown> = (nTasks: number) => Promise<EnqueueParams<DATA, ERROR>[]>

export default class DynamicQueue<DATA = any, ERROR = unknown> {
    private nSlots: number
    private slots: (Promise<void> | null)[]
    private logger?: Logger
    private autoEnqueueFn?: AutoEnqueueFn<DATA, ERROR>

    private autoEnqueuePeriodicTask: PeriodicTask | null = null

    constructor(options: {
        nSlots: number,
        logger?: Logger,
        autoEnqueueFn?: AutoEnqueueFn,
        autoEnqueueInterval?: number
    }) {
        this.nSlots = options.nSlots
        this.slots = Array(this.nSlots).fill(null)
        this.logger = options.logger
        this.autoEnqueueFn = options.autoEnqueueFn
        
        if (options.autoEnqueueFn) {
            this.autoEnqueuePeriodicTask = new PeriodicTask({
                name: "AUTO_ENQUEUE_TICK",
                handler: () => this.tickAutoEnqueue(),
                logger: this.logger,
                intervalMs: options.autoEnqueueInterval || 1000,
                enabled: true,
                timeoutMs: 1000 * 60,
                autoTickInterval: 1000
            })
        }
    }

    tickAutoEnqueue = async() => {
        if (!this.autoEnqueueFn) {
            return
        }

        const nAvailable = this.nAvailable
        if (nAvailable === 0) {
            return
        }

        let tasks: EnqueueParams<DATA, ERROR>[] = []

        try {
            tasks = await this.autoEnqueueFn(nAvailable)
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error)
            this.logger?.error(`Error in autoEnqueueFn: ${errorMessage}`)
        } 

        for (const task of tasks) {
            this.enqueue(task)
        }
    }

    get nAvailable(): number {
        return this.slots.filter(slot => slot === null).length
    }

    get nBusy(): number {
        return this.slots.filter(slot => slot !== null).length
    }
    
    private nextAvailableSlot = (): number | null => {
        const index = this.slots.indexOf(null)
        return index !== -1 ? index : null
    }

    enqueue = <DATA = any, ERROR = unknown> (options: {
        task: Task<DATA>, 
        timeout?: number,
        onError?: (error: ERROR) => void,
        onSuccess?: (data: DATA) => void,
        onTimeout?: () => void,
    }): boolean => {
        const { 
            task,
            timeout = 0
        } = options

        const slotIndex = this.nextAvailableSlot()
        if (slotIndex === null) {
            return false
        }

        let timeoutId: NodeJS.Timeout | null = null

        const clear = () => {
            if (timeoutId) {
                clearTimeout(timeoutId)
            }

            this.slots[slotIndex] = null

            this.autoEnqueuePeriodicTask?.tick({
                ignoreDelay: true
            })
        }

        if (timeout > 0) {
            timeoutId = setTimeout(() => {
                this.logger?.error(`Task in slot ${slotIndex} timed out after ${timeout}ms`)
                options.onTimeout?.()
                clear()
            }, options.timeout)
        }

        this.slots[slotIndex] = (async () => {
            try {
                const taskResponse = await task()
                options.onSuccess?.(taskResponse as DATA)
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : String(error)
                this.logger?.error(`Error executing task in slot ${errorMessage}`)
                options.onError?.(error as ERROR)
            }
        })()
            .finally(() => clear())
        
        return true
    }
}


import { container, injectable } from "tsyringe"
import Winston from "winston"
import Transport from "winston-transport"
import { version } from "../../package.json"
import Configs from "$components/Configs"
import SentryTransport from "$utils/SentryTransport"
import { ENVIRONMENT_TYPE } from "$types/environment"

@injectable()
export default class WinstonComponent {
  winston: Winston.Logger
  private local: boolean

  // TODO move as a helper
  _isLocalEnvironment = (): boolean => {
    const { env } = container.resolve<Configs>(Configs.token)
    return env.ENVIRONMENT === ENVIRONMENT_TYPE.LOCAL
  }

  constructor(winston?: Winston.Logger) {
    const formats = [Winston.format.json()]
    const transports: Transport[] = [new Winston.transports.Console()]

    this.local = this._isLocalEnvironment()
    if (this.local) {
      formats.push(Winston.format.prettyPrint())
    } else {
      transports.push(new SentryTransport())
    }

    this.winston =
      winston ||
      Winston.createLogger({
        level: "verbose",
        transports,
        defaultMeta: {
          version,
        },
        format: Winston.format.combine(...formats),
      })
  }

  createLogger = (scope: string): Winston.Logger => {
    const logger = this.winston.child({ scope })

    // Add stack trace to error and warn logs
    const logHandler: ProxyHandler<Winston.Logger> = {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      get(target: any, prop: PropertyKey) {
        const rawStack = (new Error()).stack as string
        const stackLines = rawStack.split("\n")
        const stack = stackLines.slice(2).join("\n")

        const source = stackLines[2].trim()

        const originalMethod = target[prop]
        if ([
          "error", 
          "warn", 
          "info",
          "verbose",
          "debug",
          "log",
        ].includes(prop as string)) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          return function (...args: any[]) {
            // Set the metadata object if it doesn't exist
            if (!args[1]) {
              args[1] = {}
            }

            const [messageOrInfoObject, metadata] = args

            if (typeof messageOrInfoObject === "string") {
              if (typeof metadata === "object" && !Array.isArray(metadata)) {

                Object.assign(metadata, { source })

                if (["error", "warn"].includes(prop as string)) {
                  try {
                    Object.assign(metadata, { stack })
                  } catch (err) {
                    console.error("Failed to assign stack trace to metadata", err)
                  }
                }
              }
            }

            return originalMethod.apply(target, args)
          }
        }

        return target[prop]
      },
    }

    const proxyLogger = new Proxy(logger, logHandler)

    return proxyLogger
  }

  static token = Symbol("WinstonComponent")
}

container.register(WinstonComponent.token, {
  useValue: new WinstonComponent(),
})
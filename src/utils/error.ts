export type mode = "string" | "object"

export function serializeError<T extends mode>(err: unknown, mode: T): T extends "string" ? string : Record<string, unknown> {
  let obj

   try {
    if (err instanceof Error) {
      obj = {
        ...err,
        name: err.name,
        message: err.message,
        stack: err.stack || "",
      }
    }
   } catch (_) {}

   if (!obj) {
     obj = { name: "UnknownError", message: String(err), stack: "" }
   }

   return (mode === "string" ? JSON.stringify(obj) : obj) as T extends "string" ? string : Record<string, unknown>
}
export function assertContainsValue<T extends object, K extends keyof T>(
  obj: T,
  key: K,
): asserts obj is T & { [P in K]: Exclude<T[P], null | undefined> } {
  if (!(key in obj)) {
    throw new Error(`Property "${String(key)}" doesn't exist in object`)
  }

  if (obj[key] === undefined || obj[key] === null) {
    throw new Error(`Property "${String(key)}" is undefined or null`)
  }
}

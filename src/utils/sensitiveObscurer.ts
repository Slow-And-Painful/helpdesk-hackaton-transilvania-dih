/* eslint-disable @typescript-eslint/no-explicit-any */

export function isObject(value: any): boolean {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

export const SENSITIVE_INFORMATION_KEYS = [
  "password",
  "token",
  "jwt",
  "otp",
  "mfa",
  "secret",
  "code",
  "pin",
  "cvv",
]

export const isSensitiveKey = (key: string): boolean =>
  SENSITIVE_INFORMATION_KEYS.some((e) => key.toLowerCase().includes(e))

export const digOmitSensitiveInformation = (data: any): void => {
  if (Array.isArray(data)) {
    data.forEach((d) => digOmitSensitiveInformation(d))
  } else if (isObject(data)) {
    Object.keys(data).forEach((key) => {
      if (isObject(data[key]) || Array.isArray(data[key])) {
        digOmitSensitiveInformation(data[key])
      } else if (isSensitiveKey(key)) {
        data[key] = "****hidden****"
      }
    })
  }
}

export const omitSensitiveInformation = <T = any>(data: unknown): T => {
  try {
    if (!isObject(data) && !Array.isArray(data)) return data as T
    const clone = JSON.parse(JSON.stringify(data))
    digOmitSensitiveInformation(clone)
    return clone
  } catch (err) {
    return {
      error: "Failed to omit sensitive information.",
      details: err,
    } as T
  }
}

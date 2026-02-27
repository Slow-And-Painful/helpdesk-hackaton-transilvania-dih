// (?=.*[a-z]) - at least one lowercase letter
// (?=.*[A-Z]) - at least one uppercase letter
// (?=.*\d) - at least one digit
// (?=.*[@$!%*?&]) - at least one special character

import Configs from "$components/Configs"
import TOOL_INSTANCES_SOURCES from "$types/SOURCES"
import { match } from "ts-pattern"
import { container } from "tsyringe"

const configs = container.resolve<Configs>(Configs.token)

// [A-Za-z\d@$!%*?&]{8,} - at least 8 characters
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>\-_])[-A-Za-z\d!@#$%^&*(),.?":{}|<>_]{8,}$/

export const validatePassword = (password: string): boolean => {
  return password.match(PASSWORD_REGEX) !== null
}

const EMAIL_REGEX = /.+@.+\..+/
export const validateEmail = (email: string): boolean => {
  return email.match(EMAIL_REGEX) !== null
}

const FIGMA_URL_REGEX = /^(?:https:\/\/)?(?:www\.)?figma\.com\/(file|proto|design)\/([0-9a-zA-Z]{22,128})(?:\/.*)?$/
export const validateFigmaUrl = (url: string): boolean => {
  return url.match(FIGMA_URL_REGEX) !== null
}

type ValidationResult = { valid: false, message: string } | { valid: true, message: null }

const validateFigmaSource = (source?: string): ValidationResult => {
  if (source) {
    const valid = validateFigmaUrl(source)
    if (valid) {
      return { valid: true, message: null }
    } else {
      return {
        valid: false,
        message: "Invalid Figma URL"
      }
    }
  } else {
    return { valid: true, message: null }
  }
}

const validateNoneSource = (source?: string): ValidationResult => {
  if (!source || source === "") {
    return { valid: true, message: null }
  } else {
    return { valid: false, message: "Source must be empty" }
  }
}

export const validateToolInstanceSource = (sourceType: TOOL_INSTANCES_SOURCES, source?: string): ValidationResult => {
  return (
    match(sourceType)
      .with(TOOL_INSTANCES_SOURCES.FIGMA, () => validateFigmaSource(source))
      .with(TOOL_INSTANCES_SOURCES.NONE, () => validateNoneSource(source))
      .exhaustive()
  )
}

export const validateTenantUrl = (tenantUrl: string): {
  valid: true,
  normalized: string
} | {
  valid: false,
  normalized: null
} => {
  const allowedDomains = configs.env.LANDING_DOMAIN_WHITELIST || []

  const normalized = tenantUrl.startsWith("http") ? tenantUrl : `https://${tenantUrl}`
  const valid = allowedDomains.some((domain) => {
    return normalized === domain
  })
  
  return valid ? {
    valid: true,
    normalized
  } : {
    valid: false,
    normalized: null
  }
}
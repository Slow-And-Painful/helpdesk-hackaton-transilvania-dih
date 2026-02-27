import USER_IN_ORGANIZATION_ROLES from "$types/USER_IN_ORGANIZATION_ROLES"
import USER_TYPE from "$types/USER_TYPE"

export const getEnumStrings = (enumType: Record<string, string>) => {
  return Object.values(enumType) as [string, ...string[]]
}

export const formatOrganizationUserRole = (role: USER_IN_ORGANIZATION_ROLES) => {
  const roles: Record<USER_IN_ORGANIZATION_ROLES, string> = {
    [USER_IN_ORGANIZATION_ROLES.ADMIN]: "Admin",
    // [USER_IN_ORGANIZATION_ROLES.OPERATOR]: "Member",
  }
  return roles[role]
}

export const formatUserType = (type: USER_TYPE) => {
  const types: Record<USER_TYPE, string> = {
    [USER_TYPE.STAFF]: "Staff",
    [USER_TYPE.CUSTOMER]: "Customer",
  }
  return types[type]
}

export const formatFileSize = (size: number) => {
  let formattedSize = `${size} B`
  const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  let i = 0
  while(size >= 1024) {
    size /= 1024
    ++i
  }
  
  formattedSize = size.toFixed(1) + ' ' + units[i]

  // remove trailing zeros
  formattedSize = formattedSize.replace(/\.?0+$/, "")

  // remove trailing dot if present
  if (formattedSize.endsWith(".")) {
    formattedSize = formattedSize.slice(0, -1)
  }

  return formattedSize
}

export const objectToBase64 = (obj: object) => {
  return Buffer.from(JSON.stringify(obj)).toString("base64")
}

export const getPercentage = (usedCost: number, usageLimit: number): number => {
  const usedPercentage = Math.floor(usedCost * 100 / usageLimit)
  let percentage = Math.min(usedPercentage, 100)

  if (isNaN(percentage)) {
    percentage = 100 // usage limit is 0, so we set it to 100%
  }

  return percentage
}

export const gbToBytes = (gb: number): number => {
  return (gb * 1024 * 1024 * 1024) // 1 GB = 1024 MB, 1 MB = 1024 KB, 1 KB = 1024 Bytes
}

export const bytesToGb = (bytes: number): number => {
  return (bytes / (1024 * 1024 * 1024)) // 1 GB = 1024 MB, 1 MB = 1024 KB, 1 KB = 1024 Bytes
}

export function formatDate(
  dateOrTimestamp: Date | number | string, 
  options?: { includeHours?: boolean, includeDate?: boolean, timeZone?: string }
) {
  const {
    includeHours = true,
    includeDate = true,
  } = options || {}

  let timeZone = options?.timeZone
  if (timeZone && !validateTimezone(timeZone)) {
    timeZone = undefined
  }
  
  const date = new Date(dateOrTimestamp)
  const str = date.toLocaleString(
    "it-IT", 
    {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      ...timeZone ? { timeZone } : {},
    }
  )

  const [dateStr, timeStr] = str.split(", ")

  const parts = []
  
  if (includeDate) {
    parts.push(dateStr)
  }

  if (includeHours) {
    parts.push(timeStr)
  }

  return parts.join(" - ")
}

const validateTimezone = (timeZone: string) => {
  if (!Intl || !Intl.DateTimeFormat().resolvedOptions().timeZone) {
    return false
  }

  try {
    Intl.DateTimeFormat(undefined, { timeZone });
    return true;
  } catch (_e) {
    return false;
  }
}

export function getMilliseconds(options: {
  years?: number
  days?: number
  hours?: number
  minutes?: number
  seconds?: number
}): number {
  const {
    years = 0,
    days = 0,
    hours = 0,
    minutes = 0,
    seconds = 0
  } = options

  const msPerSecond = 1000
  const msPerMinute = msPerSecond * 60
  const msPerHour = msPerMinute * 60
  const msPerDay = msPerHour * 24
  const msPerYear = msPerDay * 365.25 // leap yrs

  return (
    years * msPerYear +
    days * msPerDay +
    hours * msPerHour +
    minutes * msPerMinute +
    seconds * msPerSecond
  )
}
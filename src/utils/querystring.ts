export type QueryStringInit = Record<
  string,
  number | Array<number> | string | Array<string>
>

export function qs(params: QueryStringInit) {
  return new URLSearchParams(
    Object.entries(params).reduce(
      (acc, [key, value]) => {
        if (Array.isArray(value)) {
          acc[key] = value.join(",")
        } else {
          acc[key] = `${value}`
        }

        return acc
      },
      {} as Record<string, string>,
    ),
  ).toString()
}

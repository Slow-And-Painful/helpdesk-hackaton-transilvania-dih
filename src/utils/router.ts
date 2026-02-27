export function getFullRouterPath(baseUrl: string): `/${string}` {
  return baseUrl.replace(/\/+$/g, "") as `/${string}`
}

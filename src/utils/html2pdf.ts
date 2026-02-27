export const wrapPdfTemplate = (params: {
  body: string
  head?: string
}): string => {
  const { body, head } = params
  return `
    <html>
      <head>
        <meta charset="utf-8" />
        ${head ? head : ""}
      </head>
      <body>${body}</body>
    </html>
    `
}

/// <reference types="@kitajs/html/htmx.d.ts" />

import { LayoutProps } from "$types"
import { BaseLayout } from "./BaseLayout"

export function DashboardLayout({
  ...props
}: Omit<LayoutProps, "withSidebar">) {  
  return (
    <BaseLayout {...props} withSidebar />
  )
}

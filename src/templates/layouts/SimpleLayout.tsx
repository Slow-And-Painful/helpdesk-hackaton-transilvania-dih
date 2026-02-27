/// <reference types="@kitajs/html/htmx.d.ts" />

import { LayoutProps } from "$types"
import { ErrorBoundary } from "@kitajs/html/error-boundary"

import { Head } from "$templates/layouts/partials/Head"
import { Body } from "$templates/layouts/partials/Body"
import { Page } from "$templates/layouts/partials/Page"
import ErrorPage from "$templates/components/ErrorPage"
import classNames from "classnames"

export function SimpleLayout({
  children,
  globalResources,
  isHtmxRequest
}: Pick<LayoutProps, "children" | "globalResources" | "isHtmxRequest">) {
  if (isHtmxRequest) {
    return (
      <Page>
        <div class={classNames("page__content !pt-1 !pb-2")}>
          <div class={classNames("h-full px-2")}>
            {children}
          </div>
        </div>
      </Page>
    )
  }

  return (
    <ErrorBoundary catch={(error) => <ErrorPage error={error} />}>
      <>
        {"<!DOCTYPE html>"}
        <html lang="it">
          <Head globalResources={globalResources} />

          <Body>
            <Page>              
              <div class={classNames("page__content !pt-1 !pb-2")}>
                <div class={classNames("h-full px-2")}>
                  {children}
                </div>
              </div>
            </Page>
          </Body>
        </html>
      </>
    </ErrorBoundary>
  )
}

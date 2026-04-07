/// <reference types="@kitajs/html/htmx.d.ts" />

import { LayoutProps } from "$types"
import { ErrorBoundary } from "@kitajs/html/error-boundary"

import { Head } from "$templates/layouts/partials/Head"
import { Body } from "$templates/layouts/partials/Body"
import { Page } from "$templates/layouts/partials/Page"
import ErrorPage from "$templates/components/ErrorPage"
import classNames from "classnames"
import Sidebar from "$templates/components/Sidebar"

export function BaseLayout({
  children,
  isHtmxRequest,
  globalResources,
  pageClass,
  toasts = [],
  routerName,
  withSidebar = false,
  user,
  authenticatedUser,
  activeDepartment,
  userDepartments = [],
  activeDepartmentUserRole,
  userChats = [],
  activeChatUuid,
}: LayoutProps) {
  const matchingDepartmentUser = activeDepartment?.users.find(u => u.userId === user.id)
  const filteredChats = userChats.filter(chat => chat.departmentUserId === matchingDepartmentUser?.id)

  if (isHtmxRequest) {
    return (
      <>
        <Page toasts={toasts}>

          {
            withSidebar ?
              <Sidebar
                routerName={routerName}
                authenticatedUser={authenticatedUser}
                user={user}
                activeDepartment={activeDepartment}
                userDepartments={userDepartments}
                activeDepartmentUserRole={activeDepartmentUserRole}
                userChats={filteredChats}
                activeChatUuid={activeChatUuid}
              /> : null
          }

          <div class={classNames("page__content", withSidebar && "with-sidebar")}>
            <div class={classNames("flex-1 flex flex-col max-w-[1500px] w-full mx-auto", pageClass)}>
              {children}
            </div>
          </div>
        </Page>
      </>
    )
  }

  return (
    <ErrorBoundary catch={(error) => <ErrorPage error={error} />}>
      <>
        {"<!DOCTYPE html>"}
        <html lang="it">
          <Head globalResources={globalResources} />

          <Body>
            <Page toasts={toasts}>
            {
              withSidebar ?
                <Sidebar
                  routerName={routerName}
                  authenticatedUser={authenticatedUser}
                  user={user}
                  activeDepartment={activeDepartment}
                  userDepartments={userDepartments}
                  activeDepartmentUserRole={activeDepartmentUserRole}
                  userChats={filteredChats}
                  activeChatUuid={activeChatUuid}
                /> : null
            }
              
              <div class={classNames("page__content", withSidebar && "with-sidebar")}>
                <div class={classNames("flex-1 flex flex-col max-w-[1500px] w-full mx-auto", pageClass)}>
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

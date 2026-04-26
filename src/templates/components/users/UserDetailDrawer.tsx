/// <reference types="@kitajs/html/htmx.d.ts" />

import Icon from "$templates/components/Icon"
import { DepartmentUserWithRelations } from "$services/DepartmentUsersService"

type DeptStats = {
  departmentUserId: number
  departmentName: string
  role: string
  chatCount: number
  totalInputTokens: number
  totalOutputTokens: number
  ticketsSent: number
  ticketsAssigned: number
}

type Props = {
  departmentUser: DepartmentUserWithRelations
  allDeptStats: DeptStats[]
}

export const userDetailDrawerId = "user-detail-drawer"

const roleLabel = (role: string) => {
  if (role === "ADMIN") return "Admin"
  if (role === "MEMBER") return "Membru"
  return role
}

export default function UserDetailDrawer({ departmentUser, allDeptStats }: Props) {
  const user = departmentUser.user
  const fullName = `${user.firstName} ${user.lastName}`.trim() || user.email

  return (
    <div id={userDetailDrawerId} class="ticket-drawer is-open">
      <div
        class="ticket-drawer__overlay"
        onclick={`document.getElementById('${userDetailDrawerId}').remove()`}
      />
      <div class="ticket-drawer__panel relative" id="user-drawer-panel">
        <div
          class="ticket-drawer__edge-handle"
          id="user-drawer-edge-handle"
          onmousedown="window.userDrawerStartEdgeResize && window.userDrawerStartEdgeResize(event)"
        />
        <div class="ticket-drawer__header">
          <h2 class="ticket-drawer__title">Detalii Utilizator</h2>
          <button
            type="button"
            class="ticket-drawer__close"
            onclick={`document.getElementById('${userDetailDrawerId}').remove()`}
          >
            <Icon name="x" size={18} />
          </button>
        </div>

        <div class="ticket-drawer__details-col" style="width: 100%; max-width: 100%;">

          {/* ── Identity ── */}
          <div class="flex items-center gap-4">
            <div
              class="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-roboto-semibold shrink-0"
              style={`background: ${user.color}22; border: 1px solid ${user.color}55; color: ${user.color};`}
            >
              {(user.firstName?.[0] ?? user.email[0]).toUpperCase()}
            </div>
            <div class="flex flex-col gap-0.5 min-w-0">
              <span class="ticket-drawer__name" safe>{fullName}</span>
              <span class="text-sm text-gray-400 flex items-center gap-1.5">
                <Icon name="mail" size={13} />
                <span safe>{user.email}</span>
              </span>
            </div>
          </div>

          <div class="ticket-drawer__divider" />

          {/* ── Account info ── */}
          <div class="ticket-drawer__details">
            <div class="ticket-drawer__detail-row">
              <span class="ticket-drawer__label">Status</span>
              <span class={`ticket-drawer__value ${user.blocked ? "text-red-400" : "text-green-400"}`}>
                {user.blocked ? "Blocat" : "Activ"}
              </span>
            </div>
            <div class="ticket-drawer__detail-row">
              <span class="ticket-drawer__label">Înregistrat</span>
              <span class="ticket-drawer__value">
                {user.creationTimestamp
                  ? new Date(user.creationTimestamp).toLocaleDateString("ro-RO", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "—"}
              </span>
            </div>
          </div>

          <div class="ticket-drawer__divider" />

          {/* ── Per-department stats ── */}
          {allDeptStats.map((s) => (
            <div class="flex flex-col gap-y-3">
              <div class="flex items-center gap-2">
                <Icon name="users" size={14} />
                <span class="text-sm font-roboto-semibold text-white" safe>{s.departmentName}</span>
                <span class="text-xs text-gray-500 ml-1">· {roleLabel(s.role)}</span>
              </div>

              <div class="grid grid-cols-2 gap-2">
                <div class="flex flex-col gap-0.5 bg-gray-900 border border-gray-800 rounded-xl px-4 py-3">
                  <span class="text-xl font-roboto-semibold text-white">{s.chatCount}</span>
                  <span class="text-xs text-gray-500 flex items-center gap-1">
                    <Icon name="message-square" size={11} />
                    Conversații
                  </span>
                </div>
                <div class="flex flex-col gap-0.5 bg-gray-900 border border-gray-800 rounded-xl px-4 py-3">
                  <span class="text-xl font-roboto-semibold text-white">{s.totalInputTokens + s.totalOutputTokens}</span>
                  <span class="text-xs text-gray-500">Tokeni totali</span>
                </div>
                <div class="flex flex-col gap-0.5 bg-gray-900 border border-gray-800 rounded-xl px-4 py-3">
                  <span class="text-xl font-roboto-semibold text-white">{s.ticketsSent}</span>
                  <span class="text-xs text-gray-500 flex items-center gap-1">
                    <Icon name="send" size={11} />
                    Tichete trimise
                  </span>
                </div>
                <div class="flex flex-col gap-0.5 bg-gray-900 border border-gray-800 rounded-xl px-4 py-3">
                  <span class="text-xl font-roboto-semibold text-white">{s.ticketsAssigned}</span>
                  <span class="text-xs text-gray-500 flex items-center gap-1">
                    <Icon name="user-check" size={11} />
                    Asignate
                  </span>
                </div>
              </div>

              <div class="ticket-drawer__details">
                <div class="ticket-drawer__detail-row">
                  <span class="ticket-drawer__label">Tokeni intrare</span>
                  <span class="ticket-drawer__value">{s.totalInputTokens.toLocaleString("ro-RO")}</span>
                </div>
                <div class="ticket-drawer__detail-row">
                  <span class="ticket-drawer__label">Tokeni ieșire</span>
                  <span class="ticket-drawer__value">{s.totalOutputTokens.toLocaleString("ro-RO")}</span>
                </div>
              </div>

              {allDeptStats.indexOf(s) < allDeptStats.length - 1 && (
                <div class="ticket-drawer__divider" />
              )}
            </div>
          ))}

        </div>
      </div>
    </div>
  )
}

import classNames from "classnames"
import Icon from "$templates/components/Icon"
import Logo from "$templates/components/Logo"
import Tooltip from "./Tooltip"
import {
  getSidebarItems,
  SidebarProps as Props,
  SIDEBAR_LINKS_TYPES,
  getDepartmentInitials,
} from "$utils/sidebar"
import SidebarUser from "./SidebarUser"
import { getPartialPath, getViewPath } from "$routers/website/utils"
import { TICKET_STATUS } from "$types/tickets"

const getStatusLabel = (status: TICKET_STATUS) => {
  switch (status) {
    case TICKET_STATUS.OPEN: return "Open"
    case TICKET_STATUS.CLOSED: return "Closed"
    default: return status
  }
}

const getStatusClass = (status: TICKET_STATUS) => {
  switch (status) {
    case TICKET_STATUS.OPEN: return "sidebar-ticket__status--open"
    case TICKET_STATUS.CLOSED: return "sidebar-ticket__status--closed"
    default: return ""
  }
}

const Sidebar = (props: Props) => {
  const {
    swapOOB,
    user,
    activeDepartment,
    userDepartments = [],
    userTickets = [],
  } = props

  const items = getSidebarItems(props)

  return (
    <div id={"sidebar"} class="sidebar__container" {...(swapOOB ? { "hx-swap-oob": swapOOB } : {})}>
      <div class={"sidebar__header"}>
        <a
          hx-boost="true"
          hx-push-url="true"
          href={getViewPath("public", "HOME")}
        >
          <Logo class="sidebar__expanded-logo"/>
          <Logo class="sidebar__collapsed-logo" />
        </a>
        
        <button class={"sidebar__toggle"} onclick="toggleSidebar()">
          <Icon name="expand" size={20} />
        </button>
      </div>

      {/* Department Switcher Widget */}
      {activeDepartment && (
        <div class="sidebar-departments">
          <div class="sidebar-departments__label sidebar__menu-item-label">Department</div>
          <div class="sidebar-departments__list">
            <Tooltip
              content={activeDepartment.name}
              position="right"
              small
              text={
                <button
                  class="sidebar-departments__item sidebar-departments__item--active sidebar-departments__switcher-btn"
                  hx-get={getPartialPath("departments", "DEPARTMENT_SWITCHER")}
                  hx-target="#modal"
                  hx-swap="innerHTML"
                >
                  <span safe>{getDepartmentInitials(activeDepartment.name)}</span>
                </button>
              }
            />
          </div>
        </div>
      )}

      {/* Tickets List */}
      <div class="sidebar-tickets">
        <div class="sidebar-tickets__header sidebar__menu-item-label">
          <span>Tickets</span>
          <span class="sidebar-tickets__count">{userTickets.length}</span>
        </div>
        <ul class="sidebar-tickets__list">
          {userTickets.length === 0 ? (
            <li class="sidebar-tickets__empty">No tickets yet</li>
          ) : (
            userTickets.map((ticket) => (
              <li class="sidebar-tickets__item">
                <div class="sidebar-tickets__item-header">
                  <span class="sidebar-tickets__item-id" safe>#{String(ticket.id)}</span>
                  <span class={classNames("sidebar-ticket__status", getStatusClass(ticket.status))}>
                    {getStatusLabel(ticket.status)}
                  </span>
                </div>
                <div class="sidebar-tickets__item-departments">
                  <span class="sidebar-tickets__item-dept" safe>
                    {(ticket as any).senderDepartment?.name ?? `Dept #${ticket.senderDepartmentId}`}
                  </span>
                  <Icon name="arrow-right" size={12} />
                  <span class="sidebar-tickets__item-dept" safe>
                    {(ticket as any).destinationDepartment?.name ?? `Dept #${ticket.destinationDepartmentId}`}
                  </span>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>

      {/* Regular menu items (if any remain) */}
      {items.length > 0 && (
        <ul class="sidebar__menu">
        {
          items.map((item) => {
            const isDropdown = item.type === SIDEBAR_LINKS_TYPES.DROPDOWN
            const key = isDropdown ? `dropdown-${item.dropdownId}` : null
            if (isDropdown) {
              return (
                <>
                  <li
                    class={classNames(
                      "sidebar__menu-item sidebar__menu-item__dropdown", {
                        "sidebar__menu-item--active": item.isActive,
                      }
                    )}
                    data-sidebar-dropdown-trigger={key}
                  >
                    <div class="flex items-center gap-2 flex-1 truncate h-full">
                      <a
                        class="sidebar__menu-item-link sidebar__menu-item-link--full"
                        href={item.url}
                        hx-boost="true"
                        {...{
                          "hx-on::before-request": "toggleChatSize(false)",
                        }}
                      >
                        <Icon name={item.icon} size={16} />
                        <span class="sidebar__menu-item-label" safe>{item.label}</span>
                      </a>
                      <Tooltip
                        content={item.label}
                        class={"sidebar__menu-item-link--tooltip"}
                        position={"right"}
                        small
                        text={
                          <a
                            class="sidebar__menu-item-link"
                            href={item.url}
                            hx-boost="true"
                            {...{
                              "hx-on::before-request": "toggleChatSize(false)",
                            }}
                          >
                            <Icon name={item.icon} size={16} />
                          </a>
                        }
                      />
                    </div>
                    <button class={"sidebar__menu-item__dropdown-toggle mr-2"} onclick={`toggleSidebarDropdown("${key}")`}>
                      <Icon name={"chevron-down"} size={16} />
                    </button>
                  </li>
                  {
                    item.links.map((link) => {
                      return (
                        <li
                          class={classNames(
                            "sidebar__menu-item sidebar__menu-item__dropdown-link", {
                              "sidebar__menu-item--active": link.isActive
                            }
                          )}
                          data-sidebar-dropdown-target={key}
                        >
                          <a
                            class="sidebar__menu-item-link hidden"
                            href={link.url}
                            hx-boost="true"
                            {...{
                              "hx-on::before-request": "toggleChatSize(false)",
                            }}
                          >
                            <Icon name={link.icon} size={16} />
                            <span class="sidebar__menu-item-label" safe>{link.label}</span>
                          </a>

                        </li>
                      )
                    })
                  }
                </>
              )
            } else {
              return (
                <li
                  class={classNames(
                    "sidebar__menu-item", {
                      "sidebar__menu-item--active": item.isActive,
                    }
                  )}
                >
                  <a
                    class="sidebar__menu-item-link sidebar__menu-item-link--full"
                    href={item.url}
                    hx-boost="true"
                    {...{
                      "hx-on::before-request": "toggleChatSize(false)",
                    }}
                  >
                    <Icon name={item.icon} size={16} />
                    <span class="sidebar__menu-item-label" safe>{item.label}</span>
                  </a>
                  <Tooltip
                    content={item.label}
                    class={"sidebar__menu-item-link--tooltip"}
                    position={"right"}
                    small
                    text={
                      <a
                        class="sidebar__menu-item-link"
                        href={item.url}
                        hx-boost="true"
                        {...{
                          "hx-on::before-request": "toggleChatSize(false)",
                        }}
                      >
                        <Icon name={item.icon} size={16} />
                      </a>
                    }
                  />
                </li>
              )
            }
          })
        }
        </ul>
      )}

      <div class="sidebar__footer">
        {
          user ?  <SidebarUser user={user} /> : null
        }
        <div class="sidebar__footer__terms-and-conditions">
          <a
            // href={getViewPath("public", "TERMS_AND_CONDITIONS")}
          >
            Terms and Conditions
          </a>
          &nbsp;
          <span>&</span>
          &nbsp;
          <a
            // href={getViewPath("public", "PRIVACY_POLICY")}
          >
            Privacy Policy
          </a>
        </div>
      </div>

      <script>{`
        if (document.readyState === "loading") {
          document.addEventListener("DOMContentLoaded", () => {
            window.initSidebarDropdowns()
          })
        } else {
          window.initSidebarDropdowns()
        }
      `}</script>
    </div>
  )
}

export default Sidebar

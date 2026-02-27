declare global {
  interface Window {
    toggleSidebar: () => void
    initSidebar: () => void
    toggleSidebarDropdown: (key: string) => void
    initSidebarDropdowns: () => void
  }
}

const ATTRIBUTE_NAME = "data-sidebar-closed"
const LOCAL_STORAGE_KEY = "sidebar-closed"
const ACTIVE_CLASS_NAME = "sidebar__menu-item--active"
const SIDEBAR_DROPDOWN_INITIALIZED_LOCAL_STORAGE_KEY = "sidebar-dropdown-initialized"

const getLocalStorageSidebarDropdownKey = (dropdownKey: string) => `sidebar-dropdown-closed-${dropdownKey}`

window.toggleSidebar = () => {
  const html = document.documentElement
  if (!html) {
    return
  }

  const isClosed = html.hasAttribute(ATTRIBUTE_NAME)
  if (isClosed) {
    html.removeAttribute(ATTRIBUTE_NAME)
    localStorage.removeItem(LOCAL_STORAGE_KEY)
  } else {
    html.setAttribute(ATTRIBUTE_NAME, "")
    localStorage.setItem(LOCAL_STORAGE_KEY, "true")
  }

  handleSidebarDropdownActiveElement()
}

const handleSidebarDropdownActiveElement = () => {  
  const html = document.documentElement
  if (!html) {
    return
  }

  const isSidebarClosed = html.hasAttribute(ATTRIBUTE_NAME)
  
  const items = document.querySelectorAll(".sidebar__menu > li")
  const active = document.querySelectorAll(`li.${ACTIVE_CLASS_NAME}`)

  if (!items.length || !active.length) {
    return
  }

  const dropdownItem = Array.from(active).find(e => !!e.getAttribute("data-sidebar-dropdown-target"))
  if (!dropdownItem) {
    return
  }
  
  const key = dropdownItem.getAttribute("data-sidebar-dropdown-target")
  if (!key) {
    return
  }

  const dropdownParent = document.querySelector(`[data-sidebar-dropdown-trigger="${key}"]`)
  if (!dropdownParent) {
    return
  }
  
  if (isSidebarClosed) {
    dropdownParent.classList.add(ACTIVE_CLASS_NAME)
  } else {
    const isDropdownClosed = dropdownParent.classList.contains("closed")
    if (!isDropdownClosed) {
      dropdownParent.classList.remove(ACTIVE_CLASS_NAME)
    }
  }
}

window.initSidebar = () => {
  const html = document.documentElement
  if (!html) {
    return
  }

  const isClosed = localStorage.getItem(LOCAL_STORAGE_KEY)
  if (isClosed) {
    html.setAttribute(ATTRIBUTE_NAME, "")
  }
}

window.toggleSidebarDropdown = (key) => {
  const trigger = document.querySelector(`[data-sidebar-dropdown-trigger="${key}"]`)
  const elements = Array.from(document.querySelectorAll(`[data-sidebar-dropdown-target="${key}"]`))
  if (!trigger || !elements) {
    return
  }

  const localStorageKey = getLocalStorageSidebarDropdownKey(key)

  const isClosed = trigger.classList.contains("closed")

  if (isClosed) {
    localStorage.removeItem(localStorageKey)
  } else {
    localStorage.setItem(localStorageKey, "true")
  }
  
  const items = [...elements, trigger]
  items.forEach((element) => {
    element.classList.toggle("closed", !isClosed)
  })
  const activeElement = elements.find(e => e.classList.contains(ACTIVE_CLASS_NAME))
  if (!activeElement) {
    return
  }

  if (isClosed) {
    // opening the dropdown
    trigger.classList.remove(ACTIVE_CLASS_NAME)
  } else {
    // closing the dropdown
    trigger.classList.add(ACTIVE_CLASS_NAME)
  }
}

document.addEventListener("DOMContentLoaded", () => {
  localStorage.removeItem(SIDEBAR_DROPDOWN_INITIALIZED_LOCAL_STORAGE_KEY)
})

window.initSidebarDropdowns = () => {
  const html = document.documentElement

  if (!html) {
    return
  }

  const isFirstLoad = !localStorage.getItem(SIDEBAR_DROPDOWN_INITIALIZED_LOCAL_STORAGE_KEY)

  const sidebarDropdowns = html.querySelectorAll("[data-sidebar-dropdown-trigger]")

  if (isFirstLoad) {
    localStorage.setItem(SIDEBAR_DROPDOWN_INITIALIZED_LOCAL_STORAGE_KEY, "true")
  }

  sidebarDropdowns.forEach(element => {
    const key = element.getAttribute("data-sidebar-dropdown-trigger")
    
    if (key) {
      if (isFirstLoad) {
        localStorage.removeItem(getLocalStorageSidebarDropdownKey(key))
      } else {
        const trigger = document.querySelector(`[data-sidebar-dropdown-trigger="${key}"]`)
        const elements = Array.from(document.querySelectorAll(`[data-sidebar-dropdown-target="${key}"]`))
    
        if (!trigger || !elements) {
          return
        }
    
        const dropdownClosed = localStorage.getItem(getLocalStorageSidebarDropdownKey(key))
  
        if (dropdownClosed) {
          const items = [...elements, trigger]
          items.forEach((element) => {
            if (!element.classList.contains("closed")) {
              element.classList.add("closed")
            }
          })
  
          const activeElement = elements.find(e => e.classList.contains(ACTIVE_CLASS_NAME))
          if (!activeElement) {
            return
          }
  
          if (dropdownClosed) {
            trigger.classList.remove(ACTIVE_CLASS_NAME)
          }
        }
      }
    }
  })
}

export {
  handleSidebarDropdownActiveElement
}

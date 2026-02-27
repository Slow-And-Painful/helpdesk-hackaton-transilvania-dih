import markdownit from "markdown-it"
import hljs from "highlight.js"
import htmx from "htmx.org"

const md = markdownit()

export const markdownToHTML = (markdown: string): string => {
  md.set({
    html: true,
    highlight: (str, lang) => {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return hljs.highlight(str, { language: lang }).value
        } catch (__) {
          return ""
        }
      }
      return ""
    }
  })

  const rendered = md.render(markdown)
  
  const wrapper = document.createElement("div")
  wrapper.innerHTML = rendered
  const tables = wrapper.querySelectorAll("table")

  tables.forEach(table => {
    clampTableCellContent(table)
    const wrapper = document.createElement("div")
    wrapper.classList.add("md-table-container")
    table.parentNode?.insertBefore(wrapper, table)
    wrapper.appendChild(table)
  })

  return wrapper.innerHTML
}

const clampTableCellContent = (table: HTMLTableElement) => {
  const rows = table.querySelectorAll("tr")
  rows.forEach(row => {
    const cells = row.querySelectorAll("td")
    cells.forEach(cell => {
      if (cell) {
        const newContainer = document.createElement("div")
        newContainer.classList.add("line-clamp-4")
        if (cell.firstChild) {
          newContainer.appendChild(cell.firstChild)
          cell.innerHTML = ""
          cell.appendChild(newContainer)
        }
      }
    })
  })
}

export const addPreCopyButtons = () => {
  const preElements = document.querySelectorAll("pre")
  preElements.forEach(preElement => {
    if (preElement.querySelector("button[data-value]")) {
      return
    }

    const copyButton = document.createElement("button")
    copyButton.setAttribute("type", "button")
    copyButton.setAttribute("data-value", preElement.innerText)
    copyButton.addEventListener("click", event => {
      window.copyToClipboard(event, preElement.innerText, () => {
        window.toggleCopyIcon(event.target as HTMLElement)
      })
    })

    const icon = document.createElement("div")
    icon.classList.add("icon")
    icon.style.cssText = "--icon-size:16;"

    icon.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" role="img">
        <use href="#copy"></use>
      </svg>
    `
    copyButton.appendChild(icon)
    preElement.appendChild(copyButton)
  })
}

export const formatMarkdown = () => {
  const containers = document.querySelectorAll("[data-md]")
  containers.forEach(container => {
    if (container.getAttribute("markdown-formatted") === "true") {
      return
    }
    container.innerHTML = markdownToHTML(container.innerHTML.replace(/&lt;/g, "<").replace(/&gt;/g, ">"))
    container.setAttribute("markdown-formatted", "true")
    htmx.process(container)
  })
}


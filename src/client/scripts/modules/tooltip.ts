const allowedPositions = ["top", "bottom", "left", "right"]

export const initTooltips = () => {
  const containers = document.querySelectorAll(".tooltip__container")
  containers.forEach((container) => {
    removeListeners(container as HTMLElement)
    const tooltip = container.querySelector(".tooltip") as HTMLElement

    container.addEventListener("mouseenter", () => {
      setTooltipToFixed(tooltip)
    })

    container.addEventListener("mouseleave", () => {
      removeClone()
    })
  })
}

const removeListeners = (container: HTMLElement) => {
  const tooltip = container.querySelector(".tooltip") as HTMLElement

  container.removeEventListener("mouseenter", () => {
    setTooltipToFixed(tooltip)
  })

  container.removeEventListener("mouseleave", () => {
    removeClone()
  })
}

const setTooltipToFixed = (tooltip: HTMLElement) => {
  const container = tooltip.closest(".tooltip__container") as HTMLElement
  const containerRect = container.getBoundingClientRect()
  const tooltipRect = tooltip.getBoundingClientRect()
  const width = tooltipRect.width

  const clone = tooltip.cloneNode(true) as HTMLElement

  let position = tooltip.getAttribute("data-position")
  if (!position || !allowedPositions.includes(position)) {
    position = "top"
  }

  switch (position) {
    case "top":
      clone.style.top = `${containerRect.top - 10}px`
      clone.style.left = `${containerRect.left + containerRect.width / 2 - width / 2}px`
      break
    case "bottom":
      clone.style.top = `${containerRect.top + containerRect.height + 10}px`
      clone.style.left = `${containerRect.left + containerRect.width / 2 - width / 2}px`
      break
    case "left":
      clone.style.top = `${containerRect.top + containerRect.height - tooltipRect.height / 4}px`
      clone.style.left = `${containerRect.left - width - 10}px`
      break
    case "right":
      clone.style.top = `${containerRect.top + containerRect.height - tooltipRect.height / 4}px`
      clone.style.left = `${containerRect.left + containerRect.width + 10}px`
      break
  }

  clone.setAttribute("data-appeared-time", `${Date.now()}`)

  setTimeout(() => {
    clone.classList.add("tooltip--show")
  }, 300)

  document.getElementById("tooltip")?.appendChild(clone)
}

const removeClone = (checkDelay?: boolean) => {
  document
    .getElementById("tooltip")
    ?.querySelectorAll(".tooltip")
    .forEach((tooltip) => {
      let canRemove = true
      if (checkDelay) {
        const appearedTime = parseInt(
          tooltip.getAttribute("data-appeared-time") as string,
        )
        if (Date.now() - appearedTime < 300) {
          canRemove = false
        }
      }
      if (canRemove) {
        tooltip.remove()
      }
    })
}

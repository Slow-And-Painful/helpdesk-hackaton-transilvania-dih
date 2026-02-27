declare global {
  interface Window {
    updateCardSliderButtons: () => void
    scrollCardSlider: (dir: "left" | "right", button: HTMLElement) => void
    initCardSliders: () => void
  }
}

window.updateCardSliderButtons = () => {
  document.querySelectorAll<HTMLElement>("[data-card-slider-track]").forEach((track) => {
    const container = track.closest("[data-card-slider]")
    if (!container) return

    const leftBtn = container.querySelector<HTMLButtonElement>("[data-card-slider-left]")
    const rightBtn = container.querySelector<HTMLButtonElement>("[data-card-slider-right]")
    if (!leftBtn || !rightBtn) return

    const maxScroll = track.scrollWidth - track.clientWidth
    const atStart = track.scrollLeft <= 1
    const atEnd = track.scrollLeft >= maxScroll - 1

    leftBtn.disabled = atStart
    rightBtn.disabled = atEnd
  })
}

window.scrollCardSlider = (dir, button) => {
  const track = button.closest("[data-card-slider]")?.querySelector("[data-card-slider-track]")
  const container = track?.querySelector<HTMLElement>(".card-slider__container")
  const item = track?.querySelector(".card-slider__item")
  if (!track || !container || !item) return

  container.style.transform = "none"

  const scrollAmount = item.getBoundingClientRect().width * (dir === "left" ? -1 : 1)
  track.scrollBy({ left: scrollAmount, behavior: "smooth" })

  requestAnimationFrame(() => window.updateCardSliderButtons())
}

window.initCardSliders = () => {
  document.querySelectorAll<HTMLElement>("[data-card-slider-track]").forEach((track) => {
    if (track.hasAttribute("data-initialized")) {
      return
    }

    track.setAttribute("data-initialized", "true")
  })

  requestAnimationFrame(() => window.updateCardSliderButtons())
}

window.addEventListener("load", () => {
  window.initCardSliders()

  document.querySelectorAll("[data-card-slider-track]").forEach((el) => {
    el.addEventListener("scroll", () => window.updateCardSliderButtons())
  })
})

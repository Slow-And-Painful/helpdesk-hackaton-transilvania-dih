type LoaderObject = {
  show: () => void
  hide: () => void
  isReady: () => boolean
}

let timeout: number | null = null
const DEBOUNCE_TIME = 100

const show = (): void => {
  timeout = setTimeout(() => {
    const loader = document.getElementById("loader")
    if (loader) {
      loader.classList.add("active")
    }
  }, DEBOUNCE_TIME) as unknown as number
}

const hide = (): void => {
  clearTimeout(timeout as number)
  const loader = document.getElementById("loader")
  if (loader) {
    loader.classList.remove("active")
  }

  // need this because of the debounce when authenticated routes redirect to the login page
  setTimeout(() => {
    const loader = document.getElementById("loader")
    if (loader && loader.classList.contains("active")) {
      loader.classList.remove("active")
    }
  }, 500)
}

const isReady = (): boolean => {
  return !!document.getElementById("loader")
}

export const loader: LoaderObject = {
  show,
  hide,
  isReady,
}

import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler,
  BarController,
  LineController,
  DoughnutController,
  RadarController,
  PolarAreaController,
  type ChartType,
} from "chart.js"

Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler,
  BarController,
  LineController,
  DoughnutController,
  RadarController,
  PolarAreaController,
)

// Color palette aligned with the project's dark theme
const COLORS = {
  blue:    "#3b82f6",
  purple:  "#a855f7",
  green:   "#22c55e",
  orange:  "#f97316",
  red:     "#ef4444",
  yellow:  "#f59e0b",
  cyan:    "#56cbf9",
  mint:    "#85ff9e",
  royal:   "#3d52d5",
  crimson: "#ee2e31",
}

const ALPHA = (hex: string, a: number) => {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r}, ${g}, ${b}, ${a})`
}

const PALETTE = Object.values(COLORS)

const BASE_FONT: Chart["options"]["font"] = {
  family: "'Roboto', sans-serif",
  size: 11,
}

const BASE_GRID = {
  color: "rgba(255,255,255,0.06)",
  drawBorder: false,
}

const BASE_TOOLTIP = {
  backgroundColor: "#1f2937",
  titleColor: "#ffffff",
  bodyColor: "#9ca3af",
  borderColor: "rgba(255,255,255,0.1)",
  borderWidth: 1,
  padding: 10,
  cornerRadius: 6,
}

const BASE_LEGEND = {
  labels: {
    color: "#9ca3af",
    font: BASE_FONT,
    boxWidth: 12,
    padding: 16,
  },
}

function initChart(canvas: HTMLCanvasElement) {
  const type = canvas.dataset["chartType"] as ChartType
  const rawData = canvas.dataset["chartData"]
  if (!type || !rawData) return

  let parsed: unknown
  try {
    parsed = JSON.parse(rawData)
  } catch {
    console.error("Failed to parse chart data for", canvas.id)
    return
  }

  const data = parsed as { labels: string[]; datasets: { label: string; data: number[] }[] }

  // Assign colors automatically if not provided
  data.datasets = data.datasets.map((ds, i) => {
    const color = PALETTE[i % PALETTE.length]
    if (type === "bar") {
      return {
        ...ds,
        backgroundColor: ALPHA(color, 0.75),
        borderColor: color,
        borderWidth: 1.5,
        borderRadius: 4,
        hoverBackgroundColor: ALPHA(color, 0.95),
      }
    }
    if (type === "line") {
      return {
        ...ds,
        borderColor: color,
        backgroundColor: ALPHA(color, 0.15),
        borderWidth: 2,
        pointBackgroundColor: color,
        pointRadius: 3,
        pointHoverRadius: 5,
        fill: true,
        tension: 0.4,
      }
    }
    if (type === "doughnut" || type === "polarArea") {
      return {
        ...ds,
        backgroundColor: data.labels.map((_, j) => ALPHA(PALETTE[j % PALETTE.length], 0.8)),
        borderColor: data.labels.map((_, j) => PALETTE[j % PALETTE.length]),
        borderWidth: 1.5,
        hoverBorderColor: "#ffffff",
        hoverBorderWidth: 2,
      }
    }
    if (type === "radar") {
      return {
        ...ds,
        borderColor: color,
        backgroundColor: ALPHA(color, 0.2),
        borderWidth: 2,
        pointBackgroundColor: color,
        pointRadius: 3,
        pointHoverRadius: 5,
      }
    }
    return ds
  })

  const scaleDefaults = {
    ticks: { color: "#6b7280", font: BASE_FONT },
    grid: BASE_GRID,
  }

  new Chart(canvas, {
    type,
    data,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: { duration: 600, easing: "easeInOutQuart" },
      plugins: {
        legend: BASE_LEGEND,
        tooltip: BASE_TOOLTIP,
        title: { display: false },
      },
      scales: (type === "bar" || type === "line")
        ? { x: scaleDefaults, y: { ...scaleDefaults, beginAtZero: true } }
        : type === "radar"
          ? {
              r: {
                ticks: { color: "#6b7280", backdropColor: "transparent", font: BASE_FONT },
                grid: { color: "rgba(255,255,255,0.08)" },
                pointLabels: { color: "#9ca3af", font: BASE_FONT },
              },
            }
          : undefined,
    },
  })
}

function initAllCharts() {
  document.querySelectorAll<HTMLCanvasElement>("canvas[data-chart-type]").forEach((canvas) => {
    // Avoid re-initialising a canvas that already has a chart
    if (Chart.getChart(canvas)) return
    initChart(canvas)
  })
}

declare global {
  interface Window {
    switchInsightsTab: (panel: string, triggerEl: HTMLElement) => void
  }
}

window.switchInsightsTab = (panel: string, triggerEl: HTMLElement) => {
  // Update active tab styling
  triggerEl
    .closest(".tabs__items")
    ?.querySelectorAll(".tabs__item")
    .forEach((item) => item.classList.remove("is-active"))
  triggerEl.closest(".tabs__item")?.classList.add("is-active")

  // Show/hide panels
  document.querySelectorAll<HTMLElement>("[data-insights-panel]").forEach((el) => {
    el.classList.toggle("hidden", el.dataset["insightsPanel"] !== panel)
  })

  // Init charts inside the newly visible panel (they were hidden so canvas had 0 size)
  initAllCharts()
}

document.addEventListener("DOMContentLoaded", initAllCharts)
window.addEventListener("htmx:afterSettle", initAllCharts)

import DashboardPage from "$templates/components/DashboardPage"
import Tabs from "$templates/components/Tabs"

// ---------------------------------------------------------------------------
// Demo data — no real service queries
// ---------------------------------------------------------------------------

const months = ["Ian", "Feb", "Mar", "Apr", "Mai", "Iun", "Iul", "Aug", "Sep", "Oct", "Nov", "Dec"]

// AI Insights – token usage
const tokenUsageData = JSON.stringify({
  labels: months,
  datasets: [
    { label: "Tokeni intrare (k)", data: [120, 145, 132, 178, 210, 195, 230, 267, 248, 290, 312, 340] },
    { label: "Tokeni ieșire (k)", data: [45, 52, 48, 67, 80, 74, 88, 102, 95, 115, 128, 142] },
  ],
})

const tokenByModelData = JSON.stringify({
  labels: ["Claude 3.5 Sonnet", "Claude 3 Haiku", "Claude 3 Opus", "Gemini 1.5 Pro"],
  datasets: [{ label: "Tokeni consumați (k)", data: [980, 640, 210, 85] }],
})

const costTrendData = JSON.stringify({
  labels: months,
  datasets: [
    { label: "Cost estimat ($)", data: [18, 22, 20, 28, 34, 31, 38, 44, 41, 49, 55, 61] },
  ],
})

const tokenByDeptData = JSON.stringify({
  labels: ["Engineering", "HR", "Legal", "Finance", "Support", "Marketing"],
  datasets: [{ label: "Tokeni (k)", data: [410, 220, 150, 180, 310, 95] }],
})

// Department insights – efficiency (avg hours to close ticket)
const efficiencyData = JSON.stringify({
  labels: ["Support", "Engineering", "Finance", "HR", "Legal", "Marketing"],
  datasets: [{ label: "Timp mediu rezolvare (h)", data: [3.2, 8.5, 12.1, 6.8, 18.4, 9.3] }],
})

// Tickets opened per department
const ticketsOpenedData = JSON.stringify({
  labels: ["Support", "Engineering", "Finance", "HR", "Legal", "Marketing"],
  datasets: [
    { label: "Q1", data: [124, 87, 62, 45, 30, 38] },
    { label: "Q2", data: [138, 102, 70, 52, 28, 44] },
    { label: "Q3", data: [149, 95, 68, 49, 35, 51] },
    { label: "Q4", data: [161, 110, 75, 55, 33, 58] },
  ],
})

// Most active users – platform interactions
const platformUsersData = JSON.stringify({
  labels: ["M. Rossi", "L. Bianchi", "G. Ferrari", "A. Conti", "F. Marino", "C. Bruno", "S. Ricci", "E. Greco"],
  datasets: [{ label: "Interacțiuni tichete", data: [312, 278, 241, 198, 175, 152, 134, 118] }],
})

// Chatbot usage by user – tokens + chats
const chatbotTokenData = JSON.stringify({
  labels: ["M. Rossi", "L. Bianchi", "G. Ferrari", "A. Conti", "F. Marino", "C. Bruno", "S. Ricci", "E. Greco"],
  datasets: [
    { label: "Tokeni consumați (k)", data: [89, 74, 65, 52, 47, 38, 31, 24] },
    { label: "Conversații create", data: [43, 36, 31, 25, 22, 18, 15, 11] },
  ],
})

// Chatbot solved vs tickets raised
const chatbotOutcomesData = JSON.stringify({
  labels: ["Support", "Engineering", "Finance", "HR", "Legal", "Marketing"],
  datasets: [
    { label: "Probleme rezolvate de chatbot", data: [210, 145, 88, 72, 40, 65] },
    { label: "Tichete deschise după eșecul chatbot-ului", data: [52, 38, 24, 18, 12, 17] },
  ],
})

// Efficiency radar per user (normalized 0-100)
const userEfficiencyData = JSON.stringify({
  labels: ["Viteză răspuns", "Rată rezolvare", "Calitate tichete", "Utilizare chatbot", "Colaborare"],
  datasets: [
    { label: "M. Rossi",   data: [88, 92, 76, 82, 70] },
    { label: "L. Bianchi", data: [72, 80, 88, 65, 85] },
    { label: "G. Ferrari", data: [95, 78, 70, 90, 68] },
  ],
})

// ---------------------------------------------------------------------------
// Small helpers
// ---------------------------------------------------------------------------

type ChartCardProps = {
  title: string
  subtitle?: string
  chartType: "bar" | "line" | "doughnut" | "radar" | "polarArea"
  data: string
  height?: string
}

const ChartCard = ({ title, subtitle, chartType, data, height = "220px" }: ChartCardProps) => (
  <div class="bg-gray-900 border border-gray-800 rounded-xl p-4 flex flex-col gap-y-3">
    <div>
      <p class="text-sm font-roboto-medium text-white">{title as "safe"}</p>
      {subtitle ? <p class="text-xs text-gray-500 mt-0.5">{subtitle as "safe"}</p> : null}
    </div>
    <div style={`height: ${height}; position: relative;`}>
      <canvas
        data-chart-type={chartType}
        data-chart-data={data as "safe"}
      />
    </div>
  </div>
)

type StatCardProps = {
  label: string
  value: string
  sub?: string
  accent?: string
}

const StatCard = ({ label, value, sub, accent = "text-blue-400" }: StatCardProps) => (
  <div class="bg-gray-900 border border-gray-800 rounded-xl p-4 flex flex-col gap-y-1">
    <p class="text-xs text-gray-500 font-roboto-medium uppercase tracking-wide">{label as "safe"}</p>
    <p class={`text-2xl font-roboto-bold ${accent}`}>{value as "safe"}</p>
    {sub ? <p class="text-xs text-gray-500">{sub as "safe"}</p> : null}
  </div>
)

// ---------------------------------------------------------------------------
// Tab panels
// ---------------------------------------------------------------------------

const AiInsightsPanel = () => (
  <div data-insights-panel="ai">
    <div class="grid grid-cols-2 gap-4 xl:grid-cols-4 mb-6">
      <StatCard label="Total tokeni luna aceasta" value="482k" sub="+12% față de luna trecută" accent="text-blue-400" />
      <StatCard label="Cost estimat" value="$61" sub="Toate modelele combinate" accent="text-purple-400" />
      <StatCard label="Tokeni medii / conversație" value="1.240" sub="Intrare + ieșire" accent="text-cyan-400" />
      <StatCard label="Modele AI active" value="4" sub="În toate departamentele" accent="text-green-400" />
    </div>

    <div class="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
      <div class="xl:col-span-2">
        <ChartCard
          title="Utilizare lunară tokeni"
          subtitle="Tokeni intrare vs ieșire pe parcursul anului"
          chartType="line"
          data={tokenUsageData}
          height="230px"
        />
      </div>
      <ChartCard
        title="Utilizare tokeni per model"
        subtitle="Tokeni cumulați per model LLM"
        chartType="doughnut"
        data={tokenByModelData}
        height="230px"
      />
      <ChartCard
        title="Cost lunar estimat"
        subtitle="Dolari cheltuiți pe inferență AI"
        chartType="line"
        data={costTrendData}
        height="200px"
      />
      <div class="lg:col-span-2 xl:col-span-2">
        <ChartCard
          title="Utilizare tokeni per departament"
          subtitle="Care departamente consumă cei mai mulți tokeni"
          chartType="bar"
          data={tokenByDeptData}
          height="200px"
        />
      </div>
    </div>
  </div>
)

const DepartmentInsightsPanel = () => (
  <div data-insights-panel="department" class="hidden">
    {/* Stats row */}
    <div class="grid grid-cols-2 gap-4 xl:grid-cols-4 mb-6">
      <StatCard label="Dept. cel mai eficient" value="Support" sub="Rezolvare medie 3.2h" accent="text-green-400" />
      <StatCard label="Cele mai multe tichete" value="Support" sub="161 în T4" accent="text-orange-400" />
      <StatCard label="Top utilizator chatbot" value="M. Rossi" sub="89k tokeni consumați" accent="text-purple-400" />
      <StatCard label="Rată rezolvare chatbot" value="79%" sub="Probleme rezolvate fără tichet" accent="text-cyan-400" />
    </div>

    <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
      {/* Efficiency */}
      <ChartCard
        title="Departamente mai eficiente"
        subtitle="Bară mai mică = rezolvare mai rapidă a tichetelor"
        chartType="bar"
        data={efficiencyData}
        height="220px"
      />

      {/* Tickets opened */}
      <ChartCard
        title="Tichete deschise per departament"
        subtitle="Defalcare trimestrială"
        chartType="bar"
        data={ticketsOpenedData}
        height="220px"
      />

      {/* Platform interactions */}
      <ChartCard
        title="Cei mai activi utilizatori ai platformei"
        subtitle="Total interacțiuni tichete per utilizator"
        chartType="bar"
        data={platformUsersData}
        height="220px"
      />

      {/* Chatbot usage */}
      <ChartCard
        title="Utilizare chatbot per utilizator"
        subtitle="Tokeni consumați și conversații începute"
        chartType="bar"
        data={chatbotTokenData}
        height="220px"
      />

      {/* Chatbot outcomes */}
      <div class="lg:col-span-2">
        <ChartCard
          title="Rezultate chatbot per departament"
          subtitle="Probleme rezolvate direct vs tichete deschise după ce chatbot-ul nu a putut ajuta"
          chartType="bar"
          data={chatbotOutcomesData}
          height="230px"
        />
      </div>

      {/* User efficiency radar */}
      <div class="lg:col-span-2">
        <ChartCard
          title="Radar eficiență utilizatori top"
          subtitle="Performanță multidimensională pentru cei 3 utilizatori cei mai activi"
          chartType="radar"
          data={userEfficiencyData}
          height="300px"
        />
      </div>
    </div>
  </div>
)

// ---------------------------------------------------------------------------
// Main view
// ---------------------------------------------------------------------------

const StaffInsightsView = () => {
  return (
    <DashboardPage
      title={
        <div class="w-full flex justify-between items-center">
          <span>Statistici</span>
        </div>
      }
    >
      <div class="flex flex-col gap-y-6 pb-6">
        {/* Tab bar */}
        <Tabs
          items={[
            { title: "Statistici AI",            active: true,  onclick: "window.switchInsightsTab('ai', this)" },
            { title: "Statistici Departamente",  active: false, onclick: "window.switchInsightsTab('department', this)" },
          ]}
        />

        {/* Panels */}
        <AiInsightsPanel />
        <DepartmentInsightsPanel />
      </div>
    </DashboardPage>
  )
}

export default StaffInsightsView

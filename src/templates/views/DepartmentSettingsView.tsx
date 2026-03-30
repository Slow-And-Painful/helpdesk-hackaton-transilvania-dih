import DashboardPage from "$templates/components/DashboardPage"
import { Department } from "$services/DepartmentsService"
import Tabs from "$templates/components/Tabs"
import DepartmentGeneralTab from "$templates/components/departments/DepartmentGeneralTab"
import DepartmentAiSettingsTab from "$templates/components/departments/DepartmentAiSettingsTab"

export type DepartmentSettingsTab = "general" | "ai-settings"

type Props = {
  activeDepartment: Department | null
  tab: DepartmentSettingsTab
  baseUrl: string
}

export const departmentSettingsTitleId = "department-settings-title"

const DepartmentSettingsView = ({ activeDepartment, tab, baseUrl }: Props) => {
  return (
    <DashboardPage
      titleContainerId={departmentSettingsTitleId}
      title={
        <span>
          Department
          {activeDepartment && (
            <span class="tickets-page__dept-name" safe>
              {" "} — {activeDepartment.name}
            </span>
          )}
        </span>
      }
    >
      <div class="flex flex-col gap-y-6">
        <Tabs
          items={[
            { title: "General", href: `${baseUrl}?tab=general`, active: tab === "general" },
            { title: "AI Settings", href: `${baseUrl}?tab=ai-settings`, active: tab === "ai-settings" },
          ]}
        />

        {tab === "general" && activeDepartment && (
          <DepartmentGeneralTab activeDepartment={activeDepartment} />
        )}

        {tab === "ai-settings" && activeDepartment && (
          <DepartmentAiSettingsTab activeDepartment={activeDepartment} />
        )}
      </div>
    </DashboardPage>
  )
}

export default DepartmentSettingsView
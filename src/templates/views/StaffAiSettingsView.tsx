import { GlobalSettings } from "$constants/globalSettings"
import DashboardPage from "$templates/components/DashboardPage"
import GlobalSettingsAiSystemPrompt from "$templates/components/global-settings/GlobalSettingsAiSytemPrompt"

type Props = {
  globalSettings: GlobalSettings
}

const StaffAiSettingsView = (props: Props) => {
  return (
    <DashboardPage title={<span>Setări AI</span>}>
      <div class="flex flex-col gap-y-6">
        <GlobalSettingsAiSystemPrompt
          values={{
            systemPrompt: props.globalSettings.SYSTEM_PROMPT || "",
          }}
          initialValues={{
            systemPrompt: props.globalSettings.SYSTEM_PROMPT || "",
          }}
          errors={{}}
        />
      </div>
    </DashboardPage>
  )
}

export default StaffAiSettingsView

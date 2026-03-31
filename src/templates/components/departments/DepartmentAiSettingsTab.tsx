import { Department } from "$services/DepartmentsService"
import DepartmentAiPromptForm from "$templates/components/departments/DepartmentAiPromptForm"

type Props = {
  activeDepartment: Department
}

const DepartmentAiSettingsTab = ({ activeDepartment }: Props) => {
  return (
    <div>
      <div class="mb-4">
        <h3 class="text-lg font-roboto-semibold text-white mb-2">
          AI Assistant Prompt
        </h3>
        <p class="text-sm text-gray-400">
          Configure the system prompt that guides the AI assistant for this department.
        </p>
      </div>

      <DepartmentAiPromptForm
        department={activeDepartment}
        values={{
          systemPrompt: activeDepartment.systemPrompt || "",
        }}
        initialValues={{
          systemPrompt: activeDepartment.systemPrompt || "",
        }}
        errors={{}}
      />
    </div>
  )
}

export default DepartmentAiSettingsTab

import { Department } from "$services/DepartmentsService"
import DepartmentGeneralForm from "$templates/components/departments/DepartmentGeneralForm"

type Props = {
  activeDepartment: Department
}

const DepartmentGeneralTab = ({ activeDepartment }: Props) => {
  return (
    <div>
      <div class="mb-4">
        <h3 class="text-lg font-roboto-semibold text-white mb-2">
          Department Settings
        </h3>
      </div>

      <DepartmentGeneralForm
        department={activeDepartment}
        values={{ name: activeDepartment.name }}
        initialValues={{ name: activeDepartment.name }}
        errors={{}}
      />
    </div>
  )
}

export default DepartmentGeneralTab

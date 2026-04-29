import Form from "$templates/components/Form"
import FormControl from "$templates/components/FormControl"
import Input from "$templates/components/Input"
import Select from "$templates/components/Select"
import { getActionPath } from "$routers/website/utils"
import { FormCommonProps } from "$types/ui"
import { Department } from "$services/DepartmentsService"

type FormData = {
  firstName: string
  lastName: string
  email: string
  departmentId?: string
  role?: string
  userType?: string
}

type Props = FormCommonProps<FormData> & {
  departmentId?: number
  departments?: Department[]
  isStaff?: boolean
}

export const createUserFormId = "create-user-form"

const CreateUserForm = ({ errors, values, initialValues, departmentId, departments, isStaff }: Props) => {
  const isStaffUser = values?.userType === "STAFF"
  const deptRoleRowId = `${createUserFormId}-dept-role-row`

  return (
    <Form
      id={createUserFormId}
      hx-post={getActionPath("users", "CREATE")}
      method="post"
      hx-boost="true"
      hx-push-url="false"
      {...{
        ["hx-on::after-request"]: "onFormAfterRequest(this);",
        ["hx-on::before-request"]: "onFormBeforeRequest(event.target)",
      }}
      hx-target-error={`#${createUserFormId}`}
      values={values}
      initialValues={initialValues}
      errors={errors}
      render={({ errors, values, formId }) => (
        <div class="flex flex-col gap-y-4">
          <FormControl name="firstName" formId={formId} showChanged={false}>
            <Input
              id={`${formId}-firstName`}
              label="Prenume"
              name="firstName"
              required
              type="text"
              error={errors?.firstName}
              value={values?.firstName}
              placeholder="Introdu prenumele"
              size={"sm"}
            />
          </FormControl>

          <FormControl name="lastName" formId={formId} showChanged={false}>
            <Input
              id={`${formId}-lastName`}
              label="Nume"
              name="lastName"
              required
              type="text"
              error={errors?.lastName}
              value={values?.lastName}
              placeholder="Introdu numele"
              size={"sm"}
            />
          </FormControl>

          <FormControl name="email" formId={formId} showChanged={false}>
            <Input
              id={`${formId}-email`}
              label="Email"
              name="email"
              required
              type="email"
              error={errors?.email}
              value={values?.email}
              placeholder="Introdu emailul"
              size={"sm"}
            />
          </FormControl>

          {isStaff && (
            <FormControl name="userType" formId={formId} showChanged={false}>
              <Select
                id={`${formId}-userType`}
                label="Tip utilizator"
                name="userType"
                required
                error={errors?.userType}
                options={[
                  { label: "Client", value: "CUSTOMER", selected: (values?.userType ?? "CUSTOMER") === "CUSTOMER" },
                  { label: "Staff", value: "STAFF", selected: values?.userType === "STAFF" },
                ]}
                size="sm"
              />
            </FormControl>
          )}

          <div
            id={deptRoleRowId}
            class="flex gap-x-4"
            style={isStaffUser ? "display:none" : undefined}
          >
            {departments && departments.length > 0 ? (
              <FormControl name="departmentId" formId={formId} showChanged={false} class="flex-1">
                <Select
                  id={`${formId}-departmentId`}
                  label="Departament"
                  name="departmentId"
                  required
                  error={errors?.departmentId}
                  options={departments.map((d) => ({
                    label: d.name,
                    value: d.id,
                    selected: d.id === Number(values?.departmentId),
                  }))}
                  size="sm"
                />
              </FormControl>
            ) : departmentId ? (
              <input type="hidden" name="departmentId" value={String(departmentId)} />
            ) : null}

            <FormControl name="role" formId={formId} showChanged={false} class="flex-1">
              <Select
                id={`${formId}-role`}
                label="Rol"
                name="role"
                required
                error={errors?.role}
                options={[
                  { label: "Membru", value: "MEMBER", selected: (values?.role ?? "MEMBER") === "MEMBER" },
                  { label: "Admin", value: "ADMIN", selected: values?.role === "ADMIN" },
                ]}
                size="sm"
              />
            </FormControl>
          </div>

          {isStaff && (
            <script>{`
              (function() {
                var hiddenInput = document.getElementById("${formId}-userType-hidden-input");
                var row = document.getElementById("${deptRoleRowId}");
                if (hiddenInput && row) {
                  hiddenInput.addEventListener("change", function() {
                    row.style.display = hiddenInput.value === "STAFF" ? "none" : "";
                  });
                }
              })();
            `}</script>
          )}
        </div>
      )}
    />
  )
}

export default CreateUserForm

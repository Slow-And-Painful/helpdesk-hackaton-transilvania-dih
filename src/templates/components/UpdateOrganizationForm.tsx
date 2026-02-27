import { DESCRIPTION_CHARACTERS_LIMIT } from "$constants/descriptions"
import { getActionPath } from "$routers/website/utils"
import { Organization } from "$services/OrganizationsService"
import { FormCommonProps } from "$types/ui"
import Button from "./Button"
import Form from "./Form"
import FormControl from "./FormControl"
import FormResetButton from "./FormResetButton"
import Input from "./Input"
import Textarea from "./Textarea"

type Props = FormCommonProps<FormData> & {
  organization: Organization
  swapOOB?: string
}

type FormData = {
  name: string
  description: string
}

export const getUpdateOrganizationFormId = (organizationId: number) =>
  `update-organization-form-${organizationId}`

const UpdateOrganizationForm = ({ organization, errors, values, initialValues, swapOOB }: Props) => {
  const formId = getUpdateOrganizationFormId(organization.id)

  return (
    <Form
      id={formId}
      method={"post"}
      hx-boost={"true"}
      hx-post={getActionPath("organizations", "UPDATE", { targetOrganizationId: organization.id })}
      hx-target={`#${formId}`}
      hx-swap={"none"}
      class={
        "flex flex-col w-full gap-4"
      }
      initialValues={initialValues}
      values={values}
      errors={errors}
      {...{
        ["hx-on::before-request"]: "onFormBeforeRequest(event.target)",
        ["hx-on::load"]: "onFormAfterRequest(this)",
        ["hx-on::after-request"]: "onFormAfterRequest(this)",
      }}
      {...(swapOOB
        ? {
            "hx-swap-oob": swapOOB,
          }
        : {})}
      render={({ formId, values, errors }) => (
        <>
          <FormControl name="name" formId={formId}>
            <Input
              id={`${formId}-name`}
              name={"name"}
              label={"Name"}
              value={values.name}
              error={errors?.name}
              required
              class={"max-w-[400px]"}
            />
          </FormControl>

          <FormControl
            name="description" formId={formId}
          >
            <Textarea
              id={`${formId}-description`}
              name={"description"}
              label={"Description"}
              error={errors?.description}
              placeholder="Write here the description of the Organization business in order to improve the AI reponses"
              maxLength={DESCRIPTION_CHARACTERS_LIMIT}
              initialLength={values.description.length}
            >{values.description as "safe"}</Textarea>
          </FormControl>

          <div class={"flex items-center gap-x-3 justify-end"}>
            <FormResetButton
              formId={formId}
              preset={"outline"}
              class="!w-30"
              size="sm"
            >
              Cancel
            </FormResetButton>

            <Button
              class="!w-30"
              type={"submit"}
              size="sm"
            >Save changes</Button>
          </div>
        </>
      )}
    />
  )
}

export default UpdateOrganizationForm

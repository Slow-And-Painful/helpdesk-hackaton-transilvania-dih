import Form from "$templates/components/Form"
import FormControl from "$templates/components/FormControl"
import Input from "$templates/components/Input"
import Button from "$templates/components/Button"
import { FormErrors } from "$types/ui"

export const contactFormId = "contact-form"

export type ContactFormValues = {
  firstName: string
  lastName: string
  numeInstitutie: string
  email: string
}

type Props = {
  values: ContactFormValues
  initialValues: ContactFormValues
  errors?: FormErrors<ContactFormValues>
  actionPath: string
}

const ContactForm = ({ values, initialValues, errors, actionPath }: Props) => {
  return (
    <Form
      id={contactFormId}
      values={values}
      initialValues={initialValues}
      errors={errors}
      method="post"
      action={actionPath}
      hx-post={actionPath}
      hx-target={`#${contactFormId}`}
      hx-swap="outerHTML"
      class="flex flex-col gap-y-4"
      render={({ formId, errors, values }) => (
        <>
          <div class="grid grid-cols-2 gap-4">
            <FormControl formId={formId} name="firstName" showChanged={false}>
              <Input
                id={`${formId}-firstName`}
                label="Prenume"
                name="firstName"
                type="text"
                placeholder="Ion"
                value={values.firstName}
                error={errors?.firstName}
                required
                omitRequiredStar
              />
            </FormControl>

            <FormControl formId={formId} name="lastName" showChanged={false}>
              <Input
                id={`${formId}-lastName`}
                label="Nume"
                name="lastName"
                type="text"
                placeholder="Popescu"
                value={values.lastName}
                error={errors?.lastName}
                required
                omitRequiredStar
              />
            </FormControl>
          </div>

          <FormControl formId={formId} name="numeInstitutie" showChanged={false}>
            <Input
              id={`${formId}-numeInstitutie`}
              label="Nume instituție"
              name="numeInstitutie"
              type="text"
              placeholder="Primăria Cluj-Napoca"
              value={values.numeInstitutie}
              error={errors?.numeInstitutie}
              required
              omitRequiredStar
            />
          </FormControl>

          <FormControl formId={formId} name="email" showChanged={false}>
            <Input
              id={`${formId}-email`}
              label="Adresă email"
              name="email"
              type="email"
              placeholder="ion.popescu@primarie.ro"
              value={values.email}
              error={errors?.email}
              required
              omitRequiredStar
            />
          </FormControl>

          <Button type="submit" preset="primary" class="w-full mt-2" spinner>
            Trimite
          </Button>
        </>
      )}
    />
  )
}

export default ContactForm

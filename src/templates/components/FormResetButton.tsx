import Button, { ButtonProps } from "$templates/components/Button"

type Props = Omit<ButtonProps, "type"> & {
  formId: string
  ["data-form-reset"]?: never
}

const FormResetButton = ({ formId, onclick, ...props }: Props) => {
  return (
    <Button
      {...props}
      data-form-reset={formId}
      type="reset"
      onclick={`resetForm("${formId}");${onclick ?? ""}`}
      disabled
    />
  )
}

export default FormResetButton

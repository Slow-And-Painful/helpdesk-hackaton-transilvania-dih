import Button, { ButtonPreset } from "./Button"
import { IconName } from "./Icon"

interface Props extends Htmx.Attributes, JSX.HtmlButtonTag {
  modalId: string
  submitCta: string
  submitCtaPreset?: ButtonPreset
  submitCtaIcon?: IconName
  cancelCta?: string
  cancelCtaIcon?: IconName
}

const ModalFooter = ({
  modalId,
  submitCta,
  cancelCta = "Cancel",
  submitCtaIcon,
  submitCtaPreset = "primary",
  cancelCtaIcon,
  ...submitButtonAttributes
}: Props) => {
  let icon: IconName | undefined

  if (submitCtaIcon) {
    icon = submitCtaIcon
  } else {
    if (submitCtaPreset === "danger") {
      icon = "trash"
    }
  }

  let type: JSX.HtmlButtonTag["type"] = submitButtonAttributes.type ? submitButtonAttributes.type : "submit"

  if (!submitButtonAttributes.type && !submitButtonAttributes.form) {
    type = "button"
  }

  return (<>
    <Button
      type={"button"}
      size="sm"
      class={"!min-w-30"}
      preset="tertiary"
      onclick={`closeModal('${modalId}')`}
      { ...cancelCtaIcon && { icon: cancelCtaIcon } }
    >{cancelCta as "safe"}</Button>

    <Button
      size="sm"
      class="!min-w-30"
      type={type}
      preset={submitCtaPreset}
      outline={submitCtaPreset === "danger" || submitCtaPreset === "outline"}
      { ...icon && { icon } }
      {...submitButtonAttributes}
    >
      {submitCta as "safe"}
    </Button>
  </>)
}

export default ModalFooter

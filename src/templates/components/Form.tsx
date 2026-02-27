import Alert from "$templates/components/Alert"
import {
  FormCommonProps,
  FormValues,
  FormValuesChanged,
  WithClass,
} from "$types/ui"
import { getFormChangedFields, setFormInitialData } from "$utils/forms"

type RenderChildrenOptions<FormData extends FormValues> = Omit<
  FormCommonProps<FormData>,
  "message"
> & {
  formId: string
  changedFields: FormValuesChanged<FormData>
}
type RenderChildren<FormData extends FormValues> = (
  options: RenderChildrenOptions<FormData>,
) => JSX.Element

type Props<FormData extends FormValues> = Omit<
  WithClass<JSX.HtmlFormTag>,
  "children" | "id"
> &
  FormCommonProps<FormData> & {
    render: RenderChildren<FormData>
    id: string
    ["data-form"]?: never
  }

function Form<FormData extends FormValues>({
  render,
  errors,
  message,
  values,
  initialValues,
  ...props
}: Props<FormData>) {
  return (
    <form {...props} data-form>
      <div
        class="hidden"
        data-form-values={setFormInitialData(initialValues)}
      />

      {message ? (
        <Alert
          theme={message.theme || "danger"}
          class="mb-8"
          title={message.title}
        >
          {message.content as "safe"}
        </Alert>
      ) : null}

      {render({
        changedFields: getFormChangedFields(initialValues, values),
        errors,
        formId: props.id,
        initialValues,
        values,
      })}

      <script>{`
        if (document.readyState === "loading") {
          document.addEventListener("DOMContentLoaded", () => {
            window.registerForm("${props.id}")
          })
        } else {
          window.registerForm("${props.id}")
          document.removeEventListener("DOMContentLoaded", () => {
            window.registerForm("${props.id}")
          })
        }
      `}</script>
    </form>
  )
}

export default Form

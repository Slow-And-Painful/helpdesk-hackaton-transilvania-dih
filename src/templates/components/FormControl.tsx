import { WithClass } from "$types/ui"

type Props = Omit<WithClass<JSX.HtmlTag>, "name"> & {
  formId: string
  name: string
  ["data-form-control"]?: never
  showChanged?: boolean
}

const FormControl = ({
  children,
  formId,
  name,
  showChanged = true,
  ...props
}: Props) => {
  return (
    <div
      {...props}
      data-form-control-show-changed={`${showChanged}`}
      data-form-control={`${formId}-${name}`}
    >
      {children}

      <script>{`
        void (() => {
          if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", () => {
              window.registerFormControl("${formId}", "${name}")
            })
          } else {
            window.registerFormControl("${formId}", "${name}")
          }
        })()
      `}</script>
    </div>
  )
}

export default FormControl

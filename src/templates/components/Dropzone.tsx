import Button from "$templates/components/Button"
import Icon from "$templates/components/Icon"
import Spinner from "$templates/components/Spinner"
import classNames from "classnames"

export type DropzoneProps = JSX.HtmlTag & {
  name: JSX.HtmlInputTag["name"]
  required?: JSX.HtmlInputTag["required"]
  accept?: JSX.HtmlInputTag["accept"]
  onchange?: string
  disabled?: boolean
  loadingMessage?: string
} & (
    | {
        withUpload: false
      }
    | {
        withUpload: true
        putUrlEndpoint: string // endpoint to get the url to put the file
        onUploadSuccess?: {
          method: "GET" | "POST" | "PUT" | "DELETE"
          endpoint: string
          vals?: Record<string, string | number>
        }
      }
  )

const Dropzone = ({
  class: className,
  ondrag,
  name,
  onchange,
  accept,
  disabled = false,
  loadingMessage = "We're uploading your file, please wait",
  ...props
}: DropzoneProps) => {
  const { withUpload, required, ...rest } = props

  let restProps = rest

  if (withUpload) {
    const { withUpload, onUploadSuccess, putUrlEndpoint, required, ...rest } =
      props

    restProps = rest
  }

  return (
    <div
      class={classNames("dropzone", className)}
      data-input-file
      {...restProps}
    >
      <input
        type="file"
        class="hidden"
        name={name}
        disabled={disabled}
        required={required}
        accept={accept}
        onchange={`
        const file = this.files[0];
        const dropzone = this.closest('.dropzone');
        ${props.withUpload ? "uploadFile(this, true);" : `window.dropZones.onInputChange(this, dropzone);`}
        ${onchange ?? ""}
      `}
        {...(props.withUpload
          ? {
              "data-put-url-endpoint": props.putUrlEndpoint,
              "data-on-upload-success": props.onUploadSuccess
                ? JSON.stringify(props.onUploadSuccess)
                : undefined,
            }
          : {})}
      />
      <div
        class="dropzone__no-file"
        onclick="
      const input = this.closest('.dropzone').querySelector('input');
      input.click();
    "
      >
        <Icon name="upload" size={24} />
        <span class="text-grey-300 mx-auto text-center text-base">
          Trascina il file qui o clicca per selezionare
        </span>
      </div>
      <div class="dropzone__has-file !hidden">
        <div class="flex flex-col items-center gap-2">
          <Icon name="file" size={24} />
          <span class="text-grey-800 dropzone__filename">blank</span>
          <Button
            class="button"
            preset="danger"
            onclick="
          window.dropZones.removeFile(event, this);
        "
          >
            Elimina
          </Button>
        </div>
      </div>
      <div class={"file-uploader-loading-message"}>
        <Spinner size={22} />

        <div class="text-sm font-medium mb-1 text-center" safe>
          {loadingMessage}
        </div>
      </div>
    </div>
  )
}

export default Dropzone

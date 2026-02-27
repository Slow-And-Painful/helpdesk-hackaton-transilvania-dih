type Props = {
  formId: string
}

const TimezoneHiddenInput = ({ formId }: Props) => {
  return (
    <>
      <input
        id={`${formId}-timezone`}
        type="hidden"
        name="timezone"
        value={""}
      />
      <script>{`
        void (() => {
          const timezoneInput = document.getElementById("${formId}-timezone")
          if (timezoneInput) {
            const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
            timezoneInput.value = timezone
          }
        })()
      `}</script>
    </>
  )
}

export default TimezoneHiddenInput

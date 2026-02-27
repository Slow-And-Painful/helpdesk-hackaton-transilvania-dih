import { AlertTheme } from "$templates/components/Alert"
import { IconName } from "$templates/components/Icon"
import { GlobalResources } from "$types/assets"

export type ViewProps = {
  globalResources: GlobalResources
}

export type FormMessage = {
  class?: string
  content?: JSX.Element
  icon?: IconName | null
  iconSize?: number
  theme?: AlertTheme
  title?: string
}

export type FormValues = {
  [key: string]: number | string
}

export type FormValuesChanged<FormData extends FormValues> = {
  [key in keyof FormData]: boolean
}

export type FormErrors<FormData> = Partial<Record<keyof FormData, JSX.Element>>

export type FormCommonProps<FormData> = {
  errors?: FormErrors<FormData>
  initialValues: FormData
  message?: FormMessage
  values: FormData
}

export type SSOMessage = {
  class?: string
  content?: JSX.Element
  icon?: IconName | null
  iconSize?: number
  theme?: AlertTheme
}

export type WithClass<T extends JSX.HtmlTag = JSX.HtmlTag> = Omit<
  T,
  "class" | "className"
> & {
  class?: string
}

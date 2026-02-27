import Icon, { IconName } from "$templates/components/Icon"
import Button from "./Button"

type Props = {
  message: string
  description?: string
  ctaHtmxAttributes?: Htmx.Attributes
  ctaText?: string
  icon?: IconName
}

const NoEntityYet = (props: Props) => {
  return (
    <div class="flex items-center justify-center py-12">
      <div class="flex flex-col items-center gap-y-4 max-w-[420px] text-center">
        {/* Icon */}
        <div class="flex items-center justify-center w-16 h-16 rounded-full bg-gray-900/50 border border-gray-800">
          <Icon name={props.icon || "cloud-off"} size={28} class="text-gray-500" />
        </div>

        {/* Message */}
        <div class="flex flex-col gap-y-2">
          <h3 class="text-lg font-roboto-semibold text-white">
            {props.message}
          </h3>
          {props.description && (
            <p class="text-sm text-gray-400">
              {props.description}
            </p>
          )}
        </div>

        {/* CTA Button */}
        {props.ctaHtmxAttributes && props.ctaText && (
          <Button
            {...props.ctaHtmxAttributes}
            class="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-roboto-medium rounded-lg transition-colors"
            preset="secondary"
            size="sm"
          >
            {props.ctaText}
          </Button>
        )}
      </div>
    </div>
  )
}

export default NoEntityYet
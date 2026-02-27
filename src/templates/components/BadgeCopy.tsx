import Badge, { BadgeProps } from "./Badge"
import Icon from "./Icon"

type Props = BadgeProps & {
  value: number | string
  valueToCopy?: string
}

const BadgeCopy = ({ children, value, valueToCopy, ...badgeProps }: Props) => {
  return (
    <Badge {...badgeProps}>
      <div
        class="font-mono truncate w-[calc(100%-1rem)] select-text"
        text-ellipsis-exclude
        safe
      >
        {children ?? value}
      </div>

      <div
        class="flex items-start cursor-pointer min-w-3"
        onclick={`copyToClipboard(event, null, () => toggleCopyIcon(event.target))`}
        data-value={valueToCopy ?? value}
      >
        <Icon name="copy" class="pointer-events-none text-gray-500" size={12} />
      </div>
    </Badge>
  )
}

export default BadgeCopy

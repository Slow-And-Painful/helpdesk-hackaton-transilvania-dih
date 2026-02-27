import Icon from "./Icon"

type Props = {
  class?: string
}

const Logo = ({
  class: className
}: Props) => {
  return (
    <div class={className}>
      <div class="flex items-center justify-center w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30">
        <Icon name="activity" size={20} class="text-blue-400" />
      </div>
    </div>
  )
}

export default Logo
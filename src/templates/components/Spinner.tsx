import Icon, { IconName, IconProps } from "./Icon"

type Props = Omit<IconProps, "name"> & {
  iconName?: IconName
}

const Spinner = ({
  class: className,
  iconName = "spinner",
  ...props
}: Props) => {
  return (
    <Icon
      name={iconName}
      class={`animate-spin ${className ? `${className}` : ""}`}
      {...props}
    />
  )
}

export default Spinner

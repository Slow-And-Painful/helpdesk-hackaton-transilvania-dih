import classNames from "classnames"
import Radio, { RadioProps } from "./Radio"

type Props = {
  items: Omit<RadioProps, "name">[]
  name: string
  classes?: string
  label?: string
}

const RadioGroup = ({ items, name, label, ...props }: Props) => {
  return (
    <div class={classNames(props.classes)}>
      {label ? <label class="input__label">
        {label as "safe"}
      </label> : null}

      {items.map((radio) => <Radio
        name={name}
        {...radio}
      />)}
    </div>
  )
}

export default RadioGroup

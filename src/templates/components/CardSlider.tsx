import classNames from "classnames"
import Icon from "./Icon"

type Item = {
  content: JSX.Element
  classes?: string
}

type Props = {
  items: Item[]
  maxItemsPerView?: number
  classes?: string
}

const CardSlider = ({
  items,
  maxItemsPerView = 3,
  classes
}: Props) => {
  return (
    <div data-card-slider class={classNames("card-slider__wrapper", classes)}>
      <button
        type="button"
        data-card-slider-left
        class="card-slider__indicator indicator--left"
        onclick="window.scrollCardSlider('left', this)"
        disabled={true}
        data-initialized={true}
      >
        <Icon name="arrow-left" size={16} />
      </button>

      <div
        data-card-slider-track
        class="card-slider__track"
      >
        <div 
          class="card-slider__container"
        >
          {items.map((item) => (
            <div
              class={classNames("card-slider__item")}
              style={{ width: `${100 / maxItemsPerView}%` }}
            >
              <div class={classNames("card-slider__item-content", item.classes)}>
                {item.content as "safe"}
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        data-card-slider-right
        class="card-slider__indicator indicator--right"
        onclick="window.scrollCardSlider('right', this)"
        disabled={items.length <= maxItemsPerView}
        data-initialized={items.length <= maxItemsPerView}
      >
        <Icon name="arrow-right" size={16} />
      </button>
    </div>
  )
}

export default CardSlider

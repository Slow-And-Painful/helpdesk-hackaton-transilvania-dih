import Icon from "$templates/components/Icon"
import LogoBase from "$templates/components/LogoBase"

const SmallScreenView = () => {
  return (
    <div id="small-screen-view" class="min-w-screen min-h-screen fixed top-0 left-0 flex items-center justify-center p-8">
      <div
        class="bg-black border border-gray-700 rounded-lg flex flex-col gap-y-6 items-center justify-center p-8"
        style={{ boxShadow: "0px 4px 34px 0px rgba(253, 81, 120, 0.25)" }}
      >
        <div class="flex flex-col items-center justify-center gap-y-1">
          <LogoBase />
          <p class="text-sm text-gray-400">Is designed for bigger screen size.</p>
        </div>

        <Icon name="display" size={45} />

        <div class="text-gray-200 text-center">
          Please vist it form a desktop device and use it in fullscreen for the best experience
        </div>
      </div>
    </div>
  )
}

export default SmallScreenView
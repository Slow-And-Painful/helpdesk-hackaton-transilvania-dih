import Icon from "$templates/components/Icon"

const SmallScreenView = () => {
  return (
    <div id="small-screen-view" class="fixed inset-0 bg-black flex items-center justify-center p-8 z-50">
      <div class="pointer-events-none fixed inset-0 overflow-hidden">
        <div style="position:absolute;top:-8rem;left:-8rem;width:500px;height:500px;border-radius:9999px;background:radial-gradient(circle,rgba(37,99,235,0.18) 0%,transparent 65%);filter:blur(90px);" />
        <div style="position:absolute;bottom:-6rem;right:-6rem;width:450px;height:450px;border-radius:9999px;background:radial-gradient(circle,rgba(147,51,234,0.14) 0%,transparent 65%);filter:blur(90px);" />
      </div>

      <div class="relative flex flex-col items-center gap-y-8 text-center max-w-xs">

        <div class="flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/20">
          <Icon name="monitor" size={28} class="text-blue-400" />
        </div>

        <p class="text-gray-300 text-sm leading-relaxed">
          Ne pare rău, momentan aplicația este disponibilă doar pe desktop. Lucrăm din greu pentru a soluționa această inconveniență.
        </p>
      </div>
    </div>
  )
}

export default SmallScreenView

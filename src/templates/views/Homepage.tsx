import { getViewPath } from "$routers/website/utils"
import { User } from "$services/UsersService"
import Button from "$templates/components/Button"
import Icon from "$templates/components/Icon"
import USER_TYPE from "$types/USER_TYPE"

type Props = {
  callerUser: User | null
}

const Homepage = (props: Props) => {
  return (
    <div class="relative h-screen -mt-5 flex overflow-hidden">

      {/* Background glow blobs */}
      <div class="pointer-events-none absolute inset-0 -z-10">
        <div class="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-[120px]" />
        <div class="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-purple-600/10 blur-[100px]" />
      </div>

      {/* ── LEFT — Hero ── */}
      <div class="flex flex-col justify-center gap-y-6 w-1/2 px-16">

        <div class="inline-flex items-center gap-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/25 text-blue-400 text-xs font-roboto-semibold uppercase tracking-widest w-fit">
          <span class="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse inline-block" />
          Platforma digitală internă
        </div>

        <h1 class="text-h2 font-roboto-bold text-white leading-tight">
          <span class="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            SAP Team
          </span>
          <br/>
          Transilvania Digital
          <br/>
          Innovation Hub
        </h1>

        <p class="text-base text-gray-400 max-w-sm leading-relaxed">
          Instrumentul intern al angajaților din instituțiile publice — asistență AI, tichete și colaborare pe departamente, într-un singur loc.
        </p>

        <div class="flex items-center gap-x-3">
          {props.callerUser !== null
            ? <a href={props.callerUser.type === USER_TYPE.CUSTOMER ? getViewPath("dashboard", "HOME") : getViewPath("staff", "DEPARTMENTS")} hx-boost="true">
                <Button preset="primary" class="px-6 py-2 text-sm">
                  Mergi la tabloul de bord
                </Button>
              </a>
            : <>
                <a href={getViewPath("auth", "SIGNUP")} hx-boost="true">
                  <Button preset="primary" class="px-6 py-2 text-sm">
                    Începe acum
                  </Button>
                </a>
                <a href={getViewPath("auth", "LOGIN", undefined)} hx-boost="true">
                  <Button preset="secondary" outline class="px-6 py-2 text-sm">
                    Conectează-te
                  </Button>
                </a>
              </>
          }
        </div>

        {/* Stats */}
        <div class="flex items-center gap-x-8 pt-4 border-t border-gray-800/60">
          <div class="flex flex-col gap-y-0.5">
            <span class="text-xl font-roboto-bold text-white">AI</span>
            <span class="text-xs text-gray-500">Asistent inteligent</span>
          </div>
          <div class="flex flex-col gap-y-0.5">
            <span class="text-xl font-roboto-bold text-white">RAG</span>
            <span class="text-xs text-gray-500">Documente indexate</span>
          </div>
          <div class="flex flex-col gap-y-0.5">
            <span class="text-xl font-roboto-bold text-white">24/7</span>
            <span class="text-xs text-gray-500">Disponibilitate</span>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div class="w-px bg-gray-800/60 my-12" />

      {/* ── RIGHT — Features ── */}
      <div class="flex flex-col justify-center gap-y-3 w-1/2 px-16">

        <div class="relative flex flex-col gap-y-2 p-4 rounded-2xl bg-gray-900/50 border border-gray-800/60 overflow-hidden">
          <div class="absolute top-0 right-0 w-32 h-32 rounded-full bg-blue-600/10 blur-[40px] pointer-events-none" />
          <div class="flex items-center gap-x-3">
            <div class="flex items-center justify-center w-9 h-9 rounded-xl bg-blue-950/60 border border-blue-900/60 shrink-0">
              <Icon name="agent" size={18} class="text-blue-400" />
            </div>
            <h3 class="text-sm font-roboto-semibold text-white">Asistent AI contextual</h3>
          </div>
          <p class="text-xs text-gray-400 leading-relaxed">
            Fiecare departament are propriul asistent, antrenat pe procedurile interne. Răspunsuri precise, fără căutare manuală.
          </p>
          <div class="flex flex-wrap gap-1.5">
            {["Răspunsuri instant", "Bază de cunoștințe", "Prompt personalizabil"].map(tag => (
              <span class="px-2 py-0.5 rounded-full bg-blue-950/50 border border-blue-900/40 text-blue-300 text-xs">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div class="relative flex flex-col gap-y-2 p-4 rounded-2xl bg-gray-900/50 border border-gray-800/60 overflow-hidden">
          <div class="absolute bottom-0 right-0 w-28 h-28 rounded-full bg-purple-600/10 blur-[40px] pointer-events-none" />
          <div class="flex items-center gap-x-3">
            <div class="flex items-center justify-center w-9 h-9 rounded-xl bg-purple-950/60 border border-purple-900/60 shrink-0">
              <Icon name="inbox" size={18} class="text-purple-400" />
            </div>
            <h3 class="text-sm font-roboto-semibold text-white">Gestionare tichete</h3>
          </div>
          <p class="text-xs text-gray-400 leading-relaxed">
            Flux clar de solicitări interne, cu statusuri, priorități și trasabilitate completă pe departamente.
          </p>
        </div>

        <div class="grid grid-cols-3 gap-3">
          <div class="flex flex-col gap-y-2 p-4 rounded-2xl bg-gray-900/50 border border-gray-800/60">
            <div class="flex items-center justify-center w-8 h-8 rounded-xl bg-green-950/50 border border-green-900/50">
              <Icon name="users" size={15} class="text-green-400" />
            </div>
            <h3 class="text-xs font-roboto-semibold text-white">Multi-departament</h3>
            <p class="text-xs text-gray-500">Roluri izolate pe departamente.</p>
          </div>

          <div class="flex flex-col gap-y-2 p-4 rounded-2xl bg-gray-900/50 border border-gray-800/60">
            <div class="flex items-center justify-center w-8 h-8 rounded-xl bg-orange-950/50 border border-orange-900/50">
              <Icon name="file-text" size={15} class="text-orange-400" />
            </div>
            <h3 class="text-xs font-roboto-semibold text-white">Documente RAG</h3>
            <p class="text-xs text-gray-500">Proceduri indexate automat pentru AI.</p>
          </div>

          <div class="flex flex-col gap-y-2 p-4 rounded-2xl bg-gray-900/50 border border-gray-800/60">
            <div class="flex items-center justify-center w-8 h-8 rounded-xl bg-blue-950/50 border border-blue-900/50">
              <Icon name="shield" size={15} class="text-blue-400" />
            </div>
            <h3 class="text-xs font-roboto-semibold text-white">Acces controlat</h3>
            <p class="text-xs text-gray-500">Permisiuni granulare per rol.</p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Homepage

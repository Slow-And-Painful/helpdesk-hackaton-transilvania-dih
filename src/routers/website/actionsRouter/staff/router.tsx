import { createRouter } from "../../utils"
import { ROUTE } from "./types"
import { schemas } from "./schemas"
import { container } from "tsyringe"
import USER_ROLE from "$types/USER_ROLES"
import GlobalSettingsAiSystemPrompt, { globalSettingsAiSystemPromptFormId } from "$templates/components/global-settings/GlobalSettingsAiSytemPrompt"
import GlobalSettingsComponent from "$components/GlobalSettingsComponent"
import GLOBAL_SETTINGS from "$types/GLOBAL_SETTINGS"

export const routerPrefix = "/staff"

const globalSettingsComponent = container.resolve<GlobalSettingsComponent>(GlobalSettingsComponent.token)

export const router = createRouter("staff", (server) => {
  server.route({
    method: "POST",
    url: ROUTE.UPDATE_SYSTEM_PROMPT,
    schema: schemas[ROUTE.UPDATE_SYSTEM_PROMPT],
    config: {
      authenticated: true,
      security: { session: `${USER_ROLE.STAFF_ACCOUNT}` },
    },
    handler: async (req, res) => {
      const { systemPrompt } = req.body as { departmentId: number; systemPrompt: string }

      await globalSettingsComponent.updateGlobalSetting(GLOBAL_SETTINGS.SYSTEM_PROMPT, systemPrompt)

      return res
        .headers({
          "HX-Retarget": `#${globalSettingsAiSystemPromptFormId}`,
          "HX-Reswap": "outerHTML",
          "HX-Push-Url": "false",
          "HX-Trigger-After-Settle": JSON.stringify({
            showSuccessToast: "System prompt updated successfully",
          })
        })
        .view(
          <GlobalSettingsAiSystemPrompt
            values={{ systemPrompt }}
            initialValues={{ systemPrompt }}
            errors={{}}
          />
        )
    },
  })
})

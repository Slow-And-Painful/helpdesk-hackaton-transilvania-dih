import { Organization } from "$services/OrganizationsService"
import { SubscriptionPlan } from "$services/SubscriptionPlansService"
import Button, { ButtonProps } from "./Button"

type Props = {
  subscriptionPlan: SubscriptionPlan
  selected?: boolean
  organization: Organization
  ctaAttributes?: Htmx.Attributes & ButtonProps
  workingDaysPerMonth: number
}

const SubscriptionPlanCard = (options: Props) => {
  const isCurrentPlan = options.organization.plan.id === options.subscriptionPlan.id

  const rawDailyPrice = (options.subscriptionPlan.monthlyCostUsageLimit / options.workingDaysPerMonth)
  let parsedDailyPrice
  if (Math.round(rawDailyPrice) === 0) {
    parsedDailyPrice = rawDailyPrice.toFixed(2)
  } else {
    parsedDailyPrice = Math.round(rawDailyPrice).toString()
  }
  
  return (
    <div class="flex flex-col gap-y-6">
      <div class="flex flex-col gap-y-2">
        <div class="text-lg font-roboto-medium" safe>{options.subscriptionPlan.name}</div>
        <div class="text-sm line-clamp-3 truncate" safe>{options.subscriptionPlan.description}</div>
      </div>

      <div class="flex items-baseline text-white">
        <div class="text-[36px]">€{options.subscriptionPlan.monthlyCostUsageLimit}</div>
        <div class="font-roboto-light-italic text-sm">/month</div>
      </div>

      <div class="flex items-baseline text-white">
        <div class="text-[36px]" safe>€{parsedDailyPrice}</div>
        <div class="font-roboto-light-italic text-sm">/day</div>
      </div>

      <div class="w-full flex items-center justify-center">
        <Button
          size="sm"
          {...options.ctaAttributes}
        >
          {isCurrentPlan
            ? "Current plan"
            : "Assign plan"
          }
        </Button>
      </div>
    </div>
  )
}

export default SubscriptionPlanCard

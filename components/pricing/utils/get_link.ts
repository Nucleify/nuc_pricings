import type { BillingPeriod, PricingPlan } from '../types'

export function getLink(
  plan: PricingPlan,
  billingPeriod: BillingPeriod
): string {
  return billingPeriod === 'monthly'
    ? plan.monthlyLink || '#'
    : plan.oneTimeLink || '#'
}

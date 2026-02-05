import type { BillingPeriod, PricingPlan } from '../types'

export function getPrice(
  plan: PricingPlan,
  billingPeriod: BillingPeriod
): number {
  return billingPeriod === 'monthly' ? plan.monthlyPrice : plan.oneTimePrice
}

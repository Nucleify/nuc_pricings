export interface PricingFeature {
  text: string
  included: boolean
  highlight?: boolean
}

export interface PricingPlan {
  id: string
  name: string
  monthlyPrice: number
  oneTimePrice: number
  currency: string
  description: string
  features: PricingFeature[]
  monthlyLink?: string
  oneTimeLink?: string
  popular?: boolean
  icon: string
  accentColor?: string
}

export interface PricingCategory {
  id: string
  name: string
  description: string
  icon: string
  plans: PricingPlan[]
}

export type BillingPeriod = 'monthly' | 'one-time'

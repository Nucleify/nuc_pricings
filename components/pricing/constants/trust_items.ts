import type { Composer } from 'vue-i18n'

import type { NucTrustBadgeItemInterface } from 'atomic'

export function getTrustItems(t: Composer['t']): NucTrustBadgeItemInterface[] {
  return [
    { icon: 'mdi:shield-check', label: t('pricing-trust-moneyback') },
    { icon: 'mdi:lock-outline', label: t('pricing-trust-secure') },
    { icon: 'mdi:headset', label: t('pricing-trust-consultation') },
  ]
}

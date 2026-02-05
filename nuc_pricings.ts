import type { App } from 'vue'

import { NucSectionPricing } from './components'

export function registerNucPricings(app: App<Element>): void {
  app.component('nuc-section-pricing', NucSectionPricing)
}

<template>
  <section id="pricing">
    <div class="pricing-glow"></div>
    <div class="pricing-container container">
      <div class="pricing-header">
        <nuc-shiny-badge icon="mdi:tag-outline" :label="$t('pricing-badge')" />
        <h2 class="pricing-heading">
          {{ $t('pricing-heading-prefix') }}
          <span class="highlight">{{ $t('pricing-heading-highlight') }}</span>
        </h2>
        <p class="pricing-description">
          {{ $t('pricing-description') }}
          <span class="vat-note">{{ $t('pricing-vat-note') }}</span>
        </p>
        <nuc-section-email-us-dialog
          button-class="ask-sticker"
          :button-label="$t('pricing-help-choosing')"
          :button-strong="$t('pricing-lets-talk')"
        />
      </div>

      <div class="pricing-controls">
        <div class="billing-toggle">
          <button
            class="billing-option"
            :class="{ active: billingPeriod === 'monthly' }"
            @click="billingPeriod = 'monthly'"
          >
            <Icon name="mdi:calendar-month" />
            <span>{{ $t('pricing-billing-monthly') }}</span>
          </button>
          <button
            class="billing-option"
            :class="{ active: billingPeriod === 'one-time' }"
            @click="billingPeriod = 'one-time'"
          >
            <Icon name="mdi:lightning-bolt" />
            <span>{{ $t('pricing-billing-one-time') }}</span>
            <span class="save-badge">{{ $t('pricing-save-badge') }}</span>
          </button>
        </div>

        <div class="category-tabs">
          <button
            v-for="category in pricingCategories"
            :key="category.id"
            class="category-tab"
            :class="{ active: activeCategory === category.id }"
            @click="activeCategory = category.id"
          >
            <Icon :name="category.icon" />
            <span>{{ category.name }}</span>
          </button>
        </div>
      </div>

      <Transition name="fade" mode="out-in">
        <div :key="`${activeCategory}-${billingPeriod}`" class="plans-grid">
          <div
            v-for="(plan, index) in currentPlans"
            :key="plan.id"
            class="plan-card"
            :class="{ popular: plan.popular }"
            :style="{ '--delay': `${index * 100}ms` }"
            @click="openPlanDialog(plan)"
          >
            <div v-if="plan.popular" class="popular-badge">
              <Icon name="mdi:star" />
              <span>{{ $t('pricing-most-popular') }}</span>
            </div>

            <div class="plan-header">
              <div class="plan-icon-wrapper">
                <Icon :name="plan.icon" class="plan-icon" />
              </div>
              <h3 class="plan-name">{{ plan.name }}</h3>
              <p class="plan-description">{{ plan.description }}</p>
            </div>

            <div class="plan-price">
              <div class="price-row">
                <span class="currency">{{ plan.currency }}</span>
                <span class="amount">{{ formatPrice(getPrice(plan, billingPeriod)) }}</span>
              </div>
              <span class="period">
                {{
                  billingPeriod === 'monthly'
                    ? $t('pricing-period-month')
                    : $t('pricing-period-one-time')
                }}
              </span>
            </div>

            <ul class="plan-features">
              <li
                v-for="(feature, fIndex) in plan.features.slice(0, 5)"
                :key="fIndex"
                class="feature-item"
                :class="{ included: feature.included, highlight: feature.highlight }"
              >
                <Icon
                  :name="feature.included ? 'mdi:check-circle' : 'mdi:close-circle'"
                  class="feature-icon"
                />
                <span>{{ feature.text }}</span>
              </li>

              <li v-if="plan.features.length > 5" class="feature-item more-features">
                <Icon name="mdi:plus-circle-outline" class="feature-icon" />
                <span>{{
                  $t('pricing-more-features', { count: plan.features.length - 5 })
                }}</span>
              </li>
            </ul>

            <p v-if="index > 0" class="includes-previous">
              <Icon name="mdi:layers-outline" />
              <span>{{
                $t('pricing-includes-all-features', {
                  plan: currentPlans[index - 1].name,
                })
              }}</span>
            </p>

            <nuc-submit-button
              :label="$t('pricing-choose-plan')"
              class="plan-button"
              :class="{ primary: plan.popular }"
              @click.stop="openPlanDialog(plan)"
            />
          </div>
        </div>
      </Transition>

      <Transition name="slide-fade">
        <p v-if="billingPeriod === 'monthly'" class="contract-note">
          <Icon name="mdi:file-document-outline" />
          {{ $t('pricing-contract-note') }}
          <span class="note-highlight">{{ $t('pricing-contract-note-highlight') }}</span>
        </p>
      </Transition>

      <nuc-trust-badges :items="trustItems" />
    </div>

    <nuc-pricing-dialog
      v-model="showPlanDialog"
      :plan="selectedPlan"
      :billing-period="billingPeriod"
      :previous-plan-name="previousPlanName"
    />
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import { getPricingCategories, getTrustItems } from './constants'
import { NucPricingDialog } from './dialog'
import type { BillingPeriodType, PricingPlanInterface } from './types'
import { formatPrice, getPrice } from './utils'

const { t } = useI18n()

const pricingCategories = computed(() => getPricingCategories(t))
const trustItems = computed(() => getTrustItems(t))

const activeCategory = ref('customer')
const billingPeriod = ref<BillingPeriodType>('one-time')

const showPlanDialog = ref(false)
const selectedPlan = ref<PricingPlanInterface | null>(null)
const selectedPlanIndex = ref(-1)

const currentPlans = computed(() => {
  const category = pricingCategories.value.find(
    (c) => c.id === activeCategory.value
  )
  return category?.plans || []
})

const previousPlanName = computed(() => {
  if (selectedPlanIndex.value > 0) {
    return currentPlans.value[selectedPlanIndex.value - 1]?.name ?? null
  }
  return null
})

function openPlanDialog(plan: PricingPlanInterface): void {
  selectedPlan.value = plan
  selectedPlanIndex.value = currentPlans.value.findIndex(
    (p) => p.id === plan.id
  )
  showPlanDialog.value = true
}
</script>

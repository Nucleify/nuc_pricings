<template>
  <section id="pricing">
    <div class="pricing-glow"></div>
    <div class="pricing-container container">
      <div class="pricing-header">
        <span class="pricing-badge">
          <Icon name="mdi:tag-outline" />
          <span>PRICING PLANS</span>
        </span>
        <h2 class="pricing-heading">
          Choose the perfect plan for
          <span class="highlight">your journey.</span>
        </h2>
        <p class="pricing-description">
          Flexible pricing that scales with your needs. No hidden fees. <span class="vat-note">VAT included.</span>
        </p>
        <button class="ask-sticker" @click="showDialog = true">
          <Icon name="mdi:message-text-outline" />
          <span>Need help choosing? <strong>Let's talk!</strong></span>
        </button>
      </div>

      <div class="pricing-controls">
        <div class="billing-toggle">
          <button
            class="billing-option"
            :class="{ active: billingPeriod === 'monthly' }"
            @click="billingPeriod = 'monthly'"
          >
            <Icon name="mdi:calendar-month" />
            <span>Monthly</span>
          </button>
          <button
            class="billing-option"
            :class="{ active: billingPeriod === 'one-time' }"
            @click="billingPeriod = 'one-time'"
          >
            <Icon name="mdi:lightning-bolt" />
            <span>One-time</span>
            <span class="save-badge">Save 20%</span>
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
          >
            <div v-if="plan.popular" class="popular-badge">
              <Icon name="mdi:star" />
              <span>Most Popular</span>
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
                <span class="amount">{{ formatPrice(getPrice(plan)) }}</span>
              </div>
              <span class="period">{{ billingPeriod === 'monthly' ? 'per month' : 'one-time payment' }}</span>
            </div>

            <ul class="plan-features">
              <li
                v-for="(feature, fIndex) in plan.features"
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
            </ul>

            <ad-anchor
              :label="plan.popular ? 'Get Started →' : 'Choose Plan'"
              class="plan-button"
              :class="{ primary: plan.popular }"
              :href="getLink(plan)"
              target="_blank"
            />
          </div>
        </div>
      </Transition>

      <Transition name="slide-fade">
        <p v-if="billingPeriod === 'monthly'" class="contract-note">
          <Icon name="mdi:file-document-outline" />
          Monthly plans require a minimum 6-month commitment.
          <span class="note-highlight">Cancel anytime after.</span>
        </p>
      </Transition>

      <div class="pricing-footer">
        <div class="guarantee-badges">
          <div class="guarantee-item">
            <Icon name="mdi:shield-check" />
            <span>30-day money-back guarantee</span>
          </div>
          <div class="guarantee-item">
            <Icon name="mdi:lock-outline" />
            <span>Secure payment via Stripe</span>
          </div>
          <div class="guarantee-item">
            <Icon name="mdi:headset" />
            <span>Free consultation included</span>
          </div>
        </div>
      </div>
    </div>

    <Dialog
      v-model:visible="showDialog"
      :modal="true"
      :dismissable-mask="true"
      :draggable="false"
      :show-header="false"
    >
      <nuc-section-email-us @success="showDialog = false" />
    </Dialog>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

import { pricingCategories } from './plans'
import type { BillingPeriod, PricingPlan } from './types'

const showDialog = ref(false)
const activeCategory = ref('customer')
const billingPeriod = ref<BillingPeriod>('one-time')

const currentPlans = computed(() => {
  const category = pricingCategories.find((c) => c.id === activeCategory.value)
  return category?.plans || []
})

function getPrice(plan: PricingPlan): number {
  return billingPeriod.value === 'monthly'
    ? plan.monthlyPrice
    : plan.oneTimePrice
}

function getLink(plan: PricingPlan): string {
  return billingPeriod.value === 'monthly'
    ? plan.monthlyLink || '#'
    : plan.oneTimeLink || '#'
}

function formatPrice(price: number): string {
  return price.toLocaleString('en-US')
}
</script>

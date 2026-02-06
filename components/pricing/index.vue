<template>
  <section id="pricing">
    <div class="pricing-glow"></div>
    <div class="pricing-container container">
      <div class="pricing-header">
        <nuc-shiny-badge icon="mdi:tag-outline" label="PRICING PLANS" />
        <h2 class="pricing-heading">
          Choose the perfect plan for
          <span class="highlight">your journey.</span>
        </h2>
        <p class="pricing-description">
          Flexible pricing that scales with your needs. No hidden fees. <span class="vat-note">VAT included.</span>
        </p>
        <nuc-section-email-us-dialog 
          button-class="ask-sticker"
          button-label="Need help choosing?"
          button-strong="Let's talk!"
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
                <span class="amount">{{ formatPrice(getPrice(plan, billingPeriod)) }}</span>
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
              :href="getLink(plan, billingPeriod)"
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

      <nuc-trust-badges :items="trustItems" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

import { pricingCategories, trustItems } from './constants'
import type { BillingPeriod } from './types'
import { formatPrice, getLink, getPrice } from './utils'

const activeCategory = ref('customer')
const billingPeriod = ref<BillingPeriod>('one-time')

const currentPlans = computed(() => {
  const category = pricingCategories.find((c) => c.id === activeCategory.value)
  return category?.plans || []
})
</script>

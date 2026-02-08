<template>
  <client-only>
    <Dialog
      v-if="plan"
      v-model:visible="visible"
      :modal="true"
      :dismissable-mask="true"
      :draggable="false"
      :show-header="true"
      class="pricing-plan-dialog"
      :pt="{
        pcCloseButton: {
          root: {
          'ad-type': 'main',
          }
        }
      }"
    >
      <template #header>
        <div class="plan-dialog-header-wrapper">
          <div class="plan-dialog-header">
            <div class="plan-dialog-icon">
              <Icon :name="plan.icon" />
            </div>
            <h3>{{ plan.name }}</h3>
            <p>{{ plan.description }}</p>
          </div>

          <div class="plan-dialog-price">
            <span class="currency">{{ plan.currency }}</span>
            <span class="amount">{{ formatPrice(getPrice(plan, billingPeriod)) }}</span>
            <span class="period">{{ billingPeriod === 'monthly' ? '/month' : ' one-time' }}</span>
          </div>
        </div>

        <h4>What's included:</h4>
      </template>

      <div class="plan-dialog-content">
        <div class="plan-dialog-benefits">
          <ul>
            <li
              v-for="(feature, index) in plan.features"
              :key="index"
              :class="{ highlight: feature.highlight }"
            >
              <Icon name="mdi:check-circle" />
              <span>{{ feature.text }}</span>
            </li>
          </ul>
        </div>
      </div>

      <template #footer>
        <div class="plan-dialog-footer-wrapper">
          <ad-button
            label="Proceed to Payment →"
            class="plan-dialog-button"
            @click="openPaymentLink(plan, billingPeriod)"
          />

          <p v-if="billingPeriod === 'monthly'" class="plan-dialog-note">
            <Icon name="mdi:information-outline" />
            6-month minimum commitment. Cancel anytime after.
          </p>
        </div>
      </template>
    </Dialog>
  </client-only>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { formatPrice, getPrice, openPaymentLink } from '../utils'
import type { PricingDialogInterface } from './types'

const props = defineProps<PricingDialogInterface>()
const emit = defineEmits(['update:modelValue'])

const visible = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})
</script>

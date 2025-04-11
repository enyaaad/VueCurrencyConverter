<template>
  <div v-if="Object.keys(getRates).length > 0" class="currency-rates">
    <div v-if="isLoading">
      Загрузка...
      <BaseLoader/>
    </div>
    <div v-else-if="error">{{ error }}</div>
    <ul v-else>
      <li v-for="rate in formattedRates" :key="rate">{{ rate }}</li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { useCurrencyStore } from '@entities/currency/model/useCurrencyStore'
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { formatRates } from '@shared/lib/helpers'
import BaseLoader from '@shared/ui/BaseLoader.vue'

const useRates = useCurrencyStore()

const { isLoading, error, getRates, baseCurrency } = storeToRefs(useRates)

const formattedRates = computed(() => {
  if (!baseCurrency || !getRates) return []
  return formatRates(baseCurrency.value, getRates.value)
})
</script>

<style scoped lang="scss">
.currency-rates {
  padding: 1rem;
  border-radius: 8px;

  h2 {
    margin-bottom: 1rem;
  }

  ul {
    list-style: none;
    padding: 0;
    text-align-last: justify;

    li {
      padding: 0.3rem 0;
      font-weight: bold;
      font-size: 1.5rem;
    }
  }
}
</style>

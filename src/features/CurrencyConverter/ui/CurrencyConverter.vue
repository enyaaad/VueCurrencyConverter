<script setup lang="ts">
import { useCurrencyConverter } from '../model'
import BaseInput from '@shared/ui/BaseInput.vue'
import BaseDropdown from '@shared/ui/BaseDropdown.vue'

const {
  currencies,
  fromCurrency,
  toCurrency,
  fromAmount,
  toAmount,
  errorMessage,
  rateNotFound,
} = useCurrencyConverter()
</script>

<template>
  <div class="converter">
    <div class="row">
      <BaseInput
        v-model.number="fromAmount"
        type="number"
        :disabled="rateNotFound"
        placeholder="Введите сумму"
      />
      <BaseDropdown v-model="fromCurrency" :options="currencies" />
    </div>
    <div class="row">
      <BaseInput
        v-model.number="toAmount"
        type="number"
        :disabled="rateNotFound"
        placeholder="Результат"
      />
      <BaseDropdown v-model="toCurrency" :options="currencies" />
    </div>
    <p v-if="rateNotFound" class="hint error">Курс не найден для выбранной пары валют</p>
    <p v-if="errorMessage" class="hint">{{ errorMessage }}</p>
  </div>
</template>

<style scoped lang="scss">
.converter {
  max-width: 420px;
  margin: 0 auto;
  padding: 2rem;

  .row {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  .hint {
    font-size: 0.875rem;
    color: #666;
  }

  .error {
    color: red;
  }
}
</style>

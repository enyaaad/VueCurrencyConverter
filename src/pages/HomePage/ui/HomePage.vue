<template>
  <div class="home-page">
    <h1>Курсы валют относительно <span>{{getBaseCurr}}</span></h1>
    <CurrencyRates :baseCurrency="getBaseCurr" />
  </div>
</template>

<script lang="ts" setup>
import CurrencyRates from '@widgets/CurrencyRates/ui/CurrencyRates.vue'
import { storeToRefs } from 'pinia'
import { useCurrencyStore } from '@entities/currency/model/useCurrencyStore'

const {getBaseCurr} = storeToRefs(useCurrencyStore())
</script>

<style scoped lang="scss">
.home-page {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  h1 {
    font-size: 3rem;
    font-weight: bold;
    span  {
      font-weight: bold;
      color: hsla(160, 100%, 37%, 1);
    }
  }
}
</style>

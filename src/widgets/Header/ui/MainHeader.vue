<script setup lang="ts">
import { useCurrencyStore } from '@entities/currency/model/useCurrencyStore'
import BaseDropdown from '@shared/ui/BaseDropdown.vue'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'

const useCurrency = useCurrencyStore()
const {baseCurrency, currencies, getCurrencies} = storeToRefs(useCurrency)

const onChangeCurrency = (newCurrency: string) => {
  if (currencies.value.includes(newCurrency)) {
    useCurrency.setBaseCurrency(newCurrency)
    useCurrency.loadRates()
  }
}

onMounted(() => {
  useCurrency.loadRates()
})
</script>

<template>
  <header class="header-container">
    <h1>
      <span>Конвертер</span>
      <span>валют</span>
    </h1>
    <nav>
      <RouterLink class="router-link" exact-active-class="router-exact-active" to="/" >Главная</RouterLink>
      <RouterLink class="router-link" exact-active-class="router-exact-active" to="/convert">Конвертация</RouterLink>
    </nav>
    <div>
      <h2>Основная валюта</h2>
      <BaseDropdown :modelValue="baseCurrency"
                    :options="getCurrencies"
                    @update:modelValue="onChangeCurrency"
                    label="Базовая валюта" />
    </div>
  </header>
</template>

<style scoped lang="scss">
.header-container {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;

  h1 {
    display: flex;
    flex-direction: column;
    line-height: 0.9;

    span {
      font-weight: bold;
    }


    & > :nth-child(2) {
      color: hsla(157, 100%, 48%, 0.4);
    }
  }

  nav {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 2rem;
    align-items: center;
    letter-spacing: 1.5px;

    .router-link {
      font-weight: bold;
    }

    .router-exact-active {
      color: hsla(157, 100%, 48%, 0.6);
      font-weight: bold;
    }
  }

  div {
    width: 300px;
    letter-spacing: 1.5px;
    font-weight: bold;
    display: flex;

    h2 {
      display: flex;
      align-items: center;
      font-weight: bold;
      text-align: center;
      line-height: 0.9;
      font-size: 1em;
    }
  }
}
</style>

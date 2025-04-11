import { defineStore } from 'pinia'
import { fetchCurrencyRates } from '@entities/currency/lib/fetchCurrencyRates'
import type { CurrencyRatesList } from '@entities/currency/types'
import { formatCurrency } from '@shared/lib/helpers'

export const SUPPORTED_CURRENCIES: CurrencyRatesList[] = []

export type Currency = (typeof SUPPORTED_CURRENCIES)[number]

export const useCurrencyStore = defineStore('currencyStore', {
  state: () => ({
    baseCurrency: localStorage.getItem('baseCurrency') ?? "RUB",
    rates: {
      USD: 0,
      EUR: 0,
      RUB: 0,
    } as Record<Currency, number>,
    currencies: [] as Currency[],
    isLoading: false,
    error: null as string | null,
  }),
  getters: {
    getRates: (store): Record<Currency, number> => store.rates,
    getBaseCurr: (store): string => store.baseCurrency,
    getCurrencies: (store): Currency[] => store.currencies,
    loadingState: (store): boolean => store.isLoading,
  },
  actions: {
    async setBaseCurrency(newCurrency: Currency) {
      this.baseCurrency = newCurrency

      localStorage.setItem('baseCurrency', this.baseCurrency)

      await this.loadRates()
    },

    async loadRates() {
      this.isLoading = true
      this.error = null
      try {
        const data = await fetchCurrencyRates(this.baseCurrency)
        this.rates = { ...data, [this.baseCurrency]: 1 }

        if (this.currencies.length > 0) return

        this.currencies = formatCurrency(this.rates)

      } catch (e) {
        this.error = 'Не удалось загрузить курсы валют'
        console.error(e)
      } finally {
        this.isLoading = false
      }
    },
  },
})

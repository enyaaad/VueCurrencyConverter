import { ref, computed } from 'vue'
import { useCurrencyStore } from '@entities/currency/model/useCurrencyStore'
import { storeToRefs } from 'pinia'
import type { Currency } from '@entities/currency/types'

export function useCurrencyConverter() {
  const currencyStore = useCurrencyStore()
  const { currencies, rates } = storeToRefs(currencyStore)

  const fromCurrency = ref<Currency>('RUB')
  const toCurrency = ref<Currency>('USD')
  const baseAmount = ref<number>(1)
  const isReversed = ref(false)
  const errorMessage = ref('')

  const debounce = <T extends (...args: any[]) => void>(fn: T, delay = 100) => {
    let timeout: ReturnType<typeof setTimeout>
    return (...args: Parameters<T>) => {
      clearTimeout(timeout)
      timeout = setTimeout(() => fn(...args), delay)
    }
  }

  const validateAmount = (value: number) => {
    if (value < 0) {
      errorMessage.value = 'Введите положительное число'
      return false
    }
    errorMessage.value = ''
    return true
  }

  const getRate = (from: Currency, to: Currency): number => {
    if (from === to) return 1
    const key = `${from.toLowerCase()}-${to.toLowerCase()}`
    return rates.value?.[key] ?? 0
  }

  const setAmountDebounced = debounce((value: number, reverse: boolean) => {
    if (!validateAmount(value)) return
    isReversed.value = reverse
    baseAmount.value = value
  }, 300)

  const fromAmount = computed<number>({
    get() {
      if (isReversed.value) {
        const rate = getRate(toCurrency.value, fromCurrency.value)
        return parseFloat((baseAmount.value * rate).toFixed(2))
      }
      return baseAmount.value
    },
    set(value: number) {
      setAmountDebounced(value, false)
    },
  })

  const toAmount = computed<number>({
    get() {
      if (!isReversed.value) {
        const rate = getRate(fromCurrency.value, toCurrency.value)
        return parseFloat((baseAmount.value * rate).toFixed(2))
      }
      return baseAmount.value
    },
    set(value: number) {
      setAmountDebounced(value, true)
    },
  })

  const rateNotFound = computed(() => {
    const rate = getRate(fromCurrency.value, toCurrency.value)
    return rate === 0
  })

  return {
    currencies,
    fromCurrency,
    toCurrency,
    fromAmount,
    toAmount,
    errorMessage,
    rateNotFound,
  }
}

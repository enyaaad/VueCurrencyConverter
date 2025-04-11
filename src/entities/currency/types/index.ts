import type { Currency } from '@entities/currency/model/useCurrencyStore.ts'

export interface CurrencyResponse {
  rates: Record<Currency, number>
}

export interface CurrencyRatesList {
  USD: number;
  EUR: number;
  RUB: number;
  BRL: number;
  KZT: number;
  IDR: number;
}

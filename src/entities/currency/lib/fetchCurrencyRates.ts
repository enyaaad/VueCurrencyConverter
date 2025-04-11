import type { Currency } from '@entities/currency/model/useCurrencyStore.ts'
import { fetchClient } from '@shared/api/BaseApi/fetchClient'
import { CurrencyResponse } from '@entities/currency/types'

export const fetchCurrencyRates = async (base: Currency): Promise<Record<Currency, number>> => {
  return await fetchClient.get<CurrencyResponse>('/currency', { base })
}

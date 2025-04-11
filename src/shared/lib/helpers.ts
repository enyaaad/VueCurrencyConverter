import { Currency } from '@entities/currency/model/useCurrencyStore'

export const formatRates = (baseCurrency: string, rates: Record<string, number>) => {
  if (!rates) return []

  return Object.entries(rates)
    .filter(([key]) => key.endsWith(`-${baseCurrency.toLowerCase()}`))
    .map(([key, value]) => {
      const [from, to] = key.toUpperCase().split('-')

      const formattedValue =
        value >= 1 ? value.toFixed(2) : value >= 0.01 ? value.toFixed(4) : value.toPrecision(2)

      return `1 ${from} = ${formattedValue} ${to}`
    })
}

export const formatCurrency = (rates: Currency[]) => {
  const currencySet = new Set<string>()

  Object.keys(rates).forEach((pair) => {
    const [from, to] = pair.toUpperCase().split('-')
    if (from) currencySet.add(from)
    if (to) currencySet.add(to)
  })

  return Array.from(currencySet).sort() as Currency[]
}

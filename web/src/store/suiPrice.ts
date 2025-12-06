import axios from 'axios'

export interface SuiPrice {
  sui: number
  lastUpdated: string
}

const COINGECKO_API = 'https://api.coingecko.com/api/v3'

let cachedPrice: SuiPrice | null = null
let cacheTime = 0
const CACHE_DURATION = 60000

export const fetchSuiPrice = async (): Promise<SuiPrice> => {
  const now = Date.now()

  if (cachedPrice && now - cacheTime < CACHE_DURATION) {
    return cachedPrice
  }

  try {
    const response = await axios.get(
      `${COINGECKO_API}/simple/price?ids=sui&vs_currencies=usd`
    )
    const price = response.data.sui.usd

    cachedPrice = {
      sui: price,
      lastUpdated: new Date().toISOString(),
    }
    cacheTime = now

    return cachedPrice
  } catch (error) {
    console.error('Error fetching SUI price:', error)
    if (cachedPrice) {
      return cachedPrice
    }
    throw new Error('Failed to fetch SUI price')
  }
}

export const convertSuiToUsd = (suiAmount: number, suiPrice: number): number => {
  return suiAmount * suiPrice
}

export const convertUsdToSui = (usdAmount: number, suiPrice: number): number => {
  return usdAmount / suiPrice
}

export const formatCurrency = (amount: number, currency: 'USD' | 'SUI'): string => {
  if (currency === 'USD') {
    return `$${amount.toFixed(2)}`
  }
  return `${amount.toFixed(4)} SUI`
}

export const formatUsdValue = (amount: number): string => {
  if (amount >= 1000000) {
    return `$${(amount / 1000000).toFixed(2)}M`
  }
  if (amount >= 1000) {
    return `$${(amount / 1000).toFixed(2)}K`
  }
  return `$${amount.toFixed(2)}`
}

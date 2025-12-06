import { useState, useEffect } from 'react'
import {
  fetchSuiPrice,
  convertSuiToUsd,
  convertUsdToSui,
  formatCurrency,
} from '../store/suiPrice'

interface PriceConverterProps {
  label: string
  initialAmount?: number
  initialCurrency?: 'USD' | 'SUI'
  onAmountChange?: (suiAmount: number, usdAmount: number) => void
}

export default function PriceConverter({
  label,
  initialAmount = 0,
  initialCurrency = 'USD',
  onAmountChange,
}: PriceConverterProps) {
  const [suiAmount, setSuiAmount] = useState<number>(initialAmount)
  const [usdAmount, setUsdAmount] = useState<number>(initialAmount)
  const [price, setPrice] = useState<number | null>(null)
  const [currency, setCurrency] = useState<'USD' | 'SUI'>(initialCurrency)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadPrice = async () => {
      try {
        const data = await fetchSuiPrice()
        setPrice(data.sui)

        if (initialCurrency === 'USD') {
          const sui = convertUsdToSui(initialAmount, data.sui)
          setSuiAmount(sui)
          setUsdAmount(initialAmount)
        } else {
          const usd = convertSuiToUsd(initialAmount, data.sui)
          setSuiAmount(initialAmount)
          setUsdAmount(usd)
        }
      } catch (err) {
        console.error('Error loading price:', err)
      } finally {
        setLoading(false)
      }
    }

    loadPrice()
  }, [initialAmount, initialCurrency])

  const handleSuiChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sui = parseFloat(e.target.value) || 0
    setSuiAmount(sui)

    if (price) {
      const usd = convertSuiToUsd(sui, price)
      setUsdAmount(usd)
      onAmountChange?.(sui, usd)
    }
  }

  const handleUsdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const usd = parseFloat(e.target.value) || 0
    setUsdAmount(usd)

    if (price) {
      const sui = convertUsdToSui(usd, price)
      setSuiAmount(sui)
      onAmountChange?.(sui, usd)
    }
  }

  if (loading) {
    return (
      <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
        <p className="text-gray-400">⏳ Loading price data...</p>
      </div>
    )
  }

  if (!price) {
    return (
      <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
        <p className="text-red-400">Failed to load price data</p>
      </div>
    )
  }

  return (
    <div className="bg-gray-700 rounded-lg p-4 border border-gray-600 space-y-3">
      <h4 className="font-bold text-white">{label}</h4>
      <p className="text-xs text-gray-400">1 SUI = ${price.toFixed(2)} USD</p>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs text-gray-400 mb-1">USD Amount</label>
          <div className="relative">
            <span className="absolute left-3 top-2 text-gray-400">$</span>
            <input
              type="number"
              value={usdAmount.toFixed(2)}
              onChange={handleUsdChange}
              className="w-full bg-gray-600 border border-gray-500 rounded px-3 py-2 pl-6 text-white text-sm focus:border-cyan-500 focus:outline-none"
              step="0.01"
              min="0"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs text-gray-400 mb-1">SUI Amount</label>
          <div className="relative">
            <span className="absolute right-3 top-2 text-gray-400 text-xs">SUI</span>
            <input
              type="number"
              value={suiAmount.toFixed(4)}
              onChange={handleSuiChange}
              className="w-full bg-gray-600 border border-gray-500 rounded px-3 py-2 pr-10 text-white text-sm focus:border-cyan-500 focus:outline-none"
              step="0.0001"
              min="0"
            />
          </div>
        </div>
      </div>

      <div className="bg-gray-800 rounded p-2 text-center">
        <p className="text-xs text-gray-400">Equivalent Value</p>
        <p className="text-sm font-bold text-cyan-300">
          {formatCurrency(suiAmount, 'SUI')} = {formatCurrency(usdAmount, 'USD')}
        </p>
      </div>
    </div>
  )
}

import { useState, useEffect } from 'react'
import { fetchSuiPrice, formatUsdValue } from '../store/suiPrice'

export default function SuiPriceWidget() {
  const [price, setPrice] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadPrice = async () => {
      try {
        const data = await fetchSuiPrice()
        setPrice(data.sui)
        setError(null)
      } catch (err) {
        setError('Failed to load SUI price')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    loadPrice()
    const interval = setInterval(loadPrice, 30000)

    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-3 text-center">
        <p className="text-gray-400 text-sm">⏳ Loading SUI price...</p>
      </div>
    )
  }

  if (error || !price) {
    return (
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-3 text-center">
        <p className="text-gray-400 text-sm">📊 SUI price unavailable</p>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-r from-cyan-900 to-blue-900 border border-cyan-700 rounded-lg p-3 text-center">
      <p className="text-gray-300 text-xs mb-1">💰 SUI/USD Price</p>
      <p className="text-xl font-bold text-cyan-300">{formatUsdValue(price)}</p>
      <p className="text-gray-400 text-xs mt-1">Real-time via CoinGecko</p>
    </div>
  )
}

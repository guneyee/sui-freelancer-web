import { useState } from 'react'
import PriceConverter from './PriceConverter'
import { useHireStore } from '../store/hireStore'
import { usePayment } from '../hooks/usePayment'
import { useCurrentAccount } from '@mysten/dapp-kit'

interface HireModalProps {
  freelancerId: string
  freelancerName: string
  hourlyRate: number
  onClose: () => void
  onSuccess: () => void
}

export default function HireModal({
  freelancerId,
  freelancerName,
  hourlyRate,
  onClose,
  onSuccess,
}: HireModalProps) {
  const addOffer = useHireStore((state) => state.addOffer)
  const account = useCurrentAccount()
  const { payFreelancer, isLoading, error: paymentError } = usePayment()

  const [formData, setFormData] = useState({
    jobTitle: '',
    budgetUsd: hourlyRate,
    budgetSui: 0,
    duration: '1 week',
    description: '',
    currencyType: 'USD' as 'USD' | 'SUI',
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleBudgetChange = (suiAmount: number, usdAmount: number) => {
    setFormData((prev) => ({
      ...prev,
      budgetUsd: usdAmount,
      budgetSui: suiAmount,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      if (!account) {
        throw new Error('Please connect your wallet first')
      }

      if (!formData.jobTitle || !formData.description) {
        throw new Error('Please fill in job title and description')
      }

      if (formData.budgetSui <= 0) {
        throw new Error('Budget must be greater than 0')
      }

      // Convert freelancer ID to address (format: 0x + padded ID)
      const freelancerAddress = '0x' + freelancerId.padStart(63, '0')

      // Send payment on-chain
      await payFreelancer(
        freelancerAddress,
        formData.budgetSui,
        formData.jobTitle
      )

      // Also add to local store for UI
      addOffer({
        freelancerId,
        freelancerName,
        jobTitle: formData.jobTitle,
        budget: formData.budgetUsd,
        currencyType: formData.currencyType,
        duration: formData.duration,
        description: formData.description,
      })

      console.log('✅ Hire offer sent to', freelancerName)
      onSuccess()
    } catch (err: any) {
      setError(err.message || 'Failed to send hire offer')
      console.error('Error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-lg p-8 max-w-md w-full border border-gray-700 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Hire {freelancerName}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl"
          >
            ✕
          </button>
        </div>

        {!account && (
          <div className="mb-4 p-3 bg-yellow-900 border border-yellow-500 rounded text-yellow-200 text-sm">
            ⚠️ Please connect your wallet to hire freelancers
          </div>
        )}

        {(error || paymentError) && (
          <div className="mb-4 p-3 bg-red-900 border border-red-500 rounded text-red-200 text-sm">
            {error || paymentError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-300 font-semibold mb-2 text-sm">
              Job Title
            </label>
            <input
              type="text"
              value={formData.jobTitle}
              onChange={(e) =>
                setFormData({ ...formData, jobTitle: e.target.value })
              }
              className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white text-sm focus:border-cyan-500 focus:outline-none"
              placeholder="E.g., Build API endpoint"
              required
              disabled={loading || isLoading || !account}
            />
          </div>

          <div>
            <label className="block text-gray-300 font-semibold mb-2 text-sm">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white text-sm focus:border-cyan-500 focus:outline-none h-20"
              placeholder="Describe what you need..."
              required
              disabled={loading || isLoading || !account}
            />
          </div>

          <div>
            <label className="block text-gray-300 font-semibold mb-2 text-sm">
              Budget (SUI)
            </label>
            <PriceConverter
              label="Offer Budget"
              initialAmount={formData.budgetUsd}
              initialCurrency="USD"
              onAmountChange={handleBudgetChange}
            />
          </div>

          <div>
            <label className="block text-gray-300 font-semibold mb-2 text-sm">
              Duration
            </label>
            <select
              value={formData.duration}
              onChange={(e) =>
                setFormData({ ...formData, duration: e.target.value })
              }
              className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white text-sm focus:border-cyan-500 focus:outline-none"
              disabled={loading || isLoading || !account}
            >
              <option>1 day</option>
              <option>3 days</option>
              <option>1 week</option>
              <option>2 weeks</option>
              <option>1 month</option>
              <option>Ongoing</option>
            </select>
          </div>

          <div className="bg-gray-800 rounded p-3 text-sm">
            <p className="text-gray-400">
              💼 Hourly Rate: <span className="text-cyan-300 font-bold">${hourlyRate}/hr</span>
            </p>
            <p className="text-gray-400 text-xs mt-2">
              📊 Total: <span className="text-green-300 font-bold">{formData.budgetSui.toFixed(4)} SUI</span>
            </p>
            <p className="text-gray-500 text-xs mt-1">
              Payment will be sent to freelancer on Sui testnet
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded font-semibold transition-all"
              disabled={loading || isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || isLoading || !account}
              className={`flex-1 px-4 py-2 rounded font-semibold transition-all ${
                loading || isLoading || !account
                  ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
                  : 'bg-cyan-500 hover:bg-cyan-600 text-gray-900 cursor-pointer'
              }`}
            >
              {loading || isLoading ? '⏳ Processing...' : '💳 Send Offer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

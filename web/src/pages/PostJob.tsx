import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PriceConverter from '../components/PriceConverter'
import SuiPriceWidget from '../components/SuiPriceWidget'
import { useJobStore } from '../store/jobStore'

export default function PostJob() {
  const navigate = useNavigate()
  const addJob = useJobStore((state) => state.addJob)
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    budgetUsd: 0,
    budgetSui: 0,
    tierRequired: 'Bronze' as 'Bronze' | 'Silver' | 'Gold' | 'Diamond',
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleBudgetChange = (suiAmount: number, usdAmount: number) => {
    setFormData((prev) => ({
      ...prev,
      budgetSui: suiAmount,
      budgetUsd: usdAmount,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess(false)

    try {
      if (!formData.title || !formData.description || !formData.budgetUsd) {
        throw new Error('Please fill in all fields')
      }

      if (formData.budgetUsd <= 0) {
        throw new Error('Budget must be greater than 0')
      }

      await new Promise(resolve => setTimeout(resolve, 1000))

      addJob({
        title: formData.title,
        description: formData.description,
        budget: formData.budgetUsd,
        tierRequired: formData.tierRequired,
      })

      console.log('✅ Job posted successfully:', formData)
      setSuccess(true)

      setFormData({
        title: '',
        description: '',
        budgetUsd: 0,
        budgetSui: 0,
        tierRequired: 'Bronze',
      })

      setTimeout(() => {
        navigate('/')
      }, 2000)
    } catch (err: any) {
      setError(err.message || 'Failed to post job')
      console.error('Error posting job:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-gray-800 rounded-lg p-8 border border-gray-700 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Post a New Job</h1>
          <p className="text-gray-400">All budgets can be set in USD or SUI with real-time conversion</p>
        </div>

        <SuiPriceWidget />

        {success && (
          <div className="p-4 bg-green-900 border border-green-500 rounded-lg text-green-200">
            ✅ Job posted successfully! Redirecting...
          </div>
        )}

        {error && (
          <div className="p-4 bg-red-900 border border-red-500 rounded-lg text-red-200">
            ❌ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-300 font-semibold mb-2">Job Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-cyan-500 focus:outline-none"
              placeholder="E.g., Build Smart Contract Module"
              required
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-gray-300 font-semibold mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-cyan-500 focus:outline-none h-32"
              placeholder="Describe your job in detail..."
              required
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-gray-300 font-semibold mb-2">Budget with Real-Time Conversion</label>
            <PriceConverter
              label="Job Budget"
              initialAmount={formData.budgetUsd}
              initialCurrency="USD"
              onAmountChange={handleBudgetChange}
            />
          </div>

          <div>
            <label className="block text-gray-300 font-semibold mb-2">Minimum Freelancer Tier</label>
            <select
              value={formData.tierRequired}
              onChange={(e) => setFormData({ ...formData, tierRequired: e.target.value as 'Bronze' | 'Silver' | 'Gold' | 'Diamond' })}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-cyan-500 focus:outline-none"
              disabled={loading}
            >
              <option>Bronze</option>
              <option>Silver</option>
              <option>Gold</option>
              <option>Diamond</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-bold text-lg transition-all ${
              loading
                ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
                : 'bg-cyan-500 hover:bg-cyan-600 text-gray-900 cursor-pointer'
            }`}
          >
            {loading ? '⏳ Posting Job...' : '📝 Post Job'}
          </button>
        </form>
      </div>
    </div>
  )
}

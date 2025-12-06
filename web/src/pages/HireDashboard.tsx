import { useState } from 'react'
import { useHireStore } from '../store/hireStore'
import { usePayment } from '../hooks/usePayment'
import { useCurrentAccount } from '@mysten/dapp-kit'

export default function HireDashboard() {
  const allOffers = useHireStore((state) => state.getAllOffers())
  const updateOfferStatus = useHireStore((state) => state.updateOfferStatus)
  const { payFreelancer, isLoading, error } = usePayment()
  const account = useCurrentAccount()
  const [selectedOffer, setSelectedOffer] = useState<string | null>(null)
  const [paymentSuccess, setPaymentSuccess] = useState<string | null>(null)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-900 text-yellow-200 border-yellow-700'
      case 'accepted':
        return 'bg-green-900 text-green-200 border-green-700'
      case 'rejected':
        return 'bg-red-900 text-red-200 border-red-700'
      case 'completed':
        return 'bg-blue-900 text-blue-200 border-blue-700'
      default:
        return 'bg-gray-700 text-gray-200'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return '⏳'
      case 'accepted':
        return '✅'
      case 'rejected':
        return '❌'
      case 'completed':
        return '🎉'
      default:
        return '📋'
    }
  }

  const handlePayment = async (offer: any) => {
    if (!account) {
      alert('Please connect your wallet first!')
      return
    }

    try {
      // Convert USD to SUI (assuming SUI price API)
      const suiAmount = offer.budget / 1 // Replace with real price conversion
      
      await payFreelancer(
        offer.freelancerAddress || '0x' + 'a'.repeat(64),
        suiAmount,
        `Payment for: ${offer.jobTitle}`
      )
      
      setPaymentSuccess(offer.id)
      updateOfferStatus(offer.id, 'completed')
      setTimeout(() => setPaymentSuccess(null), 3000)
    } catch (err) {
      console.error('Payment error:', err)
    }
  }

  if (allOffers.length === 0) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-800 rounded-lg p-12 border border-gray-700 text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Hire Offers Dashboard</h1>
          <p className="text-gray-400 mb-8">No hire offers yet. Start by browsing freelancers!</p>
          <a
            href="/"
            className="inline-block px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-gray-900 rounded-lg font-semibold transition-all"
          >
            ← Back to Freelancers
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Hire Offers Dashboard</h1>
        <p className="text-gray-400">Track all your freelancer hire offers</p>
      </div>

      <div className="space-y-4">
        {allOffers.map((offer) => (
          <div
            key={offer.id}
            className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-cyan-500 transition-all"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-white">{offer.jobTitle}</h3>
                <p className="text-gray-400">
                  Freelancer: <span className="text-cyan-300 font-semibold">{offer.freelancerName}</span>
                </p>
              </div>
              <div className={`px-4 py-2 rounded-full text-sm font-semibold border ${getStatusColor(offer.status)}`}>
                {getStatusIcon(offer.status)} {offer.status.toUpperCase()}
              </div>
            </div>

            <p className="text-gray-300 mb-4">{offer.description}</p>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-gray-700 rounded p-3">
                <p className="text-gray-400 text-xs mb-1">Budget</p>
                <p className="text-lg font-bold text-green-400">
                  ${offer.budget.toFixed(2)} {offer.currencyType}
                </p>
              </div>
              <div className="bg-gray-700 rounded p-3">
                <p className="text-gray-400 text-xs mb-1">Duration</p>
                <p className="text-lg font-bold text-cyan-300">{offer.duration}</p>
              </div>
              <div className="bg-gray-700 rounded p-3">
                <p className="text-gray-400 text-xs mb-1">Created</p>
                <p className="text-lg font-bold text-gray-200">
                  {new Date(offer.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            {offer.status === 'pending' && (
              <div className="flex gap-3">
                <button
                  onClick={() => updateOfferStatus(offer.id, 'accepted')}
                  className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded font-semibold transition-all"
                >
                  ✅ Mark as Accepted
                </button>
                <button
                  onClick={() => updateOfferStatus(offer.id, 'rejected')}
                  className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded font-semibold transition-all"
                >
                  ❌ Mark as Rejected
                </button>
              </div>
            )}

            {offer.status === 'accepted' && (
              <div className="space-y-3">
                <div className="p-3 bg-green-900 border border-green-700 rounded text-green-200 text-sm">
                  ✅ Freelancer accepted your offer! Ready to pay via Sui Testnet.
                </div>
                <button
                  onClick={() => handlePayment(offer)}
                  disabled={isLoading}
                  className="w-full px-4 py-3 bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-600 text-gray-900 rounded font-semibold transition-all"
                >
                  {isLoading ? '💳 Processing Payment...' : '💳 Pay with Sui Testnet'}
                </button>
                {error && (
                  <div className="p-3 bg-red-900 border border-red-700 rounded text-red-200 text-sm">
                    ❌ Error: {error}
                  </div>
                )}
                {paymentSuccess === offer.id && (
                  <div className="p-3 bg-blue-900 border border-blue-700 rounded text-blue-200 text-sm">
                    🎉 Payment sent successfully! Transaction processing...
                  </div>
                )}
              </div>
            )}

            {offer.status === 'completed' && (
              <div className="p-3 bg-blue-900 border border-blue-700 rounded text-blue-200 text-sm">
                🎉 Project completed! Leave feedback for this freelancer.
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

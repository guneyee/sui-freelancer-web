import TierBadge from './TierBadge'

interface JobListingProps {
  id: string
  title: string
  description: string
  budget: number
  tierRequired: 'Diamond' | 'Gold' | 'Silver'
  status: 'Open' | 'In Progress' | 'Completed'
}

export default function JobListing({
  id,
  title,
  description,
  budget,
  tierRequired,
  status,
}: JobListingProps) {
  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-cyan-500 transition-all">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-xl font-bold text-white">{title}</h3>
          <p className="text-gray-400 text-sm mt-1">{description}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
          status === 'Open' ? 'bg-green-500' : 
          status === 'In Progress' ? 'bg-blue-500' : 
          'bg-gray-500'
        }`}>
          {status}
        </span>
      </div>

      <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-700">
        <div className="flex gap-4">
          <div>
            <span className="text-gray-400 text-sm">Budget:</span>
            <p className="text-green-400 font-semibold">${budget}</p>
          </div>
          <div>
            <span className="text-gray-400 text-sm">Min Tier:</span>
            <TierBadge tier={tierRequired} />
          </div>
        </div>
        <button className="bg-cyan-500 hover:bg-cyan-600 text-gray-900 px-4 py-2 rounded-lg font-semibold transition-all">
          View Details
        </button>
      </div>
    </div>
  )
}

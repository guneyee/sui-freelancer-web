interface TierBadgeProps {
  tier: 'Bronze' | 'Silver' | 'Gold' | 'Diamond'
}

const tierColors = {
  Diamond: 'bg-cyan-500 text-gray-900',
  Gold: 'bg-yellow-400 text-gray-900',
  Silver: 'bg-gray-300 text-gray-900',
  Bronze: 'bg-orange-600 text-white',
}

export default function TierBadge({ tier }: TierBadgeProps) {
  return (
    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${tierColors[tier]}`}>
      {tier}
    </span>
  )
}

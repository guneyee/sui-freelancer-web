import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import TierBadge from './TierBadge'
import { fetchSuiPrice, convertUsdToSui } from '../store/suiPrice'

interface FreelancerCardProps {
  id: string
  name: string
  title: string
  tier: 'Bronze' | 'Silver' | 'Gold' | 'Diamond'
  rating: number
  completedProjects: number
  hourlyRate: number
  skills: string[]
}

export default function FreelancerCard({
  id,
  name,
  title,
  tier,
  rating,
  completedProjects,
  hourlyRate,
  skills,
}: FreelancerCardProps) {
  const [suiRate, setSuiRate] = useState<number>(0)
  const [suiPrice, setSuiPrice] = useState<number | null>(null)

  useEffect(() => {
    const loadPrice = async () => {
      try {
        const data = await fetchSuiPrice()
        setSuiPrice(data.sui)
        const sui = convertUsdToSui(hourlyRate, data.sui)
        setSuiRate(sui)
      } catch (err) {
        console.error('Error loading SUI price:', err)
      }
    }

    loadPrice()
  }, [hourlyRate])

  return (
    <Link to={`/freelancer/${id}`}>
      <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-all cursor-pointer border border-gray-700 hover:border-cyan-500">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-white">{name}</h3>
            <p className="text-gray-400">{title}</p>
          </div>
          <TierBadge tier={tier} />
        </div>

        <div className="flex gap-4 mb-4 text-sm">
          <div>
            <span className="text-gray-400">Rating:</span>
            <p className="text-yellow-400 font-semibold">{rating}/5 ⭐</p>
          </div>
          <div>
            <span className="text-gray-400">Projects:</span>
            <p className="text-white font-semibold">{completedProjects}</p>
          </div>
          <div>
            <span className="text-gray-400">Rate:</span>
            <p className="text-green-400 font-semibold">${hourlyRate}/hr</p>
          </div>
        </div>

        {suiPrice && suiRate > 0 && (
          <div className="bg-gray-700 rounded p-2 mb-4 text-xs">
            <p className="text-gray-400">SUI Rate: <span className="text-cyan-300 font-bold">{suiRate.toFixed(4)} SUI/hr</span></p>
            <p className="text-gray-500 text-xs">@ ${suiPrice.toFixed(2)}/SUI</p>
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          {skills.slice(0, 3).map((skill) => (
            <span key={skill} className="px-2 py-1 bg-gray-700 text-gray-200 text-xs rounded">
              {skill}
            </span>
          ))}
          {skills.length > 3 && (
            <span className="px-2 py-1 bg-gray-700 text-gray-200 text-xs rounded">
              +{skills.length - 3}
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}

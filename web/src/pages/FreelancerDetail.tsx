import { useState } from 'react'
import { useParams } from 'react-router-dom'
import TierBadge from '../components/TierBadge'
import HireModal from '../components/HireModal'

const freelancersData: Record<
  string,
  {
    name: string
    title: string
    tier: 'Bronze' | 'Silver' | 'Gold' | 'Diamond'
    rating: number
    completedProjects: number
    hourlyRate: number
    skills: string[]
    bio: string
    portfolio: string[]
  }
> = {
  '1': {
    name: 'Alice Developer',
    title: 'Full Stack Engineer',
    tier: 'Diamond',
    rating: 4.9,
    completedProjects: 150,
    hourlyRate: 85,
    skills: ['React', 'Node.js', 'Web3', 'TypeScript', 'Solidity', 'Smart Contracts'],
    bio: 'Experienced full-stack developer with 8+ years in blockchain and web development. Specializing in Sui ecosystem projects.',
    portfolio: [
      'Sui DEX Protocol',
      'NFT Marketplace',
      'Staking Dashboard',
      'Payment Gateway',
    ],
  },
  '2': {
    name: 'Bob Designer',
    title: 'UI/UX Designer',
    tier: 'Gold',
    rating: 4.7,
    completedProjects: 92,
    hourlyRate: 65,
    skills: ['Figma', 'UI Design', 'UX Research', 'Prototyping', 'Web Design'],
    bio: 'Creative designer focused on creating beautiful and intuitive interfaces for crypto platforms.',
    portfolio: ['Wallet UI', 'Trading Dashboard', 'Mobile App', 'Design System'],
  },
  '3': {
    name: 'Charlie ML',
    title: 'Machine Learning Engineer',
    tier: 'Silver',
    rating: 4.5,
    completedProjects: 45,
    hourlyRate: 55,
    skills: ['Python', 'TensorFlow', 'Data Science', 'Analytics', 'ML Models'],
    bio: 'ML engineer with experience in predictive analytics and data-driven solutions for blockchain.',
    portfolio: ['Price Predictor', 'Anomaly Detection', 'Analytics Engine'],
  },
}

export default function FreelancerDetail() {
  const { id } = useParams<{ id: string }>()
  const [showHireModal, setShowHireModal] = useState(false)
  const [hireSuccess, setHireSuccess] = useState(false)

  const freelancer = id ? freelancersData[id] : null

  if (!freelancer) {
    return (
      <div className="text-center py-12">
        <h1 className="text-3xl font-bold text-white mb-4">Freelancer Not Found</h1>
        <p className="text-gray-400">The freelancer profile you're looking for doesn't exist.</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      {hireSuccess && (
        <div className="mb-6 p-4 bg-green-900 border border-green-500 rounded-lg text-green-200">
          ✅ Hire offer sent successfully! The freelancer will review your request.
        </div>
      )}

      <div className="bg-gray-800 rounded-lg p-8 border border-gray-700 mb-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">{freelancer.name}</h1>
            <p className="text-xl text-gray-400">{freelancer.title}</p>
          </div>
          <TierBadge tier={freelancer.tier} />
        </div>

        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-700 rounded p-4 text-center">
            <p className="text-gray-400 text-sm">Rating</p>
            <p className="text-2xl font-bold text-yellow-400">{freelancer.rating}/5</p>
            <p className="text-gray-500 text-xs">⭐ {freelancer.completedProjects} projects</p>
          </div>
          <div className="bg-gray-700 rounded p-4 text-center">
            <p className="text-gray-400 text-sm">Hourly Rate</p>
            <p className="text-2xl font-bold text-green-400">${freelancer.hourlyRate}</p>
            <p className="text-gray-500 text-xs">per hour</p>
          </div>
          <div className="bg-gray-700 rounded p-4 text-center">
            <p className="text-gray-400 text-sm">Completed</p>
            <p className="text-2xl font-bold text-cyan-400">{freelancer.completedProjects}</p>
            <p className="text-gray-500 text-xs">projects</p>
          </div>
          <div className="bg-gray-700 rounded p-4 text-center">
            <p className="text-gray-400 text-sm">Tier Level</p>
            <p className="text-2xl font-bold text-purple-400">{freelancer.tier}</p>
            <p className="text-gray-500 text-xs">verified</p>
          </div>
        </div>

        <button
          onClick={() => setShowHireModal(true)}
          className="w-full bg-cyan-500 hover:bg-cyan-600 text-gray-900 py-3 rounded-lg font-bold text-lg transition-all cursor-pointer"
        >
          🎯 Hire {freelancer.name.split(' ')[0]}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h2 className="text-2xl font-bold text-white mb-4">About</h2>
          <p className="text-gray-300 leading-relaxed mb-6">{freelancer.bio}</p>

          <h3 className="text-lg font-bold text-white mb-3">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {freelancer.skills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 bg-cyan-500 bg-opacity-20 text-cyan-300 rounded-full text-sm font-semibold"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h2 className="text-2xl font-bold text-white mb-4">Portfolio</h2>
          <div className="space-y-3">
            {freelancer.portfolio.map((project, idx) => (
              <div
                key={idx}
                className="bg-gray-700 rounded p-4 hover:bg-gray-600 transition-all cursor-pointer"
              >
                <p className="text-white font-semibold">{project}</p>
                <p className="text-gray-400 text-sm">View on blockchain →</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showHireModal && (
        <HireModal
          freelancerId={id!}
          freelancerName={freelancer.name}
          hourlyRate={freelancer.hourlyRate}
          onClose={() => {
            setShowHireModal(false)
            setHireSuccess(false)
          }}
          onSuccess={() => {
            setShowHireModal(false)
            setHireSuccess(true)
            setTimeout(() => setHireSuccess(false), 5000)
          }}
        />
      )}
    </div>
  )
}

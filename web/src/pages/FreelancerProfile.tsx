import { useParams } from 'react-router-dom'
import TierBadge from '../components/TierBadge'

export default function FreelancerProfile() {
  const { id } = useParams()

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Alice Developer</h1>
            <p className="text-gray-400 text-lg">Full Stack Engineer</p>
          </div>
          <TierBadge tier="Diamond" />
        </div>

        <div className="grid grid-cols-4 gap-4 mb-8 py-6 border-y border-gray-700">
          <div className="text-center">
            <p className="text-gray-400 text-sm">Rating</p>
            <p className="text-2xl font-bold text-yellow-400">4.9/5 ⭐</p>
          </div>
          <div className="text-center">
            <p className="text-gray-400 text-sm">Projects</p>
            <p className="text-2xl font-bold text-white">150</p>
          </div>
          <div className="text-center">
            <p className="text-gray-400 text-sm">Success Rate</p>
            <p className="text-2xl font-bold text-green-400">98%</p>
          </div>
          <div className="text-center">
            <p className="text-gray-400 text-sm">Hourly Rate</p>
            <p className="text-2xl font-bold text-cyan-400">$85</p>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-bold text-white mb-3">About</h3>
          <p className="text-gray-300">
            Experienced full-stack developer with 10+ years in web development. 
            Specialized in React, Node.js, and blockchain development. Passionate about building scalable applications.
          </p>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-bold text-white mb-3">Skills</h3>
          <div className="flex flex-wrap gap-3">
            {['React', 'Node.js', 'Web3', 'TypeScript', 'Solidity', 'PostgreSQL'].map((skill) => (
              <span key={skill} className="px-4 py-2 bg-gray-700 text-gray-200 rounded-lg">
                {skill}
              </span>
            ))}
          </div>
        </div>

        <button className="w-full bg-cyan-500 hover:bg-cyan-600 text-gray-900 py-3 rounded-lg font-bold text-lg transition-all">
          Hire Freelancer
        </button>
      </div>
    </div>
  )
}

import { useState } from 'react'
import { fetchGitHubProfile, formatIPAScore, getTierColor } from '../store/gitHubIPA'
import TierBadge from './TierBadge'

export default function GitHubIPAChecker() {
  const [username, setUsername] = useState('')
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!username.trim()) return

    setLoading(true)
    setError('')
    setProfile(null)

    try {
      const result = await fetchGitHubProfile(username)
      setProfile(result)
    } catch (err: any) {
      setError(err.message || 'Failed to fetch profile')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <h3 className="text-2xl font-bold text-white mb-4">🔍 GitHub IPA Checker</h3>

      <form onSubmit={handleCheck} className="mb-6 flex gap-2">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter GitHub username..."
          className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-cyan-500 focus:outline-none"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-600 text-gray-900 px-6 py-2 rounded-lg font-bold transition-all"
        >
          {loading ? 'Checking...' : 'Check'}
        </button>
      </form>

      {error && (
        <div className="p-4 bg-red-900 border border-red-500 rounded-lg text-red-200 mb-4">
          ❌ {error}
        </div>
      )}

      {profile && (
        <div className="space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="text-xl font-bold text-white">{profile.name}</h4>
              <p className="text-gray-400">@{profile.username}</p>
            </div>
            <TierBadge tier={profile.tier} />
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="bg-gray-700 rounded p-3">
              <p className="text-gray-400">Followers</p>
              <p className="text-xl font-bold text-white">{profile.followers}</p>
            </div>
            <div className="bg-gray-700 rounded p-3">
              <p className="text-gray-400">Public Repos</p>
              <p className="text-xl font-bold text-white">{profile.public_repos}</p>
            </div>
            <div className="bg-gray-700 rounded p-3">
              <p className="text-gray-400">Stars</p>
              <p className="text-xl font-bold text-white">{profile.total_contributions}</p>
            </div>
            <div className="bg-gray-700 rounded p-3">
              <p className="text-gray-400">IPA Score</p>
              <p
                className="text-xl font-bold"
                style={{ color: getTierColor(profile.tier) }}
              >
                {formatIPAScore(profile.ipaScore)}
              </p>
            </div>
          </div>

          <div className="bg-gray-700 rounded p-4 space-y-2">
            <h5 className="font-bold text-white mb-3">📊 Score Breakdown</h5>
            
            <div className="space-y-2">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">Contribution (35%)</span>
                  <span className="text-cyan-400 font-bold">{Math.round(profile.scoreBreakdown.contributionScore)}</span>
                </div>
                <div className="w-full bg-gray-600 rounded-full h-2">
                  <div
                    className="bg-cyan-500 h-2 rounded-full"
                    style={{ width: `${profile.scoreBreakdown.contributionScore}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">Repo Quality (30%)</span>
                  <span className="text-blue-400 font-bold">{Math.round(profile.scoreBreakdown.repoQualityScore)}</span>
                </div>
                <div className="w-full bg-gray-600 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${profile.scoreBreakdown.repoQualityScore}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">Community (20%)</span>
                  <span className="text-purple-400 font-bold">{Math.round(profile.scoreBreakdown.communityScore)}</span>
                </div>
                <div className="w-full bg-gray-600 rounded-full h-2">
                  <div
                    className="bg-purple-500 h-2 rounded-full"
                    style={{ width: `${profile.scoreBreakdown.communityScore}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">Consistency (15%)</span>
                  <span className="text-green-400 font-bold">{Math.round(profile.scoreBreakdown.consistencyScore)}</span>
                </div>
                <div className="w-full bg-gray-600 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: `${profile.scoreBreakdown.consistencyScore}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-cyan-900 to-blue-900 rounded p-4">
            <p className="text-sm text-gray-300">
              ✨ <strong>{profile.name}</strong> qualifies as a <strong>{profile.tier}</strong> tier freelancer
              with an IPA score of <strong>{profile.ipaScore}/100</strong>!
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

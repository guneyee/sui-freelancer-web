import axios from 'axios'

export interface GitHubProfile {
  username: string
  name: string
  followers: number
  public_repos: number
  total_contributions: number
  ipaScore: number
  tier: 'Bronze' | 'Silver' | 'Gold' | 'Diamond'
  scoreBreakdown: {
    contributionScore: number
    repoQualityScore: number
    communityScore: number
    consistencyScore: number
  }
}

interface GitHubUser {
  login: string
  name: string
  followers: number
  public_repos: number
  created_at: string
  bio: string
  location: string
}

const GITHUB_API = 'https://api.github.com'

export const fetchGitHubProfile = async (
  username: string
): Promise<GitHubProfile> => {
  try {
    const userResponse = await axios.get(`${GITHUB_API}/users/${username}`)
    const userData: GitHubUser = userResponse.data

    const reposData = await fetchReposData(username)
    const contributionsData = await fetchGitHubContributions(username)

    const scoreBreakdown = calculateDetailedScores(
      userData,
      reposData,
      contributionsData
    )

    const ipaScore = Math.round(
      scoreBreakdown.contributionScore * 0.35 +
      scoreBreakdown.repoQualityScore * 0.30 +
      scoreBreakdown.communityScore * 0.20 +
      scoreBreakdown.consistencyScore * 0.15
    )

    const tier = getTierFromScore(ipaScore)

    return {
      username: userData.login,
      name: userData.name || userData.login,
      followers: userData.followers,
      public_repos: userData.public_repos,
      total_contributions: contributionsData.totalContributions,
      ipaScore,
      tier,
      scoreBreakdown,
    }
  } catch (error) {
    console.error('Error fetching GitHub profile:', error)
    throw new Error('Failed to fetch GitHub profile')
  }
}

const fetchReposData = async (username: string) => {
  try {
    const response = await axios.get(`${GITHUB_API}/users/${username}/repos`, {
      params: {
        per_page: 100,
        sort: 'stars',
        direction: 'desc',
      },
    })

    const repos = response.data
    
    return {
      totalRepos: repos.length,
      starredRepos: repos.filter((r: any) => r.stargazers_count > 0).length,
      totalStars: repos.reduce((sum: number, r: any) => sum + (r.stargazers_count || 0), 0),
      forkedRepos: repos.filter((r: any) => r.fork).length,
      avgStarsPerRepo: repos.length > 0 
        ? repos.reduce((sum: number, r: any) => sum + (r.stargazers_count || 0), 0) / repos.length
        : 0,
    }
  } catch (error) {
    console.error('Error fetching repos:', error)
    return {
      totalRepos: 0,
      starredRepos: 0,
      totalStars: 0,
      forkedRepos: 0,
      avgStarsPerRepo: 0,
    }
  }
}

const fetchGitHubContributions = async (username: string) => {
  try {
    const response = await axios.get(`${GITHUB_API}/users/${username}/repos`, {
      params: {
        per_page: 100,
        sort: 'updated',
      },
    })

    const repos = response.data
    const totalContributions = repos.reduce(
      (sum: number, repo: any) => sum + (repo.stargazers_count || 0),
      0
    )

    return { totalContributions }
  } catch (error) {
    console.error('Error fetching contributions:', error)
    return { totalContributions: 0 }
  }
}

const calculateDetailedScores = (userData: GitHubUser, reposData: any, contributionsData: any) => {
  const followerContribution = Math.min((userData.followers / 500) * 100, 100)
  const repoContribution = Math.min((userData.public_repos / 20) * 100, 100)
  const activityContribution = Math.min((contributionsData.totalContributions / 10000) * 100, 100)
  const contributionScore = Math.round(
    followerContribution * 0.4 + repoContribution * 0.3 + activityContribution * 0.3
  )

  const starsScore = Math.min((reposData.totalStars / 500) * 100, 100)
  const avgStarsScore = Math.min((reposData.avgStarsPerRepo / 50) * 100, 100)
  const starredRatio = reposData.totalRepos > 0 
    ? (reposData.starredRepos / reposData.totalRepos) * 100
    : 0
  const repoQualityScore = Math.round(
    starsScore * 0.4 + avgStarsScore * 0.3 + starredRatio * 0.3
  )

  const followerScore = Math.min((userData.followers / 1000) * 100, 100)
  const repoScore = Math.min((userData.public_repos / 50) * 100, 100)
  const communityScore = Math.round(followerScore * 0.6 + repoScore * 0.4)

  const forkRatio = reposData.totalRepos > 0 
    ? ((reposData.totalRepos - reposData.forkedRepos) / reposData.totalRepos) * 100
    : 50
  const consistencyScore = Math.round(Math.min(forkRatio, 100))

  return {
    contributionScore: Math.min(contributionScore, 100),
    repoQualityScore: Math.min(repoQualityScore, 100),
    communityScore: Math.min(communityScore, 100),
    consistencyScore: consistencyScore,
  }
}

export const getTierFromScore = (
  score: number
): 'Bronze' | 'Silver' | 'Gold' | 'Diamond' => {
  if (score >= 80) return 'Diamond'
  if (score >= 60) return 'Gold'
  if (score >= 40) return 'Silver'
  return 'Bronze'
}

export const getTierColor = (tier: string): string => {
  switch (tier) {
    case 'Diamond':
      return '#00D9FF'
    case 'Gold':
      return '#FFD700'
    case 'Silver':
      return '#C0C0C0'
    case 'Bronze':
      return '#CD7F32'
    default:
      return '#999'
  }
}

export const getTierBgColor = (tier: string): string => {
  switch (tier) {
    case 'Diamond':
      return '#001F3F'
    case 'Gold':
      return '#3D2817'
    case 'Silver':
      return '#2C2C2C'
    case 'Bronze':
      return '#4A2511'
    default:
      return '#1A1A1A'
  }
}

export const formatIPAScore = (score: number): string => {
  return `${score}/100`
}


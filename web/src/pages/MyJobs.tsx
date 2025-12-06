import JobListing from '../components/JobListing'

export default function MyJobs() {
  const myJobs = [
    {
      id: '1',
      title: 'Build Smart Contract Module',
      description: 'Need Sui Move expert to build marketplace module',
      budget: 5000,
      tierRequired: 'Diamond' as const,
      status: 'In Progress' as const,
    },
    {
      id: '2',
      title: 'Frontend Dashboard',
      description: 'Create React dashboard for freelancer metrics',
      budget: 3000,
      tierRequired: 'Gold' as const,
      status: 'Completed' as const,
    },
    {
      id: '3',
      title: 'API Integration',
      description: 'Integrate GitHub API for IPA verification',
      budget: 2500,
      tierRequired: 'Gold' as const,
      status: 'In Progress' as const,
    },
  ]

  return (
    <div>
      <h1 className="text-4xl font-bold text-white mb-8">My Jobs</h1>
      <div className="space-y-4">
        {myJobs.map((job) => (
          <JobListing key={job.id} {...job} />
        ))}
      </div>
    </div>
  )
}

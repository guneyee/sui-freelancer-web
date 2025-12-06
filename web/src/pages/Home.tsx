import FreelancerCard from '../components/FreelancerCard'
import JobListing from '../components/JobListing'
import GitHubIPAChecker from '../components/GitHubIPAChecker'
import SuiPriceWidget from '../components/SuiPriceWidget'
import { useJobStore } from '../store/jobStore'

export default function Home() {
  const jobs = useJobStore((state) => state.getJobs())

  const freelancers = [
    {
      id: '1',
      name: 'Alice Developer',
      title: 'Full Stack Engineer',
      tier: 'Diamond' as const,
      rating: 4.9,
      completedProjects: 150,
      hourlyRate: 85,
      skills: ['React', 'Node.js', 'Web3', 'TypeScript'],
    },
    {
      id: '2',
      name: 'Bob Designer',
      title: 'UI/UX Designer',
      tier: 'Gold' as const,
      rating: 4.7,
      completedProjects: 92,
      hourlyRate: 65,
      skills: ['Figma', 'UI Design', 'Prototyping'],
    },
    {
      id: '3',
      name: 'Charlie ML',
      title: 'Machine Learning Engineer',
      tier: 'Silver' as const,
      rating: 4.5,
      completedProjects: 45,
      hourlyRate: 55,
      skills: ['Python', 'TensorFlow', 'Data Science'],
    },
  ]

  return (
    <div className="space-y-12">
      <section className="text-center py-12">
        <h1 className="text-5xl font-bold text-white mb-4">
          Sui Freelancer Marketplace
        </h1>
        <p className="text-xl text-gray-400">
          Connect with verified freelancers powered by GitHub IPA
        </p>
      </section>

      <section className="max-w-sm mx-auto">
        <SuiPriceWidget />
      </section>

      <section>
        <GitHubIPAChecker />
      </section>

      <section>
        <h2 className="text-3xl font-bold text-white mb-6">Top Freelancers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {freelancers.map((freelancer) => (
            <FreelancerCard key={freelancer.id} {...freelancer} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-white mb-6">
          Available Jobs ({jobs.length})
        </h2>
        <div className="space-y-4">
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <JobListing
                key={job.id}
                id={job.id}
                title={job.title}
                description={job.description}
                budget={job.budget}
                tierRequired={job.tierRequired}
                status={job.status}
              />
            ))
          ) : (
            <div className="text-center py-8 text-gray-400">
              No jobs available yet
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

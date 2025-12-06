import { create } from 'zustand'

export interface Job {
  id: string
  title: string
  description: string
  budget: number
  tierRequired: 'Bronze' | 'Silver' | 'Gold' | 'Diamond'
  status: 'Open' | 'In Progress' | 'Completed'
  createdAt: string
  clientAddress?: string
}

interface JobStore {
  jobs: Job[]
  addJob: (job: Omit<Job, 'id' | 'createdAt' | 'status'>) => void
  getJobs: () => Job[]
  getJobById: (id: string) => Job | undefined
  updateJobStatus: (id: string, status: Job['status']) => void
}

export const useJobStore = create<JobStore>((set, get) => ({
  jobs: [
    {
      id: '1',
      title: 'Build Smart Contract Module',
      description: 'Need Sui Move expert to build marketplace module',
      budget: 5000,
      tierRequired: 'Diamond',
      status: 'Open',
      createdAt: new Date().toISOString(),
    },
    {
      id: '2',
      title: 'Frontend Dashboard',
      description: 'Create React dashboard for freelancer metrics',
      budget: 3000,
      tierRequired: 'Gold',
      status: 'Open',
      createdAt: new Date().toISOString(),
    },
    {
      id: '3',
      title: 'Data Analysis',
      description: 'Analyze user behavior and create reports',
      budget: 2000,
      tierRequired: 'Silver',
      status: 'Open',
      createdAt: new Date().toISOString(),
    },
  ],

  addJob: (job) =>
    set((state) => ({
      jobs: [
        {
          ...job,
          id: Date.now().toString(),
          status: 'Open' as const,
          createdAt: new Date().toISOString(),
        },
        ...state.jobs,
      ],
    })),

  getJobs: () => get().jobs,

  getJobById: (id: string) => get().jobs.find((job) => job.id === id),

  updateJobStatus: (id: string, status: Job['status']) =>
    set((state) => ({
      jobs: state.jobs.map((job) =>
        job.id === id ? { ...job, status } : job
      ),
    })),
}))

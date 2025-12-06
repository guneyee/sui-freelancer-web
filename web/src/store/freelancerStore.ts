import { create } from 'zustand'

interface Freelancer {
  id: string
  name: string
  githubUsername: string
  tier: 'Diamond' | 'Gold' | 'Silver'
  rating: number
  ipaScore: number
}

interface FreelancerStore {
  freelancers: Freelancer[]
  addFreelancer: (freelancer: Freelancer) => void
  updateFreelancer: (id: string, updates: Partial<Freelancer>) => void
}

export const useFreelancerStore = create<FreelancerStore>((set) => ({
  freelancers: [],
  addFreelancer: (freelancer) =>
    set((state) => ({
      freelancers: [...state.freelancers, freelancer],
    })),
  updateFreelancer: (id, updates) =>
    set((state) => ({
      freelancers: state.freelancers.map((f) =>
        f.id === id ? { ...f, ...updates } : f
      ),
    })),
}))

import { create } from 'zustand'

export interface HireOffer {
  id: string
  freelancerId: string
  freelancerName: string
  jobTitle: string
  budget: number
  currencyType: 'USD' | 'SUI'
  duration: string
  description: string
  status: 'pending' | 'accepted' | 'rejected' | 'completed'
  createdAt: string
}

interface HireStore {
  offers: HireOffer[]
  addOffer: (offer: Omit<HireOffer, 'id' | 'createdAt' | 'status'>) => void
  updateOfferStatus: (id: string, status: HireOffer['status']) => void
  getOffersByFreelancer: (freelancerId: string) => HireOffer[]
  getAllOffers: () => HireOffer[]
}

export const useHireStore = create<HireStore>((set, get) => ({
  offers: [],

  addOffer: (offer) =>
    set((state) => ({
      offers: [
        ...state.offers,
        {
          ...offer,
          id: Date.now().toString(),
          status: 'pending',
          createdAt: new Date().toISOString(),
        },
      ],
    })),

  updateOfferStatus: (id, status) =>
    set((state) => ({
      offers: state.offers.map((offer) =>
        offer.id === id ? { ...offer, status } : offer
      ),
    })),

  getOffersByFreelancer: (freelancerId) => {
    return get().offers.filter((offer) => offer.freelancerId === freelancerId)
  },

  getAllOffers: () => get().offers,
}))

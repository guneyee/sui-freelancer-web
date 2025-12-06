export function useFreelancerContract() {
  return {
    registerFreelancer: async (data: any) => {
      console.log('Registering freelancer:', data)
    },
    updateTier: async (id: string, score: number) => {
      console.log('Updating tier:', id, score)
    },
    updateRating: async (id: string, rating: number) => {
      console.log('Updating rating:', id, rating)
    },
  }
}

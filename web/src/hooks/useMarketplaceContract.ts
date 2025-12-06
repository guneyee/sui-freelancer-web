export function useMarketplaceContract() {
  return {
    postJob: async (data: any) => {
      console.log('Posting job:', data)
    },
    acceptJob: async (jobId: string, freelancerId: string) => {
      console.log('Accepting job:', jobId, freelancerId)
    },
    completeJob: async (jobId: string, amount: number) => {
      console.log('Completing job:', jobId, amount)
    },
  }
}

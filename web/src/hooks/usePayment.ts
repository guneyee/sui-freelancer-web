import { useSignAndExecuteTransaction, useSuiClient } from '@mysten/dapp-kit'
import { Transaction } from '@mysten/sui/transactions'
import { useState } from 'react'

export function usePayment() {
  const client = useSuiClient()
  const { mutate: signAndExecute } = useSignAndExecuteTransaction()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const payFreelancer = async (
    freelancerAddress: string,
    amountInSui: number,
    jobDescription: string
  ) => {
    setIsLoading(true)
    setError(null)

    try {
      if (!freelancerAddress || amountInSui <= 0) {
        throw new Error('Invalid freelancer address or amount')
      }

      // Convert SUI to MIST (1 SUI = 1,000,000,000 MIST)
      const amountInMist = BigInt(Math.floor(amountInSui * 1_000_000_000))

      const tx = new Transaction()
      tx.setGasBudget(10_000_000) // Set explicit gas budget

      // Transfer SUI coin to freelancer
      const [coin] = tx.splitCoins(tx.gas, [amountInMist])
      tx.transferObjects([coin], tx.pure.address(freelancerAddress))

      // Sign and execute
      return new Promise((resolve, reject) => {
        signAndExecute(
          { transaction: tx },
          {
            onSuccess: (result) => {
              console.log('✅ Payment successful:', result)
              setIsLoading(false)
              resolve(result)
            },
            onError: (err: any) => {
              console.error('❌ Payment failed:', err)
              setError(err.message || 'Transaction failed')
              setIsLoading(false)
              reject(err)
            },
          }
        )
      })
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error'
      setError(errorMessage)
      setIsLoading(false)
      throw err
    }
  }

  return {
    payFreelancer,
    isLoading,
    error,
  }
}

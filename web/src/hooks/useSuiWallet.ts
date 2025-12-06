import { useState, useEffect } from 'react'

export function useSuiWallet() {
  const [connected, setConnected] = useState(false)
  const [wallet, setWallet] = useState<any>(null)

  useEffect(() => {
    // TODO: Initialize Sui wallet connection
  }, [])

  return {
    connected,
    wallet,
    connect: () => setConnected(true),
    disconnect: () => setConnected(false),
  }
}

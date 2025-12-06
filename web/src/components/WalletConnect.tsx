import { ConnectButton } from '@mysten/dapp-kit'

export default function WalletConnect() {
  return (
    <ConnectButton 
      connectText="Connect Wallet"
      className="wallet-connect-button"
    />
  )
}

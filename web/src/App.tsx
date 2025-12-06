import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { SuiClientProvider, WalletProvider } from '@mysten/dapp-kit'
import { getFullnodeUrl } from '@mysten/sui/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Navigation from './components/Navigation'
import Home from './pages/Home'
import FreelancerDetail from './pages/FreelancerDetail'
import PostJob from './pages/PostJob'
import MyJobs from './pages/MyJobs'
import HireDashboard from './pages/HireDashboard'
import '@mysten/dapp-kit/dist/index.css'

const queryClient = new QueryClient()

const networks = {
  testnet: { url: getFullnodeUrl('testnet') },
  mainnet: { url: getFullnodeUrl('mainnet') },
  devnet: { url: getFullnodeUrl('devnet') },
}

function AppContent() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900">
        <Navigation />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/freelancer/:id" element={<FreelancerDetail />} />
            <Route path="/post-job" element={<PostJob />} />
            <Route path="/my-jobs" element={<MyJobs />} />
            <Route path="/hire-dashboard" element={<HireDashboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SuiClientProvider networks={networks} defaultNetwork="testnet">
        <WalletProvider>
          <AppContent />
        </WalletProvider>
      </SuiClientProvider>
    </QueryClientProvider>
  )
}

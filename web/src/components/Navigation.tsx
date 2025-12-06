import { Link } from 'react-router-dom'
import WalletConnect from './WalletConnect'

export default function Navigation() {
  return (
    <nav className="bg-gray-800 border-b border-gray-700">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
            Sui Freelancer
          </Link>
          
          <div className="flex gap-6 items-center">
            <Link to="/" className="text-gray-300 hover:text-white">🏠 Home</Link>
            <Link to="/post-job" className="text-gray-300 hover:text-white">📝 Post Job</Link>
            <Link to="/my-jobs" className="text-gray-300 hover:text-white">📋 My Jobs</Link>
            <Link to="/hire-dashboard" className="text-gray-300 hover:text-white">👥 Hire Dashboard</Link>
            <WalletConnect />
          </div>
        </div>
      </div>
    </nav>
  )
}

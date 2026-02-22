import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import tvaraFullLogo from '../../assets/tvara_full_logo.png'

export default function Navbar() {
  const { user, isLoading } = useAuth()

  const scrollToWaitlist = () => {
    document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="sticky top-6 z-50 px-4">
      <nav className="max-w-5xl mx-auto px-5 h-14 flex items-center justify-between rounded-4xl border border-white/40 bg-white/60 backdrop-blur-md shadow-md shadow-black/5">
        <img src={tvaraFullLogo} alt="Tvara" className="h-16 w-auto" />

        <div className="flex items-center gap-2">
          <button
            onClick={scrollToWaitlist}
            className="text-sm font-semibold px-4 py-2 rounded-lg border border-gray-300/70 text-gray-700 hover:bg-white/80 transition-colors duration-150"
          >
            Join Waitlist
          </button>

          {!isLoading && (
            user ? (
              <Link
                to="/dashboard"
                className="text-sm font-semibold px-4 py-2 rounded-lg bg-black text-white hover:bg-gray-800 transition-colors duration-150"
              >
                Dashboard
              </Link>
            ) : (
              <Link
                to="/login"
                className="text-sm font-semibold px-4 py-2 rounded-lg bg-black text-white hover:bg-gray-800 transition-colors duration-150"
              >
                Sign in
              </Link>
            )
          )}
        </div>
      </nav>
    </div>
  )
}

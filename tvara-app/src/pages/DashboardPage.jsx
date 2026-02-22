import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import tvaraFullLogo from '../assets/tvara_full_logo.png'

export default function DashboardPage() {
  const { user, signOut } = useAuth()
  const displayName = user?.is_anonymous
    ? 'Guest'
    : user?.user_metadata?.full_name ?? user?.user_metadata?.name ?? user?.email
  const navigate = useNavigate()

  async function handleSignOut() {
    navigate('/', { replace: true })
    await signOut()
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center gap-4">
      <img src={tvaraFullLogo} alt="Tvara" className="h-10 w-auto" />
      <p className="text-sm text-gray-500 font-medium flex flex-col items-center">
        Signed in as{' '}
        <span className="text-gray-900 font-semibold">{displayName}</span>
        <br />
        <span>We will be launching soon! 🚀</span>
      </p>
      <button
        onClick={handleSignOut}
        className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-semibold text-gray-700 hover:bg-white transition-colors duration-150 cursor-pointer"
      >
        Sign out
      </button>
    </div>
  )
}

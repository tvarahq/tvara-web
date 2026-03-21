import { useSearchParams } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Sidebar from '../components/dashboard/Sidebar'
import ActivityPage from '../components/dashboard/ActivityPage'
import ConnectionsPage from '../components/dashboard/ConnectionsPage'
import PlaygroundPage from '../components/dashboard/PlaygroundPage'
import OnboardingWalkthrough from '../components/dashboard/OnboardingWalkthrough'
import ChannelsPage from '../components/dashboard/ChannelsPage'

const VALID_TABS = ['activity', 'playground', 'integrations', 'channels']

export default function DashboardPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const { signOut, isGuest } = useAuth()
  const navigate = useNavigate()

  const tabParam = searchParams.get('tab')
  const activeTab = VALID_TABS.includes(tabParam) ? tabParam : 'activity'

  function setActiveTab(id) {
    setSearchParams({ tab: id })
  }

  async function handleSignOut() {
    navigate('/', { replace: true })
    await signOut()
  }

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      <OnboardingWalkthrough setActiveTab={setActiveTab} isGuest={isGuest} />
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onSignOut={handleSignOut}
      />

      {/* pt-[52px] on mobile to clear the fixed top bar; md:pt-0 on desktop */}
      <main className="flex-1 overflow-y-auto pt-[52px] md:pt-0">
        <AnimatePresence mode="wait">
          {activeTab === 'activity'     && <ActivityPage    key="activity" />}
          {activeTab === 'playground'   && <PlaygroundPage  key="playground" />}
          {activeTab === 'integrations' && <ConnectionsPage key="integrations" />}
          {activeTab === 'channels'     && <ChannelsPage    key="channels" />}
        </AnimatePresence>
      </main>
    </div>
  )
}

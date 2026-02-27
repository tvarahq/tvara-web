import { useSearchParams } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Sidebar from '../components/dashboard/Sidebar'
import ActivityPage from '../components/dashboard/ActivityPage'
import ConnectionsPage from '../components/dashboard/ConnectionsPage'
import ApiKeysPage from '../components/dashboard/ApiKeysPage'
import PlaygroundPage from '../components/dashboard/PlaygroundPage'

const VALID_TABS = ['activity', 'playground', 'integrations', 'api-keys']

export default function DashboardPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const { signOut } = useAuth()
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
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onSignOut={handleSignOut}
      />

      <main className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          {activeTab === 'activity'    && <ActivityPage    key="activity" />}
          {activeTab === 'playground'  && <PlaygroundPage  key="playground" />}
          {activeTab === 'integrations' && <ConnectionsPage key="integrations" />}
          {activeTab === 'api-keys'    && <ApiKeysPage     key="api-keys" />}
        </AnimatePresence>
      </main>
    </div>
  )
}

import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Sidebar from '../components/dashboard/Sidebar'
import ActivityPage from '../components/dashboard/ActivityPage'
import ConnectionsPage from '../components/dashboard/ConnectionsPage'
import ApiKeysPage from '../components/dashboard/ApiKeysPage'

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('activity')
  const { signOut } = useAuth()
  const navigate = useNavigate()

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
          {activeTab === 'connections' && <ConnectionsPage key="connections" />}
          {activeTab === 'api-keys'    && <ApiKeysPage     key="api-keys" />}
        </AnimatePresence>
      </main>
    </div>
  )
}

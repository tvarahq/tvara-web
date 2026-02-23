import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  SiNotion,
  SiTelegram,
  SiSlack,
  SiGmail,
  SiGooglesheets,
  SiJira,
  SiGithub,
  SiLinear,
} from 'react-icons/si'

const ACTIVE_CONNECTIONS = [
  { id: 'notion',   name: 'Notion',   icon: SiNotion,   color: '#1a1a1a', connectedAs: 'ashish@tvara.co' },
  { id: 'telegram', name: 'Telegram', icon: SiTelegram, color: '#2AABEE', connectedAs: '@ashish_dev' },
]

const AVAILABLE_INTEGRATIONS = [
  { id: 'slack',   name: 'Slack',          icon: SiSlack,        color: '#4A154B' },
  { id: 'gmail',   name: 'Gmail',          icon: SiGmail,        color: '#EA4335' },
  { id: 'sheets',  name: 'Google Sheets',  icon: SiGooglesheets, color: '#34A853' },
  { id: 'jira',    name: 'Jira',           icon: SiJira,         color: '#0052CC' },
  { id: 'github',  name: 'GitHub',         icon: SiGithub,       color: '#24292E' },
  { id: 'linear',  name: 'Linear',         icon: SiLinear,       color: '#5E6AD2' },
]

const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.22, ease: 'easeOut' } },
  exit:    { opacity: 0, y: -6, transition: { duration: 0.15 } },
}

function ActiveConnectionCard({ conn }) {
  const [hovered, setHovered] = useState(false)
  const Icon = conn.icon

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`bg-white rounded-2xl border p-5 flex items-center gap-4 transition-all duration-200 ${
        hovered ? 'border-brand-mid shadow-sm shadow-brand-light' : 'border-gray-200'
      }`}
    >
      {/* Icon with pulsing live ring */}
      <div className="relative flex-shrink-0">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center bg-gray-50"
          style={{ border: `1.5px solid ${conn.color}22` }}
        >
          <Icon size={20} style={{ color: conn.color }} />
        </div>
        {/* Pulsing green ring */}
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border-2 border-[#F7F7F7]" />
        </span>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-900">{conn.name}</p>
        <p className="text-xs text-gray-400 truncate mt-0.5">
          Connected as <span className="text-gray-600 font-medium">{conn.connectedAs}</span>
        </p>
      </div>

      {/* Disconnect button — visible on hover */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.15 }}
        className="text-xs text-red-400 font-medium px-3 py-1.5 rounded-xl border border-red-100 hover:bg-red-50 transition-colors cursor-pointer flex-shrink-0"
      >
        Disconnect
      </motion.button>
    </div>
  )
}

function AvailableIntegrationCard({ intg }) {
  const [loading, setLoading] = useState(false)
  const [hovered, setHovered] = useState(false)
  const Icon = intg.icon

  function handleConnect() {
    setLoading(true)
    // Simulated OAuth loading — skeleton screen for 1.8 s
    setTimeout(() => setLoading(false), 1800)
  }

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`bg-white rounded-2xl border p-5 flex flex-col items-center gap-3 transition-all duration-200 ${
        hovered ? 'border-brand-mid opacity-100 shadow-sm shadow-brand-light' : 'border-gray-200 opacity-60'
      }`}
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center bg-gray-50"
        style={{ border: `1.5px solid ${intg.color}22` }}
      >
        <Icon size={20} style={{ color: intg.color }} />
      </div>
      <p className="text-sm font-semibold text-gray-700">{intg.name}</p>

      <button
        onClick={handleConnect}
        disabled={loading}
        className={`text-xs font-medium px-5 py-1.5 rounded-xl transition-all duration-150 cursor-pointer ${
          hovered && !loading
            ? 'bg-brand text-white shadow-sm'
            : 'bg-gray-100 text-gray-500'
        } disabled:opacity-50 disabled:cursor-default`}
      >
        {loading ? (
          // Skeleton screen instead of a spinner
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2.5 rounded bg-gray-300 animate-pulse" />
            <span className="w-10 h-2.5 rounded bg-gray-300 animate-pulse" />
          </span>
        ) : (
          'Connect'
        )}
      </button>
    </div>
  )
}

export default function ConnectionsPage() {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="p-8 max-w-3xl"
    >
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-xl font-bold text-gray-900">Connections</h1>
        <p className="text-sm text-gray-400 mt-0.5">Manage your connected apps and credentials.</p>
      </div>

      {/* Active Connections */}
      <section className="mb-8">
        <h2 className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-3">
          Active Connections
        </h2>
        <div className="flex flex-col gap-3">
          {ACTIVE_CONNECTIONS.map((conn) => (
            <ActiveConnectionCard key={conn.id} conn={conn} />
          ))}
        </div>
      </section>

      {/* Available Integrations */}
      <section>
        <h2 className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-3">
          Available Integrations
        </h2>
        <div className="grid grid-cols-3 gap-4">
          {AVAILABLE_INTEGRATIONS.map((intg) => (
            <AvailableIntegrationCard key={intg.id} intg={intg} />
          ))}
        </div>
      </section>
    </motion.div>
  )
}

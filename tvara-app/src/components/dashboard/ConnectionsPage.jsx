import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Unplug, RefreshCw } from 'lucide-react'
import { SiGmail, SiGithub, SiSlack, SiNotion, SiX } from 'react-icons/si'
import {
  listIntegrations,
  listConnections,
  connectIntegration,
  disconnectConnection,
} from '../../utils/api'
import { useToast } from '../../context/ToastContext'

const ALLOWED_SLUGS = ['github', 'gmail', 'slack', 'notion', 'twitter']

const INTEGRATION_META = {
  github: {
    icon: SiGithub,
    color: '#24292E',
    bg: '#24292E12',
    description: 'Access repositories, issues, and pull requests.',
    capabilities: ['Repos', 'Issues', 'Pull Requests', 'Commits'],
  },
  gmail: {
    icon: SiGmail,
    color: '#EA4335',
    bg: '#EA433512',
    description: 'Read, compose, and draft emails.',
    capabilities: ['Read Emails', 'Draft Emails', 'Labels'],
  },
  slack: {
    icon: SiSlack,
    color: '#4A154B',
    bg: '#4A154B12',
    description: 'Send messages and manage channels.',
    capabilities: ['Messages', 'Channels', 'Notifications', 'Bots'],
  },
  notion: {
    icon: SiNotion,
    color: '#000000',
    bg: '#00000010',
    description: 'Read and write pages and databases.',
    capabilities: ['Pages', 'Databases', 'Blocks', 'Search'],
  },
  twitter: {
    icon: SiX,
    color: '#000000',
    bg: '#00000010',
    description: 'Post tweets and read your timeline.',
    capabilities: ['Tweets', 'Timeline', 'Mentions', 'DMs'],
  },
}

const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.22, ease: 'easeOut' } },
  exit:    { opacity: 0, y: -6, transition: { duration: 0.15 } },
}

// ─── IntegrationCard ──────────────────────────────────────────────────────────

function IntegrationCard({ integration, connection, onConnect, onDisconnect, index }) {
  const [hovered, setHovered]     = useState(false)
  const [actioning, setActioning] = useState(false)

  const meta        = INTEGRATION_META[integration.slug] ?? {}
  const Icon        = meta.icon
  const isConnected = integration.connected

  async function handleConnect() {
    setActioning(true)
    try { await onConnect(integration.slug) }
    finally { setActioning(false) }
  }

  async function handleDisconnect() {
    setActioning(true)
    try { await onDisconnect(connection?.connected_account_id) }
    finally { setActioning(false) }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: 'easeOut', delay: index * 0.04 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`group bg-white rounded-2xl border px-5 py-4 transition-all duration-200 ${
        isConnected
          ? hovered ? 'border-brand-mid shadow-sm' : 'border-gray-200'
          : hovered ? 'border-gray-300 shadow-sm' : 'border-gray-200'
      }`}
    >
      <div className="flex items-center gap-4">

        {/* Icon */}
        <div className="relative flex-shrink-0">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-200 group-hover:scale-105"
            style={{ background: meta.bg, border: `1.5px solid ${meta.color}20` }}
          >
            {Icon && <Icon size={20} style={{ color: meta.color }} />}
          </div>
          {isConnected && (
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-50" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 border-2 border-white" />
            </span>
          )}
        </div>

        {/* Body */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-semibold text-gray-900">{integration.name}</span>
            {isConnected && (
              <span className="text-[10px] font-semibold bg-emerald-50 text-emerald-600 border border-emerald-100 px-1.5 py-px rounded-full">
                Active
              </span>
            )}
          </div>
          <p className="text-xs text-gray-400 mb-2.5 leading-relaxed">{meta.description}</p>
          {/* Capability pills */}
          <div className="flex flex-wrap gap-1">
            {meta.capabilities?.map(cap => (
              <span
                key={cap}
                className={`text-[10px] font-medium px-2 py-0.5 rounded-full transition-colors duration-150 ${
                  isConnected
                    ? 'bg-brand-light text-brand-dark'
                    : 'bg-gray-100 text-gray-400'
                }`}
              >
                {cap}
              </span>
            ))}
          </div>
        </div>

        {/* Action button — always occupies space but visibility changes */}
        <div className="flex-shrink-0">
          {isConnected ? (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: hovered ? 1 : 0 }}
              transition={{ duration: 0.15 }}
              onClick={handleDisconnect}
              disabled={actioning}
              className="flex items-center gap-1.5 text-xs text-red-400 font-medium px-3 py-1.5 rounded-xl border border-red-100 hover:bg-red-50 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-default whitespace-nowrap"
            >
              {actioning ? <RefreshCw size={10} className="animate-spin" /> : <Unplug size={10} />}
              {actioning ? 'Removing…' : 'Disconnect'}
            </motion.button>
          ) : (
            <button
              onClick={handleConnect}
              disabled={actioning}
              className={`flex items-center gap-1.5 text-xs font-semibold px-3.5 py-1.5 rounded-xl transition-all duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-default whitespace-nowrap ${
                hovered && !actioning
                  ? 'bg-brand text-white shadow-sm'
                  : 'bg-gray-100 text-gray-500'
              }`}
            >
              {actioning ? <RefreshCw size={10} className="animate-spin" /> : <ArrowRight size={10} />}
              {actioning ? 'Redirecting…' : 'Connect'}
            </button>
          )}
        </div>

      </div>
    </motion.div>
  )
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function Skeleton() {
  return (
    <div className="p-4 sm:p-8 animate-pulse">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <div className="h-5 w-32 bg-gray-200 rounded-lg mb-2" />
          <div className="h-3.5 w-56 bg-gray-100 rounded-lg" />
        </div>
        <div className="h-7 w-28 bg-gray-100 rounded-xl" />
      </div>

      <div className="space-y-3">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="bg-white border border-gray-100 rounded-2xl px-5 py-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-gray-100 flex-shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-3.5 w-24 bg-gray-200 rounded" />
              <div className="h-2.5 w-48 bg-gray-100 rounded" />
              <div className="flex gap-1.5 mt-0.5">
                <div className="h-4 w-12 bg-gray-100 rounded-full" />
                <div className="h-4 w-16 bg-gray-100 rounded-full" />
                <div className="h-4 w-10 bg-gray-100 rounded-full" />
              </div>
            </div>
            <div className="h-7 w-20 bg-gray-100 rounded-xl flex-shrink-0" />
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── ConnectionsPage ──────────────────────────────────────────────────────────

export default function ConnectionsPage() {
  const [integrations, setIntegrations] = useState([])
  const [connections,  setConnections]  = useState([])
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState(null)
  const { toast } = useToast()

  const fetchData = useCallback(async () => {
    try {
      const [intgs, conns] = await Promise.allSettled([
        listIntegrations(),
        listConnections(),
      ])

      if (intgs.status === 'fulfilled') {
        setIntegrations(intgs.value.filter(i => ALLOWED_SLUGS.includes(i.slug)))
      } else {
        throw intgs.reason
      }

      if (conns.status === 'fulfilled') {
        setConnections(conns.value)
      } else {
        throw conns.reason
      }

      setError(null)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchData() }, [fetchData])

  async function handleConnect(slug) {
    const { redirect_url } = await connectIntegration(slug)
    window.location.href = redirect_url
  }

  async function handleDisconnect(connected_account_id) {
    try {
      await disconnectConnection(connected_account_id)
      await fetchData()
      toast.success('Disconnected successfully')
    } catch {
      toast.error('Failed to disconnect')
    }
  }

  const connectionMap = Object.fromEntries(connections.map(c => [c.toolkit_slug, c]))
  const activeCount   = integrations.filter(i => i.connected).length

  if (loading) return <Skeleton />

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="p-4 sm:p-8"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-7">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Integrations</h1>
          <p className="text-sm text-gray-400 mt-0.5">Connect apps and channels to power your agent.</p>
        </div>
        {!error && integrations.length > 0 && (
          <div className="flex items-center gap-1.5 text-[11px] font-semibold bg-gray-50 border border-gray-200 text-gray-500 px-3 py-1.5 rounded-xl mt-0.5 flex-shrink-0">
            <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
            {activeCount} of {integrations.length} connected
          </div>
        )}
      </div>

      {error && (
        <div className="mb-6 text-sm text-red-500 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
          {error}
        </div>
      )}

      <div className="flex flex-col gap-2.5">
        {integrations.map((intg, i) => (
          <IntegrationCard
            key={intg.slug}
            index={i}
            integration={intg}
            connection={connectionMap[intg.slug]}
            onConnect={handleConnect}
            onDisconnect={handleDisconnect}
          />
        ))}
        {!error && integrations.length === 0 && (
          <p className="text-sm text-gray-400">No integrations available.</p>
        )}
      </div>
    </motion.div>
  )
}

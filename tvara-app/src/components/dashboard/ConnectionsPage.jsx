import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Unplug, RefreshCw } from 'lucide-react'
import { SiGmail, SiGithub, SiSlack, SiNotion, SiX } from 'react-icons/si'
import { listIntegrations, listConnections, connectIntegration, disconnectConnection } from '../../utils/api'
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
    description: 'Read, compose, and send emails.',
    capabilities: ['Read Emails', 'Send Emails', 'Labels', 'Drafts'],
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

function formatDate(iso) {
  if (!iso) return null
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function truncateId(id) {
  if (!id) return null
  return id.length > 18 ? `${id.slice(0, 8)}…${id.slice(-6)}` : id
}

function IntegrationCard({ integration, connection, onConnect, onDisconnect }) {
  const [hovered, setHovered]   = useState(false)
  const [actioning, setActioning] = useState(false)

  const meta  = INTEGRATION_META[integration.slug] ?? {}
  const Icon  = meta.icon
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
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`bg-white rounded-2xl border p-5 transition-all duration-200 ${
        hovered ? 'border-brand-mid shadow-sm shadow-brand-light' : 'border-gray-200'
      } ${!isConnected ? 'opacity-70 hover:opacity-100' : ''}`}
    >
      <div className="flex items-start gap-4">

        {/* Icon */}
        <div className="relative flex-shrink-0 mt-0.5">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center"
            style={{ background: meta.bg, border: `1.5px solid ${meta.color}22` }}
          >
            {Icon && <Icon size={22} style={{ color: meta.color }} />}
          </div>
          {isConnected && (
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border-2 border-white" />
            </span>
          )}
        </div>

        {/* Body */}
        <div className="flex-1 min-w-0">

          {/* Top row: name + status badge */}
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-semibold text-gray-900">{integration.name}</span>
            {isConnected ? (
              <span className="text-[10px] font-semibold bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full">
                Active
              </span>
            ) : (
              <span className="text-[10px] font-semibold bg-gray-100 text-gray-400 px-2 py-0.5 rounded-full">
                Not connected
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-xs text-gray-400 mb-3 leading-relaxed">{meta.description}</p>

          {/* Capabilities */}
          <p className="text-[10px] text-gray-400 mb-3">
            {meta.capabilities?.join('  ·  ')}
          </p>

          {/* Connection metadata (active only) */}
          {isConnected && connection && (
            <div className="flex flex-wrap items-center gap-4 pt-3 border-t border-gray-100">
              <div>
                <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wider mb-0.5">Account ID</p>
                <code className="text-xs text-gray-600 font-mono bg-gray-50 border border-gray-100 px-2 py-0.5 rounded-lg">
                  {truncateId(connection.connected_account_id)}
                </code>
              </div>
              {connection.created_at && (
                <div>
                  <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wider mb-0.5">Connected</p>
                  <p className="text-xs text-gray-600 font-medium">{formatDate(connection.created_at)}</p>
                </div>
              )}
              <div>
                <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wider mb-0.5">Status</p>
                <p className="text-xs text-gray-600 font-medium capitalize">
                  {connection.status?.toLowerCase() ?? 'active'}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Action button */}
        <div className="flex-shrink-0 mt-0.5">
          {isConnected ? (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: hovered ? 1 : 0 }}
              transition={{ duration: 0.15 }}
              onClick={handleDisconnect}
              disabled={actioning}
              className="flex items-center gap-1.5 text-xs text-red-400 font-medium px-3 py-1.5 rounded-xl border border-red-100 hover:bg-red-50 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-default"
            >
              <Unplug size={11} />
              {actioning ? 'Removing…' : 'Disconnect'}
            </motion.button>
          ) : (
            <button
              onClick={handleConnect}
              disabled={actioning}
              className={`flex items-center gap-1.5 text-xs font-semibold px-4 py-1.5 rounded-xl transition-all duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-default ${
                hovered && !actioning
                  ? 'bg-brand text-white shadow-sm'
                  : 'bg-gray-100 text-gray-500'
              }`}
            >
              {actioning ? (
                <RefreshCw size={11} className="animate-spin" />
              ) : (
                <ArrowRight size={11} />
              )}
              {actioning ? 'Redirecting…' : 'Connect'}
            </button>
          )}
        </div>
      </div>
    </motion.div>
  )
}

function Skeleton() {
  return (
    <div className="p-4 sm:p-8 max-w-2xl animate-pulse space-y-4">
      <div className="h-5 w-28 bg-gray-200 rounded mb-1" />
      <div className="h-3.5 w-52 bg-gray-100 rounded mb-8" />
      {[1, 2].map(i => (
        <div key={i} className="bg-white border border-gray-100 rounded-2xl p-5 flex gap-4">
          <div className="w-11 h-11 rounded-xl bg-gray-100 flex-shrink-0" />
          <div className="flex-1 space-y-2">
            <div className="h-3.5 w-24 bg-gray-200 rounded" />
            <div className="h-2.5 w-64 bg-gray-100 rounded" />
            <div className="flex gap-1.5 mt-1">
              {[60, 40, 80, 50].map(w => (
                <div key={w} className={`h-5 w-${w === 60 ? '14' : w === 40 ? '10' : w === 80 ? '20' : '12'} bg-gray-100 rounded-lg`} />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function ConnectionsPage() {
  const [integrations, setIntegrations] = useState([])
  const [connections,  setConnections]  = useState([])
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState(null)
  const { toast } = useToast()

  const fetchData = useCallback(async () => {
    try {
      const [intgs, conns] = await Promise.all([listIntegrations(), listConnections()])
      setIntegrations(intgs.filter(i => ALLOWED_SLUGS.includes(i.slug)))
      setConnections(conns)
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
    } catch (e) {
      toast.error('Failed to disconnect')
    }
  }

  const connectionMap = Object.fromEntries(connections.map(c => [c.toolkit_slug, c]))

  const activeCount = integrations.filter(i => i.connected).length

  if (loading) return <Skeleton />

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="p-4 sm:p-8 max-w-2xl"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-6 sm:mb-8">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Integrations</h1>
          <p className="text-sm text-gray-400 mt-0.5">Manage your connected apps and credentials.</p>
        </div>
        {!error && (
          <span className="text-[11px] font-semibold bg-gray-100 text-gray-500 px-3 py-1.5 rounded-xl mt-0.5">
            {activeCount} of {integrations.length} connected
          </span>
        )}
      </div>

      {error && (
        <div className="mb-6 text-sm text-red-500 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
          {error}
        </div>
      )}

      {/* Integration cards */}
      <div className="flex flex-col gap-3">
        {integrations.map(intg => (
          <IntegrationCard
            key={intg.slug}
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

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap, Flame, X } from 'lucide-react'
import { SiTelegram, SiSlack, SiNotion, SiGmail, SiGithub } from 'react-icons/si'
import PulseChart from './PulseChart'
import { supabase } from '../../utils/supabase'
import { getRun } from '../../utils/api'

const BASE_URL = import.meta.env.VITE_BACKEND_URL
const PAGE_SIZE = 20

// ─── Integration icon map ─────────────────────────────────────────────────────

const INTEGRATION_ICONS = {
  github: { Icon: SiGithub, color: '#24292E', label: 'GitHub' },
  gmail:  { Icon: SiGmail,  color: '#EA4335', label: 'Gmail'  },
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function timeAgo(dateStr) {
  if (!dateStr) return '—'
  const diff = Date.now() - new Date(dateStr).getTime()
  const seconds = Math.floor(diff / 1000)
  if (seconds < 60)  return 'Just now'
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60)  return `${minutes} min ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24)    return `${hours} hr ago`
  const days = Math.floor(hours / 24)
  if (days === 1)    return 'Yesterday'
  if (days < 30)     return `${days} days ago`
  const months = Math.floor(days / 30)
  if (months === 1)  return '1 month ago'
  return `${months} months ago`
}

function normalizePlatform(str) {
  if (!str) return ''
  return str.toLowerCase()
}

const PERIOD_OPTIONS = [
  { value: 7,  label: 'Last 7 days' },
  { value: 15, label: 'Last 15 days' },
  { value: 30, label: 'Last 30 days' },
]

function computeDailyData(runs, days = 30) {
  const slots = []
  const now = new Date()
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now)
    d.setDate(now.getDate() - i)
    slots.push({
      date: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      key: d.toISOString().slice(0, 10),
      success: 0,
      failed: 0,
    })
  }
  const map = {}
  slots.forEach((d) => { map[d.key] = d })
  runs.forEach((run) => {
    if (!run.created_at) return
    const key = new Date(run.created_at).toISOString().slice(0, 10)
    if (!map[key]) return
    if (run.status === 'success') map[key].success += 1
    else map[key].failed += 1
  })
  return slots.map(({ date, success, failed }) => ({ date, success, failed }))
}

function computeStats(runs, days = 30) {
  const cutoff = Date.now() - days * 24 * 60 * 60 * 1000
  const periodRuns = runs.filter((r) => new Date(r.created_at).getTime() > cutoff)
  const successful = periodRuns.filter((r) => r.status === 'success')

  const total = successful.length
  if (total === 0) return { total: null, successRate: null, avgDurationSec: null, streak: null }

  const successRate = periodRuns.length > 0
    ? Math.round((successful.length / periodRuns.length) * 100)
    : null

  // Avg duration from runs that have both timestamps
  const durations = successful
    .filter((r) => r.completed_at && r.created_at)
    .map((r) => (new Date(r.completed_at).getTime() - new Date(r.created_at).getTime()) / 1000)
  const avgDurationSec = durations.length > 0
    ? Math.round(durations.reduce((a, b) => a + b, 0) / durations.length)
    : null

  // Streak: consecutive days (going backwards from today) with ≥1 success
  const successDays = new Set(
    successful.map((r) => new Date(r.created_at).toISOString().slice(0, 10))
  )
  let streak = 0
  const today = new Date()
  for (let i = 0; i < 365; i++) {
    const d = new Date(today)
    d.setDate(today.getDate() - i)
    const key = d.toISOString().slice(0, 10)
    if (successDays.has(key)) {
      streak++
    } else if (i > 0) {
      // Allow today to be empty without breaking the streak
      break
    }
  }

  return { total, successRate, avgDurationSec, streak }
}

function formatDuration(sec) {
  if (sec == null) return '—'
  if (sec < 60) return `${sec}s`
  const m = Math.floor(sec / 60)
  const s = sec % 60
  return s > 0 ? `${m}m ${s}s` : `${m}m`
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function PlatformIcon({ platform }) {
  const cls = 'w-3.5 h-3.5 flex-shrink-0'
  switch (normalizePlatform(platform)) {
    case 'telegram': return <SiTelegram className={cls} style={{ color: '#2AABEE' }} />
    case 'slack':    return <SiSlack    className={cls} style={{ color: '#4A154B' }} />
    case 'notion':   return <SiNotion   className={cls} style={{ color: '#1a1a1a' }} />
    case 'gmail':    return <SiGmail    className={cls} style={{ color: '#EA4335' }} />
    default:         return <Zap        className={`${cls} text-gray-400`} />
  }
}

function platformDisplayName(platform) {
  if (!platform) return '—'
  const map = {
    telegram: 'Telegram',
    slack: 'Slack',
    notion: 'Notion',
    gmail: 'Gmail',
  }
  return map[normalizePlatform(platform)] ?? platform
}

function IntegrationPips({ slugs }) {
  if (!slugs?.length) return <span className="text-gray-300 text-xs">—</span>
  return (
    <div className="flex items-center">
      {slugs.slice(0, 3).map((slug, i) => {
        const meta = INTEGRATION_ICONS[slug]
        if (!meta) return null
        const { Icon, color } = meta
        return (
          <div
            key={slug}
            title={meta.label}
            style={{ marginLeft: i === 0 ? 0 : -6, zIndex: slugs.length - i }}
            className="w-5 h-5 rounded-full bg-white border border-gray-200 flex items-center justify-center flex-shrink-0 relative"
          >
            <Icon size={10} style={{ color }} />
          </div>
        )
      })}
      {slugs.length > 3 && (
        <div
          style={{ marginLeft: -6 }}
          className="w-5 h-5 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center flex-shrink-0 text-[9px] text-gray-500 font-semibold"
        >
          +{slugs.length - 3}
        </div>
      )}
    </div>
  )
}

function SkeletonRow() {
  return (
    <tr className="border-b border-gray-50">
      {[120, 60, 180, 60, 60].map((w, i) => (
        <td key={i} className="px-3 sm:px-6 py-4">
          <div className="h-3 rounded bg-gray-100 animate-pulse" style={{ width: w }} />
        </td>
      ))}
    </tr>
  )
}

function StatsSkeleton() {
  return (
    <div className="h-8 w-20 bg-gray-100 rounded animate-pulse" />
  )
}

function MiniStatsSkeleton() {
  return <div className="h-6 w-12 bg-gray-100 rounded animate-pulse" />
}

// ─── Metric card ─────────────────────────────────────────────────────────────

function MetricCard({ label, value, sub, icon: Icon, iconColor, loading, note }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-5 flex flex-col gap-3">
      <p className="text-sm font-semibold text-gray-800">{label}</p>
      <div className="flex-1 flex items-end justify-between">
        <div>
          {loading ? (
            <MiniStatsSkeleton />
          ) : (
            <p className="text-3xl font-bold text-gray-900 leading-none tracking-tight">
              {value ?? '—'}
            </p>
          )}
          {sub && <p className="text-xs text-gray-400 mt-1">{sub}</p>}
        </div>
        {Icon && (
          <Icon size={18} style={iconColor ? { color: iconColor } : undefined} className={!iconColor ? 'text-gray-300' : ''} />
        )}
      </div>
      {note && (
        <p className="text-[11px] text-gray-400 leading-relaxed border-t border-gray-50 pt-2">{note}</p>
      )}
    </div>
  )
}

// ─── Drawer helpers ───────────────────────────────────────────────────────────

function formatDateTime(dateStr) {
  if (!dateStr) return '—'
  return new Date(dateStr).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })
}

function computeRunDuration(createdAt, completedAt) {
  if (!createdAt || !completedAt) return null
  return Math.round((new Date(completedAt).getTime() - new Date(createdAt).getTime()) / 1000)
}

const drawerVariants = {
  initial: { x: '100%' },
  animate: { x: 0, transition: { duration: 0.22, ease: 'easeOut' } },
  exit:    { x: '100%', transition: { duration: 0.18, ease: 'easeIn' } },
}

// ─── Run detail drawer ────────────────────────────────────────────────────────

function RunDrawer({ run, onClose }) {
  const [detail, setDetail] = useState(null)
  const [fetching, setFetching] = useState(false)
  const [fetchError, setFetchError] = useState(null)

  useEffect(() => {
    if (!run) return
    setDetail(null)
    setFetchError(null)
    setFetching(true)
    getRun(run.id)
      .then((data) => setDetail(data))
      .catch((err) => setFetchError(err.message))
      .finally(() => setFetching(false))
  }, [run])

  // Merge partial row data with enriched fetch result
  const d = detail ?? run

  const durationSec = computeRunDuration(d?.created_at, d?.completed_at)
  const isFailed = d?.status !== 'success'

  return (
    <>
      {/* Backdrop */}
      <motion.div
        key="run-drawer-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15 }}
        className="fixed inset-0 z-40 bg-black/30"
        onClick={onClose}
      />

      {/* Drawer panel */}
      <motion.div
        key="run-drawer-panel"
        variants={drawerVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="fixed top-0 right-0 h-full w-full max-w-lg z-50 flex flex-col bg-white border-l border-gray-200 shadow-xl"
      >
        {/* Fixed header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 flex-shrink-0">
          <div>
            <p className="text-sm font-semibold text-gray-900">Run Detail</p>
            <p className="text-[11px] text-gray-400 font-mono mt-0.5 truncate max-w-[300px]">
              {d?.id ?? '—'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors cursor-pointer flex-shrink-0"
            aria-label="Close drawer"
          >
            <X size={16} />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">

          {/* Meta fields */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-50 rounded-xl p-3.5">
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Status</p>
              <div className="flex items-center gap-1.5">
                <span
                  className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                    isFailed ? 'bg-red-400' : 'bg-emerald-500'
                  }`}
                />
                <span
                  className={`text-xs font-medium ${
                    isFailed ? 'text-red-500' : 'text-emerald-600'
                  }`}
                >
                  {isFailed ? 'Failed' : 'Success'}
                </span>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-3.5">
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Platform</p>
              <div className="flex items-center gap-1.5">
                <PlatformIcon platform={d?.platform} />
                <span className="text-xs font-medium text-gray-700">
                  {platformDisplayName(d?.platform)}
                </span>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-3.5">
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Created</p>
              <p className="text-xs text-gray-700">{formatDateTime(d?.created_at)}</p>
            </div>

            <div className="bg-gray-50 rounded-xl p-3.5">
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                {d?.completed_at ? 'Completed' : 'Duration'}
              </p>
              {d?.completed_at ? (
                <p className="text-xs text-gray-700">{formatDateTime(d.completed_at)}</p>
              ) : (
                <p className="text-xs text-gray-400">—</p>
              )}
            </div>

            {durationSec != null && (
              <div className="col-span-2 bg-brand-light rounded-xl p-3.5">
                <p className="text-[10px] font-semibold text-brand-dark uppercase tracking-wider mb-1.5">Duration</p>
                <p className="text-xs font-semibold text-brand-dark">{formatDuration(durationSec)}</p>
              </div>
            )}

            {/* Integrations Used */}
            {d?.tools_used?.length > 0 && (
              <div className="col-span-2 bg-gray-50 rounded-xl p-3.5">
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2">Integrations Used</p>
                <div className="flex flex-wrap gap-2">
                  {d.tools_used.map((slug) => {
                    const meta = INTEGRATION_ICONS[slug]
                    if (!meta) return <span key={slug} className="text-xs text-gray-500 capitalize">{slug}</span>
                    const { Icon, color, label } = meta
                    return (
                      <div key={slug} className="flex items-center gap-1.5 bg-white border border-gray-200 rounded-lg px-2.5 py-1.5">
                        <Icon size={12} style={{ color }} />
                        <span className="text-xs text-gray-700 font-medium">{label}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div>
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2">Input</p>
            {fetching && !d?.input_text && !d?.input ? (
              <div className="h-20 bg-gray-100 rounded-xl animate-pulse" />
            ) : (
              <pre className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-xs text-gray-700 font-mono whitespace-pre-wrap break-words max-h-48 overflow-y-auto leading-relaxed">
                {d?.input_text ?? d?.input ?? '—'}
              </pre>
            )}
          </div>

          {/* Output / summary */}
          {(d?.output_text ?? d?.output ?? d?.summary) != null && (
            <div>
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2">Output</p>
              {fetching && !detail ? (
                <div className="h-24 bg-gray-100 rounded-xl animate-pulse" />
              ) : (
                <div className="bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 max-h-64 overflow-y-auto leading-relaxed whitespace-pre-wrap break-words">
                  {d?.output_text ?? d?.output ?? d?.summary}
                </div>
              )}
            </div>
          )}

          {/* Error block */}
          {isFailed && (d?.error_message ?? d?.error) && (
            <div>
              <p className="text-[10px] font-semibold text-red-400 uppercase tracking-wider mb-2">Error</p>
              <div className="bg-red-50 border border-red-100 rounded-xl px-4 py-3 text-xs text-red-600 font-mono whitespace-pre-wrap break-words max-h-40 overflow-y-auto leading-relaxed">
                {d?.error_message ?? d?.error}
              </div>
            </div>
          )}

          {/* Fetch error notice */}
          {fetchError && (
            <p className="text-xs text-red-400 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
              Could not load full run details: {fetchError}
            </p>
          )}
        </div>
      </motion.div>
    </>
  )
}

// ─── Motion + page variants ───────────────────────────────────────────────────

const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.22, ease: 'easeOut' } },
  exit:    { opacity: 0, y: -6, transition: { duration: 0.15 } },
}

// ─── Status filter options ────────────────────────────────────────────────────

const STATUS_FILTERS = [
  { value: 'all',     label: 'All' },
  { value: 'success', label: 'Success' },
  { value: 'failed',  label: 'Failed' },
]

// ─── Main component ───────────────────────────────────────────────────────────

export default function ActivityPage() {
  const [runs, setRuns] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [period, setPeriod] = useState(30)
  const [selectedRun, setSelectedRun] = useState(null)
  const [page, setPage] = useState(0)
  const [statusFilter, setStatusFilter] = useState('all')
  const [hasMore, setHasMore] = useState(false)

  const fetchRuns = useCallback(async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      const offset = page * PAGE_SIZE
      const res = await fetch(`${BASE_URL}/runs?limit=${PAGE_SIZE + 1}&offset=${offset}`, {
        headers: {
          'Authorization': `Bearer ${session?.access_token}`,
          'Content-Type': 'application/json',
        },
      })
      if (!res.ok) throw new Error(`Failed to fetch runs: ${res.status}`)
      const data = await res.json()
      const list = Array.isArray(data) ? data : []
      if (list.length > PAGE_SIZE) {
        setHasMore(true)
        setRuns(list.slice(0, PAGE_SIZE))
      } else {
        setHasMore(false)
        setRuns(list)
      }
      setError(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [page])

  useEffect(() => { fetchRuns() }, [fetchRuns])

  // Reset to page 0 when status filter changes
  useEffect(() => { setPage(0) }, [statusFilter])

  // Client-side status filtering
  const filteredRuns = statusFilter === 'all'
    ? runs
    : runs.filter((r) =>
        statusFilter === 'success' ? r.status === 'success' : r.status !== 'success'
      )

  const { total, successRate, avgDurationSec, streak } = computeStats(runs, period)
  const dailyData = computeDailyData(runs, period)

  const showPagination = page > 0 || hasMore

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="p-4 sm:p-8"
    >
      {/* Page header */}
      <div className="mb-5 sm:mb-7">
        <h1 className="text-xl font-bold text-gray-900">Activity</h1>
        <p className="text-sm text-gray-400 mt-0.5">Your automation pulse, live.</p>
      </div>

      {/* Bento grid — 1 col on mobile, 3 cols on md+ */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl">

        {/* Pulse card — spans 2 cols on md+ */}
        <div className="md:col-span-2 bg-white rounded-2xl border border-gray-200 p-4 sm:p-6">
          <div className="flex items-start justify-between mb-1">
            <div>
              <p className="text-sm font-semibold text-gray-800">Successful Automations</p>
              <div className="flex items-baseline gap-2 mt-2">
                {loading ? (
                  <StatsSkeleton />
                ) : (
                  <span className="text-3xl font-bold text-gray-900 leading-none">
                    {total ?? '—'}
                  </span>
                )}
              </div>
            </div>
            <select
              value={period}
              onChange={(e) => setPeriod(Number(e.target.value))}
              className="text-[11px] text-gray-500 font-medium bg-gray-100 hover:bg-gray-200 border-0 rounded-lg px-2.5 py-1 cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand/30 transition-colors"
            >
              {PERIOD_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
          <div className="mt-4">
            <PulseChart data={dailyData} />
          </div>
        </div>


        {/* Secondary metric cards — 3 across on md+ */}
        <MetricCard
          label="Success Rate"
          loading={loading}
          value={successRate != null ? `${successRate}%` : null}
          sub={`Last ${period} days`}
          note={
            successRate != null
              ? successRate === 100
                ? 'Perfect score — keep it up.'
                : successRate >= 80
                ? 'Solid reliability.'
                : 'A few failures worth investigating.'
              : undefined
          }
        />

        <MetricCard
          label="Avg. Run Time"
          loading={loading}
          value={formatDuration(avgDurationSec)}
          sub="per successful run"
          note={
            avgDurationSec != null
              ? avgDurationSec < 30
                ? 'Blazing fast.'
                : avgDurationSec < 120
                ? 'Nice and snappy.'
                : 'Some runs are taking a while.'
              : undefined
          }
        />

        <MetricCard
          label="Active Streak"
          loading={loading}
          value={streak != null && streak > 0 ? streak : null}
          sub={streak > 0 ? `day${streak === 1 ? '' : 's'} in a row` : undefined}
          icon={Flame}
          iconColor={streak > 0 ? '#f97316' : undefined}
          note={
            streak != null && streak > 0
              ? streak >= 7
                ? `${streak} days straight — on fire.`
                : `Keep going to build your streak.`
              : undefined
          }
        />

        {/* Run History — full width */}
        <div className="col-span-1 md:col-span-3 bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="px-4 sm:px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <p className="text-sm font-semibold text-gray-800">Run History</p>
              {!loading && (
                <span className="text-xs text-gray-400">{runs.length} recent runs</span>
              )}
            </div>

            {/* Status filter toggle */}
            <div className="flex items-center gap-0.5 bg-gray-50 rounded-lg p-0.5">
              {STATUS_FILTERS.map((f) => (
                <button
                  key={f.value}
                  onClick={() => setStatusFilter(f.value)}
                  className={`text-[11px] px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                    statusFilter === f.value
                      ? 'bg-brand-light text-brand-dark font-semibold'
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {error && (
            <div className="px-4 sm:px-6 py-4 text-sm text-red-500 bg-red-50 border-b border-red-100">
              {error} — showing available data.
            </div>
          )}

          {/* Horizontally scrollable on small screens */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px]">
              <thead>
                <tr className="border-b border-gray-100">
                  {['Platform', 'Integrations', 'Input', 'Status', 'Time'].map((col) => (
                    <th
                      key={col}
                      className="px-3 sm:px-6 py-3 text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <>
                    <SkeletonRow />
                    <SkeletonRow />
                    <SkeletonRow />
                    <SkeletonRow />
                  </>
                ) : filteredRuns.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-4 sm:px-6 py-10 text-center text-sm text-gray-400">
                      {runs.length === 0
                        ? 'No runs yet. Send a message in the Playground to get started.'
                        : 'No runs match the current filter.'}
                    </td>
                  </tr>
                ) : (
                  <AnimatePresence>
                    {filteredRuns.map((run, i) => (
                      <motion.tr
                        key={run.id}
                        initial={{ opacity: 0, y: -6 }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          transition: { delay: i * 0.045, duration: 0.28, ease: 'easeOut' },
                        }}
                        onClick={() => setSelectedRun(run)}
                        className={`border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors duration-100 cursor-pointer ${
                          i === 0 ? 'bg-brand-light/40' : ''
                        }`}
                      >
                        <td className="px-3 sm:px-6 py-3.5">
                          <div className="flex items-center gap-2">
                            <PlatformIcon platform={run.platform} />
                            <span className="text-sm text-gray-600 font-medium">
                              {platformDisplayName(run.platform)}
                            </span>
                          </div>
                        </td>
                        <td className="px-3 sm:px-6 py-3.5">
                          <IntegrationPips slugs={run.tools_used} />
                        </td>
                        <td className="px-3 sm:px-6 py-3.5 text-sm text-gray-700 max-w-[160px] sm:max-w-xs">
                          <span className="block truncate">
                            {run.input_text ?? run.input ?? '—'}
                          </span>
                        </td>
                        <td className="px-3 sm:px-6 py-3.5">
                          <div className="flex items-center gap-1.5">
                            <span
                              className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                                run.status === 'success' ? 'bg-emerald-500' : 'bg-red-400'
                              }`}
                            />
                            <span
                              className={`text-xs font-medium ${
                                run.status === 'success' ? 'text-emerald-600' : 'text-red-500'
                              }`}
                            >
                              {run.status === 'success' ? 'Success' : 'Failed'}
                            </span>
                          </div>
                        </td>
                        <td className="px-3 sm:px-6 py-3.5 text-xs text-gray-400 whitespace-nowrap">
                          {timeAgo(run.created_at)}
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination controls */}
          {showPagination && (
            <div className="px-4 sm:px-6 py-3 border-t border-gray-100 flex items-center justify-between">
              <button
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={page === 0}
                className="text-xs text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                ← Prev
              </button>
              <span className="text-xs text-gray-300">Page {page + 1}</span>
              <button
                onClick={() => setPage((p) => p + 1)}
                disabled={!hasMore}
                className="text-xs text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                Next →
              </button>
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {selectedRun && (
          <RunDrawer
            key={selectedRun.id}
            run={selectedRun}
            onClose={() => setSelectedRun(null)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}

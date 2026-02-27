import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TrendingUp, Zap } from 'lucide-react'
import { SiTelegram, SiSlack, SiNotion, SiGmail } from 'react-icons/si'
import PulseChart from './PulseChart'
import { supabase } from '../../utils/supabase'

const BASE_URL = import.meta.env.VITE_BACKEND_URL

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
  const recentSuccessful = runs.filter(
    (r) => r.status === 'success' && new Date(r.created_at).getTime() > cutoff
  )
  const total = recentSuccessful.length
  if (total === 0) return { total: null, hoursSaved: null }
  const hoursSaved = Math.round((total * 3) / 60 * 10) / 10
  return { total, hoursSaved }
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

function SkeletonRow() {
  return (
    <tr className="border-b border-gray-50">
      {[180, 260, 80, 80].map((w, i) => (
        <td key={i} className="px-6 py-4">
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

// ─── Motion + page variants ───────────────────────────────────────────────────

const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.22, ease: 'easeOut' } },
  exit:    { opacity: 0, y: -6, transition: { duration: 0.15 } },
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function ActivityPage() {
  const [runs, setRuns] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [period, setPeriod] = useState(30)

  const fetchRuns = useCallback(async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      const res = await fetch(`${BASE_URL}/runs`, {
        headers: {
          'Authorization': `Bearer ${session?.access_token}`,
          'Content-Type': 'application/json',
        },
      })
      if (!res.ok) throw new Error(`Failed to fetch runs: ${res.status}`)
      const data = await res.json()
      setRuns(Array.isArray(data) ? data : [])
      setError(null)
    } catch (err) {
      setError(err.message)
      // Keep runs empty on error — component handles empty state gracefully
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchRuns() }, [fetchRuns])

  const { total, hoursSaved } = computeStats(runs, period)
  const dailyData = computeDailyData(runs, period)

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="p-8"
    >
      {/* Page header */}
      <div className="mb-7">
        <h1 className="text-xl font-bold text-gray-900">Activity</h1>
        <p className="text-sm text-gray-400 mt-0.5">Your automation pulse, live.</p>
      </div>

      {/* Bento grid */}
      <div className="grid grid-cols-3 gap-4 max-w-5xl">

        {/* Pulse card — spans 2 cols */}
        <div className="col-span-2 bg-white rounded-2xl border border-gray-200 p-6">
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

        {/* Time Saved card */}
        <div className="col-span-1 bg-white rounded-2xl border border-gray-200 p-6 flex flex-col justify-between">
          <div>
            <p className="text-sm font-semibold text-gray-800">Time Saved</p>
            <p className="text-xs text-gray-400 mt-0.5">Last {period} days</p>
          </div>
          <div>
            {loading ? (
              <StatsSkeleton />
            ) : (
              <>
                <p className="text-5xl font-bold text-gray-900 leading-none tracking-tight">
                  {hoursSaved ?? '—'}
                </p>
                <p className="text-sm text-gray-400 mt-1.5 font-medium">hours</p>
              </>
            )}
          </div>
          <div className="flex items-center gap-1.5">
            <TrendingUp size={13} className="text-brand flex-shrink-0" />
            <span className="text-xs text-gray-400">
              {hoursSaved != null
                ? `Avg. ${Math.round((hoursSaved / period) * 10) / 10} hrs / day`
                : 'No data yet'}
            </span>
          </div>
        </div>

        {/* Run History — full width */}
        <div className="col-span-3 bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <p className="text-sm font-semibold text-gray-800">Run History</p>
            {!loading && (
              <span className="text-xs text-gray-400">{runs.length} recent runs</span>
            )}
          </div>

          {error && (
            <div className="px-6 py-4 text-sm text-red-500 bg-red-50 border-b border-red-100">
              {error} — showing available data.
            </div>
          )}

          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                {['Platform', 'Input', 'Status', 'Time'].map((col) => (
                  <th
                    key={col}
                    className="px-6 py-3 text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider"
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
              ) : runs.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-10 text-center text-sm text-gray-400">
                    No runs yet. Send a message in the Playground to get started.
                  </td>
                </tr>
              ) : (
                <AnimatePresence>
                  {runs.map((run, i) => (
                    <motion.tr
                      key={run.id}
                      initial={{ opacity: 0, y: -6 }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        transition: { delay: i * 0.045, duration: 0.28, ease: 'easeOut' },
                      }}
                      className={`border-b border-gray-50 last:border-0 hover:bg-gray-50/70 transition-colors duration-100 ${
                        i === 0 ? 'bg-brand-light/40' : ''
                      }`}
                    >
                      <td className="px-6 py-3.5">
                        <div className="flex items-center gap-2">
                          <PlatformIcon platform={run.platform} />
                          <span className="text-sm text-gray-600 font-medium">
                            {platformDisplayName(run.platform)}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-3.5 text-sm text-gray-700 max-w-xs">
                        <span className="block truncate">
                          {run.input_text ?? run.input ?? '—'}
                        </span>
                      </td>
                      <td className="px-6 py-3.5">
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
                      <td className="px-6 py-3.5 text-xs text-gray-400">
                        {timeAgo(run.created_at)}
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  )
}

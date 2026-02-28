import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap, Flame } from 'lucide-react'
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

function SkeletonRow() {
  return (
    <tr className="border-b border-gray-50">
      {[120, 180, 60, 60].map((w, i) => (
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
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchRuns() }, [fetchRuns])

  const { total, successRate, avgDurationSec, streak } = computeStats(runs, period)
  const dailyData = computeDailyData(runs, period)

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
            <p className="text-sm font-semibold text-gray-800">Run History</p>
            {!loading && (
              <span className="text-xs text-gray-400">{runs.length} recent runs</span>
            )}
          </div>

          {error && (
            <div className="px-4 sm:px-6 py-4 text-sm text-red-500 bg-red-50 border-b border-red-100">
              {error} — showing available data.
            </div>
          )}

          {/* Horizontally scrollable on small screens */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[480px]">
              <thead>
                <tr className="border-b border-gray-100">
                  {['Platform', 'Input', 'Status', 'Time'].map((col) => (
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
                ) : runs.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-4 sm:px-6 py-10 text-center text-sm text-gray-400">
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
                        <td className="px-3 sm:px-6 py-3.5">
                          <div className="flex items-center gap-2">
                            <PlatformIcon platform={run.platform} />
                            <span className="text-sm text-gray-600 font-medium">
                              {platformDisplayName(run.platform)}
                            </span>
                          </div>
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
        </div>
      </div>
    </motion.div>
  )
}

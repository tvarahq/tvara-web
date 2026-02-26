import { motion, AnimatePresence } from 'framer-motion'
import { TrendingUp } from 'lucide-react'
import { SiTelegram, SiSlack, SiNotion, SiGmail } from 'react-icons/si'
import PulseChart from './PulseChart'

const MOCK_RUNS = [
  { id: 1, platform: 'telegram', platformName: 'Telegram', input: 'Log $50 in lunch expenses', status: 'success', time: '2 min ago' },
  { id: 2, platform: 'slack',    platformName: 'Slack',    input: 'Send weekly standup report', status: 'success', time: '1 hr ago' },
  { id: 3, platform: 'notion',   platformName: 'Notion',   input: 'Summarize yesterday\'s meeting notes', status: 'success', time: '3 hr ago' },
  { id: 4, platform: 'telegram', platformName: 'Telegram', input: 'Book cab to airport tomorrow', status: 'failed',  time: '5 hr ago' },
  { id: 5, platform: 'gmail',    platformName: 'Gmail',    input: 'Draft reply to investor update email', status: 'success', time: 'Yesterday' },
  { id: 6, platform: 'slack',    platformName: 'Slack',    input: 'Post team sync reminder in #general', status: 'success', time: 'Yesterday' },
  { id: 7, platform: 'notion',   platformName: 'Notion',   input: 'Create Q3 planning page', status: 'success', time: '2 days ago' },
  { id: 8, platform: 'telegram', platformName: 'Telegram', input: 'Track $120 dinner expense', status: 'success', time: '2 days ago' },
]

function PlatformIcon({ platform }) {
  const cls = 'w-3.5 h-3.5 flex-shrink-0'
  switch (platform) {
    case 'telegram': return <SiTelegram className={cls} style={{ color: '#2AABEE' }} />
    case 'slack':    return <SiSlack    className={cls} style={{ color: '#4A154B' }} />
    case 'notion':   return <SiNotion   className={cls} style={{ color: '#1a1a1a' }} />
    case 'gmail':    return <SiGmail    className={cls} style={{ color: '#EA4335' }} />
    default:         return null
  }
}

const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.22, ease: 'easeOut' } },
  exit:    { opacity: 0, y: -6, transition: { duration: 0.15 } },
}

export default function ActivityPage() {
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
                <span className="text-3xl font-bold text-gray-900 leading-none">322</span>
                <span className="text-xs text-emerald-500 font-semibold">+18% vs last month</span>
              </div>
            </div>
            <span className="text-[10px] text-gray-400 font-medium bg-gray-100 px-2 py-1 rounded-lg">
              Last 30 days
            </span>
          </div>
          <div className="mt-4">
            <PulseChart />
          </div>
        </div>

        {/* Time Saved card */}
        <div className="col-span-1 bg-white rounded-2xl border border-gray-200 p-6 flex flex-col justify-between">
          <div>
            <p className="text-sm font-semibold text-gray-800">Time Saved</p>
            <p className="text-xs text-gray-400 mt-0.5">This week</p>
          </div>
          <div>
            <p className="text-5xl font-bold text-gray-900 leading-none tracking-tight">4.2</p>
            <p className="text-sm text-gray-400 mt-1.5 font-medium">hours</p>
          </div>
          <div className="flex items-center gap-1.5">
            <TrendingUp size={13} className="text-brand flex-shrink-0" />
            <span className="text-xs text-gray-400">Avg. 0.6 hrs / day</span>
          </div>
        </div>

        {/* Run History — full width */}
        <div className="col-span-3 bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <p className="text-sm font-semibold text-gray-800">Run History</p>
            <span className="text-xs text-gray-400">{MOCK_RUNS.length} recent runs</span>
          </div>

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
              <AnimatePresence>
                {MOCK_RUNS.map((run, i) => (
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
                        <span className="text-sm text-gray-600 font-medium">{run.platformName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-3.5 text-sm text-gray-700 max-w-xs">
                      <span className="block truncate">{run.input}</span>
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
                    <td className="px-6 py-3.5 text-xs text-gray-400">{run.time}</td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  )
}

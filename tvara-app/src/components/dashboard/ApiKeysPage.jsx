import { useState } from 'react'
import { motion } from 'framer-motion'
import { Copy, Check, RefreshCw, Eye, EyeOff, AlertTriangle } from 'lucide-react'

const MOCK_API_KEY = 'tvk_live_a8f2c1e9d4b73625af018e3c6b7d9f42'

const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.22, ease: 'easeOut' } },
  exit:    { opacity: 0, y: -6, transition: { duration: 0.15 } },
}

export default function ApiKeysPage() {
  const [revealed, setRevealed] = useState(false)
  const [copied, setCopied]     = useState(false)

  const displayKey = revealed
    ? MOCK_API_KEY
    : MOCK_API_KEY.slice(0, 10) + '•'.repeat(22)

  function handleCopy() {
    navigator.clipboard.writeText(MOCK_API_KEY)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="p-4 sm:p-8 max-w-2xl"
    >
      {/* Page header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-xl font-bold text-gray-900">API Keys</h1>
        <p className="text-sm text-gray-400 mt-0.5">
          Use this key to authenticate requests to the Tvara API.
        </p>
      </div>

      {/* Key card */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-4">
        <div className="flex items-center justify-between mb-1">
          <p className="text-sm font-semibold text-gray-800">Your Tvara API Key</p>
          <span className="text-[11px] bg-emerald-50 text-emerald-600 font-semibold px-2.5 py-0.5 rounded-full">
            Active
          </span>
        </div>
        <p className="text-xs text-gray-400 mb-5">
          Keep this key secret — do not commit it to version control or share it publicly.
        </p>

        {/* Key field */}
        <div className="flex items-center gap-2 bg-gray-50 rounded-xl border border-gray-200 px-4 py-3">
          <code className="flex-1 text-xs text-gray-700 font-mono tracking-wide overflow-hidden text-ellipsis whitespace-nowrap select-all">
            {displayKey}
          </code>
          <button
            onClick={() => setRevealed((v) => !v)}
            className="p-1.5 text-gray-400 hover:text-gray-700 transition-colors cursor-pointer rounded-lg hover:bg-gray-200"
            title={revealed ? 'Hide key' : 'Reveal key'}
          >
            {revealed ? <EyeOff size={13} /> : <Eye size={13} />}
          </button>
          <button
            onClick={handleCopy}
            className="p-1.5 text-gray-400 hover:text-brand-dark transition-colors cursor-pointer rounded-lg hover:bg-brand-light"
            title="Copy key"
          >
            {copied ? (
              <Check size={13} className="text-emerald-500" />
            ) : (
              <Copy size={13} />
            )}
          </button>
        </div>

        {/* Meta row */}
        <div className="mt-5 pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs text-gray-500">
              Created on <span className="font-semibold text-gray-700">Jun 12, 2025</span>
            </p>
            <p className="text-xs text-gray-400 mt-0.5">Last used 2 days ago</p>
          </div>
          <button className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-brand-dark font-medium transition-colors cursor-pointer">
            <RefreshCw size={11} />
            Regenerate
          </button>
        </div>
      </div>

      {/* Tip card */}
      <div className="bg-amber-50 rounded-2xl border border-amber-100 p-5 flex gap-3">
        <AlertTriangle size={15} className="text-amber-500 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-xs font-semibold text-amber-700">Using the Tvara Framework?</p>
          <p className="text-xs text-amber-600 mt-1 leading-relaxed">
            Set{' '}
            <code className="bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded font-mono">
              TVARA_API_KEY
            </code>{' '}
            in your environment to authenticate your agent. Never hard-code this value in source files.
          </p>
        </div>
      </div>
    </motion.div>
  )
}

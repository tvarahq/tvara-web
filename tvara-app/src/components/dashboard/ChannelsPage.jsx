import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RefreshCw, Unplug, ExternalLink, CheckCircle2, MessageCircle, Zap, Bot } from 'lucide-react'
import { FaTelegram } from 'react-icons/fa'
import { getTelegramStatus, linkTelegram, unlinkTelegram } from '../../utils/api'
import { useToast } from '../../context/ToastContext'

const TELEGRAM_COLOR = '#229ED9'

const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.22, ease: 'easeOut' } },
  exit:    { opacity: 0, y: -6, transition: { duration: 0.15 } },
}

// ─── TelegramCard ─────────────────────────────────────────────────────────────

function TelegramCard({ status, onRefresh }) {
  const [actioning, setActioning]     = useState(false)
  const [pendingLink, setPendingLink] = useState(false)
  const [telegramUrl, setTelegramUrl] = useState(null)
  const { toast } = useToast()

  const isLinked = status?.linked ?? false

  async function handleConnect() {
    setActioning(true)
    try {
      const { bot_username, token } = await linkTelegram()
      const url = `https://t.me/${bot_username}?start=${token}`
      setTelegramUrl(url)
      setPendingLink(true)
      window.open(url, '_blank', 'noopener,noreferrer')
    } catch {
      toast.error('Failed to generate Telegram link')
    } finally {
      setActioning(false)
    }
  }

  async function handleUnlink() {
    setActioning(true)
    try {
      await unlinkTelegram()
      setPendingLink(false)
      await onRefresh()
      toast.success('Telegram unlinked')
    } catch {
      toast.error('Failed to unlink Telegram')
    } finally {
      setActioning(false)
    }
  }

  async function handleCheckStatus() {
    setActioning(true)
    try {
      await onRefresh()
      setPendingLink(false)
    } finally {
      setActioning(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white max-w-sm"
    >
      {/* Teal gradient accent bar */}
      <div
        className="absolute inset-x-0 top-0 h-[3px] rounded-t-2xl"
        style={{ background: `linear-gradient(90deg, ${TELEGRAM_COLOR}, #3399B4)` }}
      />

      <div className="px-5 pt-6 pb-5">

        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: `${TELEGRAM_COLOR}14`, border: `1.5px solid ${TELEGRAM_COLOR}28` }}
            >
              <FaTelegram size={22} style={{ color: TELEGRAM_COLOR }} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-gray-900">Telegram</span>
                {isLinked ? (
                  <span className="text-[10px] font-semibold bg-emerald-50 text-emerald-600 border border-emerald-100 px-1.5 py-px rounded-full">
                    Linked
                  </span>
                ) : (
                  <span className="text-[10px] font-semibold bg-gray-100 text-gray-400 px-1.5 py-px rounded-full">
                    Not linked
                  </span>
                )}
              </div>
              <p className="text-[11px] text-gray-400 mt-0.5">Output channel</p>
            </div>
          </div>
        </div>

        {/* Value prop */}
        <p className="text-xs text-gray-500 leading-relaxed mb-4">
          Chat with your Tvara AI agent directly on Telegram. Trigger tasks, get results, and stay in the loop — no app switching required.
        </p>

        {/* Feature highlights */}
        <div className="flex flex-col gap-2 mb-5">
          {[
            { icon: Bot,           label: 'Full agent access via chat' },
            { icon: Zap,           label: 'Runs tasks in the background' },
            { icon: MessageCircle, label: 'Replies with results & summaries' },
          ].map(({ icon: FeatureIcon, label }) => (
            <div key={label} className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-md bg-brand-light flex items-center justify-center flex-shrink-0">
                <FeatureIcon size={11} className="text-brand-dark" />
              </div>
              <span className="text-[11px] text-gray-500">{label}</span>
            </div>
          ))}
        </div>

        {/* Pending link — step indicator */}
        <AnimatePresence>
          {pendingLink && !isLinked && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden mb-4"
            >
              <div className="rounded-xl border border-brand-mid bg-brand-light p-3.5">
                <p className="text-xs font-semibold text-brand-dark mb-1.5">Waiting for confirmation</p>
                <ol className="space-y-1.5">
                  <li className="flex items-center gap-2 text-[11px] text-brand-dark">
                    <CheckCircle2 size={13} className="text-brand flex-shrink-0" />
                    Link opened in Telegram
                  </li>
                  <li className="flex items-center gap-2 text-[11px] text-gray-500">
                    <div className="w-3.5 h-3.5 rounded-full border-2 border-gray-300 flex-shrink-0" />
                    Send <span className="font-mono font-bold text-gray-700 mx-1">/start</span> to the bot
                  </li>
                </ol>
                {telegramUrl && (
                  <a
                    href={telegramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-brand-dark hover:text-brand transition-colors"
                  >
                    <ExternalLink size={11} />
                    Tap here to open Telegram
                  </a>
                )}
                <button
                  onClick={handleCheckStatus}
                  disabled={actioning}
                  className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-brand-dark hover:text-brand transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-default"
                >
                  {actioning ? <RefreshCw size={11} className="animate-spin" /> : <RefreshCw size={11} />}
                  Check link status
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Linked metadata */}
        {isLinked && status?.chat_id && (
          <div className="flex items-center gap-3 mb-4 px-3 py-2.5 rounded-xl bg-gray-50 border border-gray-100">
            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-0.5">Chat ID</p>
              <code className="text-xs text-gray-700 font-mono">{status.chat_id}</code>
            </div>
            <div className="w-px h-7 bg-gray-200 flex-shrink-0" />
            <div>
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-0.5">Status</p>
              <div className="flex items-center gap-1.5">
                <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                <p className="text-xs text-gray-700 font-medium">Active</p>
              </div>
            </div>
          </div>
        )}

        {/* CTA */}
        {isLinked ? (
          <div className="flex items-center justify-between">
            <a
              href="https://t.me"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-semibold text-brand hover:text-brand-dark transition-colors"
            >
              <ExternalLink size={12} />
              Open in Telegram
            </a>
            <button
              onClick={handleUnlink}
              disabled={actioning}
              className="flex items-center gap-1.5 text-xs text-red-400 font-medium px-3 py-1.5 rounded-xl border border-red-100 hover:bg-red-50 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-default"
            >
              {actioning ? <RefreshCw size={10} className="animate-spin" /> : <Unplug size={10} />}
              {actioning ? 'Removing…' : 'Unlink'}
            </button>
          </div>
        ) : (
          <button
            onClick={handleConnect}
            disabled={actioning}
            className="w-full flex items-center justify-center gap-2 text-sm font-semibold py-2.5 rounded-xl transition-all duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-default"
            style={{
              background: actioning ? '#e5e7eb' : `linear-gradient(135deg, ${TELEGRAM_COLOR}, #2B88C8)`,
              color: actioning ? '#9ca3af' : 'white',
              boxShadow: actioning ? 'none' : `0 2px 12px ${TELEGRAM_COLOR}40`,
            }}
          >
            {actioning ? (
              <RefreshCw size={14} className="animate-spin" />
            ) : (
              <FaTelegram size={15} />
            )}
            {actioning ? 'Opening Telegram…' : 'Connect Telegram'}
          </button>
        )}

      </div>
    </motion.div>
  )
}

// ─── Skeleton ──────────────────────────────────────────────────────────────────

function Skeleton() {
  return (
    <div className="p-4 sm:p-8 animate-pulse">
      <div className="h-5 w-24 bg-gray-200 rounded-lg mb-2" />
      <div className="h-3.5 w-56 bg-gray-100 rounded-lg mb-8" />
      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden max-w-sm">
        <div className="h-[3px] bg-gray-100 rounded-t-2xl" />
        <div className="p-5 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gray-100 flex-shrink-0" />
            <div className="space-y-1.5">
              <div className="h-3.5 w-20 bg-gray-200 rounded" />
              <div className="h-2.5 w-16 bg-gray-100 rounded" />
            </div>
          </div>
          <div className="space-y-1.5">
            <div className="h-2.5 w-full bg-gray-100 rounded" />
            <div className="h-2.5 w-4/5 bg-gray-100 rounded" />
          </div>
          <div className="h-9 w-full bg-gray-100 rounded-xl" />
        </div>
      </div>
    </div>
  )
}

// ─── ChannelsPage ──────────────────────────────────────────────────────────────

export default function ChannelsPage() {
  const [telegramStatus, setTelegramStatus] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchStatus = useCallback(async () => {
    try {
      const status = await getTelegramStatus()
      setTelegramStatus(status)
    } catch {
      setTelegramStatus({ linked: false, chat_id: null })
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchStatus() }, [fetchStatus])

  if (loading) return <Skeleton />

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="p-4 sm:p-8"
    >
      <div className="mb-7">
        <h1 className="text-xl font-bold text-gray-900">Channels</h1>
        <p className="text-sm text-gray-400 mt-0.5">Connect messaging channels to interact with your agent on the go.</p>
      </div>

      <TelegramCard status={telegramStatus} onRefresh={fetchStatus} />
    </motion.div>
  )
}

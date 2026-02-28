import { useState, useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Send, Loader2, CheckCircle2, XCircle, ChevronDown, ChevronRight } from 'lucide-react'
import { SiGmail, SiGithub, SiSlack, SiNotion, SiTelegram } from 'react-icons/si'
import ReactMarkdown from 'react-markdown'
import { supabase } from '../../utils/supabase'

const BASE_URL = import.meta.env.VITE_BACKEND_URL

const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.22, ease: 'easeOut' } },
  exit:    { opacity: 0, y: -6, transition: { duration: 0.15 } },
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function generateId() {
  return Math.random().toString(36).slice(2, 10)
}

// Returns a subtle icon element if the step text references a known tool prefix.
const TOOL_ICONS = [
  { prefix: 'gmail_',    Icon: SiGmail,    color: '#EA4335' },
  { prefix: 'github_',   Icon: SiGithub,   color: '#24292f' },
  { prefix: 'slack_',    Icon: SiSlack,    color: '#4A154B' },
  { prefix: 'notion_',   Icon: SiNotion,   color: '#1a1a1a' },
  { prefix: 'telegram_', Icon: SiTelegram, color: '#2AABEE' },
]

function StepToolIcon({ step }) {
  const lower = step.toLowerCase()
  const match = TOOL_ICONS.find(({ prefix }) => lower.includes(prefix))
  if (!match) return null
  const { Icon, color } = match
  return (
    <Icon
      className="flex-shrink-0 mt-0.5 opacity-60"
      style={{ color, width: 11, height: 11 }}
    />
  )
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function ThinkingSteps({ steps, isStreaming }) {
  const [collapsed, setCollapsed] = useState(false)

  // Auto-collapse when streaming finishes
  useEffect(() => {
    if (!isStreaming && steps.length > 0) {
      setCollapsed(true)
    }
  }, [isStreaming, steps.length])

  if (steps.length === 0) return null

  return (
    <div className="mt-2 rounded-xl border border-gray-100 bg-gray-50 overflow-hidden">
      <button
        onClick={() => setCollapsed((v) => !v)}
        className="w-full flex items-center gap-2 px-3 py-2 text-left text-xs text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
      >
        {collapsed ? (
          <ChevronRight size={12} className="flex-shrink-0" />
        ) : (
          <ChevronDown size={12} className="flex-shrink-0" />
        )}
        <span className="font-medium">
          {isStreaming ? 'Thinking…' : `${steps.length} thinking step${steps.length === 1 ? '' : 's'}`}
        </span>
        {isStreaming && (
          <span className="ml-auto flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
          </span>
        )}
      </button>

      {!collapsed && (
        <div className="px-3 pb-3 space-y-1.5 border-t border-gray-100">
          {steps.map((step, i) => (
            <div key={i} className="flex items-start gap-2 pt-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-mid flex-shrink-0 mt-1.5" />
              <p className="text-xs text-gray-500 leading-relaxed flex-1">{step}</p>
              <StepToolIcon step={step} />
            </div>
          ))}
          {isStreaming && (
            <div className="flex items-center gap-2 pt-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand flex-shrink-0 animate-pulse" />
              <p className="text-xs text-gray-400 italic">Processing…</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function ResultCard({ summary, status }) {
  const isSuccess = status === 'success'
  return (
    <div className={`mt-2 rounded-xl border p-4 ${
      isSuccess
        ? 'bg-emerald-50 border-emerald-100'
        : 'bg-red-50 border-red-100'
    }`}>
      <div className="flex items-center gap-2 mb-1.5">
        {isSuccess ? (
          <CheckCircle2 size={14} className="text-emerald-500 flex-shrink-0" />
        ) : (
          <XCircle size={14} className="text-red-400 flex-shrink-0" />
        )}
        <span className={`text-xs font-semibold ${isSuccess ? 'text-emerald-700' : 'text-red-600'}`}>
          {isSuccess ? 'Done' : 'Failed'}
        </span>
      </div>
      {summary && (
        <div className="prose prose-sm prose-gray max-w-none text-gray-700 [&_p]:leading-relaxed [&_ul]:ml-4 [&_ul]:list-disc [&_ol]:ml-4 [&_ol]:list-decimal [&_li]:my-0.5 [&_strong]:font-semibold">
          <ReactMarkdown>{summary}</ReactMarkdown>
        </div>
      )}
    </div>
  )
}

function AssistantMessage({ message }) {
  const { steps = [], summary, status, isStreaming, content } = message

  // Plain error fallback
  if (content && !steps.length && !summary) {
    return (
      <div className="max-w-[90%] sm:max-w-[80%] rounded-2xl rounded-tl-sm bg-white border border-gray-200 px-4 py-3 prose prose-sm prose-gray max-w-none [&_p]:leading-relaxed [&_ul]:ml-4 [&_ul]:list-disc [&_ol]:ml-4 [&_ol]:list-decimal [&_li]:my-0.5 [&_strong]:font-semibold">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    )
  }

  return (
    <div className="max-w-[90%] sm:max-w-[80%]">
      {/* Thinking steps */}
      <ThinkingSteps steps={steps} isStreaming={isStreaming} />

      {/* Result card — appears when streaming finishes */}
      {summary && !isStreaming && (
        <ResultCard summary={summary} status={status} />
      )}

      {/* Inline streaming indicator when there are no steps yet */}
      {isStreaming && steps.length === 0 && (
        <div className="flex items-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-2xl rounded-tl-sm">
          <Loader2 size={13} className="text-brand animate-spin" />
          <span className="text-xs text-gray-400">Working on it…</span>
        </div>
      )}
    </div>
  )
}

function UserMessage({ content }) {
  return (
    <div className="max-w-[90%] sm:max-w-[80%] ml-auto rounded-2xl rounded-tr-sm bg-brand px-4 py-3 text-sm text-white leading-relaxed whitespace-pre-wrap">
      {content}
    </div>
  )
}

function EmptyState() {
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="text-center max-w-sm px-4">
        <div className="w-12 h-12 rounded-2xl bg-brand-light flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">✦</span>
        </div>
        <p className="text-sm text-gray-400 leading-relaxed">
          Ask me to automate anything — schedule a meeting, send a report, summarize emails…
        </p>
      </div>
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function PlaygroundPage() {
  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [isStreaming, setIsStreaming] = useState(false)
  const sessionIdRef = useRef(crypto.randomUUID())
  const bottomRef = useRef(null)
  const textareaRef = useRef(null)

  // Auto-scroll to bottom on new messages / content changes
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = useCallback(async () => {
    const text = inputValue.trim()
    if (!text || isStreaming) return

    const userMsgId = generateId()
    const assistantMsgId = generateId()

    setInputValue('')
    setIsStreaming(true)

    // Push user message
    setMessages((prev) => [
      ...prev,
      { id: userMsgId, role: 'user', content: text },
    ])

    // Push placeholder assistant message
    setMessages((prev) => [
      ...prev,
      { id: assistantMsgId, role: 'assistant', content: '', steps: [], summary: null, status: null, isStreaming: true },
    ])

    try {
      const { data: { session } } = await supabase.auth.getSession()
      const token = session?.access_token

      const res = await fetch(`${BASE_URL}/playground/chat`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: text,
          session_id: sessionIdRef.current,
        }),
      })

      if (!res.ok) {
        throw new Error(`Request failed: ${res.status} ${res.statusText}`)
      }

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ''

      // eslint-disable-next-line no-constant-condition
      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })

        // SSE messages are separated by double newlines
        const parts = buffer.split('\n\n')
        buffer = parts.pop() ?? '' // Keep incomplete last chunk

        for (const part of parts) {
          const line = part.trim()
          if (!line.startsWith('data:')) continue

          const jsonStr = line.slice('data:'.length).trim()
          if (!jsonStr || jsonStr === '[DONE]') continue

          let parsed
          try {
            parsed = JSON.parse(jsonStr)
          } catch {
            continue
          }

          const { event, step, summary, status, detail } = parsed

          setMessages((prev) =>
            prev.map((msg) => {
              if (msg.id !== assistantMsgId) return msg

              if (event === 'thinking' && step) {
                return { ...msg, steps: [...(msg.steps ?? []), step] }
              }

              if (event === 'result') {
                return {
                  ...msg,
                  summary: summary ?? null,
                  status: status ?? 'success',
                  isStreaming: false,
                }
              }

              if (event === 'error') {
                return {
                  ...msg,
                  summary: detail || 'An error occurred. Please try again.',
                  status: 'error',
                  steps: [],
                  isStreaming: false,
                }
              }

              if (event === 'done') {
                return { ...msg, isStreaming: false }
              }

              return msg
            })
          )
        }
      }

      // Finalize in case the stream ended without an explicit result event
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantMsgId ? { ...msg, isStreaming: false } : msg
        )
      )
    } catch (err) {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantMsgId
            ? {
                ...msg,
                content: `Something went wrong: ${err.message}`,
                steps: [],
                isStreaming: false,
              }
            : msg
        )
      )
    } finally {
      setIsStreaming(false)
    }
  }, [inputValue, isStreaming])

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="flex flex-col h-full p-4 sm:p-8"
    >
      {/* Page header */}
      <div className="mb-4 sm:mb-6 flex-shrink-0">
        <h1 className="text-xl font-bold text-gray-900">Playground</h1>
        <p className="text-sm text-gray-400 mt-0.5">Describe what you want to automate</p>
      </div>

      {/* Chat area */}
      <div className="flex-1 bg-white rounded-2xl border border-gray-200 flex flex-col overflow-hidden min-h-0">

        {/* Message thread */}
        <div className="flex-1 overflow-y-auto px-3 sm:px-6 py-4 sm:py-5 flex flex-col gap-4">
          {messages.length === 0 ? (
            <EmptyState />
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'user' ? (
                  <UserMessage content={msg.content} />
                ) : (
                  <AssistantMessage message={msg} />
                )}
              </div>
            ))
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input area */}
        <div className="flex-shrink-0 border-t border-gray-100 px-4 py-3">
          <div className="flex items-end gap-3">
            <textarea
              ref={textareaRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isStreaming}
              placeholder="Type a message…"
              rows={2}
              className="flex-1 resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-brand-mid focus:bg-white transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ maxHeight: '7.5rem' }}
            />
            <button
              onClick={sendMessage}
              disabled={isStreaming || !inputValue.trim()}
              className="flex-shrink-0 w-10 h-10 rounded-xl bg-brand text-white flex items-center justify-center transition-all duration-150 hover:bg-brand-dark disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              aria-label="Send message"
            >
              {isStreaming ? (
                <Loader2 size={15} className="animate-spin" />
              ) : (
                <Send size={15} />
              )}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

import { createContext, useContext, useState, useCallback, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle, AlertCircle, Info } from 'lucide-react'

const ToastContext = createContext(null)

const TOAST_DURATION = 3500

const TOAST_STYLES = {
  success: {
    container: 'bg-emerald-50 border border-emerald-200 text-emerald-700',
    Icon: CheckCircle,
  },
  error: {
    container: 'bg-red-50 border border-red-100 text-red-600',
    Icon: AlertCircle,
  },
  info: {
    container: 'bg-brand-light border border-brand-mid text-brand-dark',
    Icon: Info,
  },
}

const toastVariants = {
  initial: { x: 40, opacity: 0 },
  animate: { x: 0, opacity: 1, transition: { duration: 0.22, ease: 'easeOut' } },
  exit:    { x: 40, opacity: 0, transition: { duration: 0.18, ease: 'easeIn' } },
}

function ToastItem({ toast, onDismiss }) {
  const { container, Icon } = TOAST_STYLES[toast.type] ?? TOAST_STYLES.info

  return (
    <motion.div
      layout
      variants={toastVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={`flex items-center gap-2.5 rounded-2xl shadow-lg px-4 py-3 min-w-[220px] max-w-[340px] cursor-pointer select-none ${container}`}
      onClick={() => onDismiss(toast.id)}
      role="alert"
      aria-live="polite"
    >
      <Icon size={15} className="flex-shrink-0" />
      <span className="text-sm leading-snug">{toast.message}</span>
    </motion.div>
  )
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])
  const nextId = useRef(0)

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const addToast = useCallback((message, type) => {
    const id = nextId.current++
    setToasts((prev) => [...prev, { id, message, type }])
    setTimeout(() => dismiss(id), TOAST_DURATION)
  }, [dismiss])

  const toast = {
    success: (message) => addToast(message, 'success'),
    error:   (message) => addToast(message, 'error'),
    info:    (message) => addToast(message, 'info'),
  }

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}

      {/* Toast stack — fixed bottom-right */}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2 items-end pointer-events-none">
        <AnimatePresence mode="popLayout">
          {toasts.map((t) => (
            <div key={t.id} className="pointer-events-auto">
              <ToastItem toast={t} onDismiss={dismiss} />
            </div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used inside ToastProvider')
  return ctx
}

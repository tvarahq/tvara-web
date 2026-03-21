import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const STORAGE_KEY = 'tvara_onboarding_done'

const STEPS = [
  {
    title: 'Welcome to Tvara',
    body: 'Your AI automation co-pilot. Describe any task in plain English and I\'ll handle it across your apps.',
    cta: 'Get started →',
  },
  {
    title: 'Connect your tools',
    body: 'Head to Integrations to connect Gmail, Twitter, GitHub, Slack, or Notion.',
    cta: 'Go to Integrations →',
  },
  {
    title: 'Try the Playground',
    body: 'Type any task — try: "Summarise my unread emails from today".',
    cta: 'Open Playground →',
  },
  {
    title: 'Link Telegram',
    body: 'Chat with your agent on the go — no app switching needed. Find the Telegram link in Integrations.',
    cta: 'Finish',
  },
]

export default function OnboardingWalkthrough({ setActiveTab, isGuest }) {
  const [step, setStep] = useState(0)
  const [visible, setVisible] = useState(() => {
    if (isGuest) return false
    return !localStorage.getItem(STORAGE_KEY)
  })

  if (!visible) return null

  function dismiss() {
    localStorage.setItem(STORAGE_KEY, '1')
    setVisible(false)
  }

  function handleCta() {
    if (step === 1) setActiveTab('integrations')
    if (step === 2) setActiveTab('playground')

    if (step < STEPS.length - 1) {
      setStep((s) => s + 1)
    } else {
      dismiss()
    }
  }

  const current = STEPS[step]

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/40 z-40"
            onClick={dismiss}
          />

          {/* Card — centered on md+, bottom-sheet on mobile */}
          <motion.div
            key="card"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed z-50 bottom-0 inset-x-0 rounded-t-2xl bg-white shadow-xl px-6 pt-6 pb-8
                       md:bottom-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2
                       md:inset-x-auto md:w-full md:max-w-md md:rounded-2xl md:pb-6"
          >
            {/* Progress dots */}
            <div className="flex items-center justify-center gap-1.5 mb-6">
              {STEPS.map((_, i) => (
                <motion.span
                  key={i}
                  layout
                  transition={{ duration: 0.2 }}
                  className={`h-1.5 rounded-full transition-all duration-200 ${
                    i === step
                      ? 'w-6 bg-brand'
                      : i < step
                      ? 'w-1.5 bg-brand-mid'
                      : 'w-1.5 bg-gray-200'
                  }`}
                />
              ))}
            </div>

            {/* Step content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.18 }}
              >
                <h2 className="text-lg font-bold text-gray-900 mb-2">{current.title}</h2>
                <p className="text-sm text-gray-500 leading-relaxed">{current.body}</p>
              </motion.div>
            </AnimatePresence>

            {/* Buttons */}
            <div className="flex items-center justify-between mt-6">
              <button
                onClick={dismiss}
                className="text-sm text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
              >
                Skip tour
              </button>
              <button
                onClick={handleCta}
                className="text-sm font-semibold px-5 py-2.5 rounded-xl bg-brand text-white hover:bg-brand-dark transition-colors cursor-pointer"
              >
                {current.cta}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

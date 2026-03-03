import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, ArrowRight } from 'lucide-react'
import { SiGooglesheets, SiNotion, SiSlack, SiGmail, SiGithub, SiLinear, SiTelegram } from 'react-icons/si'
import { staggerContainer, staggerItem } from '../../utils/animations'

const USE_CASES = [
  {
    id: 'ops',
    label: 'Operations',
    headline: 'Run ops from one message.',
    trigger: { message: '"Log Q4 server costs and notify the team"', time: '10:24 AM' },
    steps: [
      { tool: 'Google Sheets', icon: SiGooglesheets, color: '#34A853', iconBg: 'bg-green-50', action: 'Row added to "Q4 Expenses"' },
      { tool: 'Notion',        icon: SiNotion,        color: '#000000', iconBg: 'bg-gray-100', action: 'Page updated: Q4 Financials' },
      { tool: 'Slack',         icon: SiSlack,         color: '#4A154B', iconBg: 'bg-purple-50', action: 'Message sent to #finance' },
      { tool: 'Gmail',         icon: SiGmail,         color: '#EA4335', iconBg: 'bg-red-50', action: 'Summary emailed to board' },
    ],
  },
  {
    id: 'eng',
    label: 'Engineering',
    headline: 'Ship faster with zero overhead.',
    trigger: { message: '"Create a Linear ticket for the auth bug and ping the team"', time: '2:07 PM' },
    steps: [
      { tool: 'Linear',  icon: SiLinear,  color: '#5E6AD2', iconBg: 'bg-indigo-50',  action: 'Issue created: AUTH-412' },
      { tool: 'GitHub',  icon: SiGithub,  color: '#181717', iconBg: 'bg-gray-100',   action: 'Linked to PR #89' },
      { tool: 'Slack',   icon: SiSlack,   color: '#4A154B', iconBg: 'bg-purple-50',  action: 'Pinged #backend channel' },
    ],
  },
  {
    id: 'comms',
    label: 'Communications',
    headline: 'Never drop the ball on outreach.',
    trigger: { message: '"Draft a follow-up email to the investor list and log the send in Notion"', time: '9:03 AM' },
    steps: [
      { tool: 'Gmail',  icon: SiGmail,  color: '#EA4335', iconBg: 'bg-red-50',    action: '12 drafts created' },
      { tool: 'Notion', icon: SiNotion, color: '#000000', iconBg: 'bg-gray-100',  action: 'CRM page updated' },
      { tool: 'Slack',  icon: SiSlack,  color: '#4A154B', iconBg: 'bg-purple-50', action: 'Summary sent to #founders' },
    ],
  },
]

function StepCard({ tool, icon: Icon, color, iconBg, action }) {
  return (
    <motion.div
      variants={staggerItem}
      className="bg-white border border-gray-200 rounded-2xl px-4 py-3 flex flex-col gap-2 w-full sm:w-[158px] flex-shrink-0 shadow-sm"
    >
      <div className="flex items-center gap-2">
        <div className={`w-7 h-7 rounded-lg ${iconBg} flex items-center justify-center flex-shrink-0`}>
          <Icon size={14} color={color} />
        </div>
        <span className="text-xs font-semibold text-gray-500 truncate">{tool}</span>
      </div>
      <p className="text-xs font-medium text-gray-700 leading-snug">{action}</p>
      <p className="text-xs text-green-600 font-semibold flex items-center gap-1 mt-auto">
        <CheckCircle2 size={11} /> Done
      </p>
    </motion.div>
  )
}

export default function WorkflowSection() {
  const [active, setActive] = useState('ops')
  const current = USE_CASES.find((u) => u.id === active)

  return (
    <section className="bg-white py-20 px-6 border-t border-gray-100">
      {/* Header */}
      <div className="max-w-5xl mx-auto text-center mb-10">
        <motion.p
          className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          Workflows
        </motion.p>
        <motion.h2
          className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight tracking-tight"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.08 }}
        >
          One message.{' '}
          <span className="text-gray-400">Many actions. Zero tabs.</span>
        </motion.h2>
        <motion.p
          className="text-sm text-gray-500 font-medium mt-4 max-w-md mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.16 }}
        >
          Tvara chains actions across your stack. A single text does the work of multiple open tabs.
        </motion.p>

        {/* Tabs */}
        <motion.div
          className="flex items-center justify-center gap-1 mt-8"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: 0.25 }}
        >
          {USE_CASES.map((uc) => (
            <button
              key={uc.id}
              onClick={() => setActive(uc.id)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-150 ${
                active === uc.id
                  ? 'bg-gray-900 text-white shadow-sm'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              }`}
            >
              {uc.label}
            </button>
          ))}
        </motion.div>
      </div>

      {/* Pipeline */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
        >
          <motion.div
            className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-center sm:items-stretch gap-1 sm:gap-0"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {/* Trigger bubble */}
            <motion.div
              className="flex flex-col justify-center gap-2 flex-shrink-0 w-full sm:w-auto"
              variants={staggerItem}
            >
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest text-center sm:text-left mb-1">
                Trigger
              </p>
              <div className="bg-green-50 border border-green-200 rounded-2xl rounded-bl-sm px-4 py-3 max-w-[220px] mx-auto sm:mx-0">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <SiTelegram size={11} color="#26A5E4" />
                  </div>
                  <span className="text-xs font-semibold text-green-700">Telegram</span>
                </div>
                <p className="text-xs font-medium text-gray-800 leading-snug">
                  {current.trigger.message}
                </p>
                <p className="text-xs text-gray-400 mt-1.5 text-right">
                  {current.trigger.time}
                </p>
              </div>
            </motion.div>

            {/* Steps */}
            {current.steps.map(({ tool, icon, color, iconBg, action }) => (
              <div key={tool} className="contents">
                <motion.div variants={staggerItem} className="flex items-center">
                  <div className="hidden sm:flex items-center flex-shrink-0 px-1">
                    <ArrowRight size={14} className="text-gray-300" />
                  </div>
                  <div className="flex sm:hidden justify-center py-1">
                    <ArrowRight size={14} className="text-gray-300 rotate-90" />
                  </div>
                </motion.div>
                <StepCard tool={tool} icon={icon} color={color} iconBg={iconBg} action={action} />
              </div>
            ))}
          </motion.div>
        </motion.div>
      </AnimatePresence>

      <motion.p
        className="text-center text-xs text-gray-400 font-medium mt-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.5 }}
      >
        All steps execute on Tvara&apos;s servers · No code required
      </motion.p>
    </section>
  )
}

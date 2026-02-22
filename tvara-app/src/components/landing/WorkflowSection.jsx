import { motion } from 'framer-motion'
import { CheckCircle2, ArrowDown, ArrowRight, CheckCheck } from 'lucide-react'
import { SiGooglesheets, SiNotion, SiSlack, SiGmail, SiTelegram } from 'react-icons/si'
import { staggerContainer, staggerItem } from '../../utils/animations'

const trigger = {
  message: '"Log Q4 server costs and notify the team"',
  time: '10:24 AM',
}

const steps = [
  { tool: 'Google Sheets', icon: SiGooglesheets, color: '#34A853', iconBg: 'bg-green-50',  action: 'Row added to "Q4 Expenses"'  },
  { tool: 'Notion',        icon: SiNotion,        color: '#000000', iconBg: 'bg-gray-100',  action: 'Page updated: Q4 Financials' },
  { tool: 'Slack',         icon: SiSlack,         color: '#4A154B', iconBg: 'bg-purple-50', action: 'Message sent to #finance'    },
  { tool: 'Gmail',         icon: SiGmail,         color: '#EA4335', iconBg: 'bg-red-50',    action: 'Summary emailed to board'    },
]

function Connector() {
  return (
    <>
      <div className="hidden sm:flex items-center flex-shrink-0 px-1">
        <ArrowRight size={14} className="text-gray-300" />
      </div>
      <div className="flex sm:hidden justify-center py-1">
        <ArrowDown size={14} className="text-gray-300" />
      </div>
    </>
  )
}

export default function WorkflowSection() {
  return (
    <section className="bg-gray-50 py-12 px-6">
      {/* Header */}
      <div className="max-w-5xl mx-auto text-center mb-14">
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
          Tvara chains actions across your stack. A single text does the
          work of multiple open tabs.
        </motion.p>
      </div>

      {/* Pipeline */}
      <motion.div
        className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-center sm:items-stretch gap-1 sm:gap-0"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {/* Trigger bubble */}
        <motion.div
          className="flex flex-col justify-center gap-2 flex-shrink-0 w-full sm:w-auto"
          variants={staggerItem}
        >
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest text-center sm:text-left mb-1">
            Trigger
          </p>
          <div className="bg-green-50 border border-green-200 rounded-2xl rounded-bl-sm px-4 py-3 max-w-[200px] mx-auto sm:mx-0">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                <SiTelegram size={11} color="#26A5E4" />
              </div>
              <span className="text-xs font-semibold text-green-700">Telegram</span>
            </div>
            <p className="text-sm font-medium text-gray-800 leading-snug">
              {trigger.message}
            </p>
            <p className="text-xs text-gray-400 mt-1.5 text-right flex gap-2 justify-end">
              {trigger.time} <CheckCheck size={12} />
            </p>
          </div>
        </motion.div>

        {/* Steps */}
        {steps.map(({ tool, icon: Icon, color, iconBg, action }) => (
          <div key={tool} className="contents">
            <motion.div variants={staggerItem} className="flex items-center">
              <Connector />
            </motion.div>

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
          </div>
        ))}
      </motion.div>

      <motion.p
        className="text-center text-xs text-gray-400 font-medium mt-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.5 }}
      >
        All steps execute on Tvara's servers · No code required
      </motion.p>
    </section>
  )
}

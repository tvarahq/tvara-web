import { motion } from 'framer-motion'
import { Shield } from 'lucide-react'
import { staggerItem, cardBase } from '../../../utils/animations'

export default function BlockHumanInLoop() {
  return (
    <motion.div
      className={`${cardBase} md:col-span-2 flex flex-col sm:flex-row gap-5 items-start`}
      variants={staggerItem}
    >
      <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
        <Shield size={22} className="text-blue-600" />
      </div>
      <div className="flex flex-col gap-2">
        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">
            Safety
          </p>
          <h2 className="text-lg font-bold text-gray-900">Human-in-the-Loop.</h2>
        </div>
        <p className="text-sm text-gray-500 font-medium leading-relaxed">
          Before Tvara executes any critical action - sending an email, deleting a row, closing a
          ticket - it sends you a confirmation prompt in Telegram. You stay in control. Always.
        </p>
        <div className="flex flex-wrap gap-2 mt-1">
          {['Confirm before send', 'Audit trail', 'Undo support'].map((tag) => (
            <span
              key={tag}
              className="text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

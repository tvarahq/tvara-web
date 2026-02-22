import { motion } from 'framer-motion'
import { ArrowRight, FileSpreadsheet, CheckCircle2, CheckCheck } from 'lucide-react'
import { staggerItem, cardBase } from '../../../utils/animations'

export default function BlockMagic() {
  return (
    <motion.div
      className={`${cardBase} md:col-span-2 flex flex-col gap-5`}
      variants={staggerItem}
    >
      <div>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">
          How it works
        </p>
        <h2 className="text-xl font-bold text-gray-900">One message. Done.</h2>
        <p className="text-sm text-gray-500 font-medium mt-1">
          Type what you need. Tvara figures out which tool to call and executes it.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
        {/* Telegram-style bubble */}
        <div className="flex items-end gap-2">
          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
            <img src="https://cdn.simpleicons.org/telegram/26A5E4" size={8} className="text-green-600" />
          </div>
          <div className="bg-green-50 border border-green-200 rounded-2xl rounded-bl-sm px-4 py-3 max-w-md">
            <p className="text-sm font-medium text-gray-800">
              &ldquo;Log a $50 server expense to this month&apos;s budget&rdquo;
            </p>
            <p className="text-xs text-gray-400 mt-1 text-right flex gap-2 justify-end">9:41 AM <CheckCheck size={12} /></p>
          </div>
        </div>

        {/* Arrow */}
        <ArrowRight size={20} className="text-gray-300 flex-shrink-0 rotate-90 sm:rotate-0" />

        {/* Success badge */}
        <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3 flex items-start gap-3 max-w-xs shadow-sm">
          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
            <FileSpreadsheet size={15} className="text-green-600" />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Google Sheets
            </p>
            <p className="text-sm font-semibold text-gray-900 mt-0.5">
              Row added to &ldquo;Budget — Dec&rdquo;
            </p>
            <p className="text-xs text-green-600 font-semibold flex items-center gap-1 mt-1">
              <CheckCircle2 size={12} /> Done in 1.2s
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

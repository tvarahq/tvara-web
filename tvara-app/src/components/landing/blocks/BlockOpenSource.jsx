import { motion } from 'framer-motion'
import { Terminal, ArrowRight } from 'lucide-react'
import { staggerItem, cardBase } from '../../../utils/animations'

export default function BlockOpenSource() {
  return (
    <motion.div className={`${cardBase} md:col-span-1 flex flex-col gap-3`} variants={staggerItem}>
      <div className="w-10 h-10 rounded-xl bg-gray-900 flex items-center justify-center">
        <Terminal size={18} className="text-white" />
      </div>
      <div>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">
          The Engine
        </p>
        <h2 className="text-lg font-bold text-gray-900">Powered by Open-Source.</h2>
      </div>
      <p className="text-sm text-gray-500 font-medium leading-relaxed">
        Routing is handled by the open-source{' '}
        <span className="font-semibold text-gray-700">Tvara multi-agent framework</span>, ensuring
        enterprise-grade reliability, auditability, and security you can inspect yourself.
      </p>
      <a
        href="https://github.com/tvarahq/tvara"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-700 hover:text-black transition-colors mt-auto"
      >
        View on GitHub <ArrowRight size={13} />
      </a>
    </motion.div>
  )
}

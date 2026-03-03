import { motion } from 'framer-motion'
import { Zap } from 'lucide-react'
import { staggerItem, cardBase } from '../../../utils/animations'

const metrics = [
  { label: 'Avg. execution', value: '1.4s' },
  { label: 'Actions / msg', value: '4.2' },
  { label: 'Uptime', value: '99.9%' },
]

export default function BlockSpeed() {
  return (
    <motion.div className={`${cardBase} md:col-span-1 flex flex-col gap-4`} variants={staggerItem}>
      <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
        <Zap size={18} className="text-amber-500 fill-amber-400" />
      </div>
      <div>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">
          Performance
        </p>
        <h2 className="text-lg font-bold text-gray-900">Lightning fast.</h2>
        <p>Instant metrics</p>
      </div>
      <div className="flex flex-col gap-2 mt-auto">
        {metrics.map(({ label, value }) => (
          <div key={label} className="flex items-center justify-between">
            <span className="text-xs font-medium text-gray-500">{label}</span>
            <span className="text-sm font-bold text-gray-900">{value}</span>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

import { motion } from 'framer-motion'
import { BarChart3 } from 'lucide-react'
import { staggerItem, cardBase } from '../../../utils/animations'

const bars = [
  { day: 'M', height: 40 },
  { day: 'T', height: 65 },
  { day: 'W', height: 50 },
  { day: 'T', height: 80 },
  { day: 'F', height: 60 },
  { day: 'S', height: 30 },
  { day: 'S', height: 20 },
]

const maxHeight = Math.max(...bars.map((b) => b.height))

export default function BlockAnalytics() {
  return (
    <motion.div className={`${cardBase} md:col-span-1 flex flex-col gap-4`} variants={staggerItem}>
      <div className="w-10 h-10 rounded-xl bg-brand-light flex items-center justify-center">
        <BarChart3 size={18} className="text-brand-dark" />
      </div>
      <div>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">
          Activity
        </p>
        <h2 className="text-lg font-bold text-gray-900">Full audit trail.</h2>
        <p className="text-sm text-gray-500 font-medium mt-1">
          Every run logged. Every action traceable.
        </p>
      </div>

      {/* Animated bar chart */}
      <div className="flex items-end gap-1.5 mt-auto" style={{ height: 80 }}>
        {bars.map(({ day, height }, i) => {
          const isPeak = height === maxHeight
          const barPx = Math.round((height / 100) * 72) // 72px max bar height, 8px reserved for label
          return (
            <div key={i} className="flex flex-col items-center gap-1 flex-1">
              <motion.div
                className="w-full rounded-t-sm"
                style={{
                  background: isPeak
                    ? 'linear-gradient(180deg, #3399B4 0%, #1D7A93 100%)'
                    : 'linear-gradient(180deg, #cceaf3 0%, #A8D8E8 100%)',
                }}
                initial={{ height: 0 }}
                whileInView={{ height: barPx }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.07, ease: 'easeOut' }}
              />
              <span className={`text-[9px] font-semibold leading-none ${isPeak ? 'text-brand-dark' : 'text-gray-400'}`}>
                {day}
              </span>
            </div>
          )
        })}
      </div>
    </motion.div>
  )
}

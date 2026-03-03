import { motion } from 'framer-motion'
import { Network } from 'lucide-react'
import { staggerItem, cardBase } from '../../../utils/animations'

const agents = [
  { name: 'Planner', color: 'bg-brand-light border-brand-mid text-brand-dark' },
  { name: 'Writer', color: 'bg-purple-50 border-purple-200 text-purple-700' },
  { name: 'Executor', color: 'bg-amber-50 border-amber-200 text-amber-700' },
]

export default function BlockMultiAgent() {
  return (
    <motion.div className={`${cardBase} md:col-span-1 flex flex-col gap-4`} variants={staggerItem}>
      <div className="w-10 h-10 rounded-xl bg-brand-light flex items-center justify-center">
        <Network size={18} className="text-brand-dark" />
      </div>
      <div>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">
          Multi-Agent
        </p>
        <h2 className="text-lg font-bold text-gray-900">Agents collaborate.</h2>
        <p className="text-sm text-gray-500 font-medium mt-1 leading-relaxed">
          Specialized sub-agents break down complex tasks automatically.
        </p>
      </div>
      <div className="flex flex-wrap gap-2 mt-auto">
        {agents.map(({ name, color }) => (
          <span
            key={name}
            className={`text-xs font-semibold border px-2.5 py-1 rounded-full ${color}`}
          >
            {name}
          </span>
        ))}
      </div>
    </motion.div>
  )
}

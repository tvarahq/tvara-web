import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Zap } from 'lucide-react'
import { fadeUp } from '../../utils/animations'

export default function BottomCTA() {
  return (
    <section
      className="relative py-24 px-6 overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #18181b 0%, #1f2937 60%, #111827 100%)' }}
    >
      {/* Glassmorphism card behind content */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 55% 60% at 50% 50%, rgba(255,255,255,0.04) 0%, transparent 70%)',
        }}
      />

      {/* Dot grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'radial-gradient(circle, #6b7280 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Top edge highlight */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.12) 40%, rgba(255,255,255,0.12) 60%, transparent)' }}
      />

      <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center text-center gap-6">
        {/* Beta pill */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
        >
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-brand bg-white/8 border border-white/15 px-3 py-1.5 rounded-full backdrop-blur-sm">
            <Zap size={11} className="fill-brand" />
            Beta · Free to start
          </span>
        </motion.div>

        <motion.h2
          className="text-3xl sm:text-4xl font-extrabold text-white leading-tight tracking-tight"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0.1}
        >
          Stop switching tabs.{' '}
          <span className="text-brand-mid">Start running from chat.</span>
        </motion.h2>

        <motion.p
          className="text-sm text-gray-400 font-medium max-w-sm leading-relaxed"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0.2}
        >
          Join founders already using Tvara to automate their ops, comms,
          and dev workflows. No code, no tab overload.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center gap-3"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0.3}
        >
          <Link
            to="/login"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-gray-900 text-sm font-semibold hover:bg-gray-100 transition-colors duration-150 shadow-sm"
          >
            Get started free
            <ArrowRight size={15} />
          </Link>
          <a
            href="https://github.com/tvarahq/tvara"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/20 text-sm font-semibold text-white hover:bg-white/10 transition-colors duration-150"
          >
            View open-source SDK
          </a>
        </motion.div>

        <motion.p
          className="text-xs text-gray-500 font-medium"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0.4}
        >
          No credit card · Free during beta · Cancel anytime
        </motion.p>
      </div>
    </section>
  )
}

import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Zap } from 'lucide-react'
import { fadeUp } from '../../utils/animations'

export default function Hero() {
  return (
    <section
      aria-label="Tvara AI multi-agent orchestration platform — hero"
      className="relative bg-gray-50 py-28 px-6 overflow-hidden"
      style={{
        backgroundImage: 'radial-gradient(circle, #d1d5db 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }}
    >
      {/* Radial fade — softens dot grid toward edges */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 80% at 50% 50%, transparent 40%, #f9fafb 100%)',
        }}
      />

      {/* Subtle teal glow behind headline */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 55% 45% at 50% 30%, rgba(51,153,180,0.07) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center text-center gap-6">
        {/* Beta badge */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
        >
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-brand-dark bg-brand-light border border-brand-mid px-3 py-1.5 rounded-full">
            <Zap size={11} className="fill-brand-dark" />
            Now in Beta · Free to try
          </span>
        </motion.div>

        <motion.h1
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight tracking-tight"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.1}
        >
          <span className="sr-only">Tvara — AI Multi-Agent Orchestration: </span>
          Run your startup{' '}
          <span
            className="relative inline-block"
            style={{
              background: 'linear-gradient(135deg, #3399B4 0%, #1D7A93 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            from chat.
          </span>{' '}
          <span className="text-gray-400">Stop context switching.</span>
        </motion.h1>

        <motion.p
          className="text-lg text-gray-600 font-medium leading-relaxed max-w-xl"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.2}
        >
          Send a message to log expenses, update Notion, draft emails, or trigger
          any workflow. Tvara's AI multi-agent orchestration handles the APIs so you can stay in the zone.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center gap-3 mt-2"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.3}
        >
          <Link
            to="/login"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-black text-white text-sm font-semibold hover:bg-gray-800 transition-colors duration-150 shadow-sm"
          >
            Get started free
            <ArrowRight size={15} />
          </Link>
          <a
            href="https://github.com/tvarahq/tvara"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-gray-300 text-sm font-semibold text-gray-700 hover:bg-white transition-colors duration-150"
          >
            View on GitHub
          </a>
        </motion.div>

        <motion.p
          className="text-xs text-gray-400 font-medium"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.4}
        >
          No credit card required · Free during beta
        </motion.p>

        {/* Social proof strip */}
        {/* <motion.div
          className="flex items-center gap-3 mt-1"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.5}
        >
          <div className="flex -space-x-2">
            {['bg-brand', 'bg-purple-400', 'bg-amber-400', 'bg-green-400', 'bg-rose-400'].map((color, i) => (
              <div
                key={i}
                className={`w-7 h-7 rounded-full ${color} border-2 border-gray-50 flex items-center justify-center`}
              >
                <span className="text-[9px] font-bold text-white">{String.fromCharCode(65 + i)}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 font-medium">
            Joined by <span className="font-bold text-gray-800">200+</span> founders in beta
          </p>
        </motion.div> */}
      </div>
    </section>
  )
}

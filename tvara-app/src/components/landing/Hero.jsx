import { motion } from 'framer-motion'
import { fadeUp } from '../../utils/animations'
import WaitlistForm from './WaitlistForm'

export default function Hero() {
  return (
    <section
      id="waitlist"
      className="relative bg-gray-50 py-24 px-6 overflow-hidden"
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

      <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center text-center gap-6">
        <motion.h1
          className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight tracking-tight"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
        >
          Run your startup from chat.{' '}
          <span className="text-gray-500">Stop context switching.</span>
        </motion.h1>

        <motion.p
          className="text-lg text-gray-600 font-medium leading-relaxed"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.15}
        >
          Send a text to log expenses, update Notion, or draft emails. Tvara
          handles the APIs in the background so you can stay in the zone.
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.3}
        >
          <WaitlistForm />
        </motion.div>

        <motion.p
          className="text-xs text-gray-400 font-medium"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.4}
        >
          No credit card required · Free early access
        </motion.p>
      </div>
    </section>
  )
}

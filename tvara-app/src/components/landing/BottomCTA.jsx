import { motion } from 'framer-motion'
import { fadeUp } from '../../utils/animations'
import WaitlistForm from './WaitlistForm'

export default function BottomCTA() {
  return (
    <section className="bg-white py-24 px-6">
      <div className="max-w-2xl mx-auto flex flex-col items-center text-center gap-5">
        <motion.h2
          className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight tracking-tight"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
        >
          Stop switching tabs.{' '}
          <span className="text-gray-400">Start running from chat.</span>
        </motion.h2>

        <motion.p
          className="text-sm text-gray-500 font-medium"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0.12}
        >
          Join the waitlist and be the first to run your startup from a single message.
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0.22}
        >
          <WaitlistForm />
        </motion.div>
      </div>
    </section>
  )
}

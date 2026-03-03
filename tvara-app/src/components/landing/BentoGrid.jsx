import { motion } from 'framer-motion'
import { staggerContainer } from '../../utils/animations'
import BlockMagic from './blocks/BlockMagic'
import BlockIntegrations from './blocks/BlockIntegrations'
import BlockOpenSource from './blocks/BlockOpenSource'
import BlockHumanInLoop from './blocks/BlockHumanInLoop'
import BlockMultiAgent from './blocks/BlockMultiAgent'
import BlockAnalytics from './blocks/BlockAnalytics'
import BlockSpeed from './blocks/BlockSpeed'

export default function BentoGrid() {
  return (
    <section className="bg-gray-50 pb-24 px-6">
      <div className="max-w-5xl mx-auto text-center mb-10">
        <motion.p
          className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          Everything you need
        </motion.p>
        <motion.h2
          className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.08 }}
        >
          Built for how founders actually work.
        </motion.h2>
      </div>

      <motion.div
        className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {/* Row 1: 2/3 + 1/3 */}
        <BlockMagic />
        <BlockIntegrations />

        {/* Row 2: 1/3 + 1/3 + 1/3 */}
        <BlockSpeed />
        <BlockOpenSource />
        <BlockMultiAgent />

        {/* Row 3: 2/3 + 1/3 */}
        <BlockHumanInLoop />
        <BlockAnalytics />
      </motion.div>
    </section>
  )
}

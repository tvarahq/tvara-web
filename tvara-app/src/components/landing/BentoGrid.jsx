import { motion } from 'framer-motion'
import { staggerContainer } from '../../utils/animations'
import BlockMagic from './blocks/BlockMagic'
import BlockIntegrations from './blocks/BlockIntegrations'
import BlockOpenSource from './blocks/BlockOpenSource'
import BlockHumanInLoop from './blocks/BlockHumanInLoop'

export default function BentoGrid() {
  return (
    <section className="bg-gray-50 pb-24 px-6">
      <motion.div
        className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <BlockMagic />
        <BlockIntegrations />
        <BlockOpenSource />
        <BlockHumanInLoop />
      </motion.div>
    </section>
  )
}

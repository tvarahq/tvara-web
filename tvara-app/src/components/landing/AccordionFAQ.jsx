import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'

const FAQS = [
  {
    q: 'Is Tvara really free during beta?',
    a: 'Yes, fully free while we are in beta. We will introduce paid plans as we scale, but early users will always get a generous free tier. No credit card required to sign up.',
  },
  {
    q: 'Which integrations does Tvara support?',
    a: 'Right now Tvara supports GitHub, Gmail, Slack, Notion, Twitter, and more. We are adding new integrations every week. If yours is missing, just ask.',
  },
  {
    q: 'How does the multi-agent system work?',
    a: 'When you send a message, Tvara\'s planner agent decides which specialized sub-agents to invoke (a writer, a code executor, a data retriever, etc.). They work in parallel or in sequence depending on the task, then consolidate results into a single response. You never have to orchestrate this manually.',
  },
  {
    q: 'Is my data secure?',
    a: 'All credentials are stored encrypted at rest. Tvara never stores the content of your messages beyond what is needed for the current session. OAuth tokens are scoped to the minimum permissions required, and you can revoke access at any time from the dashboard.',
  },
  {
    q: 'How do I use Tvara?',
    a: 'Head straight to the Playground from your dashboard, type a task, hit send, and Tvara gets to work. Telegram support is coming soon so you can trigger automations right from your chat without ever opening a browser.',
  },
  {
    q: 'What is the open-source Tvara framework?',
    a: 'The Tvara framework is the Python multi-agent orchestration engine powering everything under the hood. It is MIT-licensed and available on GitHub. You can self-host it, audit the routing logic, or build your own integrations on top of it.',
  },
]

function FAQItem({ q, a, isOpen, onToggle }) {
  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 py-5 text-left cursor-pointer group"
        aria-expanded={isOpen}
      >
        <span className="text-sm font-semibold text-gray-900 group-hover:text-brand-dark transition-colors duration-150">
          {q}
        </span>
        <span className="flex-shrink-0 w-6 h-6 rounded-full border border-gray-200 flex items-center justify-center group-hover:border-brand-mid transition-colors duration-150">
          {isOpen ? (
            <Minus size={12} className="text-brand-dark" />
          ) : (
            <Plus size={12} className="text-gray-500" />
          )}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            style={{ overflow: 'hidden' }}
          >
            <p className="text-sm text-gray-500 font-medium leading-relaxed pb-5 pr-10">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function AccordionFAQ() {
  const [openIndex, setOpenIndex] = useState(0)

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i)

  return (
    <section className="bg-gray-50 py-20 px-6 border-t border-gray-100">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          {/* Left — label + heading */}
          <div className="lg:w-72 flex-shrink-0">
            <motion.p
              className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              FAQ
            </motion.p>
            <motion.h2
              className="text-3xl font-extrabold text-gray-900 tracking-tight leading-tight"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.08 }}
            >
              Questions &amp; answers.
            </motion.h2>
            <motion.p
              className="text-sm text-gray-500 font-medium mt-3 leading-relaxed"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.16 }}
            >
              Still curious? Reach out on{' '}
              <a
                href="https://x.com/tvarahq"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-gray-700 hover:text-black transition-colors"
              >
                X&nbsp;@tvarahq
              </a>
            </motion.p>
          </div>

          {/* Right — accordion */}
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.12 }}
          >
            {FAQS.map((item, i) => (
              <FAQItem
                key={i}
                q={item.q}
                a={item.a}
                isOpen={openIndex === i}
                onToggle={() => toggle(i)}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

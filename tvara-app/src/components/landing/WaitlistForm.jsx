import { useForm, ValidationError } from '@formspree/react'
import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'

export default function WaitlistForm() {
  const [state, handleSubmit] = useForm('mnjbgodz')

  if (state.succeeded) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex items-center gap-2 text-green-600 font-semibold text-base"
      >
        <CheckCircle2 size={20} />
        <span>You&apos;re on the list! We&apos;ll be in touch.</span>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
      <input
        id="email"
        type="email"
        name="email"
        required
        placeholder="youare@awesome.com"
        className="flex-1 px-4 py-3 rounded-lg border border-gray-300 text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition"
      />
      <ValidationError prefix="Email" field="email" errors={state.errors} className="text-xs text-red-500 font-medium" />
      <button
        type="submit"
        disabled={state.submitting}
        className="px-6 py-3 rounded-lg bg-black text-white text-sm font-semibold hover:bg-gray-800 disabled:opacity-60 transition-colors duration-150 whitespace-nowrap"
      >
        {state.submitting ? 'Joining…' : 'Join the Waitlist'}
      </button>
    </form>
  )
}

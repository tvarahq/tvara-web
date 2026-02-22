import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { fadeUp } from '../utils/animations'
import { supabase } from '../utils/supabase'
import tvaraFullLogo from '../assets/tvara_full_logo.png'

export default function ResetPasswordPage() {
  const { updatePassword } = useAuth()
  const navigate = useNavigate()

  const [ready, setReady] = useState(false)       // true once Supabase confirms the recovery token
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)

  useEffect(() => {
    // Supabase fires PASSWORD_RECOVERY when the user lands here via the reset link
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') setReady(true)
    })
    return () => subscription.unsubscribe()
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')

    if (password !== confirm) {
      setError("Passwords don't match.")
      return
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }

    setSubmitting(true)
    const { error } = await updatePassword(password)
    if (error) setError(error.message)
    else setDone(true)
    setSubmitting(false)
  }

  return (
    <div
      className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-16"
      style={{
        backgroundImage: 'radial-gradient(circle, #d1d5db 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }}
    >
      <div
        className="pointer-events-none fixed inset-0"
        style={{
          background: 'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 30%, #f9fafb 100%)',
        }}
      />

      <motion.div
        className="relative z-10 w-full max-w-sm"
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={0}
      >
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">

          <div className="flex justify-center mb-7">
            <Link to="/">
              <img src={tvaraFullLogo} alt="Tvara" className="h-9 w-auto" />
            </Link>
          </div>

          {done ? (
            <div className="text-center py-3">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-3">
                <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-sm font-semibold text-gray-900">Password updated</p>
              <p className="text-sm text-gray-500 mt-1">You can now sign in with your new password.</p>
              <button
                onClick={() => navigate('/login')}
                className="mt-5 w-full px-4 py-2.5 rounded-lg bg-black text-white text-sm font-semibold hover:bg-gray-800 transition-colors duration-150 cursor-pointer"
              >
                Go to sign in
              </button>
            </div>

          ) : !ready ? (
            <div className="text-center py-3">
              <p className="text-sm text-gray-500 font-medium">Verifying reset link…</p>
              <p className="text-xs text-gray-400 mt-2">If nothing happens, your link may have expired.</p>
              <Link to="/login" className="block mt-4 text-xs text-gray-400 hover:text-gray-600 transition-colors">
                ← Back to sign in
              </Link>
            </div>

          ) : (
            <>
              <div className="mb-6 text-center">
                <h1 className="text-xl font-extrabold text-gray-900 tracking-tight">Set new password</h1>
                <p className="mt-1.5 text-sm text-gray-500 font-medium">Choose something strong</p>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input
                  type="password"
                  required
                  placeholder="New password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition"
                />
                <input
                  type="password"
                  required
                  placeholder="Confirm new password"
                  value={confirm}
                  onChange={e => setConfirm(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition"
                />

                {error && (
                  <p className="text-xs text-red-500 font-medium">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full px-4 py-2.5 rounded-lg bg-black text-white text-sm font-semibold hover:bg-gray-800 disabled:opacity-60 transition-colors duration-150 mt-0.5 cursor-pointer"
                >
                  {submitting ? 'Updating…' : 'Update password'}
                </button>
              </form>
            </>
          )}
        </div>

        <div className="mt-4 text-center">
          <Link to="/" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
            ← Back to home
          </Link>
        </div>
      </motion.div>
    </div>
  )
}

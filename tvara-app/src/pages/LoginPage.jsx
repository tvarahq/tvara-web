import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaGithub } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { useAuth } from '../context/AuthContext'
import { fadeUp } from '../utils/animations'
import tvaraFullLogo from '../assets/tvara_full_logo.png'

const HEADINGS = {
  signin: { title: 'Welcome back', sub: 'Sign in to continue to Tvara' },
  signup: { title: 'Create your account', sub: 'Get started for free' },
  forgot: { title: 'Reset your password', sub: "Enter your email and we'll send a link" },
}

export default function LoginPage() {
  const { user, isLoading, signInWithGithub, signInWithGoogle, signInWithEmail, signUpWithEmail, resetPassword, signInAsGuest } = useAuth()
  const navigate = useNavigate()

  const [mode, setMode] = useState('signin')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [emailSent, setEmailSent] = useState(false)   // signup confirmation
  const [resetSent, setResetSent] = useState(false)   // forgot password

  useEffect(() => {
    if (user) navigate('/dashboard', { replace: true })
  }, [user, navigate])

  function switchMode(next) {
    setMode(next)
    setError('')
    setEmailSent(false)
    setResetSent(false)
    setFirstName('')
    setLastName('')
    setPassword('')
  }

  async function handleGuest() {
    const { error } = await signInAsGuest()
    if (!error) navigate('/dashboard', { replace: true })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setSubmitting(true)

    if (mode === 'signin') {
      const { error } = await signInWithEmail(email, password)
      if (error) setError(error.message)
    } else if (mode === 'signup') {
      const { data, error } = await signUpWithEmail(email, password, firstName, lastName)
      if (error) setError(error.message)
      else if (data.user?.identities?.length === 0) setError('An account with this email already exists.')
      else if (data.session) navigate('/dashboard', { replace: true })
      else setEmailSent(true)
    } else {
      const { error } = await resetPassword(email)
      if (error) setError(error.message)
      else setResetSent(true)
    }

    setSubmitting(false)
  }

  if (isLoading) return null

  const { title, sub } = HEADINGS[mode]

  const emailIcon = (
    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-3">
      <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    </div>
  )

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
        {/* Card */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">

          {/* Logo */}
          <div className="flex justify-center mb-4">
            <Link to="/">
              <img src={tvaraFullLogo} alt="Tvara" className="h-8 w-auto" />
            </Link>
          </div>

          {/* Heading */}
          <div className="mb-4 text-center">
            <h1 className="text-lg font-extrabold text-gray-900 tracking-tight">{title}</h1>
            <p className="mt-1 text-xs text-gray-500 font-medium">{sub}</p>
          </div>

          {/* Signup email confirmation */}
          {emailSent ? (
            <div className="text-center py-3">
              {emailIcon}
              <p className="text-sm font-semibold text-gray-900">Check your inbox</p>
              <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                We sent a confirmation link to{' '}
                <span className="font-medium text-gray-700">{email}</span>
              </p>
            </div>

          /* Forgot password sent */
          ) : resetSent ? (
            <div className="text-center py-3">
              {emailIcon}
              <p className="text-sm font-semibold text-gray-900">Reset link sent</p>
              <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                Check <span className="font-medium text-gray-700">{email}</span> for a link to reset your password. Check your spam folder too.
              </p>
              <button
                onClick={() => switchMode('signin')}
                className="mt-4 text-xs text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
              >
                ← Back to sign in
              </button>
            </div>

          ) : (
            <>
              {/* OAuth buttons — only for signin / signup */}
              {mode !== 'forgot' && (
                <>
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={signInWithGithub}
                      className="flex items-center justify-center gap-2 w-full px-4 py-2 rounded-lg bg-gray-900 text-white text-sm font-semibold hover:bg-black transition-colors duration-150 cursor-pointer"
                    >
                      <FaGithub size={14} />
                      Continue with GitHub
                    </button>
                    <button
                      onClick={signInWithGoogle}
                      className="flex items-center justify-center gap-2 w-full px-4 py-2 rounded-lg bg-white text-gray-700 text-sm font-semibold border border-gray-300 hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
                    >
                      <FcGoogle size={14} />
                      Continue with Google
                    </button>
                  </div>

                  <div className="flex items-center gap-3 my-3">
                    <div className="flex-1 h-px bg-gray-200" />
                    <span className="text-xs text-gray-400 font-medium">or</span>
                    <div className="flex-1 h-px bg-gray-200" />
                  </div>
                </>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                {mode === 'signup' && (
                  <div className="flex gap-2.5">
                    <input
                      type="text"
                      required
                      placeholder="First name"
                      value={firstName}
                      onChange={e => setFirstName(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition"
                    />
                    <input
                      type="text"
                      required
                      placeholder="Last name"
                      value={lastName}
                      onChange={e => setLastName(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition"
                    />
                  </div>
                )}

                <input
                  type="email"
                  required
                  placeholder="Email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition"
                />

                {mode !== 'forgot' && (
                  <div className="flex flex-col gap-1">
                    <input
                      type="password"
                      required
                      placeholder="Password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition"
                    />
                    {mode === 'signin' && (
                      <div className="flex justify-end">
                        <button
                          type="button"
                          onClick={() => switchMode('forgot')}
                          className="text-xs text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                        >
                          Forgot password?
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {error && (
                  <p className="text-xs text-red-500 font-medium">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full px-4 py-2 rounded-lg bg-black text-white text-sm font-semibold hover:bg-gray-800 disabled:opacity-60 transition-colors duration-150 mt-0.5 cursor-pointer"
                >
                  {submitting
                    ? (mode === 'signin' ? 'Signing in…' : mode === 'signup' ? 'Creating account…' : 'Sending…')
                    : (mode === 'signin' ? 'Sign in' : mode === 'signup' ? 'Create account' : 'Send reset link')}
                </button>
              </form>

              {mode !== 'forgot' && (
                <>
                  <div className="flex items-center gap-3 mt-3">
                    <div className="flex-1 h-px bg-gray-100" />
                    <span className="text-xs text-gray-300 font-medium">or</span>
                    <div className="flex-1 h-px bg-gray-100" />
                  </div>
                  <button
                    onClick={handleGuest}
                    className="mt-2 w-full text-center text-sm text-gray-600 hover:text-gray-400 font-medium transition-colors cursor-pointer"
                  >
                    Continue as guest
                  </button>
                  <p className="text-center text-xs text-gray-300 mt-0.5">No account needed · limited access</p>
                </>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="mt-4 flex flex-col items-center gap-2 text-sm text-gray-500 font-medium">
          {!emailSent && !resetSent && (
            <p>
              {mode === 'forgot' ? (
                <>
                  {'Remember it? '}
                  <button onClick={() => switchMode('signin')} className="text-gray-900 font-semibold hover:underline cursor-pointer">
                    Sign in
                  </button>
                </>
              ) : mode === 'signin' ? (
                <>
                  {"Don't have an account? "}
                  <button onClick={() => switchMode('signup')} className="text-gray-900 font-semibold hover:underline cursor-pointer">
                    Sign up
                  </button>
                </>
              ) : (
                <>
                  {'Already have an account? '}
                  <button onClick={() => switchMode('signin')} className="text-gray-900 font-semibold hover:underline cursor-pointer">
                    Sign in
                  </button>
                </>
              )}
            </p>
          )}
          <Link to="/" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
            ← Back to home
          </Link>
        </div>
      </motion.div>
    </div>
  )
}

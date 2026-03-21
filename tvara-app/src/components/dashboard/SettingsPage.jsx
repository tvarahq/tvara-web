import { useState } from 'react'
import { motion } from 'framer-motion'
import { Trash2, User } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useToast } from '../../context/ToastContext'

const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.22, ease: 'easeOut' } },
  exit:    { opacity: 0, y: -6, transition: { duration: 0.15 } },
}

export default function SettingsPage() {
  const { user, signOut, updatePassword } = useAuth()
  const { toast } = useToast()
  const navigate = useNavigate()

  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [deleteLoading, setDeleteLoading]     = useState(false)

  const isGuest = user?.is_anonymous === true
  const displayName = user?.user_metadata?.full_name ?? user?.user_metadata?.name ?? user?.email ?? 'User'

  async function handleDeleteAccount() {
    setDeleteLoading(true)
    try {
      // TODO: implement a proper DELETE /account backend endpoint to fully purge user data and revoke OAuth tokens.
      // For now, sign the user out and prompt them to contact support.
      await signOut()
      navigate('/', { replace: true })
    } catch {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setDeleteLoading(false)
      setDeleteModalOpen(false)
    }
  }

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="p-4 sm:p-8 max-w-xl"
    >
      <div className="mb-7">
        <h1 className="text-xl font-bold text-gray-900">Settings</h1>
        <p className="text-sm text-gray-400 mt-0.5">Manage your account preferences.</p>
      </div>

      {/* Account info */}
      <section className="bg-white rounded-2xl border border-gray-200 mb-4">
        <div className="px-5 py-4 border-b border-gray-100">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">Account</p>
        </div>
        <div className="px-5 py-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand to-brand-dark flex items-center justify-center flex-shrink-0">
            <User size={16} className="text-white" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate">{displayName}</p>
            <p className="text-xs text-gray-400 truncate">{isGuest ? 'Guest (anonymous)' : (user?.email ?? '')}</p>
          </div>
        </div>
      </section>

      {/* Danger zone */}
      <section className="bg-white rounded-2xl border border-red-100 mb-4">
        <div className="px-5 py-4 border-b border-red-50 flex items-center gap-2">
          <Trash2 size={13} className="text-red-400" />
          <p className="text-[10px] font-semibold uppercase tracking-widest text-red-400">Danger Zone</p>
        </div>
        <div className="px-5 py-4 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-gray-900">Delete account</p>
            <p className="text-xs text-gray-400 mt-0.5">Permanently remove your account and all data.</p>
          </div>
          <button
            onClick={() => setDeleteModalOpen(true)}
            className="flex-shrink-0 text-xs font-semibold px-3 py-2 rounded-xl border border-red-200 text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
          >
            Delete
          </button>
        </div>
      </section>

      {/* Delete confirmation modal */}
      {deleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl border border-gray-200 shadow-xl p-6 max-w-sm w-full"
          >
            <div className="w-11 h-11 rounded-full bg-red-50 flex items-center justify-center mb-4">
              <Trash2 size={18} className="text-red-500" />
            </div>
            <p className="text-base font-bold text-gray-900 mb-1">Delete your account?</p>
            <p className="text-sm text-gray-500 mb-6 leading-relaxed">
              This will permanently delete your account and all associated data. This action cannot be undone.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setDeleteModalOpen(false)}
                disabled={deleteLoading}
                className="flex-1 text-sm font-semibold py-2.5 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                disabled={deleteLoading}
                className="flex-1 text-sm font-semibold py-2.5 rounded-xl bg-red-500 text-white hover:bg-red-600 transition-colors cursor-pointer disabled:opacity-50"
              >
                {deleteLoading ? 'Deleting…' : 'Delete account'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  )
}

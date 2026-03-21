import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Activity, Link2, ExternalLink, LogOut, MessageSquare, Menu, X, Radio } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import tvaraLogo from '../../assets/tvara_logo.png'

const navItems = [
  { id: 'activity',     label: 'Activity',      icon: Activity },
  { id: 'playground',   label: 'Playground',    icon: MessageSquare },
  { id: 'integrations', label: 'Integrations',  icon: Link2 },
  { id: 'channels',     label: 'Channels',      icon: Radio },
]

export default function Sidebar({ activeTab, setActiveTab, onSignOut }) {
  const { user } = useAuth()
  const [mobileOpen, setMobileOpen] = useState(false)

  const displayName = user?.is_anonymous
    ? 'Guest'
    : user?.user_metadata?.full_name ?? user?.user_metadata?.name ?? user?.email ?? 'User'

  const initials = displayName
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  const workspaceName = user?.is_anonymous
    ? 'Guest Workspace'
    : `${displayName.split(' ')[0]}'s Workspace`

  function handleNavClick(id) {
    setActiveTab(id)
    setMobileOpen(false)
  }

  const SidebarContent = () => (
    <>
      {/* Workspace switcher */}
      <div className="px-4 py-5 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand to-brand-dark flex items-center justify-center flex-shrink-0">
            <span className="text-white text-xs font-bold">{initials || 'U'}</span>
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-gray-900 truncate">{workspaceName}</p>
            <p className="text-[10px] text-gray-400 truncate">
              {user?.is_anonymous ? 'Anonymous' : (user?.email ?? '')}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {navItems.map(({ id, label, icon: Icon }) => {
          const isActive = activeTab === id
          return (
            <button
              key={id}
              onClick={() => handleNavClick(id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 cursor-pointer ${
                isActive
                  ? 'bg-brand-light text-brand-dark'
                  : 'text-gray-500 hover:bg-gray-200/70 hover:text-gray-800'
              }`}
            >
              <Icon size={15} strokeWidth={isActive ? 2.5 : 2} />
              {label}
              {isActive && (
                <motion.span
                  layoutId="nav-indicator"
                  className="ml-auto w-1 h-4 rounded-full bg-brand"
                />
              )}
            </button>
          )
        })}
      </nav>

      {/* Bottom section */}
      <div className="px-3 pb-4 space-y-1 border-t border-gray-200 pt-3">
        {/* Tvara Framework badge */}
        <a
          href="https://github.com/tvarahq/tvara"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-gray-200/70 transition-colors duration-150 group"
        >
          <img src={tvaraLogo} alt="Tvara" className="w-5 h-5 object-contain flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-gray-700 leading-tight">Tvara Framework</p>
            <p className="text-[10px] text-gray-400">Open source</p>
          </div>
          <ExternalLink size={11} className="text-gray-300 group-hover:text-brand transition-colors flex-shrink-0" />
        </a>

        {/* Sign out */}
        <button
          onClick={onSignOut}
          className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-gray-400 hover:bg-gray-200/70 hover:text-gray-700 text-xs font-medium transition-all duration-150 cursor-pointer"
        >
          <LogOut size={14} />
          Sign out
        </button>
      </div>
    </>
  )

  return (
    <>
      {/* ── Desktop sidebar ── */}
      <aside className="hidden md:flex w-56 h-screen flex-col border-r border-gray-200 bg-[#F7F7F7] flex-shrink-0">
        <SidebarContent />
      </aside>

      {/* ── Mobile top bar ── */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 py-3 bg-[#F7F7F7] border-b border-gray-200">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-brand to-brand-dark flex items-center justify-center flex-shrink-0">
            <span className="text-white text-[10px] font-bold">{initials || 'U'}</span>
          </div>
          <p className="text-xs font-semibold text-gray-900 truncate max-w-[140px]">{workspaceName}</p>
        </div>
        <button
          onClick={() => setMobileOpen((v) => !v)}
          className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-200 transition-colors cursor-pointer"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* ── Mobile drawer overlay ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="md:hidden fixed inset-0 z-40 bg-black/30"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              key="drawer"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="md:hidden fixed top-0 left-0 h-full w-64 z-50 flex flex-col bg-[#F7F7F7] border-r border-gray-200 shadow-lg"
            >
              {/* Close button inside drawer */}
              <div className="flex items-center justify-end px-4 pt-4 pb-2">
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

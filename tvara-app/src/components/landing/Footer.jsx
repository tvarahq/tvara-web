import { Link } from 'react-router-dom'
import { FaXTwitter } from 'react-icons/fa6'
import { FaGithub } from 'react-icons/fa'
import tvaraIcon from '../../assets/tvara_logo.png'


export default function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-white/10">
      <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left — brand */}
        <div className="flex items-center gap-3 text-sm text-gray-500 font-medium">
          <img src={tvaraIcon} alt="Tvara" className="h-5 w-auto opacity-70" />
          <span className="text-gray-500">© 2026 Tvara. All rights reserved.</span>
          <span className="text-xs font-bold uppercase tracking-widest text-brand border border-brand/30 bg-brand/10 px-2 py-0.5 rounded-full">
            Beta
          </span>
        </div>

        {/* Right — links */}
        <div className="flex items-center gap-4">
          <a
            href="https://x.com/tvarahq"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm font-semibold text-gray-400 hover:text-white transition-colors duration-150"
          >
            <FaXTwitter size={14} />
            @tvarahq
          </a>
          <a
            href="https://github.com/tvarahq/tvara"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm font-semibold text-gray-400 hover:text-white transition-colors duration-150"
          >
            <FaGithub size={14} />
            tvara
          </a>
        </div>
      </div>
    </footer>
  )
}

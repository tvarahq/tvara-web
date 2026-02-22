import { FaXTwitter } from "react-icons/fa6";
import tvaraIcon from '../../assets/tvara_logo.png'

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-5xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
          <img src={tvaraIcon} alt="Tvara" className="h-5 w-auto" />
          <span>© 2026 Tvara. All rights reserved.</span>
        </div>
        <a
          href="https://x.com/ashishlalwho"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-sm font-semibold text-gray-500 hover:text-black transition-colors"
        >
          <FaXTwitter size={15} />
          @ashishlalwho
        </a>
      </div>
    </footer>
  )
}

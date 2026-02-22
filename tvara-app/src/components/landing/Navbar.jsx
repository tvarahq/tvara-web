import tvaraFullLogo from '../../assets/tvara_full_logo.png'

export default function Navbar() {
  const scrollToWaitlist = () => {
    document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="sticky top-6 z-50 px-4">
      <nav className="max-w-5xl mx-auto px-5 h-14 flex items-center justify-between rounded-4xl border border-white/40 bg-white/60 backdrop-blur-md shadow-md shadow-black/5">
        <img src={tvaraFullLogo} alt="Tvara" className="h-16 w-auto" />
        <button
          onClick={scrollToWaitlist}
          className="text-sm font-semibold px-4 py-2 rounded-lg border border-gray-300/70 text-gray-700 hover:bg-white/80 transition-colors duration-150"
        >
          Join Waitlist
        </button>
      </nav>
    </div>
  )
}

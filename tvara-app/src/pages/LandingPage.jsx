import Navbar from '../components/landing/Navbar'
import Hero from '../components/landing/Hero'
import BentoGrid from '../components/landing/BentoGrid'
import WorkflowSection from '../components/landing/WorkflowSection'
import BottomCTA from '../components/landing/BottomCTA'
import Footer from '../components/landing/Footer'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />
      <Hero />
      <BentoGrid />
      <WorkflowSection />
      <BottomCTA />
      <Footer />
    </div>
  )
}

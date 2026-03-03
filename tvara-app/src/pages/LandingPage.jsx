import Navbar from '../components/landing/Navbar'
import Hero from '../components/landing/Hero'
import BentoGrid from '../components/landing/BentoGrid'
import WorkflowSection from '../components/landing/WorkflowSection'
import AccordionFAQ from '../components/landing/AccordionFAQ'
import BottomCTA from '../components/landing/BottomCTA'
import Footer from '../components/landing/Footer'
import { useSEO } from '../hooks/useSEO'

const SEO_TITLE = 'Tvara — AI Multi-Agent Orchestration Platform | TvaraHQ'
const SEO_DESCRIPTION =
  'Tvara is an AI multi-agent orchestration platform. Automate workflows across GitHub, Gmail, Notion and more with LLM-powered agents. Free during beta.'

export default function LandingPage() {
  useSEO({
    title: SEO_TITLE,
    description: SEO_DESCRIPTION,
    canonical: 'https://tvarahq.com/',
  })

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />
      <Hero />
      <BentoGrid />
      <WorkflowSection />
      <AccordionFAQ />
      <BottomCTA />
      <Footer />
    </div>
  )
}

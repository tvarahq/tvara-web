import './App.css'
import AboutSection from './components/AboutSection'
import AboutTvara from './components/AboutTvara'
import CTA from './components/CTA'
import Features from './components/Features'
import Footer from './components/Footer'
import HeroSection from './components/HeroSection'
import Navbar from './components/Navbar'
import Workflow from './components/Workflow'
import { ThemeProvider } from './context/ThemeContext'

function App() {

  return (
    <ThemeProvider>
      <div className="bg-gray-200 dark:bg-black text-black dark:text-white transition-colors duration-300 font-mono">
        <div className="bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-transparent ">
          <HeroSection />
          <AboutTvara />
          <Features />
          <AboutSection />
          <Workflow />
          <CTA />
          <Footer />
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App

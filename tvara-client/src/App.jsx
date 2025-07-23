import './App.css'
import About from './components/AboutSection'
import CTA from './components/CTA'
import Features from './components/Features'
import Footer from './components/Footer'
import HeroSection from './components/HeroSection'
import Navbar from './components/Navbar'
import { ThemeProvider } from './context/ThemeContext'

function App() {

  return (
    <ThemeProvider>
      <div className="bg-white dark:bg-black text-black dark:text-white transition-colors duration-300">
        <div className="bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-transparent ">
          <HeroSection />
          <Features />
          <About />
          <CTA />
          <Footer />
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App
